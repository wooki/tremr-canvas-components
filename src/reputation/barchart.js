let React = require("react");
let CreateReactClass = require("create-react-class");
let PureCanvas = require("../purecanvas");

module.exports = CreateReactClass({
  getDefaultProps: function() {
    return {
      values: [],
      barWidth: 1
    };
  },

  // parent setting params will call this
  // so we can redraw
  componentDidUpdate: function() {
    this.draw();
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
      let maxY = this.height;

      // y-scale is the remaining space
      let scaleY = maxY / maxValue;

      // x-scale is width divided by value count
      let scaleX = this.width / (1 + this.props.values.length);

      // draw the bars
      this.ctx.save();
      this.props.values.forEach((val, index) => {
        this.ctx.beginPath();
        let x = scaleX * (index + 1);
        let y = scaleY * val;
        this.ctx.moveTo(x, this.props.height);
        this.ctx.lineTo(x, this.props.height - y);
        this.ctx.lineWidth = this.props.lineWidth * this.props.scale;
        this.ctx.strokeStyle = "#FBAC01";
        this.ctx.stroke();
        this.ctx.closePath();
      });

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
      <div className="reputation-barchart">
        <PureCanvas
          height={this.props.height * this.props.scale}
          width={this.props.width * this.props.scale}
          contextRef={this.saveCtx}
        />
      </div>
    );
  }
});
