import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Zap, Images, ExternalLink } from "lucide-react";
import { Reveal, SectionHeading } from "./primitives";
import { projects, type Project } from "@/content/site";
import { ProjectGalleryDialog } from "./ProjectGallery";

// Flagship projects shown in the portfolio — 300 kW+, sorted highest first
// Only the first 3 photos of each are shown here; full gallery is in the standalone gallery
const FLAGSHIP_IDS = ["p11", "p12", "p13"]; // SBE 400kW, Magnatix 400kW, Westin 300kW

const flagshipProjects = FLAGSHIP_IDS
  .map((id) => projects.find((p) => p.id === id))
  .filter(Boolean) as Project[];

// Trim gallery to max 3 photos for portfolio cards
function trimmedProject(p: Project): Project {
  return { ...p, gallery: p.gallery?.slice(0, 3) ?? [] };
}

// Link to your standalone gallery — update this URL once deployed
const GALLERY_URL = "https://soltech-gallery.vercel.app";

export function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="bg-secondary py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Featured Projects"
          title="Our flagship installations"
          subtitle="300 kW and above — a sample of what we've built across Rajasthan."
        />

        {/* 3-column grid, uniform cards */}
        <motion.div
          layout
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {flagshipProjects.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <motion.article
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                onClick={() => setActiveProject(trimmedProject(p))}
                className="group cursor-pointer overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={p.image}
                    alt={`${p.name} — ${p.capacity}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />

                  {/* Category badge */}
                  <span className="absolute left-4 top-4 rounded-full bg-gradient-solar px-3 py-1 text-xs font-bold text-navy">
                    {p.category}
                  </span>

                  {/* Location + kW */}
                  <div className="absolute bottom-4 left-4 flex flex-wrap items-center gap-3 text-white">
                    <span className="flex items-center gap-1 text-xs">
                      <MapPin className="h-3.5 w-3.5" />{p.location}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-bold text-solar">
                      <Zap className="h-3.5 w-3.5" />{p.capacity}
                    </span>
                  </div>

                  {/* Photo count hint */}
                  <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-navy/50 px-2.5 py-1 text-[11px] font-semibold text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                    <Images className="h-3 w-3" />
                    3 photos
                  </span>
                </div>

                {/* Card body */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-navy">{p.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.tech.map((t) => (
                      <span key={t} className="rounded-full bg-primary/8 px-2.5 py-1 text-xs font-medium text-primary">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </motion.div>

        {/* View Full Gallery button */}
        <Reveal>
          <div className="mt-12 flex justify-center">
            <a
              href={GALLERY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-2xl bg-gradient-solar px-8 py-4 font-semibold text-navy shadow-solar transition-all duration-300 hover:-translate-y-1 hover:opacity-90 hover:shadow-lg"
            >
              <Images className="h-5 w-5" />
              View Full Project Gallery
              <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>
      </div>

      <ProjectGalleryDialog
        project={activeProject}
        open={activeProject !== null}
        onOpenChange={(o) => !o && setActiveProject(null)}
      />
    </section>
  );
}
