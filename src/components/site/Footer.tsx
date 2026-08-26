import { Linkedin, Instagram, MessageCircle, Facebook, Phone, AtSign } from "lucide-react";
import logo from "@/assets/soltech-logo.png";
import { company } from "@/content/site";

// Custom Threads SVG Icon component since it's not standard in base Lucide set
function ThreadsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.186 24.01c-3.18 0-5.83-1.03-7.88-3.07C2.26 18.9 1.2 16.2 1.2 12.9c0-3.35 1.08-6.1 3.23-8.19C6.58 2.62 9.38 1.58 12.9 1.58c3.55 0 6.35 1.05 8.35 3.12 1.76 1.83 2.7 4.28 2.7 7.11 0 3.73-1.57 6.64-4.43 8.21-1.6.88-3.4 1.33-5.35 1.33-2.02 0-3.78-.47-5.23-1.4-1.39-.89-2.31-2.19-2.73-3.87h2.46c.38 1.05 1.06 1.86 2.03 2.41.97.55 2.15.83 3.51.83 2.82 0 4.87-1.12 6.1-3.33.68-1.22 1.02-2.7 1.02-4.4 0-2.07-.63-3.78-1.89-5.08-1.48-1.53-3.6-2.3-6.3-2.3-2.65 0-4.72.76-6.16 2.27-1.46 1.53-2.2 3.6-2.2 6.16 0 2.5.72 4.54 2.15 6.07 1.43 1.53 3.4 2.3 5.86 2.3 1.81 0 3.32-.45 4.49-1.35.8-.62 1.37-1.44 1.7-2.45h2.44c-.39 1.66-1.29 3.03-2.7 4.07-1.68 1.25-3.77 1.88-6.22 1.88z"/>
    </svg>
  );
}

const socials = [
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: company.social.linkedin,
    bg: "bg-[#0A66C2] text-white hover:brightness-110",
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: company.social.instagram,
    bg: "bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white hover:opacity-90",
  },
  {
    name: "WhatsApp",
    icon: MessageCircle,
    href: company.social.whatsapp,
    bg: "bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white hover:opacity-90",
  },
  {
    name: "Facebook",
    icon: Facebook,
    href: company.social.facebook,
    bg: "bg-[#1877F2] text-white hover:brightness-110",
  },
  {
    name: "Threads",
    icon: ThreadsIcon,
    href: company.social.threads,
    bg: "bg-gradient-to-r from-[#101010] to-[#2B2B2B] text-white border border-white/20 hover:border-white/40",
  },
];

export function Footer() {
  return (
    <footer className="bg-navy pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        
        {/* MAP SECTION */}
        <div className="mb-12 overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl">
          <iframe
            title="Soltech Energy Office Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113840.40489958742!2d75.717753!3d26.9124336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db6123456789%3A0x62660a08e12d41fb!2sJaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
            width="100%"
            height="320"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full grayscale filter contrast-125 transition-all duration-500 hover:grayscale-0"
          />
        </div>

        {/* BRAND & CONTACT INFO SECTION (Wider & Scaled Up) */}
        <div className="pb-14">
          <div className="max-w-2xl">
            {/* Logo */}
            <a href="#top" className="inline-flex items-center gap-3">
              <img
                src={logo}
                alt="Soltech Energy"
                className="h-16 w-16 rounded-full object-cover ring-2 ring-solar/60"
              />
            </a>

            {/* Phone Number */}
            <div className="mt-5 flex items-center gap-3 text-lg font-bold text-white">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-solar/20 text-solar">
                <Phone className="h-4 w-4" />
              </div>
              <a 
                href="tel:+918239573979" 
                className="text-xl font-bold tracking-wide text-white transition-colors hover:text-solar"
              >
                +91 8239573979
              </a>
            </div>

            {/* Main Header & Paragraph */}
            <h3 className="mt-4 font-display text-xl font-bold text-white sm:text-2xl">
              Jaipur's Premium Solar Energy Brand
            </h3>
            
            <p className="mt-3 text-base leading-relaxed text-white/80 sm:text-lg">
              Engineering a smarter, cleaner future for homes, businesses, and industries with high-efficiency rooftop solar installations and turnkey energy solutions.
            </p>

            {/* Social Icons with Distinct Color Gradients */}
            <div className="mt-7 flex flex-wrap gap-3.5">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  aria-label={s.name}
                  className={`grid h-12 w-12 place-items-center rounded-xl shadow-md transition-all duration-300 hover:-translate-y-1 ${s.bg}`}
                >
                  <s.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT FOOTER */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-7 text-sm text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} {company.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-solar">Privacy Policy</a>
            <a href="#" className="transition-colors hover:text-solar">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
