let React = require("react");
let CreateReactClass = require("create-react-class");
let PureCanvas = require("../purecanvas");

module.exports = CreateReactClass({
  getDefaultProps: function() {
    return {
      stars: 0, // 0, 1, 2 or 3
      scale: 1,
      icons: {
        star:
          "M20.2595236,22.6154952 L19.1072676,15.6594518 L24.128122,10.7091737 L17.1564649,9.65549871 L14,3.35066231 L10.8435351,9.65549871 L3.87187799,10.7091737 L8.89273243,15.6594518 L7.74047636,22.6154952 L14,19.3700989 L20.2595236,22.6154952 Z"
      }
    };
  },

  // parent setting params will call this
  // so we can redraw
  componentDidUpdate: function() {
    this.draw();
  },

  drawIcon: function(name, isSet, ctx, x, y) {
    ctx.save();
    ctx.beginPath();
    ctx.translate(x - 14 * this.props.scale, y - 14 * this.props.scale);
    ctx.scale(this.props.scale, this.props.scale);
    let p = new Path2D(this.props.icons[name]);
    ctx.lineWidth = 3;
    if (isSet) {
      ctx.strokeStyle = "#FBAC01";
    } else {
      ctx.strokeStyle = "#E1E1E1";
    }
    ctx.stroke(p);
    ctx.closePath();
    ctx.restore();
  },

  // do the drawing
  draw: function() {
    let ctx = this.ctx;

    // sort out some variables for sizes
    let spaceAroundMiddleStar = 2;
    let starWidth = 28;
    let halfStarWidth = starWidth / 2;
    let centreHeight = this.height / 2;
    let centreWidth = this.width / 2;

    ctx.save();
    ctx.clearRect(0, 0, this.width, this.height);

    // draw central icon
    this.drawIcon(
      "star",
      this.props.stars >= 1,
      ctx,
      centreWidth - (halfStarWidth * 2 + spaceAroundMiddleStar),
      centreHeight
    );
    this.drawIcon(
      "star",
      this.props.stars >= 2,
      ctx,
      centreWidth,
      centreHeight
    );
    this.drawIcon(
      "star",
      this.props.stars >= 3,
      ctx,
      centreWidth + (halfStarWidth * 2 + spaceAroundMiddleStar),
      centreHeight
    );

    ctx.restore();
  },

  saveCtx: function(ctx) {
    this.ctx = ctx;
    this.height = this.ctx.canvas.height;
    this.width = this.ctx.canvas.width;
    this.draw(); // first draw
  },

  render: function() {
    // console.log("testcanvas render");
    return (
      <div className="reputation-stars">
        <PureCanvas
          height={this.props.height * this.props.scale}
          width={this.props.width * this.props.scale}
          contextRef={this.saveCtx}
        />
      </div>
    );
  }
});
