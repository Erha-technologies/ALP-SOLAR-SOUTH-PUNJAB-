import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getEmbedding } from "@/lib/gemini";

// Comprehensive knowledge base items representing all routes and company details
const KNOWLEDGE_ITEMS = [
  {
    url: "/",
    title: "ALP Solar South Punjab - Home & Overview",
    content: `ALP Solar South Punjab is the premier solar energy engineering, procurement, and construction (EPC) firm and official AlpSolarr distributor in Pakistan.
We deliver top-tier solar power solutions across South Punjab, including Multan, Bahawalpur, Dera Ghazi Khan, Rahim Yar Khan, Muzaffargarh, Sahiwal, Khanewal, and Lodhran.
Our solutions include Tier-1 solar panel installations (Longi, Jinko, JA Solar, Canadian Solar), AlpSolarr hybrid and on-grid inverters, Livo lithium storage batteries, Atlas BESS commercial storage, and complete MEPCO net-metering services.
Customers can save up to 90% or more on their monthly electricity bills with our customized residential, commercial, industrial, and agricultural solar setups.
Official Contact: Phone +92 300 1234567, WhatsApp +92 330 01234567, Email info@alpsolar.pk. Office located in Multan, South Punjab, Pakistan. Operating hours: Monday to Saturday 9:00 AM to 6:00 PM.`,
  },
  {
    url: "/about",
    title: "About Us - ALP Solar South Punjab",
    content: `About ALP Solar South Punjab:
ALP Solar is South Punjab's most trusted solar energy specialist and the authorized distributor of AlpSolarr smart inverters and energy products in Pakistan.
Our mission is to empower homeowners, businesses, industries, and farmers with clean, reliable, and affordable solar energy amidst rising grid electricity costs and load shedding.
Our team consists of certified electrical engineers, solar designers, and experienced technicians who have successfully commissioned over 100+ megawatts of solar capacity.
We provide end-to-end solar services: preliminary feasibility analysis, precision 3D shade simulation, high-grade structural fabrication (galvanized steel and aluminum), electrical cabling, MEPCO net-metering approvals, and 24/7 mobile app remote monitoring with full after-sales support and warranties.`,
  },
  {
    url: "/solar-systems",
    title: "Solar Systems & Solutions - On-Grid, Hybrid & Off-Grid",
    content: `Solar System Solutions by ALP Solar South Punjab:
1. On-Grid Solar Systems (Grid-Tied):
- Connected directly to the MEPCO electrical grid with a bi-directional green meter.
- Daytime solar power powers the property directly, and surplus power is exported to MEPCO for bill credits.
- Highly cost-effective with the shortest payback period (2.5 to 3 years). No batteries required.

2. Hybrid Solar Systems:
- Combines grid connection, solar generation, and Livo Lithium battery storage.
- Keeps essential and heavy loads (lights, fans, inverter ACs, water pumps) running smoothly during grid power outages and load shedding.
- Also supports MEPCO net-metering to export excess energy once batteries are fully charged.

3. Off-Grid Solar Systems:
- Fully independent solar power with heavy-duty battery banks for remote rural locations, farms, and areas with no grid infrastructure.

4. Agricultural Solar Tubewells:
- High-efficiency solar pumping systems powered by VFD (Variable Frequency Drive) inverters for agricultural tube wells in South Punjab.
- Drastically eliminates diesel fuel costs and grid dependency for farmers.

5. Commercial & Industrial Solar:
- Scalable multi-kilowatt and megawatt setups for factories, textile mills, cold storages, schools, hospitals, and commercial plazas with customized zero-export or net-metering configurations.`,
  },
  {
    url: "/packages",
    title: "Solar Packages & Pricing - 3kW to 20kW+",
    content: `ALP Solar South Punjab Standard Solar Packages:
1. 3 kW Solar System:
- Suitable for: Small homes, apartments, small shops.
- Typical Load: 1 Refrigerator, 4-5 Inverter Fans, 8-10 LED Lights, TV, Wi-Fi router.
- Monthly Generation: ~360 - 420 units (kWh).
- Panel count: Approx 5-6 panels (580W N-Type).

2. 5 kW Solar System:
- Suitable for: Medium homes (5 to 7 Marla).
- Typical Load: 1 Inverter AC (1.5 ton), 1 Refrigerator, 6-8 Fans, Lights, Water pump (1 HP).
- Monthly Generation: ~600 - 720 units (kWh).
- Panel count: Approx 9-10 panels (580W).

3. 10 kW Solar System:
- Suitable for: Large homes (10 Marla to 1 Kanal) and commercial offices.
- Typical Load: 2 to 3 Inverter ACs, 2 Refrigerators, Washing Machine, 1.5 HP Water Pump, all fans/lights.
- Monthly Generation: ~1,200 - 1,450 units (kWh).
- Panel count: Approx 18 panels (580W).

4. 15 kW & 20 kW Solar Systems:
- Suitable for: Large villas (1 to 2 Kanals), commercial plazas, schools, private clinics, restaurants.
- Typical Load: 4 to 6 Inverter ACs, multiple refrigerators, heavy kitchen/office equipment, water motors.
- Monthly Generation: ~1,800 - 2,800 units (kWh).

All packages include Tier-1 Bifacial Solar Panels, AlpSolarr Inverters, lightning arrestors, DC/AC distribution boxes with surge protection devices (SPDs), customized elevated or ground mounting structures, and complete turnkey MEPCO net metering processing.`,
  },
  {
    url: "/products",
    title: "Solar Products - Panels, AlpSolarr Inverters & Lithium Batteries",
    content: `Products Available at ALP Solar South Punjab:
1. Tier-1 Solar Panels:
- Brands: Longi Hi-MO, Jinko Tiger Neo, JA Solar, Canadian Solar, Trina Solar.
- Technology: N-Type TOPCon Bifacial panels (580W, 585W, 600W+).
- Warranty: 25-Year Linear Power Output Warranty and 12-Year Product Workmanship Warranty. Efficiency up to 22.8%.

2. AlpSolarr Hybrid & On-Grid Inverters:
- Models: AlpSolarr Pulse series (3.6kW, 6kW, 8kW, 10kW, 12kW, 15kW, 20kW, 50kW).
- Features: Dual MPPT trackers, pure sine wave output, IP65 weather-proof rating, integrated Wi-Fi app monitoring, high surge tolerance, zero-export capability, seamless battery coupling.
- Warranty: 5-Year official replacement warranty with local service center in South Punjab.

3. Livo Lithium Batteries (LiFePO4):
- Safe, long-lasting Lithium Iron Phosphate chemistry.
- 6,000+ deep discharge cycles at 90% Depth of Discharge (DoD).
- 10-Year design life, wall-mount and rack-mount options (5.12 kWh 51.2V 100Ah modules, scalable up to 32 units).

4. Atlas BESS:
- High-voltage commercial and industrial battery energy storage systems for peak shaving and uninterruptible backup.`,
  },
  {
    url: "/solar-calculator",
    title: "Solar Calculator & Cost Savings Estimator",
    content: `Solar Sizing and Savings Calculation Guide for South Punjab:
- South Punjab (Multan, Bahawalpur, D.G. Khan, Rahim Yar Khan) enjoys high solar irradiance with an average of 5.0 to 5.5 Peak Sun Hours daily.
- Each 1 kW of solar panels produces approximately 4 to 4.8 units (kWh) per day, or 120 to 145 units per month.
- Sizing rule of thumb: Divide average monthly units consumed from WAPDA/MEPCO bill by 130 to find required solar capacity in kW.
  * Example: 650 units/month bill / 130 = 5 kW system.
  * Example: 1,300 units/month bill / 130 = 10 kW system.
- Financial ROI: With electricity unit prices ranging from PKR 55 to PKR 65+ per unit, a properly sized solar system typically recovers its full investment in 2.5 to 3.5 years, providing free electricity for the remaining 20+ years of panel life.`,
  },
  {
    url: "/net-metering",
    title: "MEPCO Net Metering Process in South Punjab",
    content: `MEPCO Net Metering Services by ALP Solar South Punjab:
- Net Metering is a NEPRA-approved mechanism allowing solar owners to export excess electricity generated by their solar systems back into the MEPCO grid.
- Requirements: Three-phase electricity connection, sanctioned load matching or exceeding proposed solar capacity, NEPRA-compliant Tier-1 panels and type-certified inverters (such as AlpSolarr).
- Step-by-Step ALP Solar Turnkey Process:
  1. Site survey and single line diagram (SLD) preparation.
  2. Submitting application to MEPCO Sub-Divisional Office (SDO) / Executive Engineer (XEN).
  3. Load flow study and technical clearance.
  4. Inspection and testing of the solar setup by MEPCO testing division.
  5. Signing 3-year renewable net metering agreement with MEPCO.
  6. Installation of bi-directional Green Meter.
- Total processing time: Typically 3 to 6 weeks. ALP Solar handles 100% of the documentation, liaison, and approvals.`,
  },
  {
    url: "/faq",
    title: "Frequently Asked Questions (FAQ) - ALP Solar",
    content: `Frequently Asked Questions:
Q: Does ALP Solar operate in my city in South Punjab?
A: Yes! We provide complete solar installations, maintenance, and site surveys in Multan, Bahawalpur, Dera Ghazi Khan, Rahim Yar Khan, Muzaffargarh, Khanewal, Lodhran, Sahiwal, and surrounding districts.

Q: What happens on cloudy or rainy days?
A: Solar panels still generate electricity on overcast days using diffuse sunlight, though at reduced capacity (20-40% of normal). On-grid systems draw required shortfall from MEPCO, while hybrid systems draw from lithium batteries.

Q: What is the warranty on your equipment?
A: Solar panels have a 25-year performance warranty and 12-year product warranty. AlpSolarr inverters carry a 5-year official warranty. Livo Lithium batteries come with a 5 to 10-year warranty. ALP Solar provides 1-year free workmanship and maintenance support.

Q: Can solar run 1.5 ton inverter ACs?
A: Yes! A 5kW system can easily run 1x 1.5 ton inverter AC during daytime. A 10kW system can run 2 to 3 ACs simultaneously along with normal household appliances.

Q: How can I request a quote or site survey?
A: Contact us directly on WhatsApp at 9233001234567 or call +92 300 1234567. We offer free initial consultations and site feasibility visits.`,
  },
  {
    url: "/contact",
    title: "Contact ALP Solar South Punjab",
    content: `Contact Information for ALP Solar South Punjab:
- Main Office: Multan, South Punjab, Pakistan.
- Phone / Hotline: +92 300 1234567
- WhatsApp: +92 330 01234567 (direct chat: https://wa.me/9233001234567)
- Email: info@alpsolar.pk
- Website: https://alp-solar-south-punjab.vercel.app / https://alpsolar.pk
- Working Hours: Monday to Saturday, 9:00 AM to 6:00 PM (Sunday closed).
- Services: Free site survey, residential solar, commercial solar, tubewell solar, AlpSolarr inverters distribution, Livo battery sales, and MEPCO net-metering consultation.`,
  },
];

/**
 * Splits text into chunks of approximately ~500 tokens (approx 1500 chars) with 50-token overlap.
 */
function chunkText(text: string, maxChunkSize = 1500, overlap = 150): string[] {
  const clean = text.trim();
  if (clean.length <= maxChunkSize) {
    return [clean];
  }

  const chunks: string[] = [];
  let startIndex = 0;

  while (startIndex < clean.length) {
    let endIndex = startIndex + maxChunkSize;
    if (endIndex >= clean.length) {
      chunks.push(clean.substring(startIndex).trim());
      break;
    }

    // Try to find natural break point (newline or period) near the end
    const lastNewline = clean.lastIndexOf("\n", endIndex);
    const lastPeriod = clean.lastIndexOf(". ", endIndex);

    if (lastNewline > startIndex + maxChunkSize * 0.6) {
      endIndex = lastNewline;
    } else if (lastPeriod > startIndex + maxChunkSize * 0.6) {
      endIndex = lastPeriod + 1;
    }

    const chunk = clean.substring(startIndex, endIndex).trim();
    if (chunk.length > 0) {
      chunks.push(chunk);
    }

    startIndex = Math.max(startIndex + 1, endIndex - overlap);
  }

  return chunks;
}

export async function GET(req: NextRequest) {
  return handleReindex(req);
}

export async function POST(req: NextRequest) {
  return handleReindex(req);
}

async function handleReindex(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const secret = searchParams.get("secret") || req.headers.get("x-reindex-secret");
    const expectedSecret = process.env.REINDEX_SECRET || "alp_solar_secret_998877";

    if (secret !== expectedSecret) {
      return NextResponse.json(
        { error: "Unauthorized. Valid secret parameter required." },
        { status: 401 }
      );
    }

    console.log("[Reindex] Starting vector indexing for ALP Solar South Punjab...");

    // 1. Clear previous indexed documents
    const { error: deleteError } = await supabaseAdmin.from("documents").delete().neq("id", -1);
    if (deleteError) {
      console.warn("[Reindex] Note on clear existing docs:", deleteError.message);
    }

    const indexedDocs: Array<{ id: number; url: string; title: string }> = [];
    let totalChunks = 0;

    // 2. Process all knowledge items and generate embeddings
    for (const item of KNOWLEDGE_ITEMS) {
      const chunks = chunkText(item.content);
      console.log(`[Reindex] Processing ${item.url} (${chunks.length} chunks)...`);

      for (let i = 0; i < chunks.length; i++) {
        const chunkContent = chunks[i]!;
        const chunkTitle = chunks.length > 1 ? `${item.title} (Part ${i + 1}/${chunks.length})` : item.title;

        // Generate 768-dim vector embedding using Gemini
        const embedding = await getEmbedding(`${chunkTitle}\n${chunkContent}`);

        // Insert into Supabase documents table
        const { data, error } = await supabaseAdmin
          .from("documents")
          .insert({
            url: item.url,
            title: chunkTitle,
            content: chunkContent,
            embedding: embedding,
          })
          .select("id, url, title");

        if (error) {
          console.error(`[Reindex] Error inserting chunk for ${item.url}:`, error);
          throw new Error(`Failed to insert document chunk: ${error.message}`);
        }

        if (data && data[0]) {
          indexedDocs.push(data[0] as { id: number; url: string; title: string });
        }
        totalChunks++;
      }
    }

    console.log(`[Reindex] Successfully indexed ${totalChunks} chunks into Supabase documents table.`);

    return NextResponse.json({
      success: true,
      message: `Re-indexing complete. Successfully processed and indexed ${totalChunks} chunks across ${KNOWLEDGE_ITEMS.length} routes.`,
      chunksIndexed: totalChunks,
      documents: indexedDocs,
    });
  } catch (error: unknown) {
    console.error("[Reindex] Critical Error during indexing:", error);
    return NextResponse.json(
      {
        success: false,
        error: (error as Error)?.message || "Internal server error during reindexing",
      },
      { status: 500 }
    );
  }
}
