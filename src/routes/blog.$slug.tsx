import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Toaster } from "@/components/ui/sonner";
import { ArrowLeft, Clock } from "lucide-react";

const SITE = "https://soltech-energy.lovable.app";

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body: string;
  cover_image: string | null;
  tags: string[];
  author_name: string | null;
  published_at: string | null;
  meta_title: string | null;
  meta_description: string | null;
};

export const getPost = createServerFn({ method: "GET" })
  .inputValidator((d: { slug: string }) => z.object({ slug: z.string().min(1).max(120) }).parse(d))
  .handler(async ({ data }) => {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_PUBLISHABLE_KEY;
    if (!url || !key) return null;
    const sb = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
    const { data: row } = await sb
      .from("blog_posts")
      .select("id,slug,title,excerpt,body,cover_image,tags,author_name,published_at,meta_title,meta_description")
      .eq("slug", data.slug)
      .eq("published", true)
      .maybeSingle();
    return (row as Post | null) ?? null;
  });

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const post = await getPost({ data: { slug: params.slug } });
    if (!post) throw notFound();
    return { post };
  },
  head: ({ params, loaderData }) => {
    const p = loaderData?.post;
    const title = p?.meta_title || p?.title || "Blog — Soltech Energy";
    const desc = p?.meta_description || p?.excerpt || "Solar insights from Soltech Energy.";
    const url = `${SITE}/blog/${params.slug}`;
    const meta: Array<Record<string, string>> = [
      { title },
      { name: "description", content: desc },
      { property: "og:title", content: title },
      { property: "og:description", content: desc },
      { property: "og:url", content: url },
      { property: "og:type", content: "article" },
    ];
    if (p?.cover_image) meta.push({ property: "og:image", content: p.cover_image }, { name: "twitter:image", content: p.cover_image });
    return {
      meta,
      links: [{ rel: "canonical", href: url }],
      scripts: p
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                headline: p.title,
                description: desc,
                image: p.cover_image ? [p.cover_image] : undefined,
                datePublished: p.published_at,
                author: p.author_name ? { "@type": "Person", name: p.author_name } : undefined,
                mainEntityOfPage: url,
              }),
            },
          ]
        : [],
    };
  },
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center bg-secondary text-center p-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-navy">Post not found</h1>
        <Link to="/blog" className="mt-4 inline-block text-primary">← Back to blog</Link>
      </div>
    </div>
  ),
  errorComponent: () => (
    <div className="grid min-h-screen place-items-center bg-secondary text-center p-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-navy">Couldn't load this post</h1>
        <Link to="/blog" className="mt-4 inline-block text-primary">← Back to blog</Link>
      </div>
    </div>
  ),
  component: PostPage,
});

function renderBody(body: string) {
  return body.split(/\n\n+/).map((para, i) => (
    <p key={i} className="mb-5 leading-relaxed text-foreground/85">
      {para}
    </p>
  ));
}

function PostPage() {
  const { post } = Route.useLoaderData();
  return (
    <div className="bg-background">
      <Navbar />
      <main className="pt-28">
        <article className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
            <ArrowLeft className="h-4 w-4" /> All posts
          </Link>
          <div className="mt-6 flex flex-wrap gap-2 text-xs">
            {(post.tags ?? []).map((t: string) => (
              <span key={t} className="rounded-full bg-primary/10 px-2 py-0.5 font-semibold text-primary">{t}</span>
            ))}
          </div>
          <h1 className="mt-4 font-display text-4xl font-extrabold text-navy sm:text-5xl">{post.title}</h1>
          <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
            {post.author_name && <span>By {post.author_name}</span>}
            {post.published_at && (
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {new Date(post.published_at).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
              </span>
            )}
          </div>
          {post.cover_image && (
            <img src={post.cover_image} alt={post.title} className="mt-8 aspect-[16/9] w-full rounded-3xl object-cover shadow-soft" />
          )}
          {post.excerpt && <p className="mt-8 text-xl font-medium text-foreground/85">{post.excerpt}</p>}
          <div className="prose mt-8 max-w-none text-base">{renderBody(post.body)}</div>
        </article>
      </main>
      <Footer />
      <Toaster position="top-center" richColors />
    </div>
  );
}