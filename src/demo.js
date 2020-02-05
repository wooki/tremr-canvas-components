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
let Data = require("./data");
let HistoryData = require("./historydata");

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

  getInitialState: function() {
    return {};
  },

  updateData: function(data) {
    this.setState(data);
  },

  render: function() {
    // let reputation = parseFloat(this.getQueryVariable("r"));

    return (
      <div className="page">
        <div className="section ux">
          <h1>UX</h1>
          <div className="container">
            <Dashboard
              title={this.state.name}
              time={600}
              delay={600}
              reputation={this.state.reputation}
              trust={this.state.trust}
              respect={this.state.respect}
              stars={this.state.stars}
              reputationValues={this.state.reputationValues}
              activityValues={this.state.activityValues}
              avatarUrl="/avatar-tr.png"
            />
          </div>
        </div>
        <div className="section variables">
          <h1>Variables</h1>
          <Data onChange={this.updateData} />
        </div>
        <div className="section historicals">
          <h1>Historicals</h1>
          <HistoryData onChange={this.updateData} />
        </div>
      </div>
    );
  }
});
