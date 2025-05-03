'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface PricingPlan {
  name: string;
  price: {
    monthly: number;
    annual: number;
  };
  description: string;
  features: string[];
  highlighted?: boolean;
  buttonText: string;
}

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const pricingPlans: PricingPlan[] = [
    {
      name: "Free",
      price: { monthly: 0, annual: 0 },
      description: "Basic tools to get started with your resume",
      features: [
        "1 resume",
        "Basic templates",
        "Export to PDF",
        "AI-powered suggestions",
        "24/7 email support"
      ],
      buttonText: "Get Started"
    },
    {
      name: "Pro",
      price: { monthly: 9.99, annual: 7.99 },
      description: "Advanced features for job seekers",
      features: [
        "Unlimited resumes",
        "All templates",
        "Cover letter builder",
        "Premium AI features",
        "ATS optimization",
        "Priority support"
      ],
      highlighted: true,
      buttonText: "Go Pro"
    },
    {
      name: "Lifetime",
      price: { monthly: 199, annual: 199 },
      description: "One-time payment for lifetime access",
      features: [
        "Everything in Pro",
        "Lifetime updates",
        "Career coaching session",
        "Personal branding tools",
        "LinkedIn profile optimization",
        "1-on-1 expert review"
      ],
      buttonText: "Buy Lifetime"
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-muted-foreground text-lg">
            Choose the plan that fits your needs. All plans include core features.
          </p>
          
          <div className="flex items-center justify-center mt-8 space-x-2">
            <Label htmlFor="billing-toggle" className={billingCycle === 'monthly' ? 'font-medium' : 'text-muted-foreground'}>Monthly</Label>
            <Switch
              id="billing-toggle"
              checked={billingCycle === 'annual'}
              onCheckedChange={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
            />
            <Label htmlFor="billing-toggle" className={billingCycle === 'annual' ? 'font-medium' : 'text-muted-foreground'}>Annual</Label>
            <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 text-xs font-medium px-2 py-1 rounded">
              Save 20%
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index}
              className={`bg-card rounded-xl p-8 shadow-md border transition-all duration-300 ${
                plan.highlighted 
                  ? 'relative border-primary shadow-lg md:scale-105 border-2' 
                  : 'border-border hover:border-primary/50'
              }`}
            >
              {plan.highlighted && (
                <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              <div className="mb-6">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <div className="mt-4 mb-2">
                  <span className="text-4xl font-bold">
                    ${billingCycle === 'monthly' ? plan.price.monthly : plan.price.annual}
                  </span>
                  {plan.name !== "Lifetime" && (
                    <span className="text-muted-foreground ml-1">
                      /{billingCycle === 'monthly' ? 'mo' : 'mo, billed annually'}
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground">{plan.description}</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className={`w-full ${plan.highlighted ? '' : 'bg-card hover:bg-muted text-primary hover:text-primary border border-primary'}`}
                variant={plan.highlighted ? "default" : "outline"}
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12 text-sm text-muted-foreground">
          All plans include a 14-day money-back guarantee. No questions asked.
        </div>
      </div>
    </section>
  );
}