/**
 * Bubbles.tsx - Floating Particle Background Effect
 * 
 * Renders semi-transparent floating circles that drift upward.
 * Used as a global decorative layer behind all page sections.
 * 
 * - Creates 15 bubbles with randomized size, position, speed, and opacity
 * - Animates upward movement via setInterval (resets to bottom when off-screen)
 * - Adapts colors for light/dark theme
 */

import React, { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";

/** Shape of a single bubble particle */
type Bubble = {
  id: number;
  size: number;    // Diameter in pixels (20–80)
  x: number;       // Horizontal position as percentage (0–100)
  y: number;       // Vertical position as percentage (starts 100–200, drifts upward)
  speed: number;   // Movement speed per frame (0.2–0.6)
  opacity: number; // Visual opacity (0.1–0.3)
};

export function Bubbles() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    // Generate initial bubble particles with random properties
    const initialBubbles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      size: Math.random() * 60 + 20,
      x: Math.random() * 100,
      y: Math.random() * 100 + 100,
      speed: Math.random() * 0.4 + 0.2,
      opacity: Math.random() * 0.2 + 0.1,
    }));
    
    setBubbles(initialBubbles);

    // Animate bubbles upward; reset to bottom when they exit the top
    const interval = setInterval(() => {
      setBubbles(prevBubbles => 
        prevBubbles.map(bubble => ({
          ...bubble,
          y: bubble.y <= -bubble.size ? 100 + bubble.size : bubble.y - bubble.speed,
        }))
      );
    }, 40); // ~25fps animation

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute rounded-full"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            opacity: bubble.opacity,
            // Radial gradient for a glassy sphere look
            background: isDark 
              ? `radial-gradient(circle at 30% 30%, rgba(147, 51, 234, 0.3), rgba(79, 70, 229, 0.2))` 
              : `radial-gradient(circle at 30% 30%, rgba(139, 92, 246, 0.25), rgba(124, 58, 237, 0.15))`,
            boxShadow: isDark 
              ? '0 4px 12px rgba(147, 51, 234, 0.15), inset 0 0 8px rgba(255, 255, 255, 0.05)' 
              : '0 4px 12px rgba(139, 92, 246, 0.1), inset 0 0 8px rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(2px)',
            border: isDark 
              ? '1px solid rgba(255, 255, 255, 0.1)' 
              : '1px solid rgba(255, 255, 255, 0.3)',
            transition: 'background 0.5s ease, box-shadow 0.5s ease, border 0.5s ease',
          }}
        />
      ))}
    </div>
  );
}
