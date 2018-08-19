import * as math from 'mathjs';
import Moebius from './moebius';

describe('Moebius', () => {
  it('can be constructed', () => {
    const m = new Moebius({ a: 1, b: 0, c: 0, d: 0 });
    expect(m).toBeTruthy();
  });

  it('can be the identity', () => {
    const m = new Moebius({ a: 1, b: 0, c: 0, d: 1 });
    const c = math.complex(1, 1);
    expect(m.multiply(c)).toEqual(c);
  });

  it('can be the reciprocal (real)', () => {
    const m = new Moebius({ a: 0, b: 1, c: 1, d: 0 });
    const c1 = math.complex(2, 0);
    const c2 = math.complex(0.5, 0);
    expect(math.equal(m.multiply(c1), c2)).toBeTruthy();
  });

  it('can be the reciprocal (imaginary)', () => {
    const m = new Moebius({ a: 0, b: 1, c: 1, d: 0 });
    const c1 = math.complex(0, 1);
    const c2 = math.complex(0, -1);
    expect(math.equal(m.multiply(c1), c2)).toBeTruthy();
  });

  it('can compose two moebii', () => {
    const mat1 = math.matrix([[2, 0], [-1, 3]]);
    const mat2 = math.matrix([[7, 2], [-2, 3]]);
    const prod = math.multiply(mat1, mat2);
    expect(
      Moebius.compose(
        Moebius.fromMatrix(mat1),
        Moebius.fromMatrix(mat2)
      )
    ).toEqual(Moebius.fromMatrix(prod));
  });
});
