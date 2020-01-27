let React = require("react");
let CreateReactClass = require("create-react-class");

module.exports = CreateReactClass({
  shouldComponentUpdate: function() {
    return false;
  },

  render: function() {
    return (
      <canvas
        width={this.props.width}
        height={this.props.height}
        ref={node =>
          node ? this.props.contextRef(node.getContext("2d")) : null
        }
      />
    );
  }
});
