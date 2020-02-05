let React = require("react");
let CreateReactClass = require("create-react-class");
let Avatar = require("./animatedavatar");
let Dial = require("./animateddial");
let Gauge = require("./animatedgauge");
let LineGraph = require("./animatedlinegraph");
let BarChart = require("./animatedbarchart");
let Stars = require("./animatedstars");
let Membership = require("./membership");

module.exports = CreateReactClass({
  getDefaultProps: function() {
    return {
      title: "",
      time: 0,
      delay: 0,
      stars: [10, 20, 30],
      reputation: 0,
      trust: 0,
      respect: 0,
      reputationValues: [],
      activityValues: [],
      avatarUrl: "/avatar-tr.png"
    };
  },

  render: function() {
    let reputationChange = 0;
    if (this.props.reputationValues.length > 1) {
      reputationChange =
        this.props.reputation -
        this.props.reputationValues[this.props.reputationValues.length - 2];
    }

    // figure out how many stars
    let stars = 0;
    if (this.props.reputation >= this.props.stars[0]) {
      stars++;
    }
    if (this.props.reputation >= this.props.stars[1]) {
      stars++;
    }
    if (this.props.reputation >= this.props.stars[2]) {
      stars++;
    }

    let percentTowardsNextStar = 0;
    if (this.props.reputation >= this.props.stars[2]) {
      percentTowardsNextStar = 100;
    } else if (this.props.reputation >= this.props.stars[1]) {
      percentTowardsNextStar =
        (100 * (this.props.reputation - this.props.stars[1])) /
        (this.props.stars[2] - this.props.stars[1]);
    } else if (this.props.reputation >= this.props.stars[0]) {
      percentTowardsNextStar =
        (100 * (this.props.reputation - this.props.stars[0])) /
        (this.props.stars[1] - this.props.stars[0]);
    } else {
      percentTowardsNextStar =
        (100 * this.props.reputation) / this.props.stars[0];
    }

    return (
      <div className="reputation-dashboard">
        <div className="reputation-dashboard-title">{this.props.title}</div>
        <div className="reputation-dashboard-top">
          <Dial
            scale={window.devicePixelRatio}
            reputation={this.props.reputation}
            time={this.props.time}
            delay={this.props.delay}
            stars={this.props.stars}
          />
          <Avatar
            scale={window.devicePixelRatio}
            reputation={percentTowardsNextStar}
            time={this.props.time}
            delay={this.props.delay}
            avatar={this.props.avatarUrl}
          />
        </div>
        <div className="reputation-dashboard-middle">
          <Gauge
            scale={window.devicePixelRatio}
            percent={this.props.trust}
            allowNegative={true}
            time={this.props.time}
            delay={this.props.delay}
            color="#379DE8"
            icon="shield"
            title="Trust"
          />
          <div className="reputation-info">
            <Stars scale={window.devicePixelRatio} stars={stars} />
            <Membership
              reputation={this.props.reputation}
              stars={this.props.stars}
            />
            <div className="reputation-score">{this.props.reputation}</div>
            {/* <div className="reputation-change">{reputationChange}</div> */}
          </div>
          <Gauge
            scale={window.devicePixelRatio}
            percent={this.props.respect}
            allowNegative={true}
            time={this.props.time}
            delay={this.props.delay}
            color="#93CC58"
            icon="heart"
            title="Respect"
          />
        </div>
        <LineGraph
          lineWidth={4}
          values={this.props.reputationValues}
          time={this.props.time}
          delay={this.props.delay}
          scale={window.devicePixelRatio}
        />
        <BarChart
          barWidth={1}
          values={this.props.activityValues}
          time={this.props.time}
          delay={this.props.delay}
          scale={window.devicePixelRatio}
        />
      </div>
    );
  }
});
