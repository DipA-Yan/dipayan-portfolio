/**
 * Index.tsx - Main Landing Page
 * 
 * Assembles all portfolio sections in order:
 * Hero → About → Skills → Projects → Contact → Footer
 * 
 * Wraps everything in a ThemeProvider for dark/light mode support.
 * A global Bubbles effect is rendered behind all content.
 */

import { AboutSection } from "@/components/AboutSection";
import { Bubbles } from "@/components/Bubbles";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ThemeProvider } from "@/components/ThemeProvider";

const Index = () => {
  return (
    <ThemeProvider defaultTheme="system">
      <div className="min-h-screen flex flex-col theme-transition relative">
        {/* Floating bubble particles — fixed behind all sections */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <Bubbles />
        </div>
        <Header />
        <main className="flex-1 relative z-10">
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
