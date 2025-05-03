'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

type TemplateCategory = 'all' | 'professional' | 'creative' | 'simple';

interface Template {
  id: number;
  name: string;
  category: Exclude<TemplateCategory, 'all'>;
  image: string;
}

export default function TemplateGallery() {
  const [activeCategory, setActiveCategory] = useState<TemplateCategory>('all');

  const templates: Template[] = [
    {
      id: 1,
      name: "Executive",
      category: "professional",
      image: "https://images.pexels.com/photos/6893939/pexels-photo-6893939.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 2,
      name: "Modern",
      category: "creative",
      image: "https://images.pexels.com/photos/6893952/pexels-photo-6893952.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 3,
      name: "Minimal",
      category: "simple",
      image: "https://images.pexels.com/photos/6893795/pexels-photo-6893795.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 4,
      name: "Classic",
      category: "professional",
      image: "https://images.pexels.com/photos/6893797/pexels-photo-6893797.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 5,
      name: "Creative",
      category: "creative",
      image: "https://images.pexels.com/photos/6893928/pexels-photo-6893928.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 6,
      name: "Basic",
      category: "simple",
      image: "https://images.pexels.com/photos/6893869/pexels-photo-6893869.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  const filteredTemplates = activeCategory === 'all' 
    ? templates 
    : templates.filter(template => template.category === activeCategory);

  const categories: { value: TemplateCategory; label: string }[] = [
    { value: 'all', label: 'All Templates' },
    { value: 'professional', label: 'Professional' },
    { value: 'creative', label: 'Creative' },
    { value: 'simple', label: 'Simple' }
  ];

  return (
    <section id="templates" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choose from beautiful templates
          </h2>
          <p className="text-muted-foreground text-lg">
            Stand out with professionally designed templates that catch the eye and showcase your skills.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <Button
              key={category.value}
              variant={activeCategory === category.value ? "default" : "outline"}
              onClick={() => setActiveCategory(category.value)}
              className="mb-2"
            >
              {category.label}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <div 
              key={template.id} 
              className="group relative bg-card rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg"
            >
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src={template.image}
                  alt={`${template.name} resume template`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    Preview
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-lg">{template.name}</h3>
                <p className="text-sm text-muted-foreground capitalize">{template.category}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Button size="lg">
            View All Templates
          </Button>
        </div>
      </div>
    </section>
  );
}