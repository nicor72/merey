import styled from 'styled-components'

export default styled.div`
  .sliderimg {
    width: 100%;
    height: 500px;
    object-fit: contain
  }
  .carousel-btn, .thumb-btn {
    /* background: none; */
    border: none;
    opacity: .7;
    border-radius: 50%;
    outline: none;
    .sliderimg {
      width: 5em;
      height: 5em;
    }
  }
  .carousel-btn {
    position: relative;
    bottom: 20em;
    &.next {
      float: right;
    }
  }
  svg {
    vertical-align: text-top;
  }
`