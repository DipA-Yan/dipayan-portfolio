/**
 * constants.ts - 3D Icosahedron Shape Data
 * 
 * Defines the geometry (vertices, edges, faces) for the animated
 * 3D icosahedron rendered on the hero section canvas.
 */

/**
 * Creates icosahedron vertices scaled to the given size.
 * Uses the golden ratio (φ) for mathematically precise icosahedron geometry.
 * 
 * @param size - Base scale factor for the shape
 * @returns Array of 12 vertex positions in 3D space
 */
export const createVertices = (size: number) => {
  const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio ≈ 1.618
  
  // 12 vertices of a regular icosahedron (normalized coordinates)
  const vertexCoords = [
    [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
    [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
    [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
  ];
  
  return vertexCoords.map(v => ({ 
    x: v[0] * size * 0.6, 
    y: v[1] * size * 0.6, 
    z: v[2] * size * 0.6 
  }));
};

/** Edge connections — pairs of vertex indices that form wireframe lines */
export const edges = [
  // Middle ring
  [0, 5], [5, 1], [1, 8], [8, 7], [7, 0],
  // Top cap
  [0, 11], [11, 5], [5, 9], [9, 1], [1, 0],
  // Bottom cap
  [2, 3], [3, 4], [4, 10], [10, 6], [6, 2],
  // Vertical connections (top ↔ bottom)
  [0, 2], [1, 3], [5, 4], [7, 6], [8, 3], [9, 4], [11, 10]
];

/** Triangular faces — groups of 3 vertex indices forming filled surfaces */
export const faces = [
  [0, 5, 11], [0, 1, 5], [1, 9, 5], [5, 9, 4],
  [1, 8, 9], [9, 8, 3], [8, 7, 3], [7, 6, 3],
  [7, 0, 6], [0, 2, 6], [0, 11, 2], [11, 10, 2],
  [11, 5, 10], [5, 4, 10], [4, 9, 10], [9, 3, 10],
  [3, 8, 10], [8, 7, 10], [7, 6, 10], [6, 2, 10]
];
