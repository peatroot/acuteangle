import * as math from 'mathjs';
import Moebius from './moebius';
import PoincareIsometry from './poincareIsometry';
import PoincarePolygon from './poincarePolygon';

// constructs polygonal tiling of poincare disk such that:
// * each polygon has `p` boundary points
// * each boundary point has `q` polygons meeting
// * `depth` polygons away from origin
// * coordinates are expressed in complex numbers in the unit disk

class PoincareTiling {
  constructor({ p, q, depth, radius }) {
    this.p = p;
    this.q = q;
    this.depth = depth;
    this.radius = radius;
    this.pIndices = Array.from(Array(p).keys());
    this.qIndices = Array.from(Array(q).keys());
  }
  initialPolygons() {
    const p = this.p;
    const q = this.q;
    const radius = this.radius;
    const qIndices = this.qIndices;
    const qAngle = math.divide(2 * Math.PI, q);
    const polygons = qIndices.map(i => {
      const polygon = PoincarePolygon.atOrigin(p, q, i, 0);
      const moebius = Moebius.compose(
        PoincareIsometry.rotationAntiClockwiseAboutOrigin(qAngle * i),
        PoincareIsometry.translation(polygon._points[0]),
      );
      return polygon.transform(moebius);
    });
    return polygons
  }
}

export default PoincareTiling;
