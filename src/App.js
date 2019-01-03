import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import { Button } from 'reactstrap';
import Home from './Home';
import Empresa from './Empresa';
import Productos from './Productos';
import Estamos from './Estamos';
import Contacto from './Contacto';
import Logo from './components/Logo';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

class App extends Component {
  
  state = {
    loading: true
  };

  componentDidMount() {
    // the setTimeout just simulates an async action, after which the component will render the content
    setTimeout(() => this.setState({ loading: false }), 1500);
  }

  render() {
    
    const { loading } = this.state;
      
    if(loading) { // if your component doesn't have to wait for an async action, remove this block 
      return null; // render null when app is not ready
    }

    return ( 
      <Router>
        <div>
          <NavBar />
          <Route exact path="/" component={Home} />
          <Route path="/empresa" component={Empresa} />
          <Route path="/productos" component={Productos} />
          <Route path="/estamos" component={Estamos} />
          <Route path="/contacto" component={Contacto} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
