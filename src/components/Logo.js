import React, { Component } from 'react';

import logo from './../images/merey_logo.svg';

class Logo extends Component {
  render() {
    return (
      <div>
        <div className="row justify-content-md-center bg-black nav-height">
          <div className="col-md-auto">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
        </div>
      </div>
    );
  }
}

export default Logo;