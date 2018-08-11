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
  toMatrix() {
    return math.matrix([
      [this.a, this.b],
      [this.c, this.d]
    ]);
  }
  static fromMatrix(matrix) {
    const a = math.subset(matrix, math.index(0, 0));
    const b = math.subset(matrix, math.index(0, 1));
    const c = math.subset(matrix, math.index(1, 0));
    const d = math.subset(matrix, math.index(1, 1));
    return new Moebius({ a, b, c, d });
  }
  static compose(m1, m2) {
    const prod = math.multiply(m1.toMatrix(), m2.toMatrix());
    return Moebius.fromMatrix(prod);
  }
}

export default Moebius;
