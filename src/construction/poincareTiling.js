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
    const identity = Moebius.identity();

    // calculate neighbour transformations
    const neighbourTransformations = this.neighbourTransformations(originPolygon);

    // calculate depth levels of transformations
    let transformations = [identity];
    for (let i = 0; i < this.depth; i++) {
      transformations = this.iterateTransformations(transformations, neighbourTransformations)
    }

    return transformations;
  }

  neighbourTransformations(originPolygon) {
    // calculate the translations that map the points of
    // the originPolygon to the centre
    const translations = originPolygon._points.map(c => PoincareIsometry.translation(c))

    // calculate the fundamental rotations (order p, q)
    const rotationQ = PoincareIsometry.rotationAntiClockwiseAboutOrigin(2 * Math.PI / this.q);

    // calculate transformations to generate neighbours of originPolygon
    const transformationsNeighbours = translations.map((translation, i) => {
      return Moebius.compose(
        translation.inverse(),
        rotationQ,
        translation,
      );
    });

    return transformationsNeighbours;
  }
  iterateTransformations(previousTransformations, neighbourTransformations) {
    // calculate transformations by composing
    // * a member of previousTransformations
    // * a member of neighbourTransformations
    const transformationsNext = [...previousTransformations];
    previousTransformations.forEach(previousTransformation => {
      neighbourTransformations.forEach(neighbourTransformation => {
        const candidate = Moebius.compose(
          previousTransformation.inverse(),
          neighbourTransformation,
          previousTransformation,
        );
        // conditionally add the transformation
        const alreadyExists = transformationsNext.find(transformation => Moebius.equal(transformation, candidate));
        if (!alreadyExists) {
          transformationsNext.push(candidate);
        }
      })
    });
    return transformationsNext;
  }
}

export default PoincareTiling;
