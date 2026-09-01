import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { type GenerateContentConfig } from "@google/genai";
import {
  ai,
  getEmbedding,
  CHAT_TOOLS,
  CHAT_MODEL_PRIMARY,
  CHAT_MODEL_FALLBACK,
  CHAT_MODEL_FALLBACK_2,
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

---

### SOLAR PACKAGES OFFERED:
1. **3 kW System (Hybrid / On-Grid)**:
   - Best for: Small homes (5-7 Marla), apartments.
   - Load capacity: 1x 1-Ton Inverter AC, 1 refrigerator, 4-6 fans, LED lights, TV.
   - Monthly Generation: ~350 - 420 units (kWh).
2. **5 kW System (Hybrid / On-Grid)**:
   - Best for: 10 Marla / 1 Kanal homes (Most popular residential size).
   - Load capacity: 2x 1.5-Ton Inverter ACs, refrigerator, water pump (1HP), washing machine, all fans/lights.
   - Monthly Generation: ~650 - 750 units (kWh).
3. **10 kW System (On-Grid with MEPCO Net Metering / Hybrid)**:
   - Best for: 1-2 Kanal luxury homes & small commercial offices.
   - Load capacity: 3 to 4x 1.5-Ton Inverter ACs, heavy domestic appliances, zero electricity bill + units export to MEPCO.
   - Monthly Generation: ~1,300 - 1,500 units (kWh).
4. **15 kW & 20 kW Systems**:
   - Best for: Large residences, joint family houses, commercial plazas, schools, and hospitals.
   - Monthly Generation: ~2,000 to 2,800 units (kWh).
5. **Commercial & Industrial Systems (30 kW to 250 kW+)**:
   - Custom-engineered turnkey projects with high-voltage net metering and maximum ROI.
6. **Agricultural Solar Tubewell Solutions (10 HP to 50 HP)**:
   - Zero-diesel solar water pumping systems equipped with heavy-duty VFD (Variable Frequency Drive) controllers.

---

### PRODUCTS & EQUIPMENT:
- **Solar Panels**: Tier-1 Bifacial N-Type Monocrystalline panels (580W - 610W+) from top global brands (Longi Hi-MO, Jinko Tiger Neo, JA Solar, Canadian Solar).
  * Warranty: 25-Year Performance Warranty + 12-Year Product Warranty.
- **Inverters**: AlpSolarr Pulse Series Smart Hybrid and On-Grid Inverters (3.6 kW, 6 kW, 8 kW, 10 kW, 12 kW, 15 kW, 20 kW, up to 50 kW).
  * Features: Dual MPPT, built-in Wi-Fi mobile monitoring app, IP65 waterproof rating, rapid solar tracking.
  * Warranty: 5-Year Replacement Warranty with dedicated local service center in South Punjab.
- **Batteries**: Livo LiFePO4 (Lithium Iron Phosphate) smart energy storage modules (5.12 kWh to 15 kWh+).
  * Features: 6,000+ deep charge/discharge cycles, 10-year design life, intelligent BMS protection.
  * Warranty: 10-Year Warranty.
- **Structures & Safety**: High-grade hot-dip galvanized mounting structures (elevated/rooftop), Schneider/ABB DC breakers, SPD surge protection, earthing bore & lightning arrestors.

---

### MEPCO NET METERING PROCESS (SOUTH PUNJAB):
- **Overview**: NEPRA-approved bi-directional green metering mechanism that allows solar system owners to export excess daytime solar units to the MEPCO grid, spinning the meter backwards and offsetting night consumption.
- **Requirements**: 3-Phase electricity connection and sanctioned load matching system capacity.
- **ALP Solar Turnkey Service**:
  1. Free on-site survey and load assessment.
  2. Single Line Diagram (SLD) and structural engineering preparation.
  3. Submission to MEPCO SDO/XEN and load flow study.
  4. Installation, testing, and inspection by MEPCO.
  5. Green meter installation and activation (Average turnaround: 3 to 5 weeks).

---

### CORE RULES TO FOLLOW:
1. **GREETINGS & COURTESY**:
   - For greetings like "hi", "hello", "salam", "assalam o alaikum", "kese ho", "kaise hain", "good morning", respond warmly in the exact language used. Introduce yourself briefly as ALP Solar AI Assistant and ask how you can help with their solar journey or energy savings.

2. **STRICT LANGUAGE MATCHING**:
   - **English Question** -> Respond 100% in structured, professional English.
   - **Urdu Script Question (e.g. "کیا آپ ملتان میں کام کرتے ہیں؟")** -> Respond 100% in polite Urdu script.
   - **Roman Urdu Question (e.g. "5kw system ke kya packages hain?")** -> Respond 100% in friendly, natural Roman Urdu.
   - NEVER mismatch languages.

3. **STRUCTURED & PROFESSIONAL OUTPUT**:
   - Use clean markdown formatting with bold headings (**...**), bullet points (*), and neat spacing.
   - Keep answers comprehensive, clear, and easy to read.

4. **TOOL CALLING**:
   - Call "Maps_to_page" with { path: string } when user asks to open/view pages (e.g., /about, /solar-systems, /packages, /products, /solar-calculator, /net-metering, /faq, /contact, /get-quote).
   - Call "calculate_solar_quote" with { system_type: 'ongrid' | 'hybrid', load_kw: number, ac_units: number } when sizing a quote.

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
        reply: "Hello! Welcome to **ALP Solar South Punjab**. I am your AI Solar Assistant.\n\nHow can I help you today? You can ask about:\n* **Solar Packages** (3kW, 5kW, 10kW, 15kW, 20kW+ for homes & businesses)\n* **MEPCO Net Metering** & Green Metering approvals\n* **AlpSolarr Smart Inverters & Tier-1 Panels**\n* Or say **\"Calculate Solar Quote\"** to estimate your system size and savings!",
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
      console.warn("[Chat API] Embedding note:", embErr);
    }

    // 2. Query Supabase vector similarity via match_documents RPC with reliable threshold
    let matchedContext = "";
    const matchedSources: Array<{ id: number; url: string; title: string; similarity: number }> = [];

    if (queryEmbedding.length === 768) {
      try {
        const { data: matchedDocs, error: rpcError } = await supabaseAdmin.rpc("match_documents", {
          query_embedding: queryEmbedding,
          match_threshold: 0.30,
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
      } catch (rpcCatch) {
        console.warn("[Chat API] Supabase RPC search note:", rpcCatch);
      }
    }

    // 3. Format conversational contents for Gemini with strict role alternation
    const sanitizedContents: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(history) && history.length > 0) {
      let expectedRole: "user" | "model" = "user";
      for (const h of history.slice(-6)) {
        const rawRole = h.role === "assistant" || h.role === "model" ? "model" : "user";
        if (rawRole === expectedRole && h.content && typeof h.content === "string" && h.content.trim()) {
          sanitizedContents.push({
            role: rawRole,
            parts: [{ text: h.content.trim() }],
          });
          expectedRole = expectedRole === "user" ? "model" : "user";
        }
      }
      // If sanitizedContents ends with a user message, pop it so current prompt is the user message
      if (sanitizedContents.length > 0 && sanitizedContents[sanitizedContents.length - 1]?.role === "user") {
        sanitizedContents.pop();
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

    sanitizedContents.push({
      role: "user",
      parts: [{ text: promptWithContext }],
    });

    // 4. Generate AI response with Gemini
    let rawResponse;
    const modelConfigWithTools: GenerateContentConfig = {
      systemInstruction: SYSTEM_INSTRUCTION,
      tools: CHAT_TOOLS,
      temperature: 0.2,
    };

    const modelConfigNoTools: GenerateContentConfig = {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.2,
    };

    try {
      rawResponse = await ai.models.generateContent({
        model: CHAT_MODEL_PRIMARY, // gemini-2.5-flash
        contents: sanitizedContents,
        config: modelConfigWithTools,
      });
    } catch (primaryErr) {
      console.warn("[Chat API] Primary with tools attempt note:", primaryErr);
      try {
        // Fallback without tools in case tool schema caused issues
        rawResponse = await ai.models.generateContent({
          model: CHAT_MODEL_PRIMARY,
          contents: sanitizedContents,
          config: modelConfigNoTools,
        });
      } catch (fallbackErr) {
        console.warn("[Chat API] Primary no tools attempt note:", fallbackErr);
        try {
          rawResponse = await ai.models.generateContent({
            model: CHAT_MODEL_FALLBACK,
            contents: sanitizedContents,
            config: modelConfigNoTools,
          });
        } catch (fbErr) {
          console.warn("[Chat API] Fallback model attempt note:", fbErr);
          try {
            rawResponse = await ai.models.generateContent({
              model: CHAT_MODEL_FALLBACK_2,
              contents: sanitizedContents,
              config: modelConfigNoTools,
            });
          } catch (criticalErr) {
            console.error("[Chat API] All Gemini generation attempts failed:", criticalErr);
            throw criticalErr;
          }
        }
      }
    }

    // 5. Parse Text and Function Calls
    let replyText = rawResponse?.text || "";
    const toolActions: ToolAction[] = [];

    const functionCalls = rawResponse?.functionCalls;

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
  } catch (handlerErr) {
    console.error("[Chat API] Handler Error:", handlerErr);
    return NextResponse.json(
      {
        reply: GUARDRAIL_FALLBACK,
        actions: [],
        sources: [],
      },
      { status: 200 }
    );
  }
}
