import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"

import './App.css'

import Home from './Home'
import Empresa from './Empresa'
import Productos from './Productos'
import Estamos from './Estamos'
import Contacto from './Contacto'
import NavBar from './components/NavBar'
import Footer from './components/Footer'

export default () =>
  
  // state = {
  //   loading: true
  // }

  // componentDidMount() {
  //   // the setTimeout just simulates an async action, after which the component will render the content
  //   setTimeout(() => this.setState({ loading: false }), 1500)
  // }
    
    // const { loading } = this.state
      
    // if(loading) { // if your component doesn't have to wait for an async action, remove this block 
    //   return null // render null when app is not ready
    // }

      <Router>
        <Fragment>
          <NavBar />
          <Route exact path="/" component={Home} />
          <Route path="/empresa" component={Empresa} />
          <Route path="/productos" component={Productos} />
          <Route path="/estamos" component={Estamos} />
          <Route path="/contacto" component={Contacto} />
          <Footer />
        </Fragment>
      </Router>

