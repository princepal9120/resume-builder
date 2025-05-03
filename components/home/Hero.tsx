'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText } from 'lucide-react';

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="pt-32 pb-20 md:py-36 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div 
            className={`space-y-6 ${
              loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            } transition-all duration-1000`}
          >
            <div className="inline-flex items-center rounded-full px-4 py-1 bg-primary/10 text-primary text-sm font-medium">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
              Free AI Resume Builder
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              It&apos;s literally the best, you&apos;ll love it.
            </h1>
            <p className="text-lg text-muted-foreground md:pr-10">
              Create professional-looking resumes in minutes with our AI-powered resume builder. Tailored to get you noticed by recruiters and hiring managers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="group">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline">
                Browse Templates
              </Button>
            </div>
            <div className="pt-4 text-sm text-muted-foreground">
              No credit card required. Try it risk-free.
            </div>
          </div>
          
          <div 
            className={`relative ${
              loaded ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
            } transition-all duration-1000 delay-300`}
          >
            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
              <Image 
                src="https://images.pexels.com/photos/6893933/pexels-photo-6893933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="AI Resume Builder Interface" 
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-6 -left-6 rounded-lg w-40 h-40 rotate-6 bg-primary/20 -z-10"></div>
            <div className="absolute -top-6 -right-6 rounded-lg w-40 h-40 -rotate-6 bg-secondary/30 -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}