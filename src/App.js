import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// Import css files
import './App.css'
// Views
import Home from './views/Home'
import Company from './views/Company'
import Products from './views/Products'
import Where from './views/Where'
import Contact from './views/Contact'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import ShoppingCart from './views/ShoppingCart'

export default () =>
  <Router>
    <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/empresa" component={Company} />
        <Route path="/productos" component={Products} />
        <Route path="/estamos" component={Where} />
        <Route path="/contacto" component={Contact} />
        <Route path="/carrito" component={ShoppingCart} />
      </Switch>
    <Footer />
  </Router>

