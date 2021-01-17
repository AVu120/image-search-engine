import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/common/NavBar";
import Search from "./pages/Search";
import About from "./pages/About";
import Instructions from "./pages/Instructions";
import "./App.css";

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
