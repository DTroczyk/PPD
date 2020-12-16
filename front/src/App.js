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
import Stork from './app/components/Stork/Stork'
import Prices from './app/components/Prices/Prices'
import Register from './app/components/Register/Register'
import { useHistory } from "react-router-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  let history = useHistory();
  return (
    <Router>
      <Header/>
      <div class="wrapper">
        <Switch>
          <Route exact path="/">
           <Baner text="Strona Główna"/>  
            <Home />
          </Route>
          <Route path="/send">
            <Baner text="Wyślij paczkę"/>  
            <Send />
          </Route>
          {<Route path="/forbusiness">
            <Baner text="Oferta dla firm"/>
            <ForBusiness />
          </Route> }
          <Route path="/about">
            <Baner text="O naszej firmie"/>
            <About />
          </Route>
          { <Route path="/prices">
            <Baner text="Cennik"/>
            <Prices />
          </Route> }
          <Route path="/contact">
            <Baner text="Skontaktuj się z nami"/>
            <Contact />
          </Route>
          <Route path="/login">
            <Baner text="Zaloguj się"/>
            <Login/>
          </Route>
          <Route path="/pigeon">
            <Baner text="Akcje kuriera"/>
            <Pigeon/>
          </Route>
          <Route path="/stork">
            <Baner text="Akcje managera"/>
            <Stork/>
          </Route>
          <Route path="/register">
            <Baner text="Zarejestruj się"/>
            <Register />
          </Route>
          <Route render={() => <Redirect to={"/"} />} />
        </Switch>
        </div>
      <Footer/>
    </Router>
  );
}

export default App;
