let React = require("react");
let CreateReactClass = require("create-react-class");
let PureCanvas = require("../purecanvas");

module.exports = CreateReactClass({
  getDefaultProps: function() {
    return {
      percent: 0, // %
      scale: 1,
      allowNegative: false,
      icon: "shield",
      color: "#379DE8",
      title: "Trust",
      icons: {
        shield:
          "M0,3.40092018 C2.69363096,3.21522482 4.65537665,2.93131518 5.88523707,2.54919123 C7.11509749,2.16706729 8.80195607,1.31733688 10.9458128,0 C13.2159803,1.31019079 14.9836963,2.1599212 16.2489609,2.54919123 C17.5142255,2.93846127 19.4312385,3.22237092 22,3.40092018 L22,10.5007775 C21.9505497,13.5296906 20.8271532,16.027155 18.6298107,17.9931708 C17.0425775,19.4133068 14.4812449,20.7489166 10.9458128,22 C7.58816173,20.9477816 5.04573818,19.6121719 3.31854218,17.9931708 C1.10618073,15.919396 0,13.4219315 0,10.5007775 L0,3.40092018 Z",
        heart:
          "M6.9008122,0 C8.80004666,0 10.368197,0.707584021 11.6052632,2.12275206 C12.9924208,0.707584021 14.5435925,0 16.2587781,0 C20.419487,0 23.2105263,2.12275206 23.2105263,7.08590065 C23.2105263,13.6883844 12.3807641,21 11.6052632,21 C10.8297622,21 0,13.9473762 0,7.08590065 C0,2.12275206 3.37527547,0 6.9008122,0 Z"
      }
    };
  },

  // parent setting params will call this
  // so we can redraw
  componentDidUpdate: function() {
    this.draw();
  },

  drawIcon: function(name, ctx, x, y) {
    ctx.save();
    ctx.beginPath();
    ctx.translate(x - 11 * this.props.scale, y - 11 * this.props.scale);
    ctx.scale(this.props.scale, this.props.scale);
    let p = new Path2D(this.props.icons[name]);
    ctx.fillStyle = this.props.color;
    ctx.fill(p);
    ctx.closePath();
    ctx.restore();
  },

  // do the drawing
  draw: function() {
    let ctx = this.ctx;

    // sort out some variables for sizes
    let centreWidth = Math.round(this.width / 2);
    let centreHeight = Math.round(this.height / 2);
    let innerRadius = 25 * this.props.scale;
    let innerLineWidth = 5 * this.props.scale;
    let outerLineWidth = 10 * this.props.scale;
    let zeroAngle = -215 * (Math.PI / 180);
    let oneHundredAngle = 35 * (Math.PI / 180);

    ctx.save();
    ctx.clearRect(0, 0, this.width, this.height);

    // draw grey outer line
    ctx.beginPath();
    ctx.arc(
      centreWidth,
      centreHeight,
      innerRadius + innerLineWidth + Math.floor(outerLineWidth / 2),
      zeroAngle,
      oneHundredAngle
    );
    ctx.lineWidth = outerLineWidth;
    ctx.strokeStyle = "#F4F3F3";
    ctx.stroke();
    ctx.closePath();

    // draw inner line
    ctx.beginPath();
    ctx.arc(
      centreWidth,
      centreHeight,
      innerRadius + Math.floor(innerLineWidth / 2),
      0,
      2 * Math.PI
    );
    ctx.lineWidth = innerLineWidth;
    ctx.strokeStyle = this.props.color;
    ctx.stroke();
    ctx.closePath();

    // draw central icon
    this.drawIcon(this.props.icon, ctx, centreWidth, centreHeight);

    // draw the indicator triangle
    let triangleZeroAngle = -125 * (Math.PI / 180);
    let triangleOneHundredAngle = 125 * (Math.PI / 180);

    if (this.props.allowNegative) {
      triangleZeroAngle = 0;
      triangleOneHundredAngle = 125 * (Math.PI / 180);
    }

    let triangleAngle =
      triangleZeroAngle +
      (triangleOneHundredAngle - triangleZeroAngle) * this.props.percent * 0.01;
    ctx.save();
    ctx.beginPath();
    ctx.translate(centreWidth, centreHeight);
    ctx.rotate(triangleAngle);
    ctx.translate(-centreWidth, -centreHeight);
    ctx.translate(0, -(innerRadius + innerLineWidth + outerLineWidth));
    ctx.moveTo(centreWidth, centreHeight);
    ctx.lineTo(
      centreWidth + 10 * this.props.scale,
      centreHeight + 14 * this.props.scale
    );
    ctx.lineTo(
      centreWidth - 10 * this.props.scale,
      centreHeight + 14 * this.props.scale
    );
    ctx.lineTo(centreWidth, centreHeight);
    ctx.fillStyle = this.props.color;
    // ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
    ctx.restore();

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
      <div className={"reputation-gauge " + this.props.icon}>
        <PureCanvas
          height={80 * this.props.scale}
          width={80 * this.props.scale}
          contextRef={this.saveCtx}
        />
        <div className="reputation-gauge-title">{this.props.title}</div>
        <div className="reputation-gauge-score">
          {Math.round(this.props.percent) > 0 ? "+" : ""}
          {Math.round(this.props.percent)}
        </div>
      </div>
    );
  }
});
