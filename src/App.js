import React, { Component } from 'react';
import logo from './merey_logo.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h3>
            PRONTO!
          </h3>
          <p>
            Avenida Apoquindo 7482, Las Condes.
            <br></br>
            mereytostaduria@gmail.com
            <br></br>
            +56 9 4882 6938
          </p>
        </header>
      </div>
    );
  }
}

export default App;
