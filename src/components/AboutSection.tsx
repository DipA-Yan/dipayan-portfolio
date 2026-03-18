/**
 * AboutSection.tsx - Personal Introduction Section
 *
 * Features:
 * - Two-column layout: image on left, text on right (stacks on mobile)
 * - Scroll-reveal animation triggered by IntersectionObserver
 * - Glass-panel cards for Education & Location info
 * - Experience badge overlay on the image
 */

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export function AboutSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  return (
    <section
      id="about"
      ref={ref}
      className="section-padding relative bg-violet-50/40 dark:bg-violet-950/10"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-purple-50/20 dark:from-blue-950/20 dark:to-purple-950/20 z-0"
          aria-hidden="true"
        />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left column: Profile image with experience badge */}
          <motion.div
            className="w-full lg:w-1/2 pb-8"
            initial={{ opacity: 0, x: -60 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="relative mb-2">
              {/* Profile image container with glass effect */}
              <div className="aspect-video rounded-2xl overflow-hidden glass-panel">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 z-0"></div>
                <div className="w-full h-full bg-[url('/images/hero.jpg')] bg-cover bg-[position:50%_34%]"></div>
              </div>

              {/* Floating experience badge */}
              <div className="absolute -bottom-4 right-4 glass-panel px-5 py-3 rounded-xl shadow-lg">
                <p className="text-sm font-medium">Dipayan Das</p>
              </div>
            </div>
          </motion.div>

          {/* Right column: Bio text and info cards */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: 60 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              About Me
            </h2>
            <p className="text-muted-foreground mb-6">
              I'm a passionate software engineer with a strong interest in
              full-stack development, focused on building reliable and
              user-centric web applications. I enjoy transforming ideas into
              well-structured, scalable solutions while maintaining clarity,
              performance and usability.
            </p>
            <p className="text-muted-foreground mb-6">
              My approach blends logical problem-solving with thoughtful design,
              allowing me to build applications that are both functional and
              visually engaging. As a fresher, I'm continuously learning,
              exploring new concepts and improving my craft to grow as an
              engineer and contribute meaningfully to impactful projects.
            </p>

            {/* Info cards grid */}
            <div className="grid grid-cols-2 gap-6 mt-8">
              <motion.div
                className="glass-panel p-4 rounded-xl hover-scale"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="font-semibold mb-2">Education</h3>
                <p className="text-sm text-muted-foreground">
                  Bachelor's in Electronics & Communication
                </p>
              </motion.div>
              <motion.div
                className="glass-panel p-4 rounded-xl hover-scale"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h3 className="font-semibold mb-2">Location</h3>
                <p className="text-sm text-muted-foreground">Kolkata, WB</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
