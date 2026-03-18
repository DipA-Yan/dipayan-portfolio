/**
 * Footer.tsx - Site Footer
 *
 * Contains:
 * - Brand name and tagline
 * - Social media icon links (GitHub, LinkedIn, Twitter)
 * - Copyright notice with dynamic year
 * - Privacy Policy & Terms of Service links
 */

import { Github, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/80 dark:bg-secondary/90">
      <div className="container mx-auto px-4 md:px-6 py-12">
        {/* Top row: brand + social links */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a
              href="#home"
              className="text-xl font-display font-bold tracking-tighter"
            >
              Portfolio
            </a>
            <p className="text-sm text-muted-foreground mt-2">
              Creating beautiful digital experiences
            </p>
          </div>

          {/* Social media links */}
          <div className="flex space-x-6">
            <a
              href="https://github.com/DipA-Yan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/dipayan-das-/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://x.com/Shadow_Dip"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-foreground transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Bottom row: copyright + legal links */}
        <div className="mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Portfolio. All rights reserved.
          </p>

          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
