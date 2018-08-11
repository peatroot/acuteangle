import * as math from 'mathjs';

// helper class for performing moebius transformations
// with complex numbers from mathjs

class Moebius {
  constructor({ a, b, c, d }) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
  }
  multiply(v) {
    const numerator = math.add(
      math.multiply(this.a, v),
      this.b
    );
    const denominator = math.add(
      math.multiply(this.c, v),
      this.d
    );
    const m = math.divide(numerator, denominator);
    return m;
  }
}

export default Moebius;
