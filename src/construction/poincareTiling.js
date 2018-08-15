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
  polygons() {
    // calculate polygon centred at origin
    const originPolygon = PoincarePolygon.atOrigin(this.p, this.q, 0, 0);

    // calculate transformations
    const transformations = this.transformations(originPolygon);

    // apply transformations to fundamental polygon
    const polygons = transformations.map(transformation => {
      return originPolygon.transform(transformation);
    });

    return polygons;
  }
  transformations(originPolygon) {
    // identity transformation
    const I = Moebius.identity();
    I.p = 0;
    I.q = 0;

    // neighbour transformations
    const Ns = this.rootNeighbours();

    // calculate depth levels of transformations
    let Ts = [I];
    let Cs = [I];
    for (let i = 0; i < this.depth; i++) {
      const iteration = this.iterate(Ts, Cs, Ns)
      Ts = iteration.allTransformations;
      Cs = iteration.coronaTransformations;
      console.log('(total, corona)', Ts.length, Cs.length)
    }

    return Ts;
  }
  compose(C, N) {
    // create a new transformation by composing two others
    // C in the corona, N in the root neighbours
    const M = Moebius.compose(C, N);
    M.p = C.p + N.p % this.p;
    M.q = C.q + N.q % this.q;
    return M;
  }
  rootTranslation() {
    // calculate the translation that maps the point (d, 0)
    // to (0, 0), where d is originPolygon's radius
    const d = PoincarePolygon.radius({ p: this.p, q: this.q });
    const c = math.complex(d, 0);
    return PoincareIsometry.translation(c);
  }
  rootRotationsP() {
    // calculate the rotations about the origin by 2 * PI / p
    const theta = 2 * Math.PI / this.p;
    return this.pIndices.map(i => {
      const rotation = PoincareIsometry.rotationAntiClockwiseAboutOrigin(theta * i);
      rotation.p = i;
      return rotation;
    });
  }
  rootRotationsQ() {
    // calculate the rotations about the origin by 2 * PI / q
    const theta = 2 * Math.PI / this.q;
    return this.qIndices.map(i => {
      const rotation = PoincareIsometry.rotationAntiClockwiseAboutOrigin(theta * i);
      rotation.q = i;
      return rotation;
    });
  }
  rootNeighbours() {
    // calculate the transformations mapping one polygon to its
    // neighbours; there are p * q of them
    const T = this.rootTranslation();
    const Ps = this.rootRotationsP();
    const Qs = this.rootRotationsQ();
    const Ns = [];
    Ps.forEach(P => {
      Qs.forEach(Q => {
        const N = Moebius.compose(
          P,
          T.inverse(),
          Q,
          T,
          
        );
        N.p = P.p;
        N.q = Q.q;
        Ns.push(N)
      });
    });
    return Ns;
  }
  iterate(Ts, Cs, Ns) {
    // calculate transformations by composing
    // * a member of Cs
    // * a member of Ns
    // and do not repeat if in Ts
    const C1s = [];
    const T1s = [...Ts];
    Cs.forEach(C => {
      Ns.forEach(N => {
        const C1 = this.compose(C, N);
        // conditionally add the transformation
        const alreadyExistsInT1s = T1s.find(T => Moebius.equal(T, C1));
        const alreadyExistsInC1s = C1s.find(T => Moebius.equal(T, C1));
        if (!alreadyExistsInT1s && !alreadyExistsInC1s) {
          C1s.push(C1);
          T1s.push(C1);
        }
      })
    });

    return {
      coronaTransformations: C1s,
      allTransformations: T1s
    }
  }
}

export default PoincareTiling;
