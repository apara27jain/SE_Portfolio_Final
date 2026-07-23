import { Sun, Linkedin, Instagram, MessageCircle, Facebook, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import logo from "@/assets/soltech-logo.png";
import { company } from "@/content/site";

const groups = {
  Company: ["About", "Why Soltech", "Process", "Careers"],
  Services: ["Residential", "Commercial", "Industrial", "EV Charging"],
  Resources: ["Projects", "Case Studies", "Blog", "Brochure"],
  Support: ["Certificates", "Service Areas", "Contact", "AMC Plans"],
};

const socials = [
  { icon: Linkedin, href: company.social.linkedin },
  { icon: Instagram, href: company.social.instagram },
  { icon: MessageCircle, href: company.social.whatsapp },
  { icon: Facebook, href: company.social.facebook },
];

export function Footer() {
  return (
    <footer className="bg-navy pt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 pb-14 lg:grid-cols-[1.4fr_2fr_1.6fr]">
          <div>
            <a href="#top" className="flex items-center gap-2.5">
              <img
                src={logo}
                alt="Soltech Energy"
                className="h-12 w-12 rounded-full object-cover ring-2 ring-solar/40"
              />
            </a>
            <p className="mt-4 max-w-xs text-sm text-white/60">
              JAipur's premium solar energy brand — engineering a smarter, cleaner future for
              homes, businesses and industries.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((s, i) => (
                <a key={i} href={s.href} aria-label="Social link" className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 text-white/70 transition-colors hover:bg-gradient-solar hover:text-navy">
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {Object.entries(groups).map(([title, items]) => (
              <div key={title}>
                <h4 className="font-display text-sm font-bold text-white">{title}</h4>
                <ul className="mt-4 space-y-2.5">
                  {items.map((it) => (
                    <li key={it}>
                      <a href="#" className="text-sm text-white/55 transition-colors hover:text-solar">{it}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div>
            <h4 className="font-display text-sm font-bold text-white">Newsletter</h4>
            <p className="mt-4 text-sm text-white/60">Solar tips & subsidy updates, monthly.</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Subscribed! Welcome to the Soltech community.");
              }}
              className="mt-4 flex gap-2"
            >
              <Input type="email" required placeholder="Your email" className="border-white/15 bg-white/5 text-white placeholder:text-white/40" />
              <Button type="submit" aria-label="Subscribe" className="rounded-xl bg-gradient-solar text-navy hover:opacity-90">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-7 text-sm text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} {company.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-solar">Privacy Policy</a>
            <a href="#" className="hover:text-solar">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
