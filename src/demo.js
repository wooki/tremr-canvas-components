let React = require("react");
let CreateReactClass = require("create-react-class");
// let TestCanvas = require("./testcanvas");
// let AnimateTestCanvas = require("./animatetestcanvas");
// let Avatar = require("./reputation/avatar");
// let Avatar = require("./reputation/animatedavatar");
// let Dial = require("./reputation/dial");
// let Dial = require("./reputation/animateddial");
// let Gauge = require("./reputation/gauge");
// let Gauge = require("./reputation/animatedgauge");
// let LineGraph = require("./reputation/animatedlinegraph");
// let BarChart = require("./reputation/animatedbarchart");
// let Stars = require("./reputation/stars");
// let Stars = require("./reputation/animatedstars");
let Dashboard = require("./reputation/dashboard");

module.exports = CreateReactClass({
  // getQueryVariable: function(variable) {
  //   let query = window.location.search.substring(1);
  //   let vars = query.split("&");
  //   for (let i = 0; i < vars.length; i++) {
  //     var pair = vars[i].split("=");
  //     if (pair[0] === variable) {
  //       return pair[1];
  //     }
  //   }
  //   return false;
  // },

  render: function() {
    // let reputation = parseFloat(this.getQueryVariable("r"));

    let reputationValues = [
      1,
      2,
      2,
      4,
      3,
      4,
      4,
      3,
      4,
      4,
      5,
      5,
      4,
      6,
      5,
      5,
      6,
      6,
      10,
      12,
      12,
      13,
      12,
      13,
      20,
      22,
      22.5,
      27,
      26,
      26.5
    ];
    let activityValues = [
      1,
      2,
      3,
      1,
      2,
      3,
      1,
      2,
      3,
      1,
      2,
      3,
      1,
      2,
      3,
      5,
      6,
      7,
      8,
      9,
      10,
      15,
      17,
      18,
      19,
      20,
      30,
      15,
      32,
      18
    ];
    return (
      <div className="container">
        {/* <Stars stars={2} /> */}
        <Dashboard
          title="David Jones"
          time={600}
          delay={0}
          reputation={26.5}
          trust={30}
          respect={15}
          reputationValues={reputationValues}
          activityValues={activityValues}
          avatarUrl="/avatar-tr.png"
        />
      </div>
    );
  }
});
