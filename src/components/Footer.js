import React, { Component } from 'react';

class Info extends Component {
  render() {
    return (
      <div>
        <footer>
          <div className="row justify-content-md-center bg-black">
            <div className="col-md-auto">
              <p className="small-padding-top"><a href="https://goo.gl/maps/RjqWfruGcTu" target="_blank">Avenida Apoquindo 7482, Las Condes</a> - <a href="tel:+56948826938" target="_blank">+56 9 4882 6938</a></p>
            </div>
          </div>
          <div className="row justify-content-md-center bg-black">
            <div className="col-md-auto">
              <p><a href="mailto:mereytostaduria@gmail.com" target="_blank">mereytostaduria@gmail.com</a></p> 
              <p></p> 
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default Info;