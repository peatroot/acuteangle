import * as math from 'mathjs';
import PoincareIsometry from './poincareIsometry';
import PoincarePolygon from './poincarePolygon';

describe('PoincarePolygon', () => {
  describe('atOrigin', () => {
    it('can create square at origin', () => {
      const poly = PoincarePolygon.atOrigin(4, 1, 0, 0);
      const points = poly.points();
      const edges = poly.edges();
      expect(math.equal(points[0], math.complex(1, 0))).toBeTruthy();
      expect(math.equal(points[1], math.complex(0, 1))).toBeTruthy();
      expect(math.equal(points[2], math.complex(-1, 0))).toBeTruthy();
      expect(math.equal(points[3], math.complex(0, -1))).toBeTruthy();
      expect(edges[0]).toEqual([0, 1]);
      expect(edges[1]).toEqual([1, 2]);
      expect(edges[2]).toEqual([2, 3]);
      expect(edges[3]).toEqual([3, 0]);
      expect(poly._depth).toEqual(0);
      expect(poly._orientation).toEqual(0);
    });

  //   it('can set orientation', () => {
  //     const poly = PoincarePolygon.atOrigin(4, 1, 1, 0);
  //     const points = poly.points();
  //     const edges = poly.edges();
  //     expect(math.equal(points[0], math.complex(0, 1))).toBeTruthy();
  //     expect(math.equal(points[1], math.complex(-1, 0))).toBeTruthy();
  //     expect(math.equal(points[2], math.complex(0, -1))).toBeTruthy();
  //     expect(math.equal(points[3], math.complex(1, 0))).toBeTruthy();
  //     expect(edges[0]).toEqual([1, 2]);
  //     expect(edges[1]).toEqual([2, 3]);
  //     expect(edges[2]).toEqual([3, 0]);
  //     expect(edges[3]).toEqual([0, 1]);
  //     expect(poly._depth).toEqual(0);
  //     expect(poly._orientation).toEqual(1);
  //   });
  })
  
  describe('transform', () => {
    it('can rotate', () => {
      const polyO = PoincarePolygon.atOrigin(4, 1, 0, 0);
      const poly = polyO.transform(PoincareIsometry.rotationAntiClockwiseAboutOrigin(Math.PI / 2));
      const points = poly.points();
      const edges = poly.edges();
      expect(math.equal(points[0], math.complex(0, 1))).toBeTruthy();
      expect(math.equal(points[1], math.complex(-1, 0))).toBeTruthy();
      expect(math.equal(points[2], math.complex(0, -1))).toBeTruthy();
      expect(math.equal(points[3], math.complex(1, 0))).toBeTruthy();
      expect(edges[0]).toEqual([0, 1]);
      expect(edges[1]).toEqual([1, 2]);
      expect(edges[2]).toEqual([2, 3]);
      expect(edges[3]).toEqual([3, 0]);
      expect(poly._depth).toEqual(0);
      expect(poly._orientation).toEqual(0);
    });
  });
});
