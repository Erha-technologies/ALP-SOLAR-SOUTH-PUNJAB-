import { MessageSquareQuote, PenTool, Wrench, Zap } from "lucide-react";

const processSteps = [
  {
    icon: MessageSquareQuote,
    title: "Consultation",
    description: "Free expert site assessment, load analysis & consultation.",
  },
  {
    icon: PenTool,
    title: "Design",
    description: "Custom solar system engineering & 3D roof design.",
  },
  {
    icon: Wrench,
    title: "Installation",
    description: "Professional PEC-certified installation & quality setup.",
  },
  {
    icon: Zap,
    title: "Activation",
    description: "DISCO net metering connection & 24/7 clean energy.",
  },
];

export function ProcessSection() {
  return (
    <section className="bg-surface-muted py-16 sm:py-20 border-y border-slate-200/60">
      <div className="container-page">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-poppins text-3xl sm:text-4xl font-extrabold text-[#0F2D52] tracking-tight">
            Our Seamless Process
          </h2>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-white shadow-sm border-2 border-[#0F2D52]/30 transition-all duration-300 hover:border-[#0F2D52] hover:shadow-lg hover:-translate-y-1"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0F2D52] text-white shadow-md">
                  <Icon className="h-7 w-7 text-white stroke-[2.2]" />
                </div>
                <h3 className="mt-5 font-poppins text-lg font-bold text-[#0F2D52]">{step.title}</h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed font-medium">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
