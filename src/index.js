import "./styles.css";

let React = require("react");
let ReactDOM = require("react-dom");
let Demo = require("./demo");

// create the app in the page
let rootElement = document.querySelectorAll("#root")[0];

ReactDOM.render(<Demo />, rootElement);
