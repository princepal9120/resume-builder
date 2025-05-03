import Link from "next/link";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import TemplateGallery from "@/components/home/TemplateGallery";
import Pricing from "@/components/home/Pricing";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";



export default function Home() {
  return (
   
     
 
        <main className="flex-grow">
          <Hero />
          <Features />
          <TemplateGallery />
          <Pricing />
          <Testimonials />
          <FAQ />
        </main>
   
  
 
  );
}
