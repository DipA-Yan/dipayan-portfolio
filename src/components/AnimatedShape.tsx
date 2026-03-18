/**
 * AnimatedShape.tsx - 3D Shape Wrapper
 * 
 * Bridges the ThemeProvider context with the canvas-based ShapeRenderer.
 * Passes the current theme (dark/light) so the shape colors adapt accordingly.
 */

import { useTheme } from "./ThemeProvider";
import { ShapeRenderer } from "./animated-shape/ShapeRenderer";

export function AnimatedShape() {
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";
  
  return <ShapeRenderer isDarkTheme={isDarkTheme} />;
}
