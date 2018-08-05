import React from 'react';
import { withContentRect } from 'react-measure'
import * as d3 from 'd3';

const PROJECTIONS = [
  d3.geoOrthographic().scale(200),
  d3.geoGnomonic().scale(200),
  d3.geoStereographic().scale(200)
]

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.state = {
      intervalId: null,
      projectionId: 0,
      projectionChanged: false
    };
    this._changeProjection = this._changeProjection.bind(this);
  }
  componentDidMount() {
    this.setState({ intervalId: setInterval(this._changeProjection, 2000) })
    this._render();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.projectionChanged) {
      const prevProjection = PROJECTIONS[prevState.projectionId];
      const newProjection = PROJECTIONS[this.state.projectionId];
      this._renderProjectionChange(prevProjection, newProjection)
    } else if (!this.state.projectionChanged && prevState.projectionChanged) {
      return;
    } else {
      this._render();
    }
  }
  componentWillMount() {
    clearInterval(this.state.intervalId);
  }
  render() {
    const { measureRef } = this.props;
    const { width, height } = this._dimensions();
    return (
      <div ref={measureRef} style={{width: '100%', height: '100%'}}>
        <canvas width={width} height={height} ref={node => this.canvasRef = node} />
      </div>
    );
  }
  _dimensions() {
    const { contentRect } = this.props;
    const { width } = contentRect.bounds;
    const height = 800;
    return { width, height };
  }
  _changeProjection() {
    this.setState({
      projectionId: (this.state.projectionId + 1) % PROJECTIONS.length,
      projectionChanged: true
    });
  }
  _render() {
    const { width, height } = this._dimensions();    
    const canvas = d3.select(this.canvasRef);
    
    // update dims
    canvas
      .attr('width', width)
      .attr('height', height)
      .style('width', `${width}px`)
      .style('height', `${height}px`);

    // get context
    const context = canvas.node().getContext("2d");
    context.fillStyle = "#f9f9f9";
    context.strokeStyle = "#000";

    // generate graticule
    const graticule = d3.geoGraticule()();

    // projection
    const projection = PROJECTIONS[this.state.projectionId];

    // path
    const path = d3.geoPath()
      .projection(projection)
      .context(context);

    function redraw(path) {
      context.clearRect(0, 0, width, height);
      context.lineWidth = 1
    
      context.strokeStyle = "#999";
      context.beginPath(); path(graticule); context.stroke();
    
      context.beginPath(); path({type: "Sphere"}); context.stroke();
    }

    redraw(path);
  }
  _renderProjectionChange(prevProjection, newProjection) {
    const { width, height } = this._dimensions();    
    const canvas = d3.select(this.canvasRef);
    
    // update dims
    canvas
      .attr('width', width)
      .attr('height', height)
      .style('width', `${width}px`)
      .style('height', `${height}px`);

    // get context
    const context = canvas.node().getContext("2d");
    context.fillStyle = "#f9f9f9";
    context.strokeStyle = "#000";

    // generate graticule
    const graticule = d3.geoGraticule()();

    // path
    let path = d3.geoPath()
      .projection(prevProjection)
      .context(context);

    function pathTween(projection0, projection1) {
      var t = 0,
          projection = d3.geoProjection(function(λ, φ) {
              λ *= 180 / Math.PI; φ *= 180 / Math.PI;
              var p0 = projection0([λ, φ]), p1 = projection1([λ, φ]);
              return [(1 - t) * p0[0] + t * p1[0], (1 - t) * -p0[1] + t * -p1[1]];
            })
            .scale(1)
            // .translate([width / 2, height / 2])
            .clipExtent(projection0.clipExtent()),
          path = d3.geoPath().projection(projection).context(context);
      return function() {
        return function(u) {
          t = u;
          redraw(path);
        };
      };
    }

    function update(oldProjection, newProjection) {
      canvas.transition()
          .duration(750)
          .ease( d3.easeQuad )
          .attrTween("path", pathTween(oldProjection, newProjection));
      path.projection(oldProjection);
    }

    function redraw(path) {
      context.clearRect(0, 0, width, height);

      context.fillStyle = "white";
      context.fillRect(0, 0, width, height);

      context.lineWidth = 1
    
      context.strokeStyle = "#999";
      context.beginPath(); path(graticule); context.stroke();
    
      context.beginPath(); path({type: "Sphere"}); context.stroke();
    }

    update(prevProjection, newProjection);
    this.setState({ projectionChanged: false });
  }
}

Splash = withContentRect('bounds')(Splash);

export default Splash;
