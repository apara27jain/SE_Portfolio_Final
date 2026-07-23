import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import * as Icons from "lucide-react";
import type { LucideProps } from "lucide-react";

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Counter({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v).toLocaleString("en-IN")),
    });
    return controls.stop;
  }, [inView, value, mv]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Cmp = (Icons as unknown as Record<string, React.ComponentType<LucideProps>>)[name] ?? Icons.Sparkles;
  return <Cmp {...props} />;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  light = false,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto max-w-2xl text-center", className)}>
      {eyebrow && (
        <Reveal>
          <span
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest",
              light ? "bg-white/10 text-solar" : "bg-primary/8 text-primary",
            )}
          >
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2
          className={cn(
            "mt-5 text-3xl leading-tight sm:text-4xl md:text-5xl",
            light ? "text-white" : "text-navy",
          )}
        >
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "mt-4 text-base leading-relaxed sm:text-lg",
              light ? "text-white/70" : "text-muted-foreground",
            )}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}