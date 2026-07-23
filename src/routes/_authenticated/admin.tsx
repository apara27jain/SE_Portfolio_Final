import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { uploadMedia } from "@/lib/media";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Loader2, Pencil, Trash2, Plus, ImagePlus, LogOut, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Soltech Energy" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPage,
});

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body: string;
  cover_image: string | null;
  tags: string[];
  author_name: string | null;
  meta_title: string | null;
  meta_description: string | null;
  published: boolean;
  published_at: string | null;
  updated_at: string;
};

type Review = {
  id: string;
  name: string;
  company: string | null;
  role: string | null;
  rating: number;
  quote: string;
  avatar_url: string | null;
  location: string | null;
  published: boolean;
  display_order: number;
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

function AdminPage() {
  const { user, isEditor, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return <FullLoader />;
  if (!isEditor) return <NoAccess isAdmin={isAdmin} />;

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  }

  return (
    <div className="min-h-screen bg-secondary">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div>
            <h1 className="font-display text-xl font-bold text-navy">Soltech CMS</h1>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm">
              <Link to="/">View site</Link>
            </Button>
            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut className="mr-2 h-4 w-4" /> Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <Tabs defaultValue="posts">
          <TabsList>
            <TabsTrigger value="posts">Blog Posts</TabsTrigger>
            <TabsTrigger value="reviews">Client Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="posts" className="mt-6">
            <PostsPanel />
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
            <ReviewsPanel />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function FullLoader() {
  return (
    <div className="grid min-h-screen place-items-center bg-secondary">
      <Loader2 className="h-6 w-6 animate-spin text-primary" />
    </div>
  );
}

function NoAccess({ isAdmin }: { isAdmin: boolean }) {
  return (
    <div className="grid min-h-screen place-items-center bg-secondary p-6 text-center">
      <div className="max-w-md">
        <h1 className="font-display text-2xl font-bold text-navy">Access denied</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Your account isn't an editor or admin. Ask an admin to grant you access.
        </p>
        {isAdmin ? null : null}
        <div className="mt-4">
          <Button asChild variant="outline">
            <Link to="/">Back to site</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Blog Posts ---------- */

function emptyPost(): Partial<BlogPost> {
  return {
    title: "",
    slug: "",
    excerpt: "",
    body: "",
    cover_image: null,
    tags: [],
    author_name: "Soltech Energy",
    meta_title: "",
    meta_description: "",
    published: false,
  };
}

function PostsPanel() {
  const [rows, setRows] = useState<BlogPost[] | null>(null);
  const [editing, setEditing] = useState<Partial<BlogPost> | null>(null);

  async function load() {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("updated_at", { ascending: false });
    if (error) toast.error(error.message);
    setRows((data as BlogPost[]) ?? []);
  }
  useEffect(() => {
    load();
  }, []);

  async function remove(id: string) {
    if (!confirm("Delete this post?")) return;
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("Deleted");
      load();
    }
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-lg font-bold text-navy">Blog Posts</h2>
        <Button onClick={() => setEditing(emptyPost())}>
          <Plus className="mr-2 h-4 w-4" /> New post
        </Button>
      </div>

      <div className="rounded-xl border border-border bg-card">
        {rows === null ? (
          <div className="p-8 text-center text-sm text-muted-foreground">Loading…</div>
        ) : rows.length === 0 ? (
          <div className="p-8 text-center text-sm text-muted-foreground">
            No posts yet. Create your first blog or client review post.
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {rows.map((p) => (
              <li key={p.id} className="flex items-center gap-4 p-4">
                {p.cover_image ? (
                  <img src={p.cover_image} alt="" className="h-14 w-20 rounded-md object-cover" />
                ) : (
                  <div className="grid h-14 w-20 place-items-center rounded-md bg-secondary text-muted-foreground">
                    <ImagePlus className="h-4 w-4" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <div className="truncate font-semibold text-navy">{p.title}</div>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                        p.published ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {p.published ? "Published" : "Draft"}
                    </span>
                  </div>
                  <div className="truncate text-xs text-muted-foreground">/{p.slug}</div>
                </div>
                {p.published && (
                  <a
                    className="text-muted-foreground hover:text-primary"
                    href={`/blog/${p.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    title="View"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
                <Button size="sm" variant="ghost" onClick={() => setEditing(p)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" onClick={() => remove(p.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <PostDialog
        post={editing}
        onClose={() => setEditing(null)}
        onSaved={() => {
          setEditing(null);
          load();
        }}
      />
    </div>
  );
}

function PostDialog({
  post,
  onClose,
  onSaved,
}: {
  post: Partial<BlogPost> | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState<Partial<BlogPost>>(post ?? emptyPost());
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const tagString = useMemo(() => (form.tags ?? []).join(", "), [form.tags]);

  useEffect(() => {
    setForm(post ?? emptyPost());
  }, [post]);

  const open = post !== null;

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setUploading(true);
    try {
      const url = await uploadMedia(f, "blog");
      setForm((p) => ({ ...p, cover_image: url }));
      toast.success("Image uploaded");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function save() {
    if (!form.title) return toast.error("Title required");
    const slug = form.slug?.trim() || slugify(form.title);
    const payload = {
      title: form.title.trim(),
      slug,
      excerpt: form.excerpt?.trim() || null,
      body: form.body ?? "",
      cover_image: form.cover_image ?? null,
      tags: form.tags ?? [],
      author_name: form.author_name?.trim() || null,
      meta_title: form.meta_title?.trim() || null,
      meta_description: form.meta_description?.trim() || null,
      published: !!form.published,
      published_at: form.published ? form.published_at ?? new Date().toISOString() : null,
    };
    setBusy(true);
    try {
      if (form.id) {
        const { error } = await supabase.from("blog_posts").update(payload).eq("id", form.id);
        if (error) throw error;
      } else {
        const { data: u } = await supabase.auth.getUser();
        const { error } = await supabase
          .from("blog_posts")
          .insert({ ...payload, created_by: u.user?.id });
        if (error) throw error;
      }
      toast.success("Saved");
      onSaved();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => (!v ? onClose() : null)}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{form.id ? "Edit post" : "New post"}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4">
          <Field label="Title">
            <Input
              value={form.title ?? ""}
              onChange={(e) =>
                setForm((p) => ({
                  ...p,
                  title: e.target.value,
                  slug: p.id ? p.slug : slugify(e.target.value),
                }))
              }
            />
          </Field>
          <Field label="Slug (URL)">
            <Input value={form.slug ?? ""} onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))} />
          </Field>
          <Field label="Cover image">
            <div className="flex items-center gap-3">
              {form.cover_image ? (
                <img src={form.cover_image} alt="" className="h-20 w-32 rounded-md object-cover" />
              ) : (
                <div className="grid h-20 w-32 place-items-center rounded-md bg-secondary text-muted-foreground">
                  <ImagePlus className="h-5 w-5" />
                </div>
              )}
              <label className="cursor-pointer rounded-md border border-input bg-background px-3 py-2 text-sm hover:bg-accent">
                {uploading ? "Uploading…" : "Upload image"}
                <input type="file" accept="image/*" className="hidden" onChange={onFile} />
              </label>
              {form.cover_image && (
                <Button variant="ghost" size="sm" onClick={() => setForm((p) => ({ ...p, cover_image: null }))}>
                  Remove
                </Button>
              )}
            </div>
          </Field>
          <Field label="Excerpt (summary)">
            <Textarea rows={2} value={form.excerpt ?? ""} onChange={(e) => setForm((p) => ({ ...p, excerpt: e.target.value }))} />
          </Field>
          <Field label="Body (Markdown supported)">
            <Textarea rows={12} value={form.body ?? ""} onChange={(e) => setForm((p) => ({ ...p, body: e.target.value }))} />
          </Field>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Tags (comma-separated)">
              <Input
                value={tagString}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    tags: e.target.value
                      .split(",")
                      .map((t) => t.trim())
                      .filter(Boolean),
                  }))
                }
              />
            </Field>
            <Field label="Author">
              <Input value={form.author_name ?? ""} onChange={(e) => setForm((p) => ({ ...p, author_name: e.target.value }))} />
            </Field>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="SEO title">
              <Input value={form.meta_title ?? ""} onChange={(e) => setForm((p) => ({ ...p, meta_title: e.target.value }))} />
            </Field>
            <Field label="SEO description">
              <Input value={form.meta_description ?? ""} onChange={(e) => setForm((p) => ({ ...p, meta_description: e.target.value }))} />
            </Field>
          </div>
          <div className="flex items-center gap-3">
            <Switch checked={!!form.published} onCheckedChange={(v) => setForm((p) => ({ ...p, published: v }))} />
            <Label>Published</Label>
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={save} disabled={busy}>
            {busy ? "Saving…" : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

/* ---------- Reviews ---------- */

function emptyReview(): Partial<Review> {
  return {
    name: "",
    company: "",
    role: "",
    rating: 5,
    quote: "",
    avatar_url: null,
    location: "",
    published: true,
    display_order: 0,
  };
}

function ReviewsPanel() {
  const [rows, setRows] = useState<Review[] | null>(null);
  const [editing, setEditing] = useState<Partial<Review> | null>(null);

  async function load() {
    const { data, error } = await supabase
      .from("client_reviews")
      .select("*")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setRows((data as Review[]) ?? []);
  }
  useEffect(() => {
    load();
  }, []);

  async function remove(id: string) {
    if (!confirm("Delete this review?")) return;
    const { error } = await supabase.from("client_reviews").delete().eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("Deleted");
      load();
    }
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-lg font-bold text-navy">Client Reviews</h2>
        <Button onClick={() => setEditing(emptyReview())}>
          <Plus className="mr-2 h-4 w-4" /> New review
        </Button>
      </div>
      <div className="rounded-xl border border-border bg-card">
        {rows === null ? (
          <div className="p-8 text-center text-sm text-muted-foreground">Loading…</div>
        ) : rows.length === 0 ? (
          <div className="p-8 text-center text-sm text-muted-foreground">No reviews yet.</div>
        ) : (
          <ul className="divide-y divide-border">
            {rows.map((r) => (
              <li key={r.id} className="flex items-center gap-4 p-4">
                {r.avatar_url ? (
                  <img src={r.avatar_url} alt="" className="h-12 w-12 rounded-full object-cover" />
                ) : (
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-brand font-bold text-white">
                    {r.name.slice(0, 2).toUpperCase()}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <div className="font-semibold text-navy">{r.name}</div>
                    <span className="text-xs text-solar">{"★".repeat(r.rating)}</span>
                    {!r.published && (
                      <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase text-muted-foreground">
                        Hidden
                      </span>
                    )}
                  </div>
                  <div className="truncate text-xs text-muted-foreground">{r.company || r.location || r.role}</div>
                  <div className="mt-1 line-clamp-1 text-sm text-foreground/80">{r.quote}</div>
                </div>
                <Button size="sm" variant="ghost" onClick={() => setEditing(r)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" onClick={() => remove(r.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <ReviewDialog
        review={editing}
        onClose={() => setEditing(null)}
        onSaved={() => {
          setEditing(null);
          load();
        }}
      />
    </div>
  );
}

function ReviewDialog({
  review,
  onClose,
  onSaved,
}: {
  review: Partial<Review> | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState<Partial<Review>>(review ?? emptyReview());
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => setForm(review ?? emptyReview()), [review]);
  const open = review !== null;

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setUploading(true);
    try {
      const url = await uploadMedia(f, "reviews");
      setForm((p) => ({ ...p, avatar_url: url }));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function save() {
    if (!form.name || !form.quote) return toast.error("Name and quote required");
    const payload = {
      name: form.name.trim(),
      company: form.company?.trim() || null,
      role: form.role?.trim() || null,
      rating: Math.max(1, Math.min(5, Number(form.rating) || 5)),
      quote: form.quote.trim(),
      avatar_url: form.avatar_url ?? null,
      location: form.location?.trim() || null,
      published: !!form.published,
      display_order: Number(form.display_order) || 0,
    };
    setBusy(true);
    try {
      if (form.id) {
        const { error } = await supabase.from("client_reviews").update(payload).eq("id", form.id);
        if (error) throw error;
      } else {
        const { data: u } = await supabase.auth.getUser();
        const { error } = await supabase.from("client_reviews").insert({ ...payload, created_by: u.user?.id });
        if (error) throw error;
      }
      toast.success("Saved");
      onSaved();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => (!v ? onClose() : null)}>
      <DialogContent className="max-h-[90vh] max-w-xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{form.id ? "Edit review" : "New review"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <Field label="Client name">
            <Input value={form.name ?? ""} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Company">
              <Input value={form.company ?? ""} onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))} />
            </Field>
            <Field label="Role / Title">
              <Input value={form.role ?? ""} onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))} />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Location">
              <Input value={form.location ?? ""} onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))} />
            </Field>
            <Field label="Rating (1-5)">
              <Input
                type="number"
                min={1}
                max={5}
                value={form.rating ?? 5}
                onChange={(e) => setForm((p) => ({ ...p, rating: Number(e.target.value) }))}
              />
            </Field>
          </div>
          <Field label="Quote">
            <Textarea rows={5} value={form.quote ?? ""} onChange={(e) => setForm((p) => ({ ...p, quote: e.target.value }))} />
          </Field>
          <Field label="Client photo">
            <div className="flex items-center gap-3">
              {form.avatar_url ? (
                <img src={form.avatar_url} alt="" className="h-16 w-16 rounded-full object-cover" />
              ) : (
                <div className="grid h-16 w-16 place-items-center rounded-full bg-secondary text-muted-foreground">
                  <ImagePlus className="h-4 w-4" />
                </div>
              )}
              <label className="cursor-pointer rounded-md border border-input bg-background px-3 py-2 text-sm hover:bg-accent">
                {uploading ? "Uploading…" : "Upload photo"}
                <input type="file" accept="image/*" className="hidden" onChange={onFile} />
              </label>
              {form.avatar_url && (
                <Button variant="ghost" size="sm" onClick={() => setForm((p) => ({ ...p, avatar_url: null }))}>
                  Remove
                </Button>
              )}
            </div>
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Display order">
              <Input
                type="number"
                value={form.display_order ?? 0}
                onChange={(e) => setForm((p) => ({ ...p, display_order: Number(e.target.value) }))}
              />
            </Field>
            <div className="flex items-end gap-3">
              <Switch checked={!!form.published} onCheckedChange={(v) => setForm((p) => ({ ...p, published: v }))} />
              <Label>Published</Label>
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={save} disabled={busy}>
            {busy ? "Saving…" : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}