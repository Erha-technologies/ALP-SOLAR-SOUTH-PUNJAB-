import { getTrustStats } from "@/lib/api";
import { TrustStatItem } from "@/components/sections/TrustStatItem";

export async function TrustBar() {
  const stats = await getTrustStats();

  return (
    <section className="border-b border-border bg-surface-muted">
      <div className="container-page grid grid-cols-2 gap-6 py-10 sm:grid-cols-4 sm:gap-8 sm:py-12">
        {stats.map((stat) => (
          <TrustStatItem key={stat.id} stat={stat} />
        ))}
      </div>
    </section>
  );
}
