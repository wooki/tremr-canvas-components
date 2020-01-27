let React = require("react");
let ReactDOM = require("react-dom");
let CreateReactClass = require("create-react-class");
let Dial = require("./dial");

module.exports = CreateReactClass({
  getDefaultProps: function() {
    return {
      reputation: 0, // %
      time: 500, // ms,
      delay: 0,
      scale: 1,
      stars: [10, 20, 30]
    };
  },

  getInitialState: function() {
    return {
      reputation: 0,
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
    // console.log("x:" + timestamp);
    let newReputation = this.state.reputation;
    let progress = 0;
    let delayed = this.state.delayed;

    if (this.state.lastFrame) {
      progress = timestamp - this.state.lastFrame;

      if (this.props.delay > this.state.delayed) {
        delayed = delayed + progress;
      } else {
        newReputation =
          newReputation + this.props.reputation / (this.props.time / progress);
      }
    }
    this.setState({
      reputation: newReputation,
      lastFrame: timestamp,
      delayed: delayed
    });

    // only request new frame if we haven't finished
    if (newReputation <= this.props.reputation) {
      this.rAF = requestAnimationFrame(this.updateAnimationState);
    }
  },

  render: function() {
    if (this.state.width == null) {
      return <div className="reputation-dial" />;
    }
    return (
      <Dial
        scale={this.props.scale}
        reputation={this.state.reputation}
        stars={this.props.stars}
        height={this.state.height}
        width={this.state.width}
      />
    );
  }
});
