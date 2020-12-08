import React from "react";
import './App.css';
import Header from './app/components/Header/Header'
import Footer from './app/components/Footer/Footer'
import Home from './app/components/Home/Home'
import Send from './app/components/Send/Send'
import Login from './app/components/Login/Login'
import About from './app/components/About/About'
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
        {/* <Route path="/forbusisness">
          <ForBusiness />
        </Route> */}
        <Route path="/about">
          <About />
        </Route>
        {/* <Route path="/prices">
          <Prices />
        </Route> */}
        {/* <Route path="/contact">
          <Contact />
        </Route> */}
        <Route path="/login">
          <Login/>
        </Route>
        {/* <Route path="/register">
          <Register />
        </Route> */}
        <Route render={() => <Redirect to={"/"} />} />
      </Switch>
      <Footer/>
    </Router>
  );
}

export default App;
