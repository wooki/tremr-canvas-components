let React = require("react");
let CreateReactClass = require("create-react-class");
// let TestCanvas = require("./testcanvas");
// let AnimateTestCanvas = require("./animatetestcanvas");
// let Avatar = require("./reputation/avatar");
let Avatar = require("./reputation/animatedavatar");
// let Dial = require("./reputation/dial");
let Dial = require("./reputation/animateddial");

module.exports = CreateReactClass({
  getQueryVariable: function(variable) {
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] === variable) {
        return pair[1];
      }
    }
    return false;
  },

  render: function() {
    console.log("window.devicePixelRatio:" + window.devicePixelRatio);
    let reputation = parseFloat(this.getQueryVariable("r"));
    let reputationStars = [10, 20, 30];
    let avatarReputation = 0;
    if (reputation < 10) {
      avatarReputation = reputation * 10;
    } else if (reputation < 20) {
      avatarReputation = (reputation - 10) * 10;
    } else if (reputation < 30) {
      avatarReputation = (reputation - 20) * 10;
    } else if (reputation >= 30) {
      avatarReputation = 100;
    }
    return (
      <div>
        <div className="container">
          {/* <TestCanvas /> */}
          {/* <AnimateTestCanvas /> */}
          <Dial
            scale={window.devicePixelRatio}
            reputation={reputation}
            time={600}
            delay={600}
            stars={reputationStars}
          />
          <Avatar
            scale={window.devicePixelRatio}
            reputation={avatarReputation}
            time={600}
            delay={600}
          />
        </div>
      </div>
    );
  }
});
