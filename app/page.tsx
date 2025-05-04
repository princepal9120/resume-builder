import Link from "next/link";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import TemplateGallery from "@/components/home/TemplateGallery";
import Pricing from "@/components/home/Pricing";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";



export default function Home() {
  return (
   
     
      
           <div className="flex min-h-screen flex-col">
             <Header/>
             <main className="flex-grow">
          <Hero />
          <Features />
          <TemplateGallery />
          <Pricing />
          <Testimonials />
          <FAQ />
        </main>
             <Footer />
           </div>
       
      
      
   
  
 
  );
}
