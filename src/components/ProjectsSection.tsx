/**
 * ProjectsSection.tsx - Portfolio Projects Showcase
 *
 * Displays project cards in a responsive grid.
 * Each card features:
 * - Cover image with hover zoom effect
 * - Overlay with title, description, tech tags, and links
 * - Scroll-triggered entrance animation with staggered delays
 */

import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

/** Project data type */
interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
}

const projects: Project[] = [
  {
    title: "Story Nest",
    description:
      "Story Nest is a modern, full-stack blogging platform designed for creators to share their stories with the world",
    image: "/images/story-nest.png",
    technologies: ["React", "Node.js", "MongoDB", "Cloudinary"],
    liveUrl: "https://story-nest15.vercel.app/",
    githubUrl: "https://github.com/DipA-Yan/story-nest",
  },
  {
    title: "Deal Drop",
    description:
      "A smart product price tracker that track product prices across e-commerce sites and get alerts on price drops",
    image: "/images/deal-drop.png",
    technologies: ["Next.js", "Supabase", "Firecrawl API", "Resend"],
    liveUrl: "https://deal-drop12.vercel.app/",
    githubUrl: "https://github.com/DipA-Yan/deal-drop",
  },
  {
    title: "MovieFlix",
    description:
      "A modern, responsive movie streaming application for discovering movies, watching trailers and exploring various genres.",
    image: "/images/movieflix.png",
    technologies: ["Next.js", "shadcn", "Framer Motion", "TMDB API"],
    liveUrl: "https://movieflix-sigma-black.vercel.app/",
    githubUrl: "https://github.com/DipA-Yan/movieflix",
  },
  {
    title: "Expense Tracker",
    description:
      "A simple Expense Tracker web application that allows users to manage and track their expenses easily.",
    image: "/images/expense-tracker.png",
    technologies: ["React", "vite", "React Router DOM"],
    liveUrl: "https://home-budget24.netlify.app/",
    githubUrl: "https://github.com/DipA-Yan/expense-tracker",
  },
];

export function ProjectsSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.05 });

  return (
    <section
      id="projects"
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
        {/* Section header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Projects</h2>
          <p className="text-muted-foreground">
            A showcase of my recent development work, design projects and creative explorations,
            highlighting my technical skills and problem-solving capabilities.
          </p>
        </motion.div>

        {/* Project cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="group relative overflow-hidden rounded-xl glass-panel transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 * index }}
            >
              {/* Project cover image — zooms on hover */}
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Dark gradient overlay — visible on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Project info — slides up on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <h3 className="text-lg font-semibold text-white mb-2">{project.title}</h3>
                <p className="text-sm text-white/80 mb-4">{project.description}</p>

                {/* Technology tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs font-medium px-2 py-1 rounded-full bg-white/20 text-white"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* External links: live demo & GitHub repo */}
                <div className="flex gap-3">
                  <a
                    href={project.liveUrl}
                    className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-250"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View live ${project.title} project`}
                  >
                    <ExternalLink className="h-4 w-4 text-white" />
                  </a>
                  <a
                    href={project.githubUrl}
                    className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-250"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${project.title} GitHub repository`}
                  >
                    <Github className="h-4 w-4 text-white" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
