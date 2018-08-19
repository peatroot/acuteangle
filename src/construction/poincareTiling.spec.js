import * as math from 'mathjs';
import PoincareTiling from './poincareTiling';

const P = 3;
const Q = 7;

describe('PoincareTiling', () => {
  it('can be constructed', () => {
    const tiling = new PoincareTiling({ p: P, q: Q, depth: 1, radius: 0.5 });
    expect(tiling).toBeTruthy();
  });
  it('creates p depth zero polygons', () => {
    const tiling = new PoincareTiling({ p: P, q: Q, depth: 1, radius: 0.5 });
    const polygons = tiling.initialPolygons();
    expect(polygons.length).toEqual(Q);
  });
  it('creates q points in each depth zero polygon', () => {
    const tiling = new PoincareTiling({ p: P, q: Q, depth: 1, radius: 0.5 });
    const polygons = tiling.initialPolygons();
    polygons.forEach(polygon => expect(polygon.points().length).toEqual(P));
  });
});
