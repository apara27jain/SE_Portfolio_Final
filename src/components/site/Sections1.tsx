import { CheckCircle } from "lucide-react";
import { Reveal, Icon, SectionHeading } from "./primitives";
import { services, whyChoose } from "@/content/site";

export function Overview() {
  return null; // removed — content merged into Hero
}

export function Services() {
  return (
    <section id="services" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="What We Do"
          title="Solar solutions for every scale"
          subtitle="End-to-end clean energy services, engineered and supported by one premium team."
        />
        {/* Pointer-style list — clean, minimal, no boxes */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.06}>
              <div className="flex items-start gap-4 rounded-2xl border border-border bg-card px-6 py-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-solar/40 hover:shadow-glow">
                <div className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/8 text-primary">
                  <Icon name={s.icon} className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-navy">{s.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{s.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyChoose() {
  const top4 = whyChoose.slice(0, 4);
  return (
    <section className="bg-secondary py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Why Soltech"
          title="The premium difference"
          subtitle="What sets us apart."
        />
        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {top4.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.06}>
              <div className="flex items-center gap-4 rounded-2xl border border-border bg-card px-6 py-5 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-solar/40">
                <CheckCircle className="h-5 w-5 shrink-0 text-solar" />
                <div>
                  <p className="font-semibold text-navy">{w.title}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">{w.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
