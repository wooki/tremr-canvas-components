let React = require("react");
let CreateReactClass = require("create-react-class");
let Avatar = require("./avatar");

module.exports = CreateReactClass({
  getDefaultProps: function() {
    return {
      reputation: 0, // %
      time: 500, // ms,
      delay: 0,
      scale: 1
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
  },

  componentWillUnmount: function() {
    cancelAnimationFrame(this.rAF);
  },

  componentDidUpdate: function() {
    if (this.rAF === null) {
      this.setState({
        reputation: 0,
        lastFrame: null,
        delayed: 0
      });
      this.rAF = requestAnimationFrame(this.updateAnimationState);
    }
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
    } else {
      this.rAF = null;
    }
  },

  render: function() {
    // console.log("rep:" + this.state.reputation);
    return (
      <Avatar
        avatar={this.props.avatar}
        scale={this.props.scale}
        reputation={this.state.reputation}
      />
    );
  }
});
