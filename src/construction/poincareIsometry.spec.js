import * as math from 'mathjs';
import Moebius from './moebius';
import PoincareIsometry from './poincareIsometry';

const ORIGIN = math.complex(0, 0);
const C1 = math.complex(1, 1);
const C2 = math.complex(-3, 4);
const THETA = Math.PI / 2;
const PSI = Math.PI / 4;

describe('PoincareIsometry', () => {
  it('can reflect in the real axis', () => {
    const c2 = PoincareIsometry.reflectInRealAxis(C1);
    expect(math.equal(math.conj(C1), c2)).toBeTruthy();
  });

  it('can translate to origin', () => {
    const c2 = PoincareIsometry.translate(C1, C1);
    expect(c2).toEqual(ORIGIN);
  });

  it('can translate origin to a point', () => {
    const c2 = PoincareIsometry.translate(ORIGIN, C1);
    expect(c2).toEqual(C1);
  });

  it('can rotate pi / 2 anticlockwise', () => {
    const polar = C1.toPolar();
    const c2 = PoincareIsometry.rotateAntiClockwiseAboutOrigin(C1, THETA);
    expect(math.equal(
      c2,
      math.type.Complex.fromPolar(polar.r, polar.phi + THETA)
    )).toBeTruthy();
  });

  it('can compose rotations', () => {
    const r1 = PoincareIsometry.rotationAntiClockwiseAboutOrigin(THETA);
    const r2 = PoincareIsometry.rotationAntiClockwiseAboutOrigin(PSI);
    const m = Moebius.compose(r1, r2);
    const c2 = PoincareIsometry.rotateAntiClockwiseAboutOrigin(C1, THETA + PSI);
    expect(math.equal(c2, m.multiply(C1))).toBeTruthy();
  });

  it('can compose translations', () => {
    const t1 = PoincareIsometry.translation(C1);
    const t2 = PoincareIsometry.translation(C2);
    const m = Moebius.compose(t1, t2);
    const c3 = m.multiply(C1);
    expect(math.equal(C2, c3)).toBeTruthy();
  });
});
