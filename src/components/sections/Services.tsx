import Link from "next/link";
import { ArrowUpRight, Home, Building2, Factory, BatteryCharging, Zap, Wrench } from "lucide-react";
import { getServices } from "@/lib/api";
import { Card } from "@/components/ui/Card";

const icons = { Home, Building2, Factory, BatteryCharging, Zap, Wrench } as const;

export async function Services() {
  const services = await getServices();

  return (
    <section className="py-20 sm:py-28">
      <div className="container-page">
        <div className="max-w-xl">
          <span className="eyebrow">What We Build</span>
          <h2 className="mt-1.5 font-poppins text-2xl sm:text-3xl lg:text-4xl xl:text-[2.5rem] font-bold text-[#0F2D52] tracking-tight leading-snug">Complete Solar Solutions</h2>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = icons[service.icon as keyof typeof icons] ?? Zap;
            return (
              <Card key={service.id} className="group p-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-primary-50 text-primary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-ink">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{service.description}</p>
                <Link
                  href={`/solar-systems/${service.slug}`}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary"
                >
                  Learn more
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </Link>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
