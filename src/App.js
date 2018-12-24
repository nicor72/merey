import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import { Button } from 'reactstrap';
import Home from './Home';
import Empresa from './Empresa';
import Logo from './components/Logo';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

class App extends Component {
  render() {
    return ( 
      <Router>
        <div>
          <Logo />
          <NavBar />
          <Route exact path="/" component={Home} />
          <Route path="/empresa" component={Empresa} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
