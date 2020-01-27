let React = require("react");
let CreateReactClass = require("create-react-class");
let PureCanvas = require("./purecanvas");

module.exports = CreateReactClass({
  // parent setting params will call this
  // so we can redraw
  componentDidUpdate: function() {
    this.draw();
  },

  // do the drawing
  draw: function() {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.clearRect(0, 0, this.width, this.height);
    // this.ctx.translate(50, 50);
    this.ctx.translate(100, 100);
    this.ctx.rotate((this.props.angle * Math.PI) / 180);
    this.ctx.translate(-50, -50);
    this.ctx.fillStyle = "#bada55";
    this.ctx.fillRect(0, 0, 100, 100);
    this.ctx.restore();
  },

  saveCtx: function(ctx) {
    this.ctx = ctx;
    this.height = this.ctx.canvas.height;
    this.width = this.ctx.canvas.width;
    this.draw(); // first draw
  },

  render: function() {
    // console.log("testcanvas render");
    return <PureCanvas height={200} width={200} contextRef={this.saveCtx} />;
  }
});
