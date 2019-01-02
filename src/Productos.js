import React, { Component } from 'react';
import posed from "react-pose";

import nuts from './images/circle-nuts.png';

const MoreButtonDiv = posed.div({
  idle: { scale: 1 },
  hovered: { scale: 1.5 }
});

const InfoProduct = posed.div({
  idle: { 
    opacity: 0,
    transition: {
      ease: 'easeOut',
      duration: 300
    } 
  },
  show: { 
    opacity: 1,
    transition: {
      ease: 'easeIn',
      duration: 300
    } 
  }
});

class Productos extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: "",
      show: true,
      buttonId: '',
      hoveringName: "",
      hovering: false
    }

    this.click= this.click.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
  }
  
  onMouseEnter(event){
    console.log(event.currentTarget.name);
  }

  click(event) {
    let name = event.currentTarget.name;
    let id_button = event.currentTarget.id;
    
    if (id_button === 'more') {
      let show = true;
      this.setState({show: show});
    } else {
      let show = false;
      this.setState({show: show});
    }

    this.setState({name: name});
  }

  render() {

    const productStyle = {
      paddingBottom: 30 + 'px',
      paddingTop: 30 + 'px'
    }

    const products = [
      {
        id: 0,
        title: "FRUTOS SECOS",
        name: "secos",
        src: nuts,
        description: "Somos importadores y tostadores de café desde 1920. Nuestro Café 100% arábico proviene de las mejores plantaciones de Brasil.",
        list: [
          "producto 1",
          "producto 2",
          "producto 3",
        ]
      },
      { 
        id: 1,
        title: "CEREALES",
        name: "cereales",
        src: nuts,
        description: "Somos importadores y tostadores de café desde 1920. Nuestro Café 100% arábico proviene de las mejores plantaciones de Brasil.",
        list: [
          "PRODUCTO 100 GR.",
          "PRODUCTO 200 GR",
          "PRODUCTO 300 GR",
          "PRODUCTO 100 GR.",
          "PRODUCTO 200 GR",
          "PRODUCTO 300 GR",
        ]
      },
      { 
        id: 2,
        title: "CEREALES",
        name: "cereales",
        src: nuts,
        description: "Somos importadores y tostadores de café desde 1920. Nuestro Café 100% arábico proviene de las mejores plantaciones de Brasil.",
        list: [
          "PRODUCTO 100 GR.",
          "PRODUCTO 200 GR",
          "PRODUCTO 300 GR",
          "PRODUCTO 100 GR.",
          "PRODUCTO 200 GR",
          "PRODUCTO 300 GR",
        ]
      },
      { 
        id: 3,
        title: "CEREALES",
        name: "cereales",
        src: nuts,
        description: "Somos importadores y tostadores de café desde 1920. Nuestro Café 100% arábico proviene de las mejores plantaciones de Brasil.",
        list: [
          "PRODUCTO 100 GR.",
          "PRODUCTO 200 GR",
          "PRODUCTO 300 GR",
          "PRODUCTO 100 GR.",
          "PRODUCTO 200 GR",
          "PRODUCTO 300 GR",
        ]
      }
    ]

    return (
      <div>
      	<div className="container">
          <h1 className="sub-main-title">
            PRODUCTOS
	        </h1>
          <div className="row">
          {
            products.map((product, index) => 

              <div key={product.id} className={`col-sm-6`} style={productStyle}>
                <img className="img-responsive center-block" src={product.src} alt="Café" style={{paddingBottom: 30 + 'px'}}/>
                <div className="product">
                  <div className="row justify-content-md-center">
                    <div className="col-sm-auto">
                      <h1 className="product-title">{product.title}</h1>
                    </div>  
                  </div>  
                  {
                    <div>
                      <MoreButtonDiv 
                        pose={this.state.hovering && this.state.hoveringName === product.name && this.state.buttonId === 'more' ? "hovered" : "idle"} 
                        className="product-button-div"
                      >
                        <button 
                          id="more" 
                          name={product.name} 
                          className="product-button"
                          onClick={this.click}
                          onMouseEnter={(e) => this.setState({ hovering: true, hoveringName: e.currentTarget.name, buttonId: e.currentTarget.id })}
                          onMouseLeave={(e) => this.setState({ hovering: false, hoveringName: '', buttonId: '' })}
                        >
                          VER MÁS
                        </button>
                      </MoreButtonDiv>
                      
                      <InfoProduct pose={ this.state.show && this.state.name === product.name ? 'show' : 'idle' } >
                        <div className="product-info">
                          {product.description}
                        </div>
                        <div className="product-detail">
                          <div className="product-detail-title">
                              LISTA DE PRODUCTOS
                          </div> 
                          <div className="row product-list">
                            <ul className="list-inline">
                              {
                                product.list.map((li, index) =>
                                  <li key={index} className="list-inline-item"><i className="far fa-bookmark"></i> {li}</li>
                                )
                              }
                            </ul>  
                          </div>  
                          <MoreButtonDiv 
                            pose={this.state.hovering && this.state.hoveringName === product.name && this.state.buttonId === 'less' ? "hovered" : "idle"}
                            className="product-button-div"
                          >
                            <button 
                              id="less" 
                              name={product.name} 
                              className="product-button"
                              onClick={this.click}
                              onMouseEnter={(e) => this.setState({ hovering: true, hoveringName: e.currentTarget.name, buttonId: e.currentTarget.id })}
                              onMouseLeave={(e) => this.setState({ hovering: false, hoveringName: '', buttonId: '' })}
                            >
                              VER MENOS
                            </button>
                          </MoreButtonDiv> 
                        </div> 
                      </InfoProduct>
                    </div>
                  }
                </div>
              </div>
            )
          }
          </div>
	      </div>    
      </div>
    );
  }
}

export default Productos;