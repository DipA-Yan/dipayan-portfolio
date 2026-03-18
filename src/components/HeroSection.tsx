/**
 * HeroSection.tsx - Full-screen Hero Banner
 *
 * Features:
 * - Animated 3D icosahedron shape as background decoration
 * - Gradient overlays for smooth blending into adjacent sections
 * - "Available for opportunities" status badge with pulse indicator
 * - Gradient heading text with slide-up entrance animation
 * - CTA buttons linking to projects and resume
 */

import { Button } from "@/components/ui/button";
import { AnimatedShape } from "./AnimatedShape";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden bg-violet-50/40 dark:bg-violet-950/10"
    >
      {/* Background layer: 3D shape + gradient overlays */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <AnimatedShape />
        {/* Subtle diagonal gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-purple-50/20 dark:from-blue-950/20 dark:to-purple-950/20 z-0"
          aria-hidden="true"
        />
        {/* Top fade: blends hero into header area */}
        <div
          className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-background to-transparent -z-10"
          aria-hidden="true"
        />
        {/* Bottom fade: blends hero into next section */}
        <div
          className="absolute -bottom-[200px] left-0 right-0 h-[700px] bg-gradient-to-t from-background to-transparent -z-10"
          aria-hidden="true"
        />
      </div>

      {/* Hero content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          {/* Status badge with animated pulse dot */}
          <div className="inline-block animate-fade-in">
            <div className="flex items-center space-x-2 px-4 py-1.5 text-sm font-medium rounded-full bg-secondary/80 backdrop-blur text-foreground/80 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/40 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary/80"></span>
              </span>
              <span>Available for new opportunities</span>
            </div>
          </div>

          {/* Main heading with gradient accent text */}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold tracking-tight animate-slide-up text-balance">
            Creating{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400">
              beautiful
            </span>{" "}
            digital experiences
          </h1>

          {/* Subtitle — italic serif font for elegant styling */}
          <p className="text-xl text-muted-foreground max-w-2xl animate-slide-up animation-delay-100 text-balance italic font-display">
            I'm a passionate software developer focused on crafting reliable web
            applications that balance usability, performance and
            maintainability.
          </p>

          {/* Call-to-action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 animate-slide-up animation-delay-200">
            <Button
              size="lg"
              className="rounded-full px-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              asChild
            >
              <a href="#projects">View My Work</a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              asChild
            >
              <a
                href="https://drive.google.com/file/d/17ekrx_yfW9q0Mv-7viEHvLQELrGBLN3F/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Hire Me
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
