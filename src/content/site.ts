import residential from "@/assets/project-residential.jpg";
import commercial from "@/assets/project-commercial.jpg";
import industrial from "@/assets/project-industrial.jpg";

/**
 * PROJECT PHOTO FOLDERS
 * ------------------------------------------------------------------
 * Every real project photo lives under src/assets/projects/<slug>/photo-N.jpg.
 * Rather than hand-writing an import line per photo (unmanageable once
 * there are dozens of projects with 10-30 photos each), Vite's
 * import.meta.glob eagerly loads every matching file at build time and
 * we group them by folder. To add a new project's gallery: drop its
 * images in a new src/assets/projects/<slug>/ folder as photo-1.jpg,
 * photo-2.jpg, etc., then call getProjectGallery("<slug>") below.
 */
const projectPhotoModules = import.meta.glob<string>("/src/assets/projects/*/*.jpg", {
  eager: true,
  import: "default",
});

function getProjectGallery(slug: string): string[] {
  return Object.entries(projectPhotoModules)
    .filter(([path]) => path.includes(`/projects/${slug}/`))
    .sort(([a], [b]) => {
      const numA = parseInt(a.match(/photo-(\d+)\.jpg$/)?.[1] ?? "0", 10);
      const numB = parseInt(b.match(/photo-(\d+)\.jpg$/)?.[1] ?? "0", 10);
      return numA - numB;
    })
    .map(([, url]) => url);
}

const radhikaGallery = getProjectGallery("radhika-industries-40kw");
const ashokaGallery = getProjectGallery("ashoka-marble-vki-180kw");
const shakunGallery = getProjectGallery("shakun-marble-vki-234kw");
const vrindavanGallery = getProjectGallery("vrindavan-dham-khatu-shyam-250kw");
const sbeGallery = getProjectGallery("sbe-international-stones-dudu-400kw");
const magnatixGallery = getProjectGallery("magnatix-rocks-dudu-400kw");
const westinGallery = getProjectGallery("westin-pushkar-300kw");
const tilecoGallery = getProjectGallery("tileco-land-developers-vki-100kw");
const shreeyanshGallery = getProjectGallery("shreeyansh-healthcare-kishangarh-130kw");
const vidhyadharGallery = getProjectGallery("vidhyadhar-nagar-jaipur-10kw");

/**
 * CMS-READY CONTENT LAYER
 * ------------------------------------------------------------------
 * All editable content for the marketing site lives here as typed
 * collections. To wire a real admin/CMS later (e.g. Lovable Cloud),
 * replace these exported arrays with fetched data of the same shape —
 * no component changes required.
 */

export const company = {
  name: "Soltech Energy",
  tagline: "Turn Sunshine into Savings",
  phone: "+91 83025 73979",
  website: "soltechenergy.co.in",
  address: "Jaipur, Rajasthan, India",
  yearsExperience: 15,
  social: {
    linkedin: "https://www.linkedin.com/company/soltech-energy-jpr/",
    instagram: "https://www.instagram.com/soltech.energy/",
    facebook: "https://www.facebook.com/profile.php?id=100086510259114",
    whatsapp: "https://api.whatsapp.com/send?phone=91-08302573979&text=Hello",
  },
};

export interface Service {
  title: string;
  description: string;
  icon: string; // lucide icon name
}

export const services: Service[] = [
  { title: "Rooftop Solar Panel Installations", description: "Precision-engineered installations for homes, businesses, and institutions.", icon: "Home" },
  { title: "Net Metering Solutions", description: "Efficient integration with the power grid to maximize savings and optimize energy flow.", icon: "Zap" },
  { title: "Solar Water Heaters & Lighting", description: "Eco-friendly heating and lighting alternatives to lower utility costs and carbon emissions.", icon: "Droplets" },
  { title: "Battery Backup & Inverter Integration", description: "Smart energy storage and backup systems for uninterrupted power supply.", icon: "BatteryCharging" },
  { title: "Aesthetic Solar Designs", description: "Visually appealing, efficient systems tailored to flats, societies and industries.", icon: "Building2" },
  { title: "Financing & Cost-Benefit Analysis", description: "Strategic financial planning and return-on-investment insights for better decision-making.", icon: "BadgeIndianRupee" },
  { title: "Technical Support & Annual Maintenance", description: "End-to-end technical assistance, testing and AMC to ensure efficiency over time.", icon: "Wrench" },
  { title: "Solar System Health Monitoring", description: "Real-time monitoring and performance analytics to ensure maximum energy output and early fault detection.", icon: "Shield" },
  { title: "Grid-Connected Solar Systems", description: "Scalable, high-performance systems that reduce dependency on conventional electricity sources.", icon: "Gauge" },
];

export const whyChoose = [
  { title: "Reliability", description: "On-time execution with consistent service quality across every project.", icon: "ShieldCheck" },
  { title: "Quality Assurance", description: "High-performance systems designed for durability and long-term savings.", icon: "Award" },
  { title: "Customer-Centric Approach", description: "Personalized support from consultation to post-installation service.", icon: "Headset" },
  { title: "End-to-End Service", description: "From system design to installation and ongoing support, one team.", icon: "Briefcase" },
  { title: "15+ Years Expertise", description: "Deep understanding of solar systems across every segment.", icon: "Timer" },
  { title: "Sustainable Future", description: "Building a cleaner, smarter energy future for India.", icon: "Leaf" },
  { title: "Cost-Effective Solutions", description: "Customized, intelligent and affordable solar systems.", icon: "BadgeIndianRupee" },
  { title: "Maintenance Support", description: "Annual maintenance, testing and rapid technical service.", icon: "Wrench" },
];

export interface Project {
  id: string;
  name: string;
  location: string;
  capacity: string;
  category: "Residential" | "Commercial" | "Industrial";
  description: string;
  tech: string[];
  image: string;
  /**
   * Full set of installation photos for this project's sub-gallery.
   * Shown when a visitor clicks the project card. If omitted or empty,
   * the card's cover `image` is used as the only gallery photo.
   * Replace these placeholder arrays with real project photos.
   */
  gallery?: string[];
}

export const projects: Project[] = [

  { id: "p7", name: "Radhika Industries", location: "Jaipur, Rajasthan", capacity: "40 kW", category: "Industrial", description: "Rooftop solar installation powering daily manufacturing operations.", tech: ["Mono PERC", "String Inverter", "Net Metering"], image: radhikaGallery[0] ?? industrial, gallery: radhikaGallery },
  { id: "p8", name: "Ashoka Marble VKI", location: "VKI Industrial Area, Jaipur, Rajasthan", capacity: "180 kW", category: "Industrial", description: "Rooftop solar array offsetting grid dependency for marble processing operations.", tech: ["Mono PERC", "String Inverter", "Net Metering"], image: ashokaGallery[0] ?? industrial, gallery: ashokaGallery },
  { id: "p9", name: "Shakun Marbles VKI", location: "VKI Industrial Area, Jaipur, Rajasthan", capacity: "234 kW", category: "Industrial", description: "Rooftop solar system supporting marble processing operations.", tech: ["Mono PERC", "String Inverter", "Net Metering"], image: shakunGallery[0] ?? industrial, gallery: shakunGallery },
  { id: "p10", name: "Vrindavan Dham Dharamshala", location: "Khatu Shyam Ji, Rajasthan", capacity: "250 kW", category: "Commercial", description: "Rooftop solar for the pilgrim guesthouse, cutting utility costs for a high-footfall religious site.", tech: ["Mono PERC", "String Inverter", "Net Metering"], image: vrindavanGallery[0] ?? commercial, gallery: vrindavanGallery },
  { id: "p11", name: "SBE International Stones", location: "Dudu, Rajasthan", capacity: "400 kW", category: "Industrial", description: "Rooftop solar plant powering stone processing and export operations.", tech: ["Mono PERC", "String Inverter", "Net Metering"], image: sbeGallery[0] ?? industrial, gallery: sbeGallery },
  { id: "p12", name: "Magnatix Rocks", location: "Dudu, Rajasthan", capacity: "400 kW", category: "Industrial", description: "Large rooftop solar array offsetting grid demand for rock processing operations.", tech: ["Mono PERC", "String Inverter", "Net Metering"], image: magnatixGallery[0] ?? industrial, gallery: magnatixGallery },
  { id: "p13", name: "The Westin Pushkar", location: "Pushkar, Rajasthan", capacity: "300 kW", category: "Commercial", description: "Rooftop solar deployment for a premium hospitality property, cutting energy costs without compromising aesthetics.", tech: ["Mono PERC", "String Inverter", "Net Metering"], image: westinGallery[0] ?? commercial, gallery: westinGallery },
  { id: "p14", name: "Tileco Land Developers", location: "VKI Industrial Area, Jaipur, Rajasthan", capacity: "100 kW", category: "Commercial", description: "Rooftop solar installation for a real estate developer's office and operations complex.", tech: ["Mono PERC", "String Inverter", "Net Metering"], image: tilecoGallery[0] ?? commercial, gallery: tilecoGallery },
  { id: "p15", name: "Shreeyansh Healthcare", location: "Kishangarh, Rajasthan", capacity: "130 kW", category: "Commercial", description: "Rooftop solar powering a healthcare facility, reducing grid dependency and operational costs.", tech: ["Mono PERC", "String Inverter", "Net Metering"], image: shreeyanshGallery[0] ?? commercial, gallery: shreeyanshGallery },
  { id: "p16", name: "Vidhyadhar Nagar Residence", location: "Jaipur, Rajasthan", capacity: "10 kW", category: "Residential", description: "Rooftop solar installation for a residential property in Jaipur.", tech: ["Mono PERC", "String Inverter", "Net Metering"], image: vidhyadharGallery[0] ?? residential, gallery: vidhyadharGallery },
];

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  feedback: string;
  initials: string;
}

export const testimonials: Testimonial[] = [
  { id: "t1", name: "Shubham Jaju", location: "Businessman", feedback: "Working with Soltech Energy has been a fantastic experience. Their team was knowledgeable, responsive, and guided us through every step of the solar installation process. The quality of their work is top-notch, and the support before and after the installation was outstanding. We've already started seeing the benefits in our electricity bills.", initials: "SJ" },
  { id: "t2", name: "Mehul Singhal", location: "Businessman", feedback: "Working with Soltech Energy has been an amazing experience. Their team guided us through every step, from the initial consultation to the final installation, with complete transparency and professionalism. Our structure looks great and was customized as per our requirements. I would recommend Soltech Energy to anyone thinking about going solar!", initials: "MS" },
];

export interface Certification {
  title: string;
  issuer: string;
  icon: string;
  /**
   * Optional scanned/photographed certificate image. When present, the
   * card shows a thumbnail of the actual document instead of just the
   * icon tile, and the detail dialog shows the full certificate image.
   * Drop real certificate scans in and set this field to enable it.
   */
  image?: string;
}

export const certifications: Certification[] = [
  { title: "ISO 9001:2015", issuer: "Quality Management", icon: "Award" },
  { title: "MNRE Approved", issuer: "Ministry of New & Renewable Energy", icon: "ShieldCheck" },
  { title: "Authorized Dealer", issuer: "Tier-1 Brand Partner", icon: "BadgeCheck" },
  { title: "Electrical License", issuer: "Govt. of Rajasthan", icon: "FileCheck" },
];

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readingTime: string;
  image: string;
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  { id: "b1", title: "How Much Can Solar Really Save You in Rajasthan?", excerpt: "A data-backed breakdown of real savings for homes and businesses across the state.", category: "Energy Saving Tips", readingTime: "6 min read", image: residential, featured: true },
  { id: "b2", title: "Understanding Net Metering in 2025", excerpt: "Everything you need to know about exporting surplus solar power to the grid.", category: "Solar Education", readingTime: "5 min read", image: commercial },
  { id: "b3", title: "New Government Solar Subsidies Explained", excerpt: "The latest PM Surya Ghar incentives and how to claim them.", category: "Government Subsidies", readingTime: "4 min read", image: industrial },
  { id: "b4", title: "Bifacial vs Mono PERC: What's Right for You?", excerpt: "A practical comparison of today's leading panel technologies.", category: "Solar Technology", readingTime: "7 min read", image: residential },
];

export const faqs = [
  { q: "How much can I save with solar?", a: "Most residential clients cut bills by 70–90%, with commercial systems paying back in 3–5 years." },
  { q: "What subsidies are available?", a: "Under PM Surya Ghar, residential rooftops qualify for central subsidies. We handle the full application for you." },
  { q: "How does net metering work?", a: "Surplus energy you generate is exported to the grid and credited against your consumption." },
  { q: "What maintenance is required?", a: "Solar is low-maintenance. Our AMC plans include cleaning, monitoring and rapid repairs." },
  { q: "What warranty do you offer?", a: "Up to 25-year performance warranty on panels and comprehensive workmanship coverage." },
  { q: "How long does installation take?", a: "Residential systems typically go live in 7–14 days; commercial timelines vary by scale." },
];

export const serviceAreas = ["Jaipur", "Ajmer", "Kota", "Udaipur", "Jodhpur", "Bikaner"];
