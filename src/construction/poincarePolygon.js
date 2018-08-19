import * as math from 'mathjs';

class PoincarePolygon {
  constructor({ centre, points, edges, midpoints, orientation, depth }) {
    this._centre = centre;
    this._points = points;
    this._edges = edges;
    this._midpoints = midpoints;
    this._orientation = orientation;
    this._depth = depth;
  }
  points() {
    return this._points;
  }
  edges() {
    return this._edges;
  }
  transform(m) {
    const points = this._points.map(c => m.multiply(c));
    const midpoints = this._midpoints.map(c => m.multiply(c));
    const centre = m.multiply(this._centre);
    return new PoincarePolygon({
      centre,
      points,
      edges: this._edges,
      midpoints,
      orientation: this._orientation,
      depth: this._depth,
    });
  }
  static radius({ p, q }) {
    // calculate half angles
    const thetaP = Math.PI / p;
    const thetaQ = Math.PI / q;
    const right = Math.PI / 2;

    // calculate distance from origin to polygon vertices
    const sinP = Math.sin(thetaP);
    const sinQ = Math.sin(thetaQ);
    const d =
      Math.sin(right - thetaP - thetaQ) /
      Math.sqrt(1 - sinP * sinP - sinQ * sinQ);

    return d;
  }
  static atOrigin(p, q, orientation, depth) {
    // calculate half angle
    const thetaP = Math.PI / p;
    const thetaQ = Math.PI / q;

    // calculate radius
    const d = PoincarePolygon.radius({ p, q });

    // calculate radius of midpoint
    const mH = Math.acosh(Math.cos(thetaQ) / Math.sin(thetaP));
    const m = Math.tanh(mH / 2);

    // calculate points coordinates
    const ps = Array.from(Array(p).keys());
    const points = ps.map(i => math.type.Complex.fromPolar(d, 2 * i * thetaP));
    const midpoints = ps.map(i =>
      math.type.Complex.fromPolar(m, (2 * i + 1) * thetaP)
    );

    // calculate edges
    const edges = [];
    ps.forEach(i => {
      const iPlus1 = i === p - 1 ? 0 : i + 1;
      const edge = [i, iPlus1];
      edges.push(edge);
    });

    // centre
    const centre = math.complex(0, 0);

    return new PoincarePolygon({
      centre,
      points,
      edges,
      midpoints,
      orientation,
      depth,
    });
  }
}

export default PoincarePolygon;
