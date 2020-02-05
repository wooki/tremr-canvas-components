let React = require("react");
let CreateReactClass = require("create-react-class");
const defaultState = {
  reputationValues: [
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
    25,
    26.5
  ],
  activityValues: [
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
  ]
};

module.exports = CreateReactClass({
  getInitialState: function() {
    this.props.onChange(defaultState);
    return defaultState;
  },

  handleChange: function(event) {
    let target = event.target.name;
    let value = event.target.value;
    let newState = {
      reputationValues: this.state.reputationValues,
      activityValues: this.state.activityValues
    };

    if (target.startsWith("activity-")) {
      let day = parseInt(target.split("-")[1], 10);
      newState["activityValues"][day] = parseFloat(value);
    }
    if (target.startsWith("reputation-")) {
      let day = parseInt(target.split("-")[1], 10);
      newState["reputationValues"][day] = parseFloat(value);
    }

    this.props.onChange(newState);
    this.setState(newState);
  },

  createDayField: function(day) {
    return (
      <div className="field" key={"field-" + day}>
        <label htmlFor="reputation">{day + 1}</label>
        <input
          type="number"
          name={"reputation-" + day}
          value={this.state.reputationValues[day]}
          onChange={this.handleChange}
        />
        <input
          type="number"
          name={"activity-" + day}
          value={this.state.activityValues[day]}
          onChange={this.handleChange}
        />
      </div>
    );
  },

  render: function() {
    let days = Array.from(Array(30).keys());

    return (
      <div className="data-input historicals">
        <fieldset>
          <p>Days ago: Reputation score/Activity Level</p>
          {days.map(d => {
            return this.createDayField(d);
          })}
        </fieldset>
      </div>
    );
  }
});
