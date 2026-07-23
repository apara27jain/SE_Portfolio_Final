import { createFileRoute, Link } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { SectionHeading } from "@/components/site/primitives";
import { ArrowRight, Clock } from "lucide-react";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog & Client Reviews — Soltech Energy" },
      {
        name: "description",
        content:
          "Solar guides, savings tips, and real client stories from Soltech Energy — Rajasthan's trusted rooftop solar company.",
      },
      { property: "og:title", content: "Blog & Client Reviews — Soltech Energy" },
      { property: "og:description", content: "Solar guides, savings tips and client reviews from Soltech Energy." },
      { property: "og:url", content: "https://soltech-energy.lovable.app/blog" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://soltech-energy.lovable.app/blog" }],
  }),
  component: BlogIndex,
});

type Row = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image: string | null;
  tags: string[];
  author_name: string | null;
  published_at: string | null;
};

function BlogIndex() {
  const [rows, setRows] = useState<Row[] | null>(null);
  useEffect(() => {
    supabase
      .from("blog_posts")
      .select("id,slug,title,excerpt,cover_image,tags,author_name,published_at")
      .eq("published", true)
      .order("published_at", { ascending: false })
      .then(({ data }) => setRows(data ?? []));
  }, []);

  return (
    <div className="bg-background">
      <Navbar />
      <main className="pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Blog & Reviews"
            title="Stories, guides & client experiences"
            subtitle="Insights on solar savings, policy, and real installations across Rajasthan."
          />

          {rows === null ? (
            <div className="mt-14 text-center text-muted-foreground">Loading…</div>
          ) : rows.length === 0 ? (
            <div className="mt-14 rounded-3xl border border-dashed border-border bg-card p-12 text-center text-muted-foreground">
              No posts published yet. Check back soon.
            </div>
          ) : (
            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rows.map((p) => (
                <Link
                  key={p.id}
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-transform hover:-translate-y-1"
                >
                  {p.cover_image ? (
                    <div className="relative h-52 overflow-hidden">
                      <img src={p.cover_image} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                  ) : (
                    <div className="h-52 bg-gradient-hero" />
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex flex-wrap gap-2 text-xs">
                      {(p.tags ?? []).slice(0, 3).map((t) => (
                        <span key={t} className="rounded-full bg-primary/10 px-2 py-0.5 font-semibold text-primary">{t}</span>
                      ))}
                    </div>
                    <h2 className="mt-3 text-xl font-bold text-navy group-hover:text-primary">{p.title}</h2>
                    {p.excerpt && <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{p.excerpt}</p>}
                    <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                      {p.author_name && <span>By {p.author_name}</span>}
                      {p.published_at && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(p.published_at).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
                        </span>
                      )}
                    </div>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                      Read more <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
      <Toaster position="top-center" richColors />
    </div>
  );
}