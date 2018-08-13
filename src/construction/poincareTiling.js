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
    const identity = Moebius.identity();

    // calculate neighbour transformations
    const neighbourTransformations = this.neighbourTransformations(originPolygon);

    // calculate depth levels of transformations
    let transformations = [];
    let coronaTransformations = [identity];
    for (let i = 0; i < this.depth; i++) {
      const iteration = this.iterateTransformations(transformations, coronaTransformations, neighbourTransformations)
      transformations = iteration.transformations;
      coronaTransformations = iteration.coronaTransformations;
      console.log('(total, corona)', transformations.length, coronaTransformations.length)
    }

    return transformations;
  }

  neighbourTransformations(originPolygon) {
    // calculate the translations that map the points of
    // the originPolygon to the centre
    const translations = originPolygon._points.map(c => PoincareIsometry.translation(c))

    // calculate the fundamental rotations (order p, q)
    // const rotationQ = PoincareIsometry.rotationAntiClockwiseAboutOrigin(2 * Math.PI / this.q);
    const rotations = this.qIndices.map(i => {
      return PoincareIsometry.rotationAntiClockwiseAboutOrigin(2 * Math.PI * i / this.q);
    });

    // calculate transformations to generate neighbours of originPolygon
    const transformationsNeighbours = [];
    translations.forEach(translation => {
      rotations.forEach(rotation => {
        const transformation = Moebius.compose(
          translation.inverse(),
          rotation,
          translation,
        );
        transformationsNeighbours.push(transformation)
      });
    });

    return transformationsNeighbours;
  }
  iterateTransformations(previousTransformations, coronaTransformations, neighbourTransformations) {
    // calculate transformations by composing
    // * a member of coronaTransformations
    // * a member of neighbourTransformations
    const transformationsNextCorona = [];
    const transformations = [...previousTransformations];
    coronaTransformations.forEach(coronaTransformation => {
      neighbourTransformations.forEach(neighbourTransformation => {
        const candidate = Moebius.compose(
          coronaTransformation,
          neighbourTransformation,
          coronaTransformation.inverse(),
        );
        // conditionally add the transformation
        const alreadyExistsInPrevious = previousTransformations.find(transformation => Moebius.equal(transformation, candidate));
        const alreadyExistsInNextCorona = transformationsNextCorona.find(transformation => Moebius.equal(transformation, candidate));
        if (!alreadyExistsInPrevious && !alreadyExistsInNextCorona) {
          transformationsNextCorona.push(candidate);
          transformations.push(candidate);
        }
      })
    });

    return {
      coronaTransformations: transformationsNextCorona,
      transformations
    }
  }
}

export default PoincareTiling;
