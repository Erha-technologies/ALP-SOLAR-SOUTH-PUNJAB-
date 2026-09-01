import { GoogleGenAI, Type, type Tool } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY || "";

export const ai = new GoogleGenAI({ apiKey });

// Embedding and Chat model definitions
export const EMBEDDING_MODEL_PRIMARY = "text-embedding-004";
export const EMBEDDING_MODEL_FALLBACK = "gemini-embedding-001";

export const CHAT_MODEL_PRIMARY = "gemini-1.5-flash";
export const CHAT_MODEL_FALLBACK = "gemini-2.5-flash";

/**
 * Generates a 768-dimensional vector embedding for the input text.
 */
export async function getEmbedding(text: string): Promise<number[]> {
  const cleanText = text.replace(/\n+/g, " ").trim();
  if (!cleanText) {
    return new Array(768).fill(0);
  }

  // Attempt primary embedding model
  try {
    const res = await ai.models.embedContent({
      model: EMBEDDING_MODEL_PRIMARY,
      contents: cleanText,
      config: {
        outputDimensionality: 768,
      },
    });

    const values = res.embeddings?.[0]?.values;

    if (values && values.length > 0) {
      return values.slice(0, 768);
    }
  } catch {
    // Fallback to gemini-embedding-001 with 768 dimensions
  }

  try {
    const resFallback = await ai.models.embedContent({
      model: EMBEDDING_MODEL_FALLBACK,
      contents: cleanText,
      config: {
        outputDimensionality: 768,
      },
    });

    const values = resFallback.embeddings?.[0]?.values;

    if (values && values.length > 0) {
      return values.slice(0, 768);
    }
  } catch (err: unknown) {
    console.error("Gemini Embedding generation error:", err);
    throw new Error(`Failed to generate embedding: ${(err as Error)?.message || "Unknown error"}`);
  }

  throw new Error("No embedding values returned from Gemini API");
}

/**
 * Tool declarations for Gemini Chatbot.
 */
export const CHAT_TOOLS: Tool[] = [
  {
    functionDeclarations: [
      {
        name: "Maps_to_page",
        description:
          "Triggered when the user asks to navigate, open, view, or visit a specific page on the ALP Solar South Punjab website (e.g., /about, /solar-systems, /packages, /products, /solar-calculator, /net-metering, /faq, /contact, /get-quote).",
        parameters: {
          type: Type.OBJECT,
          properties: {
            path: {
              type: Type.STRING,
              description:
                "The target relative route path, e.g. '/', '/about', '/solar-systems', '/packages', '/products', '/solar-calculator', '/net-metering', '/faq', '/contact', '/get-quote'.",
            },
          },
          required: ["path"],
        },
      },
      {
        name: "calculate_solar_quote",
        description:
          "Calculates an estimated solar system size, panel count, generation, savings, and WhatsApp CTA link. Only call this when the system type ('ongrid' or 'hybrid'), load in kW, and number of AC units are known. Ask conversationally for any missing parameters first before triggering.",
        parameters: {
          type: Type.OBJECT,
          properties: {
            system_type: {
              type: Type.STRING,
              enum: ["ongrid", "hybrid"],
              description: "Type of solar system: 'ongrid' (with MEPCO net metering) or 'hybrid' (with battery backup + net metering).",
            },
            load_kw: {
              type: Type.NUMBER,
              description: "Customer's required load or recommended system capacity in kilowatts (e.g. 3, 5, 10, 15, 20).",
            },
            ac_units: {
              type: Type.NUMBER,
              description: "Number of 1.5 ton or 1 ton Air Conditioners (ACs) running in the home or business.",
            },
          },
          required: ["system_type", "load_kw", "ac_units"],
        },
      },
    ],
  },
];
