import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Services, WhyChoose } from "@/components/site/Sections1";
import { Projects } from "@/components/site/Sections2";
import { Reviews, ProjectTicker, TrustedClients, Certifications, FAQ } from "@/components/site/Sections3";
import { Brochure, Contact } from "@/components/site/Sections4";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Soltech Energy — Premium Solar Solutions in Rajasthan" },
      {
        name: "description",
        content:
          "Powering a smarter future with solar energy. Premium residential, commercial & industrial solar solutions across Rajasthan.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="overflow-x-hidden bg-background">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <WhyChoose />
        <Projects />
        <ProjectTicker />
        <TrustedClients />
        <Reviews />
        <Certifications />
        <FAQ />
        <Brochure />
        <Contact />
      </main>
      <Footer />
      <Toaster position="top-center" richColors />
    </div>
  );
}
