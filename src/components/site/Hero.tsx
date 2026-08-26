import { motion } from "framer-motion";
import { ArrowRight, Download, Sun, Leaf, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Counter } from "./primitives";
import heroImg from "@/assets/hero-solar.jpg";
import soltechLogo from "@/assets/soltech-logo.png";

const stats = [
  { value: 1800, suffix: "+", label: "Clients" },
  { value: 2000, suffix: "+", label: "Projects Done" },
  { value: 8, suffix: "+", label: "Years Experience" },
];

const badges = [
  { icon: ShieldCheck, label: "8+ Years Experience" },
  { icon: Leaf, label: "Clean Energy Solutions" },
  { icon: Sun, label: "End-to-End Service" },
];

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src={heroImg}
          alt="Aerial view of a Soltech Energy solar panel farm at golden hour"
          width={1920}
          height={1080}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-navy/95 via-navy/80 to-primary/60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(253,184,19,0.18),transparent_55%)]" />
      </div>

      {/* Floating Background Accent */}
      <motion.div
        className="absolute right-[8%] top-[18%] hidden h-40 w-40 rounded-full bg-solar/25 blur-3xl md:block"
        animate={{ y: [0, -28, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Prominently Scaled Floating Live Generation Badge */}
      {/* Decent, Balanced Live Badge */}
<motion.div
  className="glass-dark absolute right-[6%] top-[28%] hidden items-center gap-3 rounded-2xl border border-white/20 px-4 py-2.5 shadow-xl backdrop-blur-md md:flex"
  animate={{ y: [0, 10, 0] }}
  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
>
  <div className="relative flex items-center justify-center">
    <img src={soltechLogo} alt="Soltech Energy" className="h-7 w-7 object-contain" />
    <span className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
    </span>
  </div>
  <div className="flex flex-col">
    <span className="text-[10px] font-medium uppercase tracking-wider text-white/60">
      System Generation
    </span>
    <span className="text-sm font-bold tracking-wide text-white">
      Live: <span className="text-solar">8 kW Solar Power</span>
    </span>
  </div>
</motion.div>

      <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 pb-20 pt-36 sm:px-6">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-dark inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-widest text-solar"
        >
          <span className="h-2 w-2 rounded-full bg-solar" /> Jaipur's Premium Solar Brand
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-6 max-w-4xl text-4xl leading-[1.05] text-white sm:text-6xl md:text-7xl"
        >
          Turn Sunshine into{" "}
          <span className="text-gradient-solar">Savings</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 max-w-xl text-lg text-white/75"
        >
          Tailored rooftop solar solutions for homes, businesses, and industries across Jaipur.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-9 flex flex-col gap-3 sm:flex-row"
        >
          <Button asChild size="lg" className="group rounded-xl bg-gradient-solar px-7 text-base font-semibold text-navy shadow-solar hover:opacity-90">
            <a href="#contact">
              Get Free Consultation
              <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-xl border-white/30 bg-white/5 px-7 text-base font-semibold text-white backdrop-blur hover:bg-white/15 hover:text-white">
            <a href="/soltech-brochure.pdf" target="_blank" download="Soltech Energy Brochure">
              <Download className="mr-1 h-5 w-5" /> Download Brochure
            </a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-12 flex flex-wrap items-center gap-4"
        >
          {badges.map((b) => (
            <div key={b.label} className="glass-dark flex items-center gap-2 rounded-full px-4 py-2">
              <b.icon className="h-4 w-4 text-solar" />
              <span className="text-sm font-medium text-white/85">{b.label}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="glass-dark mt-12 grid max-w-2xl grid-cols-3 gap-4 rounded-3xl p-6"
        >
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-display text-2xl font-extrabold text-white sm:text-4xl">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-xs text-white/60 sm:text-sm">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
