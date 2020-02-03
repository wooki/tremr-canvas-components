let React = require("react");
let CreateReactClass = require("create-react-class");
let PureCanvas = require("../purecanvas");

module.exports = CreateReactClass({
  getDefaultProps: function() {
    return {
      reputation: 0,
      stars: [10, 20, 30]
    };
  },

  render: function() {
    let text = "member";
    if (this.props.reputation > this.props.stars[0]) {
      text = "established";
    }
    if (this.props.reputation > this.props.stars[1]) {
      text = "recommended";
    }
    if (this.props.reputation > this.props.stars[2]) {
      text = "acclaimed";
    }
    return <div className="reputation-membership">{text}</div>;
  }
});
