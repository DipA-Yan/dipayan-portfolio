/**
 * Header.tsx - Fixed Navigation Bar
 * 
 * Features:
 * - Sticky header with backdrop blur on scroll
 * - Desktop: horizontal nav links + theme toggle
 * - Mobile: hamburger menu with slide-down navigation panel
 * - Active section highlighting based on scroll position
 * - Smooth scrolling to anchor sections
 */

import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
}

/** Navigation links — correspond to section IDs in Index.tsx */
const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  /** Scroll smoothly to a section and update active state */
  const handleSmoothScroll = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const headerOffset = 80; // Account for fixed header height
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      
      setActiveSection(targetId);
    }
    
    setMobileMenuOpen(false); // Close mobile menu after navigation
  }, []);

  /** Track scroll position for header styling & active section detection */
  useEffect(() => {
    const handleScroll = () => {
      // Add background blur when scrolled past 20px
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }

      // Determine which section is currently in view (bottom-up check)
      const sections = navItems.map(item => item.href.replace("#", ""));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Run once on mount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-350 theme-transition",
        scrolled
          ? "bg-white/80 dark:bg-black/80 backdrop-blur-lg shadow-sm dark:shadow-black/20"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo / Brand name */}
          <div className="flex items-center">
            <a
              href="#home"
              className="text-xl font-display font-bold tracking-tighter transition-colors hover:text-primary"
            >
              Portfolio
            </a>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 hover:bg-secondary text-foreground/80 hover:text-foreground",
                  activeSection === item.href.replace("#", "") && "bg-secondary text-foreground"
                )}
              >
                {item.label}
              </a>
            ))}
            <ThemeToggle />
          </nav>

          {/* Mobile: theme toggle + hamburger button */}
          <div className="flex md:hidden items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="h-10 w-10 rounded-full"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile navigation dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden transition-all duration-350 ease-in-out">
          <div className="glass-panel p-4 m-2 rounded-xl animate-fade-in">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                  className={cn(
                    "px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 hover:bg-secondary text-foreground/80 hover:text-foreground",
                    activeSection === item.href.replace("#", "") && "bg-secondary text-foreground"
                  )}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
