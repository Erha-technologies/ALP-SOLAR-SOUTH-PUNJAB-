import type { Testimonial } from "@/types";

// SAMPLE DATA — brief §21/§56 explicitly prohibit presenting invented
// reviews as real. Replace with actual customer testimonials before
// launch, or keep this file empty and hide the section until real
// reviews exist.
export const testimonials: Testimonial[] = [
  {
    id: "test-1",
    customerName: "Ahmed R.",
    city: "Multan",
    customerType: "RESIDENTIAL",
    systemSizeKw: 10,
    rating: 5,
    quote: "[SAMPLE TESTIMONIAL] Replace with a real customer quote before publishing.",
  },
  {
    id: "test-2",
    customerName: "Sana K.",
    city: "Lahore",
    customerType: "COMMERCIAL",
    systemSizeKw: 20,
    rating: 5,
    quote: "[SAMPLE TESTIMONIAL] Replace with a real customer quote before publishing.",
  },
  {
    id: "test-3",
    customerName: "Bilal H.",
    city: "Islamabad",
    customerType: "RESIDENTIAL",
    systemSizeKw: 7,
    rating: 4,
    quote: "[SAMPLE TESTIMONIAL] Replace with a real customer quote before publishing.",
  },
];
