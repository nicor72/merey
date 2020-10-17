import styled from 'styled-components'

export default styled.div`
  .align-center {
    align-items: center;
  }

  p {
    font-size: 12px;
  }
  
  span {
    font-weight: bolder;
  }
  
  button {
    display: flex;
    background-color: transparent;
    border: none;
    outline:none;
    
    &:hover {
      border: none;
    }
  }

  .product-details {
    align-items: center;
    text-align: end;
    p {
      margin: 0;
    }
  }
`