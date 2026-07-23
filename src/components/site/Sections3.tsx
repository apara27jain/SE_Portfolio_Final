import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Clock, ArrowRight, Zap } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Reveal, Icon, SectionHeading } from "./primitives";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  testimonials,
  certifications,
  blogPosts,
  faqs,
  projects,
} from "@/content/site";
import { cn } from "@/lib/utils";

export function Reviews() {
  const [items, setItems] = useState(() =>
    testimonials.map((t) => ({
      id: t.id,
      name: t.name,
      location: t.location,
      quote: t.feedback,
      initials: t.initials,
      avatar_url: null as string | null,
    })),
  );

  useEffect(() => {
    supabase
      .from("client_reviews")
      .select("id,name,company,location,quote,avatar_url")
      .eq("published", true)
      .order("display_order", { ascending: true })
      .then(({ data }) => {
        if (data && data.length) {
          setItems(
            data.map((r) => ({
              id: r.id,
              name: r.name,
              location: r.location || r.company || "",
              quote: r.quote,
              initials: r.name.split(" ").map((s) => s[0]).join("").slice(0, 2).toUpperCase(),
              avatar_url: r.avatar_url,
            })),
          );
        }
      });
  }, []);

  const [idx, setIdx] = useState(0);
  const safeIdx = idx % items.length;
  const t = items[safeIdx];
  const go = (d: number) => setIdx((p) => (p + d + items.length) % items.length);
  if (!t) return null;

  return (
    <section id="reviews" className="bg-secondary py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading eyebrow="Client Reviews" title="What our customers say" />
        <div className="relative mt-14">
          <Quote className="mx-auto h-12 w-12 text-solar/40" />
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="mt-6 text-center"
            >
              <p className="font-display text-2xl font-bold leading-snug text-navy sm:text-3xl">
                “{t.quote}”
              </p>
              <div className="mt-8 flex items-center justify-center gap-3">
                {t.avatar_url ? (
                  <img src={t.avatar_url} alt={t.name} className="h-12 w-12 rounded-full object-cover" />
                ) : (
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-brand font-bold text-white">
                    {t.initials}
                  </span>
                )}
                <div className="text-left">
                  <div className="font-bold text-navy">{t.name}</div>
                  <div className="text-sm text-muted-foreground">{t.location}</div>
                </div>
              </div>
            </motion.blockquote>
          </AnimatePresence>

          <div className="mt-10 flex items-center justify-center gap-3">
            <button onClick={() => go(-1)} aria-label="Previous" className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-primary transition-colors hover:bg-primary hover:text-white">
              <ChevronLeft className="h-5 w-5" />
            </button>
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Go to review ${i + 1}`}
                className={cn("h-2 rounded-full transition-all", i === safeIdx ? "w-7 bg-solar" : "w-2 bg-border")}
              />
            ))}
            <button onClick={() => go(1)} aria-label="Next" className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-primary transition-colors hover:bg-primary hover:text-white">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProjectTicker() {
  // Build ticker items from all real projects (p7+), sorted by kW descending
  const realProjects = projects
    .filter((p) => parseInt(p.id.replace("p", "")) >= 7)
    .sort((a, b) => {
      const toKw = (cap: string) => parseFloat(cap.replace(/[^\d.]/g, "")) * (cap.includes("MW") ? 1000 : 1);
      return toKw(b.capacity) - toKw(a.capacity);
    });

  const items = realProjects.map((p) => `${p.name} · ${p.capacity}`);
  const doubled = [...items, ...items]; // duplicate for seamless loop

  return (
    <section className="border-y border-border bg-secondary py-10">
      <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Work done across Rajasthan
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee gap-10">
          {doubled.map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-2 whitespace-nowrap font-display text-base font-bold text-foreground/50 transition-colors hover:text-primary"
            >
              <Zap className="h-3.5 w-3.5 text-solar" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Certifications() {
  return (
    <section className="bg-secondary py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Certifications & Licenses"
          title="Credentials you can count on"
          subtitle="Click any certificate to view it in detail."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((c, i) => (
            <Reveal key={c.title} delay={(i % 4) * 0.07}>
              <Dialog>
                <DialogTrigger asChild>
                  <button className="group h-full w-full overflow-hidden rounded-3xl border border-border bg-card text-center shadow-soft transition-transform hover:-translate-y-1.5">
                    {c.image ? (
                      <div className="relative h-32 w-full overflow-hidden">
                        <img
                          src={c.image}
                          alt={`${c.title} certificate`}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                      </div>
                    ) : (
                      <div className="mx-auto mt-7 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-solar text-navy shadow-solar">
                        <Icon name={c.icon} className="h-8 w-8" />
                      </div>
                    )}
                    <div className="p-5 pt-4">
                      <h3 className="text-base font-bold text-navy">{c.title}</h3>
                      <p className="mt-1 text-xs text-muted-foreground">{c.issuer}</p>
                    </div>
                  </button>
                </DialogTrigger>
                <DialogContent className={c.image ? "max-w-lg p-0 overflow-hidden" : "max-w-md"}>
                  {c.image ? (
                    <div>
                      <img src={c.image} alt={`${c.title} certificate`} className="max-h-[70vh] w-full object-contain bg-secondary" />
                      <div className="p-6 text-center">
                        <h3 className="font-display text-xl font-extrabold text-navy">{c.title}</h3>
                        <p className="mt-1 text-muted-foreground">{c.issuer}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="grid place-items-center rounded-2xl bg-gradient-hero p-12 text-center">
                      <Icon name={c.icon} className="h-20 w-20 text-solar" />
                      <h3 className="mt-6 font-display text-2xl font-extrabold text-white">{c.title}</h3>
                      <p className="mt-2 text-white/70">{c.issuer}</p>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}


export function TrustedClients() {
  const clients = [
    "The Westin Pushkar",
    "SBE International Stones",
    "Magnatix Rocks",
    "Vrindavan Dham Dharamshala",
    "Shakun Marbles VKI",
    "Ashoka Marble VKI",
    "Maheshwari Public School",
    "Shreeyansh Healthcare",
    "Tileco Land Developers",
    "Vinayak Industries",
    "Jajoo Exim Pvt. Ltd.",
    "J B Cold Storage",
    "Baid Fincom Services",
    "Transcorp Tower",
    "Radhika Industries",
    "Hastakala",
    "Surface",
  ];
  const doubled = [...clients, ...clients];

  return (
    <section className="border-y border-border py-10">
      <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Trusted by leading businesses across Rajasthan
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee gap-12">
          {doubled.map((name, i) => (
            <span
              key={i}
              className="flex items-center gap-2 whitespace-nowrap font-semibold text-muted-foreground/60 transition-colors hover:text-primary"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-solar" />
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Blog() {
  const [posts, setPosts] = useState<
    { id: string; slug: string; title: string; excerpt: string | null; cover_image: string | null; tags: string[]; published_at: string | null }[]
  >([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    supabase
      .from("blog_posts")
      .select("id,slug,title,excerpt,cover_image,tags,published_at")
      .eq("published", true)
      .order("published_at", { ascending: false })
      .limit(3)
      .then(({ data }) => {
        setPosts(data ?? []);
        setLoaded(true);
      });
  }, []);

  const useStatic = loaded && posts.length === 0;
  const featured = useStatic ? blogPosts.find((p) => p.featured) ?? blogPosts[0] : null;
  const rest = useStatic ? blogPosts.filter((p) => p.id !== featured!.id) : [];

  return (
    <section id="blog" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Blog & Insights"
          title="Solar knowledge, simplified"
          subtitle="Education, savings tips and the latest from the renewable world."
        />

        {posts.length > 0 ? (
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.06}>
                <Link to="/blog/$slug" params={{ slug: p.slug }} className="group block h-full overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
                  {p.cover_image && (
                    <div className="relative h-52 overflow-hidden">
                      <img src={p.cover_image} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 text-xs">
                      {(p.tags ?? []).slice(0, 2).map((t) => (
                        <span key={t} className="rounded-full bg-primary/10 px-2 py-0.5 font-semibold text-primary">{t}</span>
                      ))}
                    </div>
                    <h3 className="mt-3 text-xl font-bold text-navy group-hover:text-primary">{p.title}</h3>
                    {p.excerpt && <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{p.excerpt}</p>}
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">Read more <ArrowRight className="h-4 w-4" /></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        ) : useStatic && featured ? (
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <article className="group h-full overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
                <div className="relative h-72 overflow-hidden">
                  <img src={featured.image} alt={featured.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute left-5 top-5 rounded-full bg-gradient-solar px-3 py-1 text-xs font-bold text-navy">Featured</span>
                </div>
                <div className="p-7">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="font-semibold text-primary">{featured.category}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{featured.readingTime}</span>
                  </div>
                  <h3 className="mt-3 text-2xl font-bold text-navy">{featured.title}</h3>
                  <p className="mt-3 text-muted-foreground">{featured.excerpt}</p>
                  <Link to="/blog" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">Read article <ArrowRight className="h-4 w-4" /></Link>
                </div>
              </article>
            </Reveal>
            <div className="grid gap-6">
              {rest.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.06}>
                  <article className="group flex gap-5 rounded-3xl border border-border bg-card p-4 shadow-soft">
                    <img src={p.image} alt={p.title} loading="lazy" className="h-28 w-28 shrink-0 rounded-2xl object-cover" />
                    <div className="flex flex-col justify-center">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="font-semibold text-primary">{p.category}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{p.readingTime}</span>
                      </div>
                      <h3 className="mt-1.5 font-bold leading-snug text-navy transition-colors group-hover:text-primary">{p.title}</h3>
                      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{p.excerpt}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-10 text-center">
          <Link to="/blog" className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft hover:opacity-90">
            Visit our blog <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function FAQ() {
  return (
    <section className="bg-secondary py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading eyebrow="FAQ" title="Questions, answered" />
        <Reveal>
          <Accordion type="single" collapsible className="mt-12 space-y-4">
            {faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="overflow-hidden rounded-2xl border border-border bg-card px-6 shadow-soft"
              >
                <AccordionTrigger className="text-left font-display text-base font-bold text-navy hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}