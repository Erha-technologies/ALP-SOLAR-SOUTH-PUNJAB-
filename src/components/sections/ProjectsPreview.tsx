import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { getProjects } from "@/lib/api";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export async function ProjectsPreview() {
  const projects = await getProjects();
  const featured = projects.filter((p) => p.isFeatured).slice(0, 3);

  return (
    <section className="bg-surface-muted py-20 sm:py-28">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <span className="eyebrow">Portfolio</span>
            <h2 className="mt-1.5 font-poppins text-2xl sm:text-3xl lg:text-4xl xl:text-[2.5rem] font-bold text-[#0F2D52] tracking-tight leading-snug">Recent Installations</h2>
          </div>
          <Button href="/projects" variant="secondary">
            View All Projects
          </Button>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => {
            const cover = project.images.find((img) => img.isCover) ?? project.images[0];
            return (
              <Link key={project.id} href={`/projects/${project.slug}`}>
                <Card className="group overflow-hidden p-0">
                  <div className="relative aspect-[4/3] overflow-hidden bg-surface-muted">
                    {cover && (
                      <Image
                        src={cover.url}
                        alt={cover.altText}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-ink">
                      {project.systemCapacityKw} kW {project.customerType === "RESIDENTIAL" ? "Residential" : project.customerType === "COMMERCIAL" ? "Commercial" : "Industrial"} Solar
                    </h3>
                    <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted">
                      <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                      {project.city}, Pakistan
                    </p>
                    <span className="mt-3 inline-block font-mono text-xs uppercase tracking-wide text-accent">
                      {project.systemType.replace("_", "-")} System
                    </span>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
