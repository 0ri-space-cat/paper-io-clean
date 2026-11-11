/**
 * Geometry primitives for the continuous territory model used by the Unity
 * build. Coordinates are Unity-world coordinates; this module intentionally
 * does not choose a board size, player speed, or collision tolerance.
 */

export interface Point2 {
  readonly x: number;
  readonly y: number;
}

export type Ring = readonly Point2[];

export function distanceSquared(a: Point2, b: Point2): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return dx * dx + dy * dy;
}

export function signedArea(ring: Ring): number {
  if (ring.length < 3) return 0;

  let twiceArea = 0;
  for (let i = 0; i < ring.length; i += 1) {
    const current = ring[i];
    const next = ring[(i + 1) % ring.length];
    twiceArea += current.x * next.y - next.x * current.y;
  }
  return twiceArea / 2;
}

export function isFiniteRing(ring: Ring): boolean {
  return ring.length >= 3 && ring.every(({ x, y }) => Number.isFinite(x) && Number.isFinite(y));
}

/** Orientation of the ordered points (a, b, c). */
function cross(a: Point2, b: Point2, c: Point2): number {
  return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
}

function onSegment(a: Point2, b: Point2, p: Point2, epsilon: number): boolean {
  return (
    Math.abs(cross(a, b, p)) <= epsilon &&
    p.x >= Math.min(a.x, b.x) - epsilon &&
    p.x <= Math.max(a.x, b.x) + epsilon &&
    p.y >= Math.min(a.y, b.y) - epsilon &&
    p.y <= Math.max(a.y, b.y) + epsilon
  );
}

/**
 * Tests intersection between two closed segments. `epsilon` is supplied by
 * the caller because the original game's collision tolerance is not yet known.
 */
export function segmentsIntersect(
  a: Point2,
  b: Point2,
  c: Point2,
  d: Point2,
  epsilon = 0,
): boolean {
  const abC = cross(a, b, c);
  const abD = cross(a, b, d);
  const cdA = cross(c, d, a);
  const cdB = cross(c, d, b);

  if (
    ((abC > epsilon && abD < -epsilon) || (abC < -epsilon && abD > epsilon)) &&
    ((cdA > epsilon && cdB < -epsilon) || (cdA < -epsilon && cdB > epsilon))
  ) {
    return true;
  }

  return (
    (Math.abs(abC) <= epsilon && onSegment(a, b, c, epsilon)) ||
    (Math.abs(abD) <= epsilon && onSegment(a, b, d, epsilon)) ||
    (Math.abs(cdA) <= epsilon && onSegment(c, d, a, epsilon)) ||
    (Math.abs(cdB) <= epsilon && onSegment(c, d, b, epsilon))
  );
}

/**
 * Returns whether a point lies inside a simple ring. Boundary behavior is
 * explicit so callers can select the game's eventual edge convention.
 */
export function containsPoint(
  ring: Ring,
  point: Point2,
  boundary: 'inside' | 'outside' = 'inside',
  epsilon = 0,
): boolean {
  if (!isFiniteRing(ring) || !Number.isFinite(point.x) || !Number.isFinite(point.y)) return false;

  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i, i += 1) {
    const a = ring[j];
    const b = ring[i];
    if (onSegment(a, b, point, epsilon)) return boundary === 'inside';

    const crossesRay = (a.y > point.y) !== (b.y > point.y);
    if (crossesRay) {
      const intersectionX = ((b.x - a.x) * (point.y - a.y)) / (b.y - a.y) + a.x;
      if (point.x < intersectionX) inside = !inside;
    }
  }
  return inside;
}

export function hasSelfIntersection(ring: Ring, epsilon = 0): boolean {
  if (ring.length < 4) return false;

  const edgeCount = ring.length;
  for (let i = 0; i < edgeCount; i += 1) {
    const a = ring[i];
    const b = ring[(i + 1) % edgeCount];
    for (let j = i + 1; j < edgeCount; j += 1) {
      // Consecutive edges and the first/last pair share an allowed endpoint.
      if (j === i || j === i + 1 || (i === 0 && j === edgeCount - 1)) continue;
      const c = ring[j];
      const d = ring[(j + 1) % edgeCount];
      if (segmentsIntersect(a, b, c, d, epsilon)) return true;
    }
  }
  return false;
}

