import React from "react";
import NavBar from "./components/common/NavBar";
import Search from "./pages/Search";
// import About from "./pages/About";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <NavBar />
      <Search />
    </div>
  );
};

export default App;
