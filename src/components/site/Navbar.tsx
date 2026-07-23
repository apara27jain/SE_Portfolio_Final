import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logo from "@/assets/soltech-logo.png";

const links = [
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-300", scrolled ? "py-3" : "py-5")}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className={cn(
          "flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300 sm:px-6",
          scrolled ? "glass shadow-soft" : "bg-transparent",
        )}>
          {/* Logo only — no text */}
          <a href="#top" className="flex items-center">
            <img
              src={logo}
              alt="Soltech Energy"
              className="h-14 w-14 rounded-full object-cover shadow-solar ring-2 ring-solar/40 transition-transform duration-300 hover:scale-105"
            />
          </a>

          {/* Desktop nav — permanent primary color, shine outline on hover */}
          <nav className="hidden items-center gap-8 lg:flex">
            {links.map((l) => (
              l.href.startsWith("/") ? (
                <Link
                  key={l.href}
                  to={l.href}
                  className={cn("relative text-sm font-semibold transition-all duration-200 after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-solar after:transition-all after:duration-300 hover:after:w-full",
                                scrolled? "text-navy hover:text-black": "text-sky-400 hover:text-solar hover:[text-shadow:0_0_12px_rgba(253,184,19,0.7)]")} >                         {l.label}
                </Link>
              ) : (
                <a
                  key={l.href}
                  href={l.href}
                  className={cn("relative text-sm font-semibold transition-all duration-200 after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-solar after:transition-all after:duration-300 hover:after:w-full",
                                scrolled? "text-navy hover:text-black": "text-sky-400 hover:text-solar hover:[text-shadow:0_0_12px_rgba(253,184,19,0.7)]")} >                  {l.label}
                </a>
              )
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button asChild className="rounded-xl bg-gradient-solar font-semibold text-navy shadow-solar hover:opacity-90">
              <a href="#contact">Free Consultation</a>
            </Button>
          </div>

          <button
            className="grid h-10 w-10 place-items-center rounded-xl text-navy lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass mt-2 flex flex-col gap-1 rounded-2xl p-4 shadow-soft lg:hidden"
            >
              {links.map((l) => (
                l.href.startsWith("/") ? (
                  <Link key={l.href} to={l.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-semibold text-navy hover:bg-primary/5">
                    {l.label}
                  </Link>
                ) : (
                  <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-semibold text-navy hover:bg-primary/5">
                    {l.label}
                  </a>
                )
              ))}
              <Button asChild className="mt-2 rounded-xl bg-gradient-solar font-semibold text-navy">
                <a href="#contact" onClick={() => setOpen(false)}>Free Consultation</a>
              </Button>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
