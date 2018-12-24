import React, { Component } from 'react';
import secos from './../images/secos.png';

class Info extends Component {
  render() {
    return (
      <div>
        <footer>
          <div className="row justify-content-md-center bg-black">
            <div className="col-md-auto">
              <p>Avenida Apoquindo 7482, Las Condes - +56 9 4882 6938</p>
            </div>
          </div>
          <div className="row justify-content-md-center bg-black">
            <div className="col-md-auto">
              <p>mereytostaduria@gmail.com</p> 
              <p></p> 
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default Info;