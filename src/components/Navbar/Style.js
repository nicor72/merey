import styled from 'styled-components'

export default styled.div`
  background-color: black !important;

  .navbar {
    background-color: black !important;
  }

  .nav-height img {
    height: 120px;
    object-fit: fill
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

  svg {
    display: none;
  }

  @media (max-width: 992px) {
    svg {
      display: block;
    }

    .nav-height img {
      height: 64px;
    }

    .clearfix {
      height: 5rem;
    }
  }
`