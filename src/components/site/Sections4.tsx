import { useState } from "react";
import { motion } from "framer-motion";
import { Download, MapPin, Phone, Send, CheckCircle2, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Reveal, SectionHeading } from "./primitives";
import { company, serviceAreas } from "@/content/site";

export function Brochure() {
  return (
    <section id="brochure" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="relative grid items-center gap-10 overflow-hidden rounded-[2rem] bg-gradient-hero p-8 sm:p-14 lg:grid-cols-2">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(253,184,19,0.18),transparent_55%)]" />
            <div className="relative flex justify-center">
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="glass-dark relative w-56 rounded-2xl p-6 shadow-glow"
              >
                <div className="h-3 w-20 rounded-full bg-solar" />
                <div className="mt-4 font-display text-xl font-extrabold text-white">Solar Solutions Guide</div>
                <div className="mt-2 space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-2 rounded-full bg-white/15" style={{ width: `${90 - i * 12}%` }} />
                  ))}
                </div>
                <div className="mt-6 grid grid-cols-2 gap-2">
                  <div className="h-12 rounded-lg bg-white/10" />
                  <div className="h-12 rounded-lg bg-white/10" />
                </div>
              </motion.div>
            </div>
            <div className="relative">
              <h2 className="text-3xl text-white sm:text-4xl">Download Our Complete Solar Solutions Guide</h2>
              <p className="mt-4 text-white/75">
                Everything you need to know about going solar - system options, savings models,
                subsidy details and the Soltech difference, in one premium guide.
              </p>
              <Button
                size="lg"
                asChild
                className="mt-7 rounded-xl bg-gradient-solar px-7 font-semibold text-navy shadow-solar hover:opacity-90"
              >
                <a href="/soltech-brochure.pdf" target="_blank" download="Soltech Energy Brochure">
                  <Download className="mr-1 h-5 w-5" /> Download Corporate Brochure
                </a>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function ServiceAreas() { return null; }

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Trigger warning if non-numeric keys are pressed
    if (/[^0-9]/.test(value)) {
      setPhoneError("Only numbers are allowed");
    } else {
      setPhoneError("");
    }

    // Keep only numbers and enforce 10-digit limit
    const numericOnly = value.replace(/\D/g, "").slice(0, 10);
    setPhone(numericOnly);
  };

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (phone.length < 10) {
      setPhoneError("Please enter a valid 10-digit phone number");
      return;
    }
    setSubmitted(true);
    toast.success("Thank you! Our team will reach out within 24 hours.");
  }

  return (
    <section id="contact" className="bg-navy py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-solar">
              Get In Touch
            </span>
            <h2 className="mt-5 text-3xl text-white sm:text-4xl md:text-5xl">
              Schedule a free consultation
            </h2>
            <p className="mt-4 text-white/70">
              Tell us about your roof or facility and our solar engineers will design a
              tailored, no-obligation proposal.
            </p>
            <div className="mt-10 space-y-5">
              {[
                { icon: MapPin, label: company.address },
                { icon: Phone, label: company.phone },
                { icon: Globe, label: company.website ?? 'soltechenergy.co.in', href: 'https://soltechenergy.co.in' },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-solar text-navy">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <span className="text-white/85">{c.label}</span>
                </div>
              ))}
            </div>
            
            {/* Embedded Soltech Energy Jaipur Map + Direct Link */}
<div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-2">
  <div className="relative overflow-hidden rounded-2xl">
    <iframe
      title="Soltech Energy Office Location"
      src="https://maps.google.com/maps?q=Soltech+Energy,+A-25,+Vivekanand+Colony,+Naya+Khera,+Vidyadhar+Nagar,+Jaipur&t=&z=15&ie=UTF8&iwloc=&output=embed"
      width="100%"
      height="220"
      style={{ border: 0 }}
      allowFullScreen={false}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className="w-full grayscale filter contrast-125 transition-all duration-500 hover:grayscale-0"
    />
    
    {/* Overlay Button: Opens your exact listing page on click */}
    <a
      href="https://www.google.com/maps/place/Soltech+Energy/@26.949024,67.5520414,6z/data=!4m10!1m2!2m1!1sSoltech+Energy+Jaipur!3m6!1s0x396db3857e4e16d5:0x62660a08e12d41fb!8m2!3d26.949024!4d75.7725964!15s520023!16s%2Fg%2F11sb4w9d3x"
      target="_blank"
      rel="noopener noreferrer"
      className="absolute right-3 top-3 rounded-lg bg-navy/90 px-3 py-1.5 text-xs font-semibold text-solar shadow-lg backdrop-blur-md transition-all hover:bg-solar hover:text-navy"
    >
      Open in Maps ↗
    </a>
  </div>
</div>

          <Reveal>
            <div className="glass-dark rounded-3xl p-8">
              {submitted ? (
                <div className="flex h-full min-h-80 flex-col items-center justify-center text-center">
                  <CheckCircle2 className="h-16 w-16 text-solar" />
                  <h3 className="mt-5 font-display text-2xl font-extrabold text-white">Request received!</h3>
                  <p className="mt-2 text-white/70">Our team will contact you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input required placeholder="Full name" className="border-white/15 bg-white/5 text-white placeholder:text-white/40" />
                    
                    {/* Strict 10-Digit Phone Input with Validation */}
                    <div className="flex flex-col gap-1">
                      <Input
                        required
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        placeholder="Phone (10 digits)"
                        value={phone}
                        onChange={handlePhoneChange}
                        maxLength={10}
                        className="border-white/15 bg-white/5 text-white placeholder:text-white/40"
                      />
                      {phoneError && (
                        <span className="text-xs text-amber-400 font-medium">{phoneError}</span>
                      )}
                    </div>
                  </div>
                  
                  <Input type="email" placeholder="Email address" className="border-white/15 bg-white/5 text-white placeholder:text-white/40" />
                  <Input placeholder="City / Location" className="border-white/15 bg-white/5 text-white placeholder:text-white/40" />
                  <Textarea rows={4} placeholder="Tell us about your project…" className="border-white/15 bg-white/5 text-white placeholder:text-white/40" />
                  
                  <Button type="submit" size="lg" className="w-full rounded-xl bg-gradient-solar font-semibold text-navy shadow-solar hover:opacity-90">
                    <Send className="mr-1 h-5 w-5" /> Schedule Free Consultation
                  </Button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
