let React = require("react");
let CreateReactClass = require("create-react-class");
// let TestCanvas = require("./testcanvas");
// let AnimateTestCanvas = require("./animatetestcanvas");
// let Avatar = require("./reputation/avatar");
let Avatar = require("./reputation/animatedavatar");
// let Dial = require("./reputation/dial");
let Dial = require("./reputation/animateddial");
let Gauge = require("./reputation/animatedgauge");
let LineGraph = require("./reputation/animatedlinegraph");
let BarChart = require("./reputation/animatedbarchart");

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
    let trust = parseFloat(this.getQueryVariable("t") || 50);
    let respect = parseFloat(this.getQueryVariable("rsp") || 50);

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
            avatar="/avatar-tr.png"
          />
          <Gauge
            scale={1}
            percent={trust}
            time={600}
            delay={600}
            color="#379DE8"
            icon="shield"
          />
          <Gauge
            scale={window.devicePixelRatio}
            percent={respect}
            time={600}
            delay={600}
            color="#93CC58"
            icon="heart"
          />
          <LineGraph
            lineWidth={4}
            values={[
              8,
              15,
              18,
              20,
              28,
              13,
              21,
              6,
              22,
              7,
              10,
              6,
              14,
              16,
              17,
              11,
              9,
              16,
              26,
              19,
              23,
              4,
              30,
              8,
              24,
              12,
              2,
              14,
              25,
              22
            ]}
            time={600}
            delay={600}
            scale={window.devicePixelRatio}
          />
          <BarChart
            barWidth={1}
            values={[
              8,
              15,
              18,
              20,
              28,
              13,
              21,
              6,
              22,
              7,
              10,
              6,
              14,
              16,
              17,
              11,
              9,
              16,
              26,
              19,
              23,
              4,
              30,
              8,
              24,
              12,
              2,
              14,
              25,
              22
            ]}
            time={600}
            delay={600}
            scale={window.devicePixelRatio}
          />
        </div>
      </div>
    );
  }
});
