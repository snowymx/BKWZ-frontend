import React, {useEffect} from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { useSelector, useDispatch } from "react-redux";
import history from './Utils/history';
import Dashboard from "./Dashboard";
import Gameplay from "./Gameplay";
import Dao from "./Dao";
import Beta from "./Beta";
import Token from "./Token";
import Minting from "./Minting";
import Staking from "./Staking";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import "./App.scss";

function App() {
  useEffect(() => {
    // onTheme('dashboard');
  }, []);
  return (
    <div className="App">
      <Router history={history}>
        <Header />
        <Switch>
          <Route path="/" exact>
            <Dashboard />
          </Route>
          <Route path="/gameplay">
            <Gameplay />
          </Route>
          <Route path="/dao">
            <Dao />
          </Route>
          <Route path="/beta">
            <Beta />
          </Route>
          <Route path="/token">
            <Token />
          </Route>
          <Route path="/minting">
            <Minting />
          </Route>
          <Route path="/staking">
            <Staking />
          </Route>
          <Redirect to="/" />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

// connecting view layer to state layer with react-redux

const mapStateToProps = state => ({
  theme: state.themeState
});

const mapDispatchToProps = dispatch => ({
  onTheme: background => dispatch({ type: 'BACKGROUND_SET', background }),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default App;
