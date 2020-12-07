import React from "react";
import './App.css';
import Header from './app/components/Header/Header'
import Footer from './app/components/Footer/Footer'
import Home from './app/components/Home/Home'
import Send from './app/components/Send/Send'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Header/>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/send">
          <Send />
        </Route>
        {/* <Route path="/forbuisness">
          <ForBuisness />
        </Route> */}
        {/* <Route exact path="/about">
          <About />
        </Route> */}
        {/* <Route exact path="/prices">
          <Prices />
        </Route> */}
        {/* <Route exact path="/contact">
          <Contact />
        </Route> */}
        {/* <Route exact path="/login">
          <Login />
        </Route> */}
        {/* <Route exact path="/register">
          <Register />
        </Route> */}
        <Route render={() => <Redirect to={"/"} />} />
      </Switch>
      <Footer/>
    </Router>
  );
}

export default App;
