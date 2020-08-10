import React from 'react'
import Carousel from '../components/Carousel'
import Highlights from '../components/Highlights'
import styled from 'styled-components'

const Wrapper = styled.div`
  background-color: black;
`

export default ({ match }) => {
  
  const bannerUrls = [
    "https://lh3.googleusercontent.com/pw/ACtC-3dDlpyWbVOb_WI038x4xdlkrLYre8FqHiOOyTDk_3PxHTTtaWgzgPCpBfNRrRX-iVzQ-Hn1qwqzFG4-gm97aGAKQ88YMZYEh4oNU2tpeEddFe4HvZDKLzw8DfC7cH6IM33U88F0biL-MvOHk5YMcH9i=w1560-h906-no?authuser=0",
    "https://lh3.googleusercontent.com/pw/ACtC-3e3C6CT3oqGjm_OO3WmCZW4Ry8sFZBDoq5KkrL-FwHZImOjEQwdWoxCli_HYGWKCRJ45D3zGPVvuykDxgCySExGN2EKWY-FPDsng7MKHQ1Q5TgemtYqScawduAkdextYyjKRQ04IeJLZjrUaKMwGwYS=w1560-h908-no?authuser=1"
  ]
  
  const bannerItems = bannerUrls.map((url) =>
    <img 
      src={url}
      className="sliderimg" 
      alt="banner merey"
    />
  )

  return (
    <React.Fragment>
      <Wrapper>
        <Carousel items={bannerItems}/>
      </Wrapper>
      <Highlights/>
    </React.Fragment>
  )
}
