/**
 * Superellipse / Squircle Mathematical Geometry Engine
 * Equation: |x/a|^n + |y/b|^n = 1
 *
 * n = 2  -> Standard Circle / Ellipse
 * n = 4  -> Apple iOS Continuous Squircle (Lamé Curve)
 * n = 5  -> Soft Display Squircle
 */

export function superellipsePoint(t: number, n: number = 4) {
  const cos = Math.cos(t);
  const sin = Math.sin(t);

  const x = Math.sign(cos) * Math.pow(Math.abs(cos), 2 / n);
  const y = Math.sign(sin) * Math.pow(Math.abs(sin), 2 / n);

  return { x, y };
}

/**
 * Generate an SVG path data string for a superellipse
 * @param n Power of the superellipse (default: 4)
 * @param segments Number of discrete points (default: 360)
 * @param normalized If true, bounds are [0, 1] (for clipPathUnits="objectBoundingBox"); if false, [-1, 1]
 */
export function generateSuperellipsePath(n: number = 4, segments: number = 360, normalized: boolean = false): string {
  let path = '';

  for (let i = 0; i <= segments; i++) {
    const t = (Math.PI * 2 * i) / segments;
    const { x, y } = superellipsePoint(t, n);

    const px = normalized ? (x + 1) / 2 : x;
    const py = normalized ? (y + 1) / 2 : y;

    const pxFixed = Number(px.toFixed(5));
    const pyFixed = Number(py.toFixed(5));

    if (i === 0) {
      path += `M ${pxFixed} ${pyFixed}`;
    } else {
      path += ` L ${pxFixed} ${pyFixed}`;
    }
  }

  path += ' Z';
  return path;
}

/**
 * Precomputed high-resolution normalized superellipse path (n = 4, 180 points)
 * Perfect for zero-runtime SVG clip-paths in clipPathUnits="objectBoundingBox"
 */
export const SQUIRCLE_CLIP_PATH_N4 = generateSuperellipsePath(4, 180, true);

/**
 * Precomputed normalized superellipse path (n = 5, 180 points)
 * Extra smooth continuous curvature
 */
export const SQUIRCLE_CLIP_PATH_N5 = generateSuperellipsePath(5, 180, true);

/**
 * Centered superellipse path in [-1, 1] for viewBox="-1.1 -1.1 2.2 2.2"
 */
export const SQUIRCLE_RAW_PATH_N4 = generateSuperellipsePath(4, 360, false);
