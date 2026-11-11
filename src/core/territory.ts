import { isFiniteRing, signedArea, type Ring } from './geometry';

/** A filled continuous region: one exterior contour with zero or more voids. */
export interface TerritoryPolygon {
  readonly exterior: Ring;
  readonly holes: readonly Ring[];
}

/** Territory can become disconnected after clipping or opponent interactions. */
export type Territory = readonly TerritoryPolygon[];

/**
 * Area for simple, non-self-intersecting contours. Self-intersecting contours
 * need the original game's normalization/union behavior before their area can
 * be considered valid.
 */
export function polygonArea(polygon: TerritoryPolygon): number {
  if (!isFiniteRing(polygon.exterior) || polygon.holes.some((hole) => !isFiniteRing(hole))) {
    return 0;
  }

  const exteriorArea = Math.abs(signedArea(polygon.exterior));
  const holeArea = polygon.holes.reduce((sum, hole) => sum + Math.abs(signedArea(hole)), 0);
  return Math.max(0, exteriorArea - holeArea);
}

export function territoryArea(territory: Territory): number {
  return territory.reduce((sum, polygon) => sum + polygonArea(polygon), 0);
}

/**
 * Converts captured area to a percentage using an explicitly supplied board
 * area. The game's denominator and rounding rule have not yet been verified.
 */
export function areaPercentage(coveredArea: number, totalBoardArea: number): number | null {
  if (!Number.isFinite(coveredArea) || !Number.isFinite(totalBoardArea) || totalBoardArea <= 0) {
    return null;
  }
  return (coveredArea / totalBoardArea) * 100;
}
