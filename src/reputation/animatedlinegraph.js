let React = require("react");
let ReactDOM = require("react-dom");
let CreateReactClass = require("create-react-class");
let LineGraph = require("./linegraph");

module.exports = CreateReactClass({
  getDefaultProps: function() {
    return {
      values: [],
      time: 500, // ms,
      delay: 0,
      scale: 1,
      lineWidth: 4
    };
  },

  getInitialState: function() {
    return {
      values: [],
      percentComplete: 0,
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

  componentDidUpdate: function() {
    if (this.rAF === null) {
      this.setState({
        values: [],
        percentComplete: 0,
        lastFrame: null,
        delayed: 0
      });
      this.rAF = requestAnimationFrame(this.updateAnimationState);
    }
  },

  updateAnimationState: function(timestamp) {
    let newValues = this.state.values;
    let percentComplete = this.state.percentComplete;
    let progress = 0;
    let delayed = this.state.delayed;
    if (this.state.lastFrame) {
      progress = timestamp - this.state.lastFrame;
      if (this.props.delay > this.state.delayed) {
        delayed = delayed + progress;
      } else {
        // update values according to progress
        percentComplete = percentComplete + 100 / (this.props.time / progress);

        let avValue =
          this.props.values.reduce((a, b) => a + b, 0) /
          this.props.values.length;

        // create values from property to reflect percentComplete
        newValues = this.props.values.map(function(v) {
          // simply scale from zero to  value
          // return v * (percentComplete / 100);

          // scale away from average towards value
          if (v > avValue) {
            return avValue + (v - avValue) * (percentComplete / 100);
          } else {
            return avValue - (avValue - v) * (percentComplete / 100);
          }
        });
      }
    }
    this.setState({
      values: newValues,
      percentComplete: percentComplete,
      lastFrame: timestamp,
      delayed: delayed
    });
    // only request new frame if we haven't finished
    if (percentComplete < 100) {
      this.rAF = requestAnimationFrame(this.updateAnimationState);
    } else {
      this.rAF = null;
    }
  },

  render: function() {
    if (this.state.width == null) {
      return <div className="reputation-linegraph" />;
    }
    let maxValue = Math.max(...this.props.values);
    return (
      <LineGraph
        largestValue={maxValue}
        scale={this.props.scale}
        values={this.state.values}
        height={this.state.height}
        width={this.state.width}
        lineWidth={this.props.lineWidth}
      />
    );
  }
});
