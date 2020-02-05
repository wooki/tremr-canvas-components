let React = require("react");
let CreateReactClass = require("create-react-class");

const defaultState = {
  name: "David Jones",
  reputation: 12,
  trust: 17,
  respect: 40,
  stars: [10, 20, 30],
  star0: 10,
  star1: 20,
  star2: 30
};

module.exports = CreateReactClass({
  getInitialState: function() {
    this.props.onChange(defaultState);
    return defaultState;
  },

  handleChange: function(event) {
    let target = event.target.name;
    let value = event.target.value;
    let newState = {};

    newState[target] = value;

    if (target === "star0") {
      newState.stars = this.state.stars;
      newState.stars[0] = parseInt(value, 10);
    } else if (target === "star1") {
      newState.stars = this.state.stars;
      newState.stars[1] = parseInt(value, 10);
    } else if (target === "star2") {
      newState.stars = this.state.stars;
      newState.stars[2] = parseInt(value, 10);
    }

    this.props.onChange(newState);
    this.setState(newState);
  },

  render: function() {
    return (
      <div className="data-input">
        <fieldset>
          <div className="field">
            <label htmlFor="name">Name</label>
            <input
              type="input"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="reputation">Reputation</label>
            <input
              type="number"
              name="reputation"
              value={this.state.reputation}
              onChange={this.handleChange}
            />
            <div className="info">0 to 30</div>
          </div>
          <div className="field">
            <label htmlFor="trust">Trust</label>
            <input
              type="number"
              name="trust"
              value={this.state.trust}
              onChange={this.handleChange}
            />
            <div className="info">-100 to +100</div>
          </div>
          <div className="field">
            <label htmlFor="respect">Respect</label>
            <input
              type="number"
              name="respect"
              value={this.state.respect}
              onChange={this.handleChange}
            />
            <div className="info">-100 to +100</div>
          </div>
        </fieldset>

        <fieldset>
          <h2>Star Thresholds</h2>
          <div className="field">
            <label htmlFor="star0">1 Star</label>
            <input
              type="number"
              name="star0"
              value={this.state.star0}
              onChange={this.handleChange}
            />
            <div className="info">>= this is 1 star</div>
          </div>
          <div className="field">
            <label htmlFor="star1">2 Stars</label>
            <input
              type="number"
              name="star1"
              value={this.state.star1}
              onChange={this.handleChange}
            />
            <div className="info">>= this is 2 stars</div>
          </div>
          <div className="field">
            <label htmlFor="star2">3 Stars</label>
            <input
              type="number"
              name="star2"
              value={this.state.star2}
              onChange={this.handleChange}
            />
            <div className="info">>= this is 3 stars</div>
          </div>
        </fieldset>
      </div>
    );
  }
});
