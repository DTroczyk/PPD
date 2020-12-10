import React from "react";
import './App.css';
import Header from './app/components/Header/Header'
import Footer from './app/components/Footer/Footer'
import Home from './app/components/Home/Home'
import Send from './app/components/Send/Send'
import Login from './app/components/Login/Login'
import About from './app/components/About/About'
import Contact from './app/components/Contact/Contact'
import ForBusiness from './app/components/ForBusiness/ForBusiness'
import Baner from './app/components/Baner/Baner'
import Pigeon from './app/components/Pigeon/Pigeon'
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
      <Baner/>
      <div class="wrapper">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/send">
            <Send />
          </Route>
          {<Route path="/forbusiness">
            <ForBusiness />
          </Route> }
          <Route path="/about">
            <About />
          </Route>
          {/* <Route path="/prices">
            <Prices />
          </Route> */}
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/pigeon">
            <Pigeon/>
          </Route>
          {/* <Route path="/register">
            <Register />
          </Route> */}
          <Route render={() => <Redirect to={"/"} />} />
        </Switch>
        </div>
      <Footer/>
    </Router>
  );
}

export default App;
