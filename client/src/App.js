import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import NavBar from "./components/common/NavBar";
import About from "./pages/About/About";
import Instructions from "./pages/Instructions/Instructions";
import Search from "./pages/Search/Search";

const App = () => {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/instructions">
            <Instructions />
          </Route>
          <Route exact path="/">
            <Search />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
