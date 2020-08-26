import styled from 'styled-components'

export default styled.div`
  text-align: center;

  a {
    color: initial;
    &:hover {
      text-decoration: none;
    }
  }  
  
  .product-img {
    height: 15em;
    text-align: center;
    background-image: url(${props => props.url ? props.url : ''});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
  
  .product-details {
    padding: 1em;
  }
  .product-name:hover {
    text-decoration: none;
  }

  .product-name {
    font-size:  small;
  }
`