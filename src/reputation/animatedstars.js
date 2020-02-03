let React = require("react");
let ReactDOM = require("react-dom");
let CreateReactClass = require("create-react-class");
let Stars = require("./stars");

module.exports = CreateReactClass({
  getDefaultProps: function() {
    return {
      stars: 0, // 0, 1, 2 or 3
      time: 500, // ms,
      delay: 0,
      scale: 1
    };
  },

  getInitialState: function() {
    return {
      stars: 0,
      lastFrame: null,
      delayed: 0
    };
  },

  componentDidMount: function() {
    this.rAF = requestAnimationFrame(this.updateAnimationState);

    let node = ReactDOM.findDOMNode(this);
    if (node && node.clientWidth !== this.state.width) {
      this.setState({
        width: node.clientWidth,
        height: node.clientHeight
      });
    }
  },

  componentWillUnmount: function() {
    cancelAnimationFrame(this.rAF);
  },

  updateAnimationState: function(timestamp) {
    let newStars = this.state.stars;
    let progress = 0;
    let delayed = this.state.delayed;

    if (this.state.lastFrame) {
      progress = timestamp - this.state.lastFrame;

      if (this.props.delay > this.state.delayed) {
        delayed = delayed + progress;
      } else {
        newStars = newStars + this.props.stars / (this.props.time / progress);
      }
    }

    console.log("stars:" + newStars);
    this.setState({
      stars: newStars,
      lastFrame: timestamp,
      delayed: delayed
    });

    // only request new frame if we haven't finished
    if (newStars <= this.props.stars) {
      this.rAF = requestAnimationFrame(this.updateAnimationState);
    }
  },

  render: function() {
    if (this.state.width == null) {
      return <div className="reputation-stars" />;
    }
    return (
      <Stars
        height={this.state.height}
        width={this.state.width}
        stars={this.state.stars}
        scale={this.props.scale}
      />
    );
  }
});
