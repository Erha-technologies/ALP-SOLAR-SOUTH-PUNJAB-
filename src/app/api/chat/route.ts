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

const SYSTEM_INSTRUCTION = `You are the official AI Solar Assistant for "ALP Solar South Punjab" (Official authorized distributor of AlpSolarr smart inverters, Tier-1 solar panels, and lithium batteries in Pakistan).

### ESSENTIAL COMPANY KNOWLEDGE:
- **Company Name**: ALP Solar South Punjab
- **Operational Coverage**: Complete South Punjab including Multan, Bahawalpur, Dera Ghazi Khan (D.G. Khan), Rahim Yar Khan, Muzaffargarh, Khanewal, Lodhran, and Sahiwal.
- **Office Location**: Multan, South Punjab, Pakistan.
- **Phone**: +92 300 1234567 | **WhatsApp**: 9233001234567 | **Email**: info@alpsolar.pk
- **Working Hours**: Monday to Saturday, 9:00 AM - 6:00 PM.
- **Key Services**:
  1. Residential Solar Systems (3 kW, 5 kW, 10 kW, 15 kW, 20 kW+)
  2. Commercial & Industrial Solar (Plazas, factories, schools, hospitals)
  3. Agricultural Solar Tubewells (VFD inverters for zero diesel costs)
  4. Turnkey MEPCO Net Metering (Green meter application, testing, and activation)
  5. Free on-site survey and customized solar feasibility consultation.
- **Products & Equipment**:
  * Tier-1 Bifacial N-Type Panels (580W-600W+ from Longi, Jinko, JA Solar, Canadian Solar).
  * AlpSolarr Pulse Hybrid & On-Grid inverters (3.6kW to 50kW) with Wi-Fi app monitoring & IP65 rating.
  * Livo Lithium Iron Phosphate (LiFePO4) storage batteries (6000+ cycles, 10-year design life).
- **Warranties**:
  * Solar Panels: 25-Year Performance Warranty + 12-Year Product Warranty.
  * AlpSolarr Inverters: 5-Year Replacement Warranty with local service center.
  * Livo Lithium Batteries: 10-Year Warranty.
  * Workmanship & Maintenance: 1-Year free maintenance support.

---

### CORE RULES TO FOLLOW:

1. **GREETINGS & COURTESY**:
   - For greetings like "hi", "hello", "salam", "assalam o alaikum", "kese ho", "kaise hain", "good morning", respond warmly in the exact language used. Introduce yourself briefly as ALP Solar AI Assistant and ask how you can help with their solar journey or energy savings.

2. **STRICT LANGUAGE MATCHING**:
   - **English Question** -> Respond 100% in professional, structured English.
   - **Urdu Script Question (e.g. "کیا آپ ملتان میں کام کرتے ہیں؟")** -> Respond 100% in polite Urdu script.
   - **Roman Urdu Question (e.g. "5kw system ke kya charges hain?")** -> Respond 100% in friendly, conversational Roman Urdu.
   - NEVER mismatch languages (e.g., do not reply in Roman Urdu if the user asked in English, and do not reply in English if the user asked in Urdu).

3. **STRUCTURED & PROFESSIONAL OUTPUT**:
   - Use clean markdown with bold titles (**...**), bullet points (*), and neat spacing.
   - Keep answers clear, direct, and pleasant to read.

4. **TOOL CALLING**:
   - Call "Maps_to_page" with { path: string } when user asks to open/view pages (e.g., /about, /solar-systems, /packages, /products, /solar-calculator, /net-metering, /faq, /contact, /get-quote).
   - Call "calculate_solar_quote" with { system_type: 'ongrid' | 'hybrid', load_kw: number, ac_units: number } when sizing a quote. If inputs are missing, conversationally ask for them first.

5. **GUARDRAIL FOR UNRELATED / EXTERNAL TOPICS**:
   - If the user asks general knowledge or topics completely unrelated to solar, energy, electricity, company, or home power (e.g., sports, celebrities, politics, coding, non-solar general knowledge), respond ONLY with:
   "${GUARDRAIL_FALLBACK}"`;

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
    const cleanLower = userQuery.toLowerCase().replace(/[^\w\s\u0600-\u06FF]/gi, "").trim();

    // Fast Greeting Interception for instantaneous zero-latency response
    const englishGreetings = ["hi", "hello", "hey", "good morning", "good afternoon", "good evening", "greetings"];
    const romanUrduGreetings = ["salam", "assalam o alaikum", "assalamu alaikum", "aoa", "kese ho", "kaise ho", "kya haal hai", "kia hal hai"];
    const urduGreetings = ["سلام", "ہیلو", "السلام علیکم", "کیسے ہو", "کیا حال ہے"];

    if (englishGreetings.includes(cleanLower)) {
      return NextResponse.json({
        reply: "Hello! Welcome to **ALP Solar South Punjab**. I am your AI Solar Assistant.\n\nHow can I help you today? You can ask about:\n* **Solar Packages** (3kW to 20kW+ for homes & businesses)\n* **MEPCO Net Metering** & Green Metering approvals\n* **AlpSolarr Smart Inverters & Tier-1 Panels**\n* Or say **\"Calculate Solar Quote\"** to estimate your system size and savings!",
        actions: [],
        sources: [],
      });
    }

    if (romanUrduGreetings.includes(cleanLower)) {
      return NextResponse.json({
        reply: "Walaikum Assalam! **ALP Solar South Punjab** mein khush-amdeed. Main aapka AI Solar Assistant hoon.\n\nAaj main aapki kis tarah madad kar sakta hoon? Aap pooch sakte hain:\n* **Solar Packages** (3kW se 20kW+ tak)\n* **MEPCO Net Metering** ka tareeqa kar\n* **AlpSolarr Inverters & Tier-1 Panels** ki details\n* Ya **\"Calculate Quote\"** bol kar apne ghar ka estimate hasil karein!",
        actions: [],
        sources: [],
      });
    }

    if (urduGreetings.includes(cleanLower)) {
      return NextResponse.json({
        reply: "السلام علیکم! **ALP سولر ساؤتھ پنجاب** میں خوش آمدید۔ میں آپ کا AI سولر اسسٹنٹ ہوں۔\n\nمیں آپ کی کیا مدد کر سکتا ہوں؟ آپ درج ذیل کے بارے میں معلومات حاصل کر سکتے ہیں:\n* **سولر پیکجز** (3 کلو واٹ سے 20 کلو واٹ+ تک)\n* **MEPCO نیٹ میٹرنگ** کا طریقہ کار\n* **AlpSolarr انورٹرز اور ٹائر-1 سولر پینلز**\n* یا فوری طور پر اپنے گھر کے لیے سولر کوٹیشن کا تخمینہ لگائیں!",
        actions: [],
        sources: [],
      });
    }

    // 1. Generate 768-dim embedding for user query
    let queryEmbedding: number[] = [];
    try {
      queryEmbedding = await getEmbedding(userQuery);
    } catch (embErr) {
      console.warn("[Chat API] Embedding generation note:", embErr);
    }

    // 2. Query Supabase vector similarity via match_documents RPC with reliable threshold
    let matchedContext = "";
    const matchedSources: Array<{ id: number; url: string; title: string; similarity: number }> = [];

    if (queryEmbedding.length === 768) {
      const { data: matchedDocs, error: rpcError } = await supabaseAdmin.rpc("match_documents", {
        query_embedding: queryEmbedding,
        match_threshold: 0.35, // Balanced threshold for high recall even with typos/short queries
        match_count: 6,
      });

      if (rpcError) {
        console.warn("[Chat API] match_documents RPC note:", rpcError.message);
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
      : `USER QUERY:
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
      temperature: 0.15,
    };

    try {
      rawResponse = await ai.models.generateContent({
        model: CHAT_MODEL_FALLBACK, // gemini-2.5-flash for fastest latency & tool calling
        contents,
        config: modelConfig,
      });
    } catch {
      try {
        rawResponse = await ai.models.generateContent({
          model: CHAT_MODEL_PRIMARY,
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
            replyText = `Opening the ${path} page for you...`;
          }
        } else if (fnName === "calculate_solar_quote") {
          const quote = computeSolarQuote(fnArgs as { system_type: "ongrid" | "hybrid"; load_kw: number; ac_units: number });
          toolActions.push({
            type: "calculate_solar_quote",
            args: fnArgs,
            payload: { quote },
          });
          if (!replyText) {
            replyText = `Here is your customized **${quote.recommendedSystemSizeKw} kW ${quote.system_type.toUpperCase()}** solar estimate:`;
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
      { status: 200 }
    );
  }
}
