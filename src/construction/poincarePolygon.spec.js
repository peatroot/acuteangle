import * as math from 'mathjs';
import PoincareIsometry from './poincareIsometry';
import PoincarePolygon from './poincarePolygon';

const P = 4;
const Q = 7;

describe('PoincarePolygon', () => {
  describe('atOrigin', () => {
    it('returns a new polygon', () => {
      const poly = PoincarePolygon.atOrigin(P, Q, 0, 0);
      expect(poly).toBeDefined();
    });

    it('gives correct number of points', () => {
      const poly = PoincarePolygon.atOrigin(P, Q, 0, 0);
      const points = poly.points();
      const edges = poly.edges();
      expect(points.length).toEqual(P);
      expect(edges.length).toEqual(P);
    });
  });
});
