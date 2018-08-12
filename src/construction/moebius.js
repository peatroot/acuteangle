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
  inverse() {
    return new Moebius({
      a: this.d,
      b: math.unaryMinus(this.b),
      c: math.unaryMinus(this.c),
      d: this.a
    });
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
  static compose(...ms) {
    const mats = ms.map(m => m.toMatrix());
    const prod = mats.reduce((acc, mat) => {
      return math.multiply(acc, mat);
    }, math.matrix([[1, 0], [0, 1]]));
    return Moebius.fromMatrix(prod);
  }
  static identity() {
    return new Moebius({a: 1, b: 0, c: 0, d: 1});
  }
  static equal(m1, m2) {
    return (
      math.equal(m1.a, m2.a) &&
      math.equal(m1.b, m2.b) &&
      math.equal(m1.c, m2.c) &&
      math.equal(m1.d, m2.d)
    );
  }
}

export default Moebius;
