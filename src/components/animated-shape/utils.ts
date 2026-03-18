/**
 * utils.ts - 3D Math Utilities for Shape Rendering
 * 
 * Provides projection and rotation functions used by the
 * canvas-based 3D icosahedron animation.
 */

/**
 * Projects a 3D point onto a 2D plane using perspective projection.
 * Objects farther from the camera appear smaller.
 * 
 * @param point - 3D coordinates { x, y, z }
 * @param center - 2D screen center point for the projection
 * @param perspective - Camera distance (higher = less distortion)
 * @returns Projected 2D coordinates with depth info for sorting
 */
export const project = (
  point: { x: number; y: number; z: number },
  center: { x: number; y: number },
  perspective = 300
) => {
  const distance = perspective / (perspective + point.z);
  
  return {
    x: center.x + point.x * distance,
    y: center.y + point.y * distance,
    z: point.z,        // Preserved for depth sorting (painter's algorithm)
    distance: distance  // Scale factor — useful for size-based effects
  };
};

/**
 * Rotates a 3D point around all three axes (X, Y, Z) and applies a scale.
 * Uses standard rotation matrix math applied sequentially.
 * 
 * @param point - Original 3D coordinates
 * @param rotationX - Rotation angle around X-axis (radians)
 * @param rotationY - Rotation angle around Y-axis (radians)
 * @param rotationZ - Rotation angle around Z-axis (radians)
 * @param pulseScale - Scale multiplier for breathing/pulse animation
 * @returns Transformed 3D coordinates
 */
export const rotate = (
  point: { x: number; y: number; z: number },
  rotationX: number,
  rotationY: number,
  rotationZ: number,
  pulseScale: number
) => {
  // X-axis rotation
  const cosX = Math.cos(rotationX);
  const sinX = Math.sin(rotationX);
  const y1 = point.y * cosX - point.z * sinX;
  const z1 = point.z * cosX + point.y * sinX;
  
  // Y-axis rotation
  const cosY = Math.cos(rotationY);
  const sinY = Math.sin(rotationY);
  const x2 = point.x * cosY + z1 * sinY;
  const z2 = z1 * cosY - point.x * sinY;
  
  // Z-axis rotation
  const cosZ = Math.cos(rotationZ);
  const sinZ = Math.sin(rotationZ);
  const x3 = x2 * cosZ - y1 * sinZ;
  const y3 = y1 * cosZ + x2 * sinZ;
  
  // Apply pulse scale to all axes
  return { 
    x: x3 * pulseScale, 
    y: y3 * pulseScale, 
    z: z2 * pulseScale 
  };
};
