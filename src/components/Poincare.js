import React from 'react';
import PropTypes from 'prop-types';
import { withContentRect } from 'react-measure';
import * as d3 from 'd3';

import PoincareTiling from '../construction/poincareTiling';

class Poincare extends React.Component {
  constructor(props) {
    super(props);
    const { p, q, depth } = props;
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
          style={{ position: 'absolute' }}
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
    return { width, height: width };
  }
  _render() {
    const { renderPolygons } = this.props;
    const { width, height } = this._dimensions();
    const R = width / 2 - 1;
    const canvas = d3.select(this.canvasRef);

    // update dims
    canvas.attr('width', width).attr('height', height);

    // get context
    const context = canvas.node().getContext('2d');
    if (!context) {
      return;
    }

    // context.translate(0.5, 0.5);
    context.fillStyle = 'rgba(255, 255, 255, 0)';
    context.fillRect(0, 0, width, height);
    context.translate(width / 2, height / 2);
    context.save();

    const polygons = this.tiling.polygons();
    renderPolygons(context, polygons, R);

    context.restore();
  }
}

Poincare.propTypes = {
  p: PropTypes.number.isRequired,
  q: PropTypes.number.isRequired,
  depth: PropTypes.number.isRequired,
  renderPolygons: PropTypes.func.isRequired,
};

Poincare = withContentRect('bounds')(Poincare);

export default Poincare;
