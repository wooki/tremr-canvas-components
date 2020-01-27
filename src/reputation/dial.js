let React = require("react");
let CreateReactClass = require("create-react-class");
let PureCanvas = require("../purecanvas");

module.exports = CreateReactClass({
  getDefaultProps: function() {
    return {
      reputation: 0, // %
      stars: [10, 20, 30] // levels to draw stars
    };
  },

  // parent setting params will call this
  // so we can redraw
  componentDidUpdate: function() {
    this.draw();
  },

  drawStar: function(ctx, x, y) {
    ctx.save();
    ctx.strokeStyle = "#FBAC01";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.translate(x - 6 * this.props.scale, y - 6 * this.props.scale);
    ctx.scale(this.props.scale, this.props.scale);
    ctx.moveTo(8.87022155, 9.95052105);
    ctx.lineTo(8.34186981, 6.76091963);
    ctx.lineTo(10.644116, 4.49103523);
    ctx.lineTo(7.44735514, 4.00788655);
    ctx.lineTo(6, 1.11688744);
    ctx.lineTo(4.55264486, 4.00788655);
    ctx.lineTo(1.35588398, 4.49103523);
    ctx.lineTo(3.65813019, 6.76091963);
    ctx.lineTo(3.12977845, 9.95052105);
    ctx.lineTo(6, 8.46238764);
    ctx.lineTo(8.87022155, 9.95052105);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  },

  // do the drawing
  draw: function() {
    let ctx = this.ctx;

    // work out some variables
    let shownPoints = 14;
    let centralPoint = Math.floor(this.props.reputation);
    let pixelsPerPoint = 20 * this.props.scale;
    let pixelsPerHalfPoint = pixelsPerPoint / 2;
    let integerLineWidth = 6 * this.props.scale;
    let halfLineWidth = 3 * this.props.scale;
    let verticalCentre = this.height / 2;
    let fontSize = 9 * this.props.scale;
    let gradHeight = 40 * this.props.scale;
    let edgeGradHeight = 80 * this.props.scale;
    let centralPointOffset =
      pixelsPerPoint * (this.props.reputation - centralPoint);

    ctx.save();
    ctx.clearRect(0, 0, this.width, this.height);

    let biggestNumber = centralPoint + Math.floor(shownPoints / 2);
    let smallestNumber = centralPoint - Math.floor(shownPoints / 2);
    if (smallestNumber < 0) {
      biggestNumber = biggestNumber + Math.abs(smallestNumber);
      smallestNumber = smallestNumber + Math.abs(smallestNumber);
    }

    // grad first - translate to make the grad easy and alpha
    // both of which are then reset
    let grad = ctx.createLinearGradient(0, 0, 0, gradHeight);
    grad.addColorStop(0, "#000000FF");
    grad.addColorStop(1, "#00000000");
    ctx.fillStyle = grad;
    ctx.translate(0, verticalCentre);
    ctx.globalAlpha = 0.03;
    ctx.fillRect(0, 0, this.width, gradHeight);
    ctx.translate(0, -verticalCentre);
    ctx.globalAlpha = 1;

    // draw the central line plus grad
    ctx.strokeStyle = "#FBAC01";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, verticalCentre);
    ctx.lineTo(this.width, verticalCentre);
    ctx.closePath();
    ctx.stroke();

    // styles for dial down the right
    ctx.font =
      "400 " + fontSize + "px Lato,Helvetica Neue,Helvetica,Arial,sans-serif";
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    ctx.lineWidth = 1;
    ctx.fillStyle = "#FBAC01";
    ctx.strokeStyle = "#FBAC01";

    // draw the lines and numbers in
    for (let i = biggestNumber; i > smallestNumber; i--) {
      let pointsFromCentral = i - centralPoint;

      // only draw positive
      if (i >= 0) {
        let verticalPosition =
          verticalCentre - pointsFromCentral * pixelsPerPoint;
        verticalPosition = verticalPosition + centralPointOffset;

        // draw the line
        ctx.beginPath();
        ctx.moveTo(this.width, verticalPosition);
        ctx.lineTo(this.width - integerLineWidth, verticalPosition);
        ctx.closePath();
        ctx.stroke();

        // draw 0.5 above (unless outside area)
        if (i > 0.5) {
          ctx.beginPath();
          ctx.moveTo(this.width, verticalPosition + pixelsPerHalfPoint);
          ctx.lineTo(
            this.width - halfLineWidth,
            verticalPosition + pixelsPerHalfPoint
          );
          ctx.closePath();
          ctx.stroke();
        }

        // draw number only for 1+
        if (i >= 1) {
          if (this.props.stars.includes(i)) {
            if (i >= 10) {
              this.drawStar(
                ctx,
                this.width - 17 * this.props.scale,
                verticalPosition
              );
            }
            if (i >= 20) {
              this.drawStar(
                ctx,
                this.width - 29 * this.props.scale,
                verticalPosition
              );
            }
            if (i >= 30) {
              this.drawStar(
                ctx,
                this.width - 41 * this.props.scale,
                verticalPosition
              );
            }
          } else {
            ctx.fillText(
              Math.floor(i),
              this.width - integerLineWidth * 2,
              verticalPosition
            );
          }
        }
      }
    }

    // add a white grad at the top and bottom
    // to cover ends of the dial
    let topGrad = ctx.createLinearGradient(0, 0, 0, edgeGradHeight);
    topGrad.addColorStop(0, "#FFFFFFFF");
    topGrad.addColorStop(1, "#FFFFFF00");
    ctx.fillStyle = topGrad;
    ctx.fillRect(0, 0, this.width, edgeGradHeight);

    let bottomGrad = ctx.createLinearGradient(0, 0, 0, edgeGradHeight);
    bottomGrad.addColorStop(0, "#FFFFFF00");
    bottomGrad.addColorStop(1, "#FFFFFFFF");
    ctx.fillStyle = bottomGrad;
    ctx.translate(0, this.height - edgeGradHeight);
    ctx.fillRect(0, 0, this.width, edgeGradHeight);
    ctx.translate(0, 0 - this.height - edgeGradHeight);

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
      <div className="reputation-dial">
        <PureCanvas
          height={this.props.height * this.props.scale}
          width={this.props.width * this.props.scale}
          contextRef={this.saveCtx}
        />
      </div>
    );
  }
});
