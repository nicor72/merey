import React, { useEffect, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom'
import styled from 'styled-components'
// Import css files
import './App.css'
import "react-alice-carousel/lib/alice-carousel.css"

import Loader from './components/Loader'

const Home = lazy(() => import('./views/Home'))
const Company = lazy(() => import('./views/Company'))
const Products = lazy(() => import('./views/Products'))
const Where = lazy(() => import('./views/Where'))
const Contact = lazy(() => import('./views/Contact'))
const NavBar = lazy(() => import('./components/Navbar'))
const Footer = lazy(() => import('./components/Footer'))
const Confirm = lazy(() => import('./views/Confirm'))

const Wrapper = styled.main`
  min-height: calc(60vh);
`

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
    <Suspense fallback={<Loader />}>
      <NavBar />
      <Switch>
        <Wrapper>
          <Route exact path="/" component={Home} />
          <Route path="/empresa" component={Company} />
          <Route path="/productos" component={Products} />
          <Route path="/estamos" component={Where} />
          <Route path="/contacto" component={Contact} />
          <Route path="/confirmar" component={Confirm} />
        </Wrapper>
      </Switch>
      <Footer />
    </Suspense>
  </Router>

