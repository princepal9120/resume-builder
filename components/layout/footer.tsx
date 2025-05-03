import Link from 'next/link';
import { Github, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Rezi</h3>
            <p className="text-sm text-muted-foreground">
              AI-powered resume builder to help you land your dream job.
            </p>
            <div className="flex space-x-4">
              <Link href="https://twitter.com" className="text-muted-foreground hover:text-primary">
                <Twitter size={18} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="https://facebook.com" className="text-muted-foreground hover:text-primary">
                <Facebook size={18} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="https://instagram.com" className="text-muted-foreground hover:text-primary">
                <Instagram size={18} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://linkedin.com" className="text-muted-foreground hover:text-primary">
                <Linkedin size={18} />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="https://github.com" className="text-muted-foreground hover:text-primary">
                <Github size={18} />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-semibold">Product</h3>
            <div className="grid space-y-2">
              <Link href="/templates" className="text-sm text-muted-foreground hover:text-primary">Templates</Link>
              <Link href="/features" className="text-sm text-muted-foreground hover:text-primary">Features</Link>
              <Link href="/pricing" className="text-sm text-muted-foreground hover:text-primary">Pricing</Link>
              <Link href="/testimonials" className="text-sm text-muted-foreground hover:text-primary">Testimonials</Link>
            </div>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-semibold">Resources</h3>
            <div className="grid space-y-2">
              <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary">Blog</Link>
              <Link href="/guides" className="text-sm text-muted-foreground hover:text-primary">Guides</Link>
              <Link href="/examples" className="text-sm text-muted-foreground hover:text-primary">Examples</Link>
              <Link href="/help" className="text-sm text-muted-foreground hover:text-primary">Help Center</Link>
            </div>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-semibold">Company</h3>
            <div className="grid space-y-2">
              <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">About</Link>
              <Link href="/careers" className="text-sm text-muted-foreground hover:text-primary">Careers</Link>
              <Link href="/press" className="text-sm text-muted-foreground hover:text-primary">Press</Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact</Link>
            </div>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-semibold">Legal</h3>
            <div className="grid space-y-2">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link>
              <Link href="/cookies" className="text-sm text-muted-foreground hover:text-primary">Cookie Policy</Link>
            </div>
          </div>
        </div>
        
        <div className="mt-10 border-t border-border pt-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              © 2025 Rezi. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <Link href="/privacy" className="text-xs text-muted-foreground hover:text-primary">
                Privacy
              </Link>
              <Link href="/terms" className="text-xs text-muted-foreground hover:text-primary">
                Terms
              </Link>
              <Link href="/cookies" className="text-xs text-muted-foreground hover:text-primary">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;