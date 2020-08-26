import styled from 'styled-components'

export default styled.div`
  background-color: black !important;

  .navbar {
    background-color: black !important;
  }

  ul {
    list-style-type: none;
  }

  li {
    padding: 0 !important;
    a {
      color: black;
    }
  }

  button {
    background-color: transparent;
    border: none;
    outline:none;
    color: white;
    &:hover {
      border: none;
    }
    svg {
      display: initial;
    }
  }
  .clearfix {
    width: 100%;
    height: 9rem;
  }
  
  .badge {
    margin-left: .5rem;
  }

  ul {
    padding: 1rem;
  }

  @media (min-width: 992px) {
    svg {
      display: none;
    }
  }
`