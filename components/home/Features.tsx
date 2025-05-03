'use client';

import { useEffect, useRef } from 'react';
import { Sparkles, FileText, BarChart, Clock, Award } from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

function FeatureCard({ icon, title, description, delay }: FeatureProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('translate-y-0', 'opacity-100');
            }, delay);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className="bg-card p-6 rounded-xl transition-all duration-700 translate-y-12 opacity-0 hover:shadow-lg"
    >
      <div className="p-3 bg-primary/10 inline-block rounded-lg text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

export default function Features() {
  const features = [
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "AI-Powered Content",
      description: "Smart suggestions tailored to your experience and the job you're applying for."
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Professional Templates",
      description: "Choose from dozens of ATS-friendly templates designed by industry experts."
    },
    {
      icon: <BarChart className="h-6 w-6" />,
      title: "Resume Analysis",
      description: "Get instant feedback on how to improve your resume's impact and effectiveness."
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Quick & Easy",
      description: "Create a professional resume in minutes, not hours, with our intuitive interface."
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "ATS Optimization",
      description: "Ensure your resume passes Applicant Tracking Systems with our built-in scanner."
    }
  ];

  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Features that get you hired
          </h2>
          <p className="text-muted-foreground text-lg">
            Our AI-powered tools are designed to help you create a resume that stands out from the competition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 150}
            />
          ))}
        </div>
      </div>
    </section>
  );
}