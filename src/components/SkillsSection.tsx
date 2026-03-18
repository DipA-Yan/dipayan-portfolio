/**
 * SkillsSection.tsx - Technical Skills Showcase
 *
 * Displays skill categories in a responsive grid.
 * Each card includes an icon, description, and technology tags.
 * Cards animate in with staggered delays on scroll.
 */

import { Code, Database, Server, FileCode, Container } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

/** Skill category data — add/remove items to update the grid */
const skills = [
  {
    icon: FileCode,
    title: "Languages",
    description:
      "Proficient in multiple programming languages for diverse software solutions.",
    items: ["C++", "JavaScript"],
  },
  {
    icon: Code,
    title: "Frontend Development",
    description:
      "Creating responsive, accessible web interfaces with modern frameworks and libraries.",
    items: ["Tailwind CSS", "React", "Next.js", "TypeScript"],
  },
  {
    icon: Server,
    title: "Backend Development",
    description:
      "Building robust server-side applications and APIs for seamless data flow.",
    items: ["Node.js", "Express"],
  },
  {
    icon: Database,
    title: "Database Management",
    description:
      "Designing and optimizing database structures for efficient data operations.",
    items: ["MongoDB", "Supabase"],
  },
  {
    icon: Container,
    title: "DevOps",
    description:
      "Automating deployments, managing containers and building CI/CD pipelines.",
    items: ["Docker", "Kubernetes", "GitHub Actions"],
  },
];

export function SkillsSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  return (
    <section
      id="skills"
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
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            My Skills
          </h2>
          <p className="text-muted-foreground">
            A strong technical skill set developed through dedicated learning,
            experimentation and applying concepts in real-world scenarios.
          </p>
        </motion.div>

        {/* Skills grid — each card staggers in with increasing delay */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="glass-panel p-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: 0.2 + index * 0.1,
              }}
            >
              {/* Skill icon */}
              <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 mb-4">
                <skill.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{skill.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">
                {skill.description}
              </p>

              {/* Technology tags */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {skill.items.map((item, i) => (
                  <span
                    key={i}
                    className="text-xs font-medium px-2.5 py-1 rounded-full bg-secondary dark:bg-secondary/30"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
