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

const Sidebar = posed.ul({
  open: {
    x: '0%',
    delayChildren: 200,
    staggerChildren: 50,
    transition: { 
      duration: 500
    }
  },
  closed: { 
    x: '-200%',
    delay: 100
  }
});

const Item = posed.button({
  open: { y: 0,
    opacity: 1
  },
  closed: { y: 20, opacity: 0 },
  idle: { scale: 1 },
  hovered: { scale: 1.1 }
});


class Productos extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: "",
      show: false,
      buttonId: '',
      hoveringName: "",
      hovering: false,
      isOpen: false,
      idButton: 0
    }

    this.click= this.click.bind(this);
  }

  click(event) {
    let name = event.currentTarget.name;
    let id_button = event.currentTarget.id;

    this.setState({name: name, idButton: id_button, show: true});
  }

  componentDidMount() {
    setTimeout(this.toggle, 500);
  }

  toggle = () => this.setState({ isOpen: !this.state.isOpen });

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
        description: "Lorem ipsum dolor sit cuchuflí barquillo bacán jote gamba listeilor po cahuín, luca melón con vino pichanga coscacho ni ahí peinar la muñeca chuchada al chancho achoclonar. Chorrocientos pituto ubicatex huevo duro bolsero cachureo el hoyo del queque en cana huevón el año del loly hacerla corta impeque de miedo quilterry la raja longi ñecla. Hilo curado rayuela carrete quina guagua lorea piola ni ahí.",
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
        description: "Salvation dead suicide ocean burying transvaluation decieve disgust joy salvation snare snare truth. Disgust gains noble noble derive horror truth moral. Will faith truth will play good aversion faithful ultimate merciful pious noble. Suicide moral faithful faithful zarathustra abstract selfish society madness sea. Sea value faithful ubermensch burying hatred play noble good ideal right. Madness ultimate convictions truth philosophy self hatred derive battle.",
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
        title: "CONDIMENTOS",
        name: "condimentos",
        src: nuts,
        description: "Tu nunc coci ejus. Tu autem cocus Lab et probavimus liceat mihi sine causa est nunc coci interficere. Reputo it! Suus egregie. Ut antecedat. Quod si putas me posse facere, ergo ante. Pone aute in caput, et nunc interficere. Faciat! Fac. Fac. Fac.",
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
        title: "INTEGRALES",
        name: "integrales",
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

    const { isOpen, idButton } = this.state;

    return (
      <div>
      	<div className="container medium-margin-top">
          <h1 className="sub-main-title">
            PRODUCTOS
	        </h1>
            <div className="row">
              <div className="col-sm-5">
                <Sidebar className="sidebar" pose={isOpen ? 'open' : 'closed'}>
                  {
                    products.map((product, index) => 
                      <Item 
                        key={index}
                        pose={this.state.hovering && this.state.hoveringName === product.name ? "hovered" : "idle"}
                        className="item text-center"
                        id={product.id} 
                        name={product.name}
                        onClick={this.click}
                        onMouseEnter={(e) => this.setState({ hovering: true, hoveringName: e.currentTarget.name, buttonId: e.currentTarget.id })}
                        onMouseLeave={(e) => this.setState({ hovering: false, hoveringName: '', buttonId: '' })}
                      >
                        {product.title}
                      </Item>
                    )  
                  }
                </Sidebar>
              </div>
              <div className="col-md-6">
                {
                  this.state.show ?
                    <InfoProduct pose={ this.state.show ? 'show' : 'idle' } >
                      <h2 className="text-center" style={{paddingTop: 30 + 'px'}}>
                        {products[this.state.idButton].title}
                      </h2>
                      <div className="product-info">
                        {products[this.state.idButton].description}
                      </div>
                      <div className="product-detail">
                        <div className="product-detail-title">
                            LISTA DE PRODUCTOS
                        </div> 
                        <div className="row product-list">
                          <ul className="list-inline">
                            {
                              products[this.state.idButton].list.map((item, index) =>
                                <li key={index} className="list-inline-item"><i className="far fa-start"></i> {item}</li>
                              )
                            }
                          </ul>  
                        </div>
                      </div> 
                    </InfoProduct>
                  :
                  <InfoProduct pose={ !this.state.show ? 'show' : 'idle' }>
                    <h2 className="text-center" style={{paddingTop: 30 + 'px'}}>
                      Elige una categoria
                    </h2>
                  </InfoProduct>
                }
                
              </div>
            </div>  
	      </div>    
      </div>
    );
  }
}

export default Productos;