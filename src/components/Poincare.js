import React from 'react';
import PropTypes from 'prop-types';
import { withContentRect } from 'react-measure';
import * as d3 from 'd3';

import PoincareTiling from '../construction/poincareTiling';
import PoincareGeodesic from '../construction/PoincareGeodesic';

const COLOR1 = '#fa9';
const COLOR2 = '#9af';

class Poincare extends React.Component {
  constructor({ p, q, depth }) {
    super();
    this.canvasRef = React.createRef();
    this.p = p;
    this.q = q;
    this.tiling = new PoincareTiling({ p, q, depth });
  }
  componentDidMount() {
    this._render();
  }
  componentDidUpdate() {
    this._render();
  }
  render() {
    const { measureRef } = this.props;
    const { width, height } = this._dimensions();
    return (
      <div ref={measureRef} style={{ width: '100%', height: '100%' }}>
        <canvas
          width={width}
          height={height}
          ref={node => (this.canvasRef = node)}
        />
      </div>
    );
  }
  _dimensions() {
    const { contentRect } = this.props;
    const { width } = contentRect.bounds;
    const height = 800;
    return { width, height };
  }
  _render() {
    const { width, height } = this._dimensions();
    const R = Math.min(width, height) / 2;
    const canvas = d3.select(this.canvasRef);

    // update dims
    canvas.attr('width', width).attr('height', height);

    // get context
    const context = canvas.node().getContext('2d');
    if (!context) {
      return;
    }

    context.translate(0.5, 0.5);
    context.fillStyle = 'white';
    context.strokeStyle = 'black';
    context.fillRect(0, 0, width, height);
    context.translate(width / 2, height / 2);
    context.save();

    // boundary circle
    this._renderBoundaryCircle(context, R);

    // generate polygons
    const polygons = this.tiling.polygons();

    // render polygons
    // this._renderPolygonsRightTriangles(context, polygons, R);
    this._renderPolygonsSolid(context, polygons, R);

    context.restore();
  }
  _renderBoundaryCircle(context, R) {
    context.beginPath();
    context.arc(0, 0, R, 0, Math.PI * 2, true);
    context.closePath();
    context.stroke();
  }
  _renderPolygonsRightTriangles(context, polygons, R) {
    polygons.forEach(polygon => {
      this._renderPolygonRightTriangles(context, polygon, R);
    });
  }
  _renderPolygonRightTriangles(context, polygon, R) {
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
      context.fillStyle = COLOR1;
      context.beginPath();
      context.moveTo(O.re * R, O.im * R);
      this._renderGeodesic(context, O, A, R);
      this._renderGeodesic(context, A, M, R);
      this._renderGeodesic(context, M, O, R);
      context.closePath();
      context.fill();

      // T2
      context.fillStyle = COLOR2;
      context.beginPath();
      context.moveTo(O.re * R, O.im * R);
      this._renderGeodesic(context, O, M, R);
      this._renderGeodesic(context, M, B, R);
      this._renderGeodesic(context, B, O, R);
      context.closePath();
      context.fill();
    });
  }
  _renderGeodesic(context, A, B, R) {
    // calculate circle/line info
    const info = PoincareGeodesic.renderInfo(A, B);
    if (info.type === 'line') {
      context.lineTo(info.x2 * R, info.y2 * R);
    } else if (info.type === 'circle') {
      const { x, y, r, startAngle, endAngle, antiClockwise } = info;
      context.arc(x * R, y * R, r * R, startAngle, endAngle, antiClockwise);
    }
  }
  _renderPolygonsSolid(context, polygons, R) {
    polygons.forEach(polygon => {
      this._renderPolygonSolid(context, polygon, R);
    });
  }
  _renderPolygonSolid(context, polygon, R) {
    // render polygon points
    context.fillStyle = 'white';
    polygon._points.forEach(point => {
      context.beginPath();
      context.arc(point.re * R, point.im * R, 2, 0, Math.PI * 2, true);
      context.fill();
    });

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
}

Poincare.propTypes = {
  p: PropTypes.number.isRequired,
  q: PropTypes.number.isRequired,
  depth: PropTypes.number.isRequired,
};

function randomColor() {
  var r = (255 * Math.random()) | 0,
    g = (255 * Math.random()) | 0,
    b = (255 * Math.random()) | 0;
  return 'rgb(' + r + ',' + g + ',' + b + ')';
}

Poincare = withContentRect('bounds')(Poincare);

export default Poincare;
