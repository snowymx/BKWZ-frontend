import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./component/navbar/Navbar";
import Footer from "./component/footer/Footer";
import Home from "./pages/Home";
import Gameplay from "./pages/Gameplay";
import Dao from "./pages/Dao";
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/gameplay" component={Gameplay} />
          <Route path="/dao" component={Dao} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}
export default App;
