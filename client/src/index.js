import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("app"));

process.env.NODE_ENV === "development" && module.hot.accept();
