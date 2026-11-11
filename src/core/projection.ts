import type { Point2 } from './geometry';

/** A Unity-style orthographic camera state supplied by the calibrated runtime. */
export interface OrthographicView {
  readonly center: Point2;
  /** Unity orthographicSize is half of the visible world-space height. */
  readonly orthographicSize: number;
  readonly viewportWidth: number;
  readonly viewportHeight: number;
}

function assertProjectionInputs(point: Point2, view: OrthographicView): void {
  if (
    !Number.isFinite(point.x) ||
    !Number.isFinite(point.y) ||
    !Number.isFinite(view.center.x) ||
    !Number.isFinite(view.center.y) ||
    !Number.isFinite(view.orthographicSize) ||
    view.orthographicSize <= 0 ||
    !Number.isFinite(view.viewportWidth) ||
    !Number.isFinite(view.viewportHeight) ||
    view.viewportWidth <= 0 ||
    view.viewportHeight <= 0
  ) {
    throw new RangeError('Orthographic projection requires finite points and positive view dimensions.');
  }
}

export function worldToScreen(point: Point2, view: OrthographicView): Point2 {
  assertProjectionInputs(point, view);
  const halfHeight = view.orthographicSize;
  const aspect = view.viewportWidth / view.viewportHeight;
  const halfWidth = halfHeight * aspect;

  return {
    x: ((point.x - view.center.x + halfWidth) / (2 * halfWidth)) * view.viewportWidth,
    y: ((view.center.y + halfHeight - point.y) / (2 * halfHeight)) * view.viewportHeight,
  };
}

export function screenToWorld(point: Point2, view: OrthographicView): Point2 {
  assertProjectionInputs(point, view);
  const halfHeight = view.orthographicSize;
  const aspect = view.viewportWidth / view.viewportHeight;
  const halfWidth = halfHeight * aspect;

  return {
    x: view.center.x + (point.x / view.viewportWidth) * (2 * halfWidth) - halfWidth,
    y: view.center.y + halfHeight - (point.y / view.viewportHeight) * (2 * halfHeight),
  };
}
