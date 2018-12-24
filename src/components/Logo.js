import React, { Component } from 'react';
import logo from './../images/merey_logo.png';

class Logo extends Component {
  render() {
    return (
      <div>
        <div className="row justify-content-md-center">
          <div className="col-md-auto">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
        </div>
      </div>
    );
  }
}

export default Logo;