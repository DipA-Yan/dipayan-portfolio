/**
 * ShapeRenderer.tsx - Canvas-based 3D Icosahedron Animation
 * 
 * Renders a rotating, pulsing 3D wireframe icosahedron on a <canvas>.
 * Uses requestAnimationFrame for smooth 60fps animation.
 * 
 * Rendering pipeline:
 * 1. Rotate all vertices around X, Y, Z axes
 * 2. Project 3D points to 2D using perspective projection
 * 3. Sort faces by depth (painter's algorithm) for correct overlap
 * 4. Draw filled faces → wireframe edges → vertex dots
 * 
 * Adapts colors based on light/dark theme.
 */

import { useEffect, useRef } from "react";
import { project, rotate } from "./utils";
import { createVertices, edges, faces } from "./constants";

interface ShapeRendererProps {
  isDarkTheme: boolean;
}

export function ShapeRenderer({ isDarkTheme }: ShapeRendererProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    /** Scale canvas for high-DPI (Retina) displays */
    const setCanvasDimensions = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    
    setCanvasDimensions();
    window.addEventListener("resize", setCanvasDimensions);
    
    // Shape geometry
    const size = 100;
    const center = { x: canvas.offsetWidth / 2, y: canvas.offsetHeight / 2 };
    const points = createVertices(size);
    
    // Animation state
    let rotationX = 0;
    let rotationY = 0;
    let rotationZ = 0;
    let pulseScale = 1;
    let pulseDirection = 0.001;
    
    /** Main render loop */
    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      
      // Theme-aware color palettes
      const edgeColors = isDarkTheme
        ? ['rgba(147, 51, 234, 0.8)', 'rgba(79, 70, 229, 0.8)']
        : ['rgba(79, 70, 229, 0.7)', 'rgba(147, 51, 234, 0.7)'];
      
      const fillColors = isDarkTheme
        ? ['rgba(124, 58, 237, 0.2)', 'rgba(79, 70, 229, 0.1)']
        : ['rgba(139, 92, 246, 0.15)', 'rgba(79, 70, 229, 0.1)'];
      
      // Breathing pulse effect (scale oscillates between 0.95 and 1.05)
      pulseScale += pulseDirection;
      if (pulseScale > 1.05) pulseDirection = -0.0005;
      else if (pulseScale < 0.95) pulseDirection = 0.0005;
      
      // Slowly increment rotation angles each frame
      rotationX += 0.001;
      rotationY += 0.002;
      rotationZ += 0.0005;
      
      // Transform all vertices: rotate → project to 2D
      const projectedPoints = points.map(point => {
        const rotated = rotate(point, rotationX, rotationY, rotationZ, pulseScale);
        return project(rotated, center);
      });
      
      // Sort faces back-to-front for correct rendering (painter's algorithm)
      const sortedFaces = [...faces].map(face => {
        const avgZ = face.reduce((sum, idx) => sum + projectedPoints[idx].z, 0) / face.length;
        return { face, avgZ };
      }).sort((a, b) => a.avgZ - b.avgZ);
      
      // --- Draw faces (semi-transparent fill) ---
      sortedFaces.forEach(({ face }) => {
        const gradient = ctx.createLinearGradient(
          projectedPoints[face[0]].x, 
          projectedPoints[face[0]].y,
          projectedPoints[face[2]].x,
          projectedPoints[face[2]].y
        );
        gradient.addColorStop(0, fillColors[0]);
        gradient.addColorStop(1, fillColors[1]);
        
        ctx.beginPath();
        ctx.moveTo(projectedPoints[face[0]].x, projectedPoints[face[0]].y);
        for (let i = 1; i < face.length; i++) {
          ctx.lineTo(projectedPoints[face[i]].x, projectedPoints[face[i]].y);
        }
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();
      });
      
      // --- Draw edges (wireframe lines) ---
      edges.forEach(edge => {
        const gradient = ctx.createLinearGradient(
          projectedPoints[edge[0]].x, 
          projectedPoints[edge[0]].y,
          projectedPoints[edge[1]].x,
          projectedPoints[edge[1]].y
        );
        gradient.addColorStop(0, edgeColors[0]);
        gradient.addColorStop(1, edgeColors[1]);
        
        ctx.beginPath();
        ctx.moveTo(projectedPoints[edge[0]].x, projectedPoints[edge[0]].y);
        ctx.lineTo(projectedPoints[edge[1]].x, projectedPoints[edge[1]].y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.lineCap = "round";
        ctx.stroke();
      });
      
      // --- Draw vertex dots (size varies by depth) ---
      projectedPoints.forEach((point) => {
        const distanceFactor = (point.distance - 0.5) * 2;
        const dotSize = Math.max(0, 2 * (1 - Math.abs(distanceFactor)));
        
        ctx.beginPath();
        ctx.arc(point.x, point.y, dotSize, 0, Math.PI * 2);
        ctx.fillStyle = isDarkTheme ? "rgba(255, 255, 255, 0.8)" : "rgba(79, 70, 229, 0.8)";
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
    };
  }, [isDarkTheme]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full absolute inset-0 -z-10"
      aria-hidden="true"
    />
  );
}
