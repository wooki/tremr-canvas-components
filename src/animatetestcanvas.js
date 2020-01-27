let React = require("react");
let CreateReactClass = require("create-react-class");
let TestCanvas = require("./testcanvas");

module.exports = CreateReactClass({
  getInitialState: function() {
    return {
      angle: 0
    };
  },

  componentDidMount: function() {
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  },

  componentWillUnmount: function() {
    cancelAnimationFrame(this.rAF);
  },

  updateAnimationState: function() {
    let newAngle = (this.state.angle + 1) % 360;

    this.setState({
      angle: newAngle
    });
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  },

  render: function() {
    // console.log("animatetestcanvas render");
    return <TestCanvas angle={this.state.angle} />;
  }
});
