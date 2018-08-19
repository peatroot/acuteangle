import each from 'jest-each';
import PoincareTiling from './poincareTiling';

describe('PoincareTiling', () => {
  // parametric
  each([
    { p: 3, q: 7 },
    { p: 4, q: 5 },
    { p: 4, q: 6 },
    { p: 5, q: 4 },
    { p: 5, q: 5 },
    { p: 5, q: 6 },
    { p: 6, q: 4 },
    { p: 7, q: 3 },
  ]).describe('polygons', ({ p, q }) => {
    it('can be constructed', () => {
      const tiling = new PoincareTiling({ p, q, depth: 0 });
      expect(tiling).toBeTruthy();
    });
    it('creates total=1 polygons when depth=0', () => {
      const tiling = new PoincareTiling({ p, q, depth: 0 });
      const polygons = tiling.polygons();
      expect(polygons.length).toEqual(1);
    });
    it('creates total=(p * (q - 2)) neighbours of origin', () => {
      const tiling = new PoincareTiling({ p, q, depth: 1 });
      const polygons = tiling.polygons();
      expect(polygons.length).toEqual(p * (q - 2) + 1);
    });
  });

  describe('p=5, q=4', () => {
    const P = 5;
    const Q = 4;

    // origin polygon
    it('creates total=1 polygon when depth=0', () => {
      const tiling = new PoincareTiling({ p: P, q: Q, depth: 0 });
      const polygons = tiling.polygons();
      expect(polygons.length).toEqual(1);
    });

    // origin polygon(1) + first corona(10)
    it('creates total=11 polygon when depth=1', () => {
      const tiling = new PoincareTiling({ p: P, q: Q, depth: 1 });
      const polygons = tiling.polygons();
      expect(polygons.length).toEqual(11);
    });

    // origin polygon(1) + first corona(10) + second corona(40)
    it('creates total=51 polygon when depth=2', () => {
      const tiling = new PoincareTiling({ p: P, q: Q, depth: 2 });
      const polygons = tiling.polygons();
      expect(polygons.length).toEqual(51);
    });
  });

  describe('p=3, q=7', () => {
    const P = 3;
    const Q = 7;

    // origin polygon
    it('creates total=1 polygon when depth=0', () => {
      const tiling = new PoincareTiling({ p: P, q: Q, depth: 0 });
      const polygons = tiling.polygons();
      expect(polygons.length).toEqual(1);
    });

    // origin polygon(1) + first corona(15)
    it('creates total=16 polygon when depth=1', () => {
      const tiling = new PoincareTiling({ p: P, q: Q, depth: 1 });
      const polygons = tiling.polygons();
      expect(polygons.length).toEqual(16);
    });

    // origin polygon(1) + first corona(15) + second corona(45)
    it('creates total=61 polygon when depth=2', () => {
      const tiling = new PoincareTiling({ p: P, q: Q, depth: 2 });
      const polygons = tiling.polygons();
      expect(polygons.length).toEqual(61);
    });
  });

  describe('p=7, q=3', () => {
    const P = 7;
    const Q = 3;

    // origin polygon
    it('creates total=1 polygon when depth=0', () => {
      const tiling = new PoincareTiling({ p: P, q: Q, depth: 0 });
      const polygons = tiling.polygons();
      expect(polygons.length).toEqual(1);
    });

    // origin polygon(1) + first corona(7)
    it('creates total=8 polygon when depth=1', () => {
      const tiling = new PoincareTiling({ p: P, q: Q, depth: 1 });
      const polygons = tiling.polygons();
      expect(polygons.length).toEqual(8);
    });

    // origin polygon(1) + first corona(7) + second corona(21)
    it('creates total=29 polygon when depth=2', () => {
      const tiling = new PoincareTiling({ p: P, q: Q, depth: 2 });
      const polygons = tiling.polygons();
      expect(polygons.length).toEqual(29);
    });
  });
});
