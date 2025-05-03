"use client";

import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Templates", href: "#templates" },
    { label: "Pricing", href: "#pricing" },
    { label: "Features", href: "#features" },
    { label: "Blog", href: "#blog" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#0d0d0d] shadow-md py-3" : "bg-[#0d0d0d]/95 py-4"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-white">ResumeAI</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[#f1f1f1] text-sm font-medium hover:text-[#6366f1] transition-colors duration-200 relative group"
            >
              {item.label}
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#6366f1] transform scale-x-0 transition-transform duration-200 group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link href={"/login"}>
            <Button
              variant="ghost"
              className="text-[#f1f1f1] hover:text-[#6366f1]"
            >
              Log in
            </Button>
          </Link>
          <Link href={"/signup"}>
            <Button className="bg-[#6366f1] hover:bg-[#6366f1]/90 text-white">
              Sign up
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="ml-2"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-[#f1f1f1] transition-transform hover:rotate-12" />
            ) : (
              <Moon className="h-5 w-5 text-[#f1f1f1] transition-transform hover:-rotate-12" />
            )}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-[#f1f1f1]"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 transition-transform hover:rotate-12" />
            ) : (
              <Moon className="h-5 w-5 transition-transform hover:-rotate-12" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-[#f1f1f1]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0d0d0d] border-t border-gray-800">
          <div className="container mx-auto px-6 py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[#f1f1f1] py-2 hover:text-[#6366f1] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-2 border-t border-gray-800">
              <Link href={"/login"}>
                {" "}
                <Button
                  variant="ghost"
                  className="text-[#f1f1f1] hover:text-[#6366f1] justify-center"
                >
                  Log in
                </Button>
              </Link>
              <Link href={"/signup"}>
                <Button className="bg-[#6366f1] hover:bg-[#6366f1]/90 text-white justify-center">
                  Sign up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
