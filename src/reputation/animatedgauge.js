let React = require("react");
let CreateReactClass = require("create-react-class");
let Gauge = require("./gauge");

module.exports = CreateReactClass({
  getDefaultProps: function() {
    return {
      percent: 0, // %
      allowNegative: false,
      time: 500, // ms,
      delay: 0,
      scale: 1,
      icon: "shield",
      color: "#379DE8",
      title: "Trust"
    };
  },

  getInitialState: function() {
    return {
      percent: 0,
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
        percent: 0,
        lastFrame: null,
        delayed: 0
      });
      this.rAF = requestAnimationFrame(this.updateAnimationState);
    }
  },

  updateAnimationState: function(timestamp) {
    // console.log("x:" + timestamp);
    let newPercent = this.state.percent;
    let progress = 0;
    let delayed = this.state.delayed;

    if (this.state.lastFrame) {
      progress = timestamp - this.state.lastFrame;

      if (this.props.delay > this.state.delayed) {
        delayed = delayed + progress;
      } else {
        newPercent =
          newPercent + this.props.percent / (this.props.time / progress);
      }
    }
    this.setState({
      percent: newPercent,
      lastFrame: timestamp,
      delayed: delayed
    });

    // only request new frame if we haven't finished
    if (
      (this.props.percent > 0 && newPercent < this.props.percent) ||
      (this.props.percent < 0 && newPercent > this.props.percent)
    ) {
      this.rAF = requestAnimationFrame(this.updateAnimationState);
    } else {
      this.rAF = null;
    }
  },

  render: function() {
    // if (this.state.width == null) {
    //   return <div className="reputation-dial" />;
    // }
    return (
      <Gauge
        scale={this.props.scale}
        percent={this.state.percent}
        allowNegative={this.props.allowNegative}
        color={this.props.color}
        icon={this.props.icon}
        height={this.state.height}
        width={this.state.width}
        title={this.props.title}
      />
    );
  }
});
