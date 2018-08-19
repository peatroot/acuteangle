import PoincareGeodesic from '../construction/PoincareGeodesic';

const COLOR1 = '#fa9';
const COLOR2 = '#9af';

function randomColor() {
  var r = (255 * Math.random()) | 0,
    g = (255 * Math.random()) | 0,
    b = (255 * Math.random()) | 0;
  return 'rgb(' + r + ',' + g + ',' + b + ')';
}

class PoincareCanvas {
  static renderBoundaryCircle(context, R, fillStyle, strokeStyle) {
    context.save();
    context.fillStyle = fillStyle;
    context.strokeStyle = strokeStyle;
    context.beginPath();
    context.arc(0, 0, R, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();
    context.stroke();
    context.restore();
  }
  static renderPolygonsRightTriangles(context, polygons, R, fillStyle) {
    polygons.forEach(polygon => {
      PoincareCanvas.renderPolygonRightTriangles(context, polygon, R);
    });
  }
  static renderPolygonRightTriangles(context, polygon, R) {
    // render polygons
    context.strokeStyle = 'white';

    const points = polygon._points;
    const midpoints = polygon._midpoints;
    const edges = polygon._edges;
    const O = polygon._centre;

    edges.forEach((edge, i) => {
      // render two right triangles, T1 = OAM, T2 = OMB,
      // using M = midpoint of AB
      const A = points[edge[0]];
      const B = points[edge[1]];
      const M = midpoints[edge[0]];

      // T1
      context.fillStyle = 'black';
      context.beginPath();
      context.moveTo(O.re * R, O.im * R);
      PoincareCanvas.renderGeodesic(context, O, A, R);
      PoincareCanvas.renderGeodesic(context, A, M, R);
      PoincareCanvas.renderGeodesic(context, M, O, R);
      context.closePath();
      context.fill();

      // T2
      context.fillStyle = 'white';
      context.beginPath();
      context.moveTo(O.re * R, O.im * R);
      PoincareCanvas.renderGeodesic(context, O, M, R);
      PoincareCanvas.renderGeodesic(context, M, B, R);
      PoincareCanvas.renderGeodesic(context, B, O, R);
      context.closePath();
      context.fill();
    });
  }
  static renderGeodesic(context, A, B, R) {
    // calculate circle/line info
    const info = PoincareGeodesic.renderInfo(A, B);
    if (info.type === 'line') {
      context.lineTo(info.x2 * R, info.y2 * R);
    } else if (info.type === 'circle') {
      const { x, y, r, startAngle, endAngle, antiClockwise } = info;
      context.arc(x * R, y * R, r * R, startAngle, endAngle, antiClockwise);
    }
  }
  static renderPolygonsPoints(context, polygons, R) {
    context.save();
    context.fillStyle = 'white';
    polygons.forEach(polygon => {
      polygon._points.forEach(point => {
        context.beginPath();
        context.arc(point.re * R, point.im * R, 2, 0, Math.PI * 2, true);
        context.fill();
      });
    });
    context.restore();
  }
  static renderPolygonsSolid(context, polygons, R) {
    polygons.forEach(polygon => {
      PoincareCanvas.renderPolygonSolid(context, polygon, R);
    });
  }
  static renderPolygonSolid(context, polygon, R) {
    // render polygons
    context.fillStyle = randomColor();
    context.strokeStyle = 'white';

    const points = polygon._points;
    const edges = polygon._edges;

    let startPoint;
    context.beginPath();
    edges.forEach((edge, i) => {
      // move to start
      if (i === 0) {
        startPoint = points[edge[0]];
        context.moveTo(startPoint.re * R, startPoint.im * R);
      }

      // calculate circle/line info
      const info = PoincareGeodesic.renderInfo(
        points[edge[0]],
        points[edge[1]]
      );

      // render depending on type
      if (info.type === 'line') {
        context.lineTo(info.x2 * R, info.y2 * R);
      } else if (info.type === 'circle') {
        const { x, y, r, startAngle, endAngle, antiClockwise } = info;
        context.arc(x * R, y * R, r * R, startAngle, endAngle, antiClockwise);
      }
    });
    context.lineTo(startPoint.re * R, startPoint.im * R);
    context.closePath();
    context.fill();
    context.stroke();
  }
  static renderPolygonsDuals(context, polygons, R) {
    polygons.forEach(polygon => {
      const points = polygon._points;
      const midpoints = polygon._midpoints;
      const edges = polygon._edges;
      const O = polygon._centre;

      context.strokeStyle = COLOR2;
      midpoints.forEach(P => {
        context.beginPath();
        context.moveTo(O.re * R, O.im * R);
        PoincareCanvas.renderGeodesic(context, O, P, R);
        context.closePath();
        context.stroke();
      });

      context.strokeStyle = COLOR1;
      context.beginPath();
      edges.forEach((edge, i) => {
        const A = points[edge[0]];
        const B = points[edge[1]];
        PoincareCanvas.renderGeodesic(context, A, B, R);
      });
      context.closePath();
      context.stroke();
    });
  }
}

export default PoincareCanvas;
