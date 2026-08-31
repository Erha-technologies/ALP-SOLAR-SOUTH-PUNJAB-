import type { FAQ } from "@/types";

export const faqs: FAQ[] = [
  {
    id: "faq-1",
    category: "Solar Basics",
    question: "How many solar panels do I need?",
    answer:
      "It depends on your average monthly electricity usage, roof area, and how much of your load you want to offset. Use the solar calculator for an instant estimate, or request a free site assessment for an exact count.",
  },
  {
    id: "faq-2",
    category: "Pricing",
    question: "How much does a solar system cost?",
    answer:
      "Cost depends on system size, equipment tier, and site complexity. Request a current price for your specific requirement — we don't publish fixed prices since equipment costs and site conditions vary.",
  },
  {
    id: "faq-3",
    category: "Solar Basics",
    question: "What's the difference between hybrid and on-grid?",
    answer:
      "On-grid systems reduce your bill but shut off during a power outage. Hybrid systems add battery storage, so they reduce your bill and keep essential circuits powered through loadshedding.",
  },
  {
    id: "faq-4",
    category: "Warranty",
    question: "How long do solar panels last?",
    answer:
      "Panels typically carry a 25–30 year performance warranty and continue generating well beyond that, at a gradually reduced output. Inverters and batteries have shorter warranty periods and may need replacement sooner.",
  },
  {
    id: "faq-5",
    category: "Batteries",
    question: "Do solar panels work during loadshedding?",
    answer:
      "An on-grid system shuts off for safety during an outage. A hybrid or off-grid system with battery storage continues powering your chosen circuits through the outage.",
  },
  {
    id: "faq-6",
    category: "Maintenance",
    question: "How much maintenance is required?",
    answer:
      "Periodic panel cleaning and an annual inspection are typically enough. Monitoring software can flag underperformance early so it's caught before it affects your savings.",
  },
  {
    id: "faq-7",
    category: "Net Metering",
    question: "Can I sell excess electricity back to the grid?",
    answer:
      "This depends on current net metering regulations and your utility's process, which can change. See the Net Metering page for the latest process, or ask your installer to confirm current eligibility.",
  },
];
