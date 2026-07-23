import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Zap, X, ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { Project } from "@/content/site";

/**
 * GalleryImageCard
 * -----------------------------------------------------------------
 * A single thumbnail inside a project's sub-gallery.
 * - Hover (desktop): image zooms slightly, a shading gradient rises,
 *   a diagonal light "sheen" sweeps across, and a name/kW caption
 *   fades in from the bottom.
 * - Click / tap: opens the full-size Lightbox at this image's index,
 *   from where the whole set can be browsed with prev/next arrows
 *   instead of closing and reopening each thumbnail individually.
 */
function GalleryImageCard({
  src,
  alt,
  name,
  capacity,
  onOpen,
}: {
  src: string;
  alt: string;
  name: string;
  capacity: string;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border bg-card text-left shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-glow hover:ring-2 hover:ring-solar/60"
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />

      {/* Shading that rises on hover */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Diagonal light sheen sweep */}
      <div className="pointer-events-none absolute inset-0 -translate-x-[130%] -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[130%]" />

      {/* Expand hint icon */}
      <div className="pointer-events-none absolute right-3 top-3 grid h-8 w-8 -translate-y-1 place-items-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <Expand className="h-4 w-4" />
      </div>

      {/* Caption */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <span className="text-sm font-bold leading-tight text-white drop-shadow">{name}</span>
        <span className="mt-1 flex items-center gap-1 text-xs font-semibold text-solar">
          <Zap className="h-3.5 w-3.5 shrink-0" />
          {capacity}
        </span>
      </div>
    </button>
  );
}

/**
 * Lightbox
 * -----------------------------------------------------------------
 * Full-size viewer with prev/next arrows so the whole set of a
 * project's photos can be browsed without returning to the grid.
 * Renders above the sub-gallery Dialog (higher z-index) rather than
 * as a nested Radix Dialog, to avoid dialog-in-dialog focus issues.
 */
function Lightbox({
  images,
  index,
  name,
  location,
  capacity,
  onClose,
  onNavigate,
}: {
  images: string[];
  index: number;
  name: string;
  location: string;
  capacity: string;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}) {
  const goTo = (direction: 1 | -1) => {
    onNavigate((index + direction + images.length) % images.length);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goTo(-1);
      if (e.key === "ArrowRight") goTo(1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, images.length]);

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] grid place-items-center bg-navy/92 p-4 backdrop-blur-md sm:p-8"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close preview"
        className="fixed right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur transition-colors hover:bg-solar hover:text-navy sm:right-6 sm:top-6"
      >
        <X className="h-5 w-5" />
      </button>

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goTo(-1);
            }}
            aria-label="Previous image"
            className="fixed left-3 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur transition-colors hover:bg-solar hover:text-navy sm:left-6"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goTo(1);
            }}
            aria-label="Next image"
            className="fixed right-3 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur transition-colors hover:bg-solar hover:text-navy sm:right-6"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      <div className="flex max-h-full max-w-5xl flex-col items-center" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={images[index]}
            alt={`${name} — photo ${index + 1} of ${images.length}`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="max-h-[74vh] w-auto max-w-full rounded-2xl border border-white/10 object-contain shadow-2xl"
          />
        </AnimatePresence>

        <div className="mt-5 flex flex-col items-center text-center">
          <span className="text-base font-bold text-white">{name}</span>
          <div className="mt-1.5 flex flex-wrap items-center justify-center gap-4 text-sm text-white/70">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {location}
            </span>
            <span className="flex items-center gap-1 font-semibold text-solar">
              <Zap className="h-3.5 w-3.5" />
              {capacity}
            </span>
            {images.length > 1 && (
              <span className="text-white/50">
                {index + 1} / {images.length}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>,
    document.body,
  );
}

/**
 * ProjectGalleryDialog
 * -----------------------------------------------------------------
 * Full sub-gallery for a single project, opened when its card is
 * clicked on the main Projects section.
 */
export function ProjectGalleryDialog({
  project,
  open,
  onOpenChange,
}: {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Reset the lightbox whenever a different project's dialog opens/closes.
  useEffect(() => {
    setLightboxIndex(null);
  }, [project?.id, open]);

  if (!project) return null;

  const images = project.gallery && project.gallery.length > 0 ? project.gallery : [project.image];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[88vh] max-w-4xl overflow-y-auto p-0">
        <div className="sticky top-0 z-10 border-b border-border bg-card/95 p-6 pr-12 backdrop-blur">
          <span className="rounded-full bg-gradient-solar px-3 py-1 text-xs font-bold text-navy">
            {project.category}
          </span>
          <h3 className="mt-3 font-display text-xl font-extrabold text-navy sm:text-2xl">{project.name}</h3>
          <div className="mt-1.5 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {project.location}
            </span>
            <span className="flex items-center gap-1 font-semibold text-primary">
              <Zap className="h-3.5 w-3.5" />
              {project.capacity}
            </span>
          </div>
        </div>

        <div className="p-6">
          <p className="text-sm text-muted-foreground">{project.description}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span key={t} className="rounded-full bg-primary/8 px-2.5 py-1 text-xs font-medium text-primary">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {images.map((src, i) => (
              <GalleryImageCard
                key={i}
                src={src}
                alt={`${project.name} — installation photo ${i + 1}`}
                name={project.name}
                capacity={project.capacity}
                onOpen={() => setLightboxIndex(i)}
              />
            ))}
          </div>
        </div>
      </DialogContent>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={images}
            index={lightboxIndex}
            name={project.name}
            location={project.location}
            capacity={project.capacity}
            onClose={() => setLightboxIndex(null)}
            onNavigate={setLightboxIndex}
          />
        )}
      </AnimatePresence>
    </Dialog>
  );
}
