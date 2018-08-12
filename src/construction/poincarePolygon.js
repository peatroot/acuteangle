import * as math from 'mathjs';
import PoincareIsometry from './poincareIsometry';

const rotateArray = (array, n) => {
  return array.slice(n, array.length).concat(array.slice(0, n));
};

class PoincarePolygon {
  constructor({ points, edges, orientation, depth }) {
    this._points = points;
    this._edges = edges;
    this._orientation = orientation;
    this._depth = depth;
  }
  points() {
    return this._points;
    // return rotateArray(this._points, this._orientation);
  }
  edges() {
    return this._edges;
    // return rotateArray(this._edges, this._orientation);
  }
  transform(m) {
    const points = this._points.map(c => m.multiply(c));
    return new PoincarePolygon({
      points,
      edges: this._edges,
      orientation: this._orientation,
      depth: this._depth
    });
  }

  static atOrigin(p, q, orientation, depth) {
    // calculate half angles
    const thetaP = Math.PI / p;
    const thetaQ = Math.PI / q;
    const right = Math.PI / 2;

    // calculate distance from origin to polygon vertices
    const sinP = Math.sin(thetaP);
    const sinQ = Math.sin(thetaQ);
    const d = Math.sin(right - thetaP - thetaQ) / Math.sqrt(1 - sinP * sinP - sinQ * sinQ);

    // calculate points coordinates
    const ps = Array.from(Array(p).keys());
    const points = ps.map(i => math.type.Complex.fromPolar(d, 2 * i * thetaP));

    // calculate edges
    const edges = [];
    ps.forEach(i => {
      const iPlus1 = (i === p - 1) ? 0 : i + 1;
      const edge = [i, iPlus1];
      edges.push(edge);
    });
    return new PoincarePolygon({ points, edges, orientation, depth });
  }
}

export default PoincarePolygon;
