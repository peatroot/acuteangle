import * as math from 'mathjs';
import Moebius from './moebius';

// helper class for creating geodesics between points
// in the poincare disk (ie. rendering calculations);
// need circle or line depending the points

class PoincareGeodesic {
  static renderInfo(c1, c2) {
    // debug
    return {
      type: 'line',
      x1: c1.re,
      y1: c1.im,
      x2: c2.re,
      y2: c2.im
    };

    // line case occurs when c1, c2 are on diameter
    // of the unit disk (ie. on line y = kx)
    const isLine = math.equal(
      math.multiply(c1.re, c2.im),
      math.multiply(c1.im, c2.re)
    );

    if (isLine) {
      // line defined by (x1, y1), (x2, y2)
      return {
        type: 'line',
        x1: c1.re,
        y1: c1.im,
        x2: c2.re,
        y2: c2.im
      };
    } else {
      // circle defined by circle passing through
      // c1, c2 which meets unit disk at right angles
      const denom = c1.re * c2.im - c2.re * c1.im;
      const s1 = (math.abs(c1) + 1) / 2;
      const s2 = (math.abs(c2) + 1) / 2;
      const x = (s1 * c2.im - s2 * c1.im) / denom;
      const y = (s2 * c1.re - s1 * c2.re) / denom;
      const c = math.complex(x, y);
      const r = math.abs(c);
      const r1 = math.subtract(c1, c);
      const r2 = math.subtract(c2, c);
      const theta1 = math.arg(r1);
      const theta2 = math.arg(r2);
      return {
        type: 'circle',
        x, y, r,
        startAngle: theta1,
        endAngle: theta2,
        antiClockwise: theta1 < theta2,
        x1: c1.re,
        y1: c1.im,
        x2: c2.re,
        y2: c2.im
      };
    }
  }
}

export default PoincareGeodesic;
