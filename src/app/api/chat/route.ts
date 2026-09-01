import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { type GenerateContentConfig } from "@google/genai";
import {
  ai,
  getEmbedding,
  CHAT_TOOLS,
  CHAT_MODEL_PRIMARY,
  CHAT_MODEL_FALLBACK,
} from "@/lib/gemini";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "9233001234567";

interface ChatMessage {
  role: "user" | "model" | "assistant";
  content: string;
}

interface QuoteCalculation {
  system_type: "ongrid" | "hybrid";
  load_kw: number;
  ac_units: number;
  recommendedSystemSizeKw: number;
  estimatedPanelCount: number;
  estimatedMonthlyGenerationKwh: number;
  estimatedAnnualGenerationKwh: number;
  estimatedAnnualSavingsPkr: number;
  whatsappLink: string;
}

interface ToolAction {
  type: "Maps_to_page" | "calculate_solar_quote";
  args: Record<string, unknown>;
  payload?: {
    path?: string;
    quote?: QuoteCalculation;
  };
}

const GUARDRAIL_FALLBACK =
  "I do not have information about this. You can contact us on our WhatsApp for more details.";

const SYSTEM_INSTRUCTION = `You are the official AI Solar Assistant for ALP Solar South Punjab (Authorized distributor of AlpSolarr and Tier-1 solar systems in Pakistan).

YOUR CORE RESPONSIBILITIES & RULES:

1. STRICT GUARDRAIL:
- You must answer questions STRICTLY using the provided "CONTEXT CHUNKS" from the ALP Solar knowledge base.
- If the requested information is not in the context, or if the user asks any general knowledge/external/unrelated question (e.g. politics, coding, general science, celebrities, unrelated companies, other topics), you MUST respond ONLY with:
"${GUARDRAIL_FALLBACK}"
- NEVER guess, invent facts, or use general external knowledge.

2. LANGUAGE MATCHING:
- Automatically detect the user's input language and reply in the EXACT SAME LANGUAGE and STYLE:
  * English -> Reply in professional, concise English.
  * Urdu (in Arabic script, e.g. "کیا آپ ملتان میں کام کرتے ہیں؟") -> Reply in natural, courteous Urdu script.
  * Roman Urdu (e.g. "MEPCO net metering ka kya process hai?", "5kw system ki kya details hain?") -> Reply in natural, friendly Roman Urdu.

3. TOOL CALLING:
- Call "Maps_to_page" with { path: string } when the user asks to navigate, open, view, or go to any page on the website (e.g., /about, /solar-systems, /packages, /products, /solar-calculator, /net-metering, /faq, /contact, /get-quote).
- Call "calculate_solar_quote" with { system_type: 'ongrid' | 'hybrid', load_kw: number, ac_units: number } to compute a solar estimate.
  * IMPORTANT: You MUST conversationally ask for any missing parameters (system type, load in kW, or number of ACs) step-by-step before calling this tool. Once all three inputs are known, call the tool.
  * In your conversational text along with the tool call, summarize the recommendation warmly and highlight that they can click the WhatsApp button to get a formal site survey and engineering quotation.

4. TONE & IDENTITY:
- Professional, helpful, trustworthy, and knowledgeable about solar energy in South Punjab (Multan, Bahawalpur, D.G. Khan, Rahim Yar Khan).
- Always encourage connecting via WhatsApp (${WHATSAPP_NUMBER}) or phone (+92 300 1234567) for site surveys and formal estimates.`;

/**
 * Computes solar quote details and pre-filled WhatsApp link.
 */
function computeSolarQuote(args: {
  system_type: "ongrid" | "hybrid";
  load_kw: number;
  ac_units: number;
}): QuoteCalculation {
  const loadKw = Math.max(1, Number(args.load_kw) || 5);
  const acUnits = Math.max(0, Number(args.ac_units) || 0);
  const systemType = args.system_type === "hybrid" ? "hybrid" : "ongrid";

  const recommendedSystemSizeKw = loadKw;
  const estimatedPanelCount = Math.ceil((loadKw * 1000) / 580); // 580W N-Type panels
  const estimatedMonthlyGenerationKwh = Math.round(loadKw * 4.5 * 30); // ~135 kWh/kW/month in South Punjab
  const estimatedAnnualGenerationKwh = estimatedMonthlyGenerationKwh * 12;
  const estimatedAnnualSavingsPkr = Math.round(estimatedMonthlyGenerationKwh * 60 * 12); // ~60 PKR/kWh avg tariff

  const systemTypeLabel = systemType === "hybrid" ? "Hybrid (with Battery Backup)" : "On-Grid (with MEPCO Net Metering)";
  const cleanPhone = WHATSAPP_NUMBER.replace(/[^\d]/g, "");

  const messageText = `Hello ALP Solar South Punjab!
I received a preliminary estimate from your AI Assistant:
- System Type: ${systemTypeLabel}
- Capacity: ${recommendedSystemSizeKw} kW
- AC Units Supported: ${acUnits}x 1.5 Ton AC
- Estimated Panels: ${estimatedPanelCount}x 580W Bifacial
- Est. Monthly Generation: ~${estimatedMonthlyGenerationKwh.toLocaleString()} kWh
- Est. Annual Savings: PKR ${estimatedAnnualSavingsPkr.toLocaleString()}

Please provide a formal quotation and schedule a site survey in South Punjab.`;

  const whatsappLink = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(messageText)}`;

  return {
    system_type: systemType,
    load_kw: recommendedSystemSizeKw,
    ac_units: acUnits,
    recommendedSystemSizeKw,
    estimatedPanelCount,
    estimatedMonthlyGenerationKwh,
    estimatedAnnualGenerationKwh,
    estimatedAnnualSavingsPkr,
    whatsappLink,
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, history = [] } = body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Query message is required." },
        { status: 400 }
      );
    }

    const userQuery = message.trim();

    // 1. Generate 768-dim embedding for user query
    let queryEmbedding: number[] = [];
    try {
      queryEmbedding = await getEmbedding(userQuery);
    } catch (embErr) {
      console.error("[Chat API] Embedding generation failed:", embErr);
    }

    // 2. Query Supabase vector similarity via match_documents RPC
    let matchedContext = "";
    const matchedSources: Array<{ id: number; url: string; title: string; similarity: number }> = [];

    if (queryEmbedding.length === 768) {
      const { data: matchedDocs, error: rpcError } = await supabaseAdmin.rpc("match_documents", {
        query_embedding: queryEmbedding,
        match_threshold: 0.7,
        match_count: 5,
      });

      if (rpcError) {
        console.warn("[Chat API] match_documents RPC error at 0.70 threshold:", rpcError.message);
      } else if (matchedDocs && matchedDocs.length > 0) {
        matchedContext = matchedDocs
          .map(
            (doc: { url: string; title: string; content: string }) =>
              `[Source: ${doc.title} (${doc.url})]\n${doc.content}`
          )
          .join("\n\n---\n\n");

        matchedSources.push(
          ...matchedDocs.map((d: { id: number; url: string; title: string; similarity: number }) => ({
            id: d.id,
            url: d.url,
            title: d.title,
            similarity: d.similarity,
          }))
        );
      } else {
        // Soft fallback search with threshold 0.50 if no match at 0.70
        const { data: fallbackDocs } = await supabaseAdmin.rpc("match_documents", {
          query_embedding: queryEmbedding,
          match_threshold: 0.5,
          match_count: 3,
        });

        if (fallbackDocs && fallbackDocs.length > 0) {
          matchedContext = fallbackDocs
            .map(
              (doc: { url: string; title: string; content: string }) =>
                `[Source: ${doc.title} (${doc.url})]\n${doc.content}`
            )
            .join("\n\n---\n\n");
          matchedSources.push(
            ...fallbackDocs.map((d: { id: number; url: string; title: string; similarity: number }) => ({
              id: d.id,
              url: d.url,
              title: d.title,
              similarity: d.similarity,
            }))
          );
        }
      }
    }

    // 3. Format conversational contents for Gemini
    const contents: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }> = [];

    // Append prior conversation history
    if (Array.isArray(history) && history.length > 0) {
      const recentHistory = history.slice(-6);
      for (const h of recentHistory as ChatMessage[]) {
        const role = h.role === "assistant" || h.role === "model" ? "model" : "user";
        if (h.content && typeof h.content === "string") {
          contents.push({
            role,
            parts: [{ text: h.content }],
          });
        }
      }
    }

    // Inject Context Chunks into current user prompt
    const promptWithContext = matchedContext
      ? `CONTEXT CHUNKS FROM ALP SOLAR KNOWLEDGE BASE:
${matchedContext}

---
USER QUERY:
${userQuery}`
      : `CONTEXT CHUNKS FROM ALP SOLAR KNOWLEDGE BASE:
(No relevant context chunks found for this query in the database)

---
USER QUERY:
${userQuery}`;

    contents.push({
      role: "user",
      parts: [{ text: promptWithContext }],
    });

    // 4. Generate AI response with Gemini
    let rawResponse;
    const modelConfig: GenerateContentConfig = {
      systemInstruction: SYSTEM_INSTRUCTION,
      tools: CHAT_TOOLS,
      temperature: 0.2,
    };

    try {
      rawResponse = await ai.models.generateContent({
        model: CHAT_MODEL_PRIMARY,
        contents,
        config: modelConfig,
      });
    } catch {
      // Fallback to secondary model if primary unavailable
      try {
        rawResponse = await ai.models.generateContent({
          model: CHAT_MODEL_FALLBACK,
          contents,
          config: modelConfig,
        });
      } catch (genErr) {
        console.error("[Chat API] Gemini generation critical error:", genErr);
        throw genErr;
      }
    }

    // 5. Parse Text and Function Calls
    let replyText = rawResponse.text || "";
    const toolActions: ToolAction[] = [];

    const functionCalls = rawResponse.functionCalls;

    if (functionCalls && functionCalls.length > 0) {
      for (const fc of functionCalls) {
        const fnName = fc.name;
        const fnArgs = (fc.args as Record<string, unknown>) || {};

        if (fnName === "Maps_to_page") {
          const path = String(fnArgs.path || "/").trim();
          toolActions.push({
            type: "Maps_to_page",
            args: fnArgs,
            payload: { path },
          });
          if (!replyText) {
            replyText = `Navigating you to ${path}...`;
          }
        } else if (fnName === "calculate_solar_quote") {
          const quote = computeSolarQuote(fnArgs as { system_type: "ongrid" | "hybrid"; load_kw: number; ac_units: number });
          toolActions.push({
            type: "calculate_solar_quote",
            args: fnArgs,
            payload: { quote },
          });
          if (!replyText) {
            replyText = `Here is your estimated ${quote.recommendedSystemSizeKw} kW ${quote.system_type.toUpperCase()} solar quotation:`;
          }
        }
      }
    }

    // Guardrail fallback check if text is empty or completely unhelpful
    if (!replyText && toolActions.length === 0) {
      replyText = GUARDRAIL_FALLBACK;
    }

    return NextResponse.json({
      reply: replyText,
      actions: toolActions,
      sources: matchedSources,
    });
  } catch (error: unknown) {
    console.error("[Chat API] Handler Error:", error);
    return NextResponse.json(
      {
        reply: GUARDRAIL_FALLBACK,
        error: (error as Error)?.message || "Internal chat error",
        actions: [],
      },
      { status: 200 } // Return 200 with fallback message for smooth UI resilience
    );
  }
}
