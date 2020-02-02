let React = require("react");
let CreateReactClass = require("create-react-class");
let PureCanvas = require("../purecanvas");

module.exports = CreateReactClass({
  getDefaultProps: function() {
    return {
      values: [],
      lineWidth: 4
    };
  },

  // parent setting params will call this
  // so we can redraw
  componentDidUpdate: function() {
    this.draw();
  },

  getControlPoints: function(x0, y0, x1, y1, x2, y2, t) {
    //  x0,y0,x1,y1 are the coordinates of the end (knot) pts of this segment
    //  x2,y2 is the next knot -- not connected here but needed to calculate p2
    //  p1 is the control point calculated here, from x1 back toward x0.
    //  p2 is the next control point, calculated here and returned to become the
    //  next segment's p1.
    //  t is the 'tension' which controls how far the control points spread.
    var d01 = Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));
    var d12 = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    var fa = (t * d01) / (d01 + d12);
    var fb = t - fa;
    var p1x = x1 + fa * (x0 - x2);
    var p1y = y1 + fa * (y0 - y2);
    var p2x = x1 - fb * (x0 - x2);
    var p2y = y1 - fb * (y0 - y2);
    return [p1x, p1y, p2x, p2y];
  },

  createLinePath: function(curves, points) {
    // draw the bezier curves (expludes first and last which are quadratic)
    this.ctx.beginPath();

    // draw the first and last curves as
    this.ctx.moveTo(points[0][0], points[0][1]);
    this.ctx.quadraticCurveTo(
      curves[0].p2[0],
      curves[0].p2[1],
      points[1][0],
      points[1][1]
    );
    for (let i = 1; i < points.length - 2; i += 1) {
      // this.ctx.lineTo(curves[i].end[0], curves[i].end[1]);
      this.ctx.bezierCurveTo(
        curves[i].p1[0],
        curves[i].p1[1],
        curves[i].p2[0],
        curves[i].p2[1],
        curves[i].end[0],
        curves[i].end[1]
      );
    }

    // last curve
    this.ctx.moveTo(points[points.length - 2][0], points[points.length - 2][1]);
    this.ctx.quadraticCurveTo(
      curves[points.length - 2].p1[0],
      curves[points.length - 2].p1[1],
      points[points.length - 1][0],
      points[points.length - 1][1]
    );
  },

  // do the drawing
  draw: function() {
    let ctx = this.ctx;

    ctx.save();
    ctx.clearRect(0, 0, this.width, this.height);

    if (this.props.values && this.props.values.length > 0) {
      let maxValue = Math.max(...this.props.values);
      if (this.props.largestValue) {
        maxValue = this.props.largestValue;
      }

      // highest allowable position to use
      let maxY = this.height - this.props.lineWidth * this.props.scale * 2;
      let startYPosition =
        this.height - this.props.lineWidth * this.props.scale;

      // y-scale is the remaining space
      let scaleY = maxY / maxValue;

      // x-scale is width divided by value count
      let scaleX = this.width / (1 + this.props.values.length);

      // create an array of points to actually plot
      let points = [];

      // start with fke point on the left of control
      points.push([0, startYPosition - this.props.values[0] * scaleY]);

      // plot each point
      this.props.values.forEach((val, index) => {
        let x = (index + 1) * scaleX;
        let y = startYPosition - val * scaleY;
        points.push([x, y]);
      });

      // plot a fake last point at 100% width
      let x = (this.props.values.length + 1) * scaleX;
      let y =
        startYPosition -
        this.props.values[this.props.values.length - 1] * scaleY;
      points.push([x, y]);

      // draw sets of curves (expluding first and last)
      let curves = {};
      for (let i = 0; i < points.length - 1; i += 1) {
        curves[i] = {
          start: points[i],
          end: points[i + 1]
        };
      }
      // build all the control points and add to curves
      for (let i = 0; i < points.length - 2; i += 1) {
        let cp = this.getControlPoints(
          points[i][0],
          points[i][1],
          points[i + 1][0],
          points[i + 1][1],
          points[i + 2][0],
          points[i + 2][1],
          0.5
        );

        // each calculation yields points for two separate curves
        if (curves[i]) {
          curves[i].p2 = [cp[0], cp[1]];
        }
        if (curves[i + 1]) {
          curves[i + 1].p1 = [cp[2], cp[3]];
        } else {
          curves[i + 1] = {
            p1: [cp[2], cp[3]]
          };
        }
      }

      // draw a grad inside the chart
      this.ctx.save();
      this.ctx.beginPath();
      this.createLinePath(curves, points);
      this.ctx.lineTo(this.width, this.height);
      this.ctx.lineTo(0, this.height);
      this.ctx.lineTo(points[0][0], points[0][1]);

      let grad = ctx.createLinearGradient(0, 0, 0, this.height);
      grad.addColorStop(0, "#D5D5D54D");
      grad.addColorStop(1, "#D4D4D400");
      this.ctx.globalAlpha = 0.5;
      this.ctx.fillStyle = grad;
      this.ctx.fill();
      this.ctx.closePath();
      this.ctx.restore();

      // draw the solid line on top
      this.ctx.save();
      this.ctx.beginPath();
      this.createLinePath(curves, points);
      this.ctx.lineWidth = this.props.lineWidth * this.props.scale;
      this.ctx.strokeStyle = "#FBAC01";
      this.ctx.stroke();
      this.ctx.closePath();
      this.ctx.restore();
    }

    ctx.restore();
  },

  saveCtx: function(ctx) {
    this.ctx = ctx;
    this.height = this.ctx.canvas.height;
    this.width = this.ctx.canvas.width;
    this.draw(); // first draw
  },

  render: function() {
    return (
      <div className="reputation-linegraph">
        <PureCanvas
          height={this.props.height * this.props.scale}
          width={this.props.width * this.props.scale}
          contextRef={this.saveCtx}
        />
      </div>
    );
  }
});
