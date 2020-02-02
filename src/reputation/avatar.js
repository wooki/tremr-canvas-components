let React = require("react");
let CreateReactClass = require("create-react-class");
let PureCanvas = require("../purecanvas");

module.exports = CreateReactClass({
  getDefaultProps: function() {
    return {
      reputation: 0, // %
      scale: 1
    };
  },

  getInitialState: function() {
    return {
      imageLoaded: false,
      imageError: false
    };
  },

  // parent setting params will call this
  // so we can redraw
  componentDidUpdate: function() {
    this.draw();
  },

  componentWillUnmount: function() {
    if (this.imgElement) {
      this.imgElement.removeEventListener("load", this.handleImageLoad);
      this.imgElement.removeEventListener("error", this.handleImageError);
    }
  },

  handleImageLoad: function(event) {
    this.setState({
      imageLoaded: true
    });
  },

  handleImageError: function(event) {
    this.setState({
      imageError: true
    });
  },

  // load the avatar image
  componentDidMount: function() {
    // https://placeimg.com/480/480/keyword
    this.imgElement = document.createElement("img");
    this.imgElement.src = this.props.avatar;
    this.imgElement.addEventListener("load", this.handleImageLoad);
    this.imgElement.addEventListener("error", this.handleImageError);
  },

  // do the drawing
  draw: function() {
    let ctx = this.ctx;

    // sort out some variables for sizes
    let centreWidth = Math.round(this.width / 2);
    let centreHeight = Math.round(this.height / 2);
    let imageRadius = 96 * this.props.scale;
    let imageDiameter = imageRadius * 2;
    let imageLeft = centreWidth - imageRadius;
    let imageTop = centreHeight - imageRadius;
    let innerLineWidth = 12 * this.props.scale;
    let middleLineWidth = 10 * this.props.scale;
    let outerLineWidth = 14 * this.props.scale;

    ctx.save();
    ctx.clearRect(0, 0, this.width, this.height);

    // clip path for circular image
    ctx.beginPath();
    ctx.arc(centreWidth, centreHeight, imageRadius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    // add image
    if (this.state.imageLoaded) {
      ctx.drawImage(
        this.imgElement,
        imageLeft,
        imageTop,
        imageDiameter,
        imageDiameter
      );
    } else {
      ctx.fillStyle = "white";
      ctx.fillRect(imageLeft, imageTop, imageDiameter, imageDiameter);
    }
    ctx.restore();
    ctx.save();

    // reverse clip - only draw outside image
    // ctx.beginPath();
    // ctx.rect(0, 0, 260, 260);
    // ctx.closePath();
    // ctx.clip();

    // create a clip with whole for avatar by
    // reversing the arc direction (true param)
    ctx.beginPath();
    ctx.rect(0, 0, this.width, this.height);
    ctx.arc(centreWidth, centreHeight, imageRadius, 0, 2 * Math.PI, true);
    ctx.closePath();
    ctx.clip();

    // draw border 1
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(
      centreWidth,
      centreHeight,
      imageRadius + innerLineWidth,
      0,
      2 * Math.PI
    );
    ctx.fill();
    ctx.closePath();

    // draw border 2
    ctx.fillStyle = "#FBAC01";
    ctx.beginPath();
    ctx.arc(
      centreWidth,
      centreHeight,
      imageRadius + innerLineWidth + middleLineWidth,
      0,
      2 * Math.PI
    );
    ctx.arc(
      centreWidth,
      centreHeight,
      imageRadius + innerLineWidth,
      0,
      2 * Math.PI,
      true
    ); // reverse the inner circle to cut it out
    ctx.fill();
    ctx.closePath();

    // draw border 3
    ctx.fillStyle = "#F4F3F3";
    ctx.beginPath();
    ctx.arc(
      centreWidth,
      centreHeight,
      imageRadius + innerLineWidth + middleLineWidth + outerLineWidth,
      0,
      2 * Math.PI
    );
    ctx.arc(
      centreWidth,
      centreHeight,
      imageRadius + innerLineWidth + middleLineWidth,
      0,
      2 * Math.PI,
      true
    ); // reverse the inner circle to cut it out
    ctx.fill();
    ctx.closePath();

    // draw score bar
    ctx.beginPath();
    ctx.arc(
      centreWidth,
      centreHeight,
      imageRadius +
        innerLineWidth +
        middleLineWidth +
        Math.floor(outerLineWidth / 2),
      -0.5 * Math.PI, // start at N instead of E
      // below..  start at N then turn reputation from % to radians
      -0.5 * Math.PI + this.props.reputation * 0.01 * 2 * Math.PI
    );
    ctx.lineWidth = outerLineWidth;
    ctx.strokeStyle = "#FBAC014D";
    ctx.stroke();
    ctx.closePath();

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
      <div className="reputation-avatar">
        <PureCanvas
          height={264 * this.props.scale}
          width={264 * this.props.scale}
          contextRef={this.saveCtx}
        />
      </div>
    );
  }
});
