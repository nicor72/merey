import styled from 'styled-components'

export default styled.div`
  button, input {
    text-align: center;
    font-weight: 700;
  }
  p {
    margin: auto;
  }
  .col {
    padding: 1rem;
    text-align: center;
  }
  .button {
    border: 1px solid #eeeeee;
    box-sizing: border-box;
    margin: 0;
    outline: none;
    /* padding: 10px; */
  }
  input[type="button"] {
    -webkit-appearance: button;
    cursor: pointer;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  .input-group {
    clear: both;
    margin: auto;
    position: relative;
    width: auto;
  }

  .input-group input[type='button'] {
    background-color: #eeeeee;
    min-width: 38px;
    width: auto;
    transition: all 300ms ease;
  }

  .input-group .button-minus,
  .input-group .button-plus {
    font-weight: bold;
    height: 38px;
    padding: 0;
    width: 38px;
    position: relative;
  }
  .error {
    input[type="number"] {
      border: 1px red solid;
    }
    p {
      color: red
    }  
  }
`