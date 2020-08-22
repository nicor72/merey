import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom'
// Import css files
import './App.css'
import "react-alice-carousel/lib/alice-carousel.css"
// Views
import Home from './views/Home'
import Company from './views/Company'
import Products from './views/Products'
import Where from './views/Where'
import Contact from './views/Contact'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import ShoppingCart from './views/ShoppingCart'
import Confirm from './views/Confirm'

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default () =>
  <Router>
    <ScrollToTop />
    <NavBar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/empresa" component={Company} />
      <Route path="/productos" component={Products} />
      <Route path="/estamos" component={Where} />
      <Route path="/contacto" component={Contact} />
      <Route path="/carrito" component={ShoppingCart} />
      <Route path="/confirmar" component={Confirm} />
    </Switch>
    <Footer />
  </Router>

