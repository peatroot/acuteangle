import * as math from 'mathjs';
import Moebius from './moebius';

// helper class for creating moebius transformations
// which are isometries of the poincare disk
// (ie. they fix the unit circle)
// see http://homepages.gac.edu/~hvidsten/geom-text/web-chapters/hyper-transf.pdf

// note: reflectInRealAxis cannot be expressed as
//       a moebius transformation

class PoincareIsometry {
  // moebius transformations (can be composed)
  static general({ alpha, beta }) {
    return new Moebius({
      a: beta,
      b: math.unaryMinus(math.multiply(alpha, beta)),
      c: math.conj(alpha),
      d: -1
    });
  }
  static rotationAntiClockwiseAboutOrigin(theta) {
    return PoincareIsometry.general({
      alpha: 0,
      beta: math.type.Complex.fromPolar(1, theta - Math.PI)
    });
  }
  static translation(w) {
    return PoincareIsometry.general({
      alpha: w,
      beta: 1
    });
  }

  // actions (on complex numbers)
  static reflectInRealAxis(z) {
    return math.conj(z);
  }
  static rotateAntiClockwiseAboutOrigin(z, theta) {
    const m = PoincareIsometry.rotationAntiClockwiseAboutOrigin(theta);
    return m.multiply(z);
  }
  static translate(z, w) {
    const m = PoincareIsometry.translation(w);
    return m.multiply(z);
  }
}

export default PoincareIsometry;
