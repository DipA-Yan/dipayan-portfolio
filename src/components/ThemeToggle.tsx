/**
 * ThemeToggle.tsx - Dark/Light Mode Toggle Button
 * 
 * Renders a button that switches between dark and light themes.
 * Uses animated Sun/Moon icons that rotate and scale on theme change.
 * Delays rendering until mounted to prevent hydration mismatch.
 */

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Wait for client-side mount to avoid SSR/hydration mismatches
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative h-10 w-10 rounded-full transition-all duration-300 ease-in-out hover:scale-110"
      aria-label="Toggle theme"
    >
      {/* Sun icon: visible in light mode, rotates out in dark mode */}
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
      {/* Moon icon: hidden in light mode, rotates in for dark mode */}
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
