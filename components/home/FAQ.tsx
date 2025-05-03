'use client';

import { useState } from 'react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const faqs: FAQItem[] = [
    {
      question: "How does the AI resume builder work?",
      answer: "Our AI resume builder uses natural language processing to analyze your experience and skills, then generates tailored content suggestions. You simply enter your information, and our AI provides optimized bullet points, skill recommendations, and formatting to create a professional resume that stands out to recruiters."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. We take your privacy seriously. All your data is encrypted and securely stored. We never share your personal information with third parties, and you can delete your data anytime. Our systems comply with industry-standard security protocols to ensure your information remains protected."
    },
    {
      question: "Can I export my resume in different formats?",
      answer: "Yes! You can export your resume as a PDF, Word document, or plain text file. The PDF format preserves all design elements and is recommended for most job applications. Word format allows for additional editing, while plain text is useful for copy-pasting into online application forms."
    },
    {
      question: "Are the resumes ATS-friendly?",
      answer: "Yes, all our templates are designed to be ATS (Applicant Tracking System) friendly. We use standard fonts, proper heading structures, and avoid complex design elements that might confuse ATS software. Our AI also helps you include relevant keywords for your industry to improve your chances of passing ATS screenings."
    },
    {
      question: "Can I cancel my subscription?",
      answer: "You can cancel your subscription at any time from your account settings. If you cancel, you'll still have access to your subscription features until the end of your billing period. We also offer a 14-day money-back guarantee if you're not satisfied with our service."
    },
    {
      question: "Do you offer cover letter templates too?",
      answer: "Yes, our Pro and Lifetime plans include an AI-powered cover letter builder with matching templates for your resume. Our system helps you craft personalized, compelling cover letters that complement your resume and highlight your relevant qualifications for each job."
    }
  ];

  return (
    <section id="faq" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-lg">
            Find answers to common questions about our AI resume builder.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-medium py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            Have more questions? <a href="#" className="text-primary hover:underline">Contact our support team</a>
          </p>
        </div>
      </div>
    </section>
  );
}