import React from 'react'
import Carousel from '../components/Carousel'
import Highlights from '../components/Highlights'

export default ({ match }) => {
  
  const bannerUrls = [
    "https://lh3.googleusercontent.com/pw/ACtC-3e3C6CT3oqGjm_OO3WmCZW4Ry8sFZBDoq5KkrL-FwHZImOjEQwdWoxCli_HYGWKCRJ45D3zGPVvuykDxgCySExGN2EKWY-FPDsng7MKHQ1Q5TgemtYqScawduAkdextYyjKRQ04IeJLZjrUaKMwGwYS=w1560-h908-no?authuser=1",
    "https://lh3.googleusercontent.com/pw/ACtC-3fSXrhmMciS0R50f_NLjm1oWMGhf9Kw5SVerUsWOb4D3hBbehdFUuF8aY5vdahLZshVbF0oEFdZCtiqBVpUkh7lATziLaMdzpgjU7VYHoWD6HSluQYxf70MqDy49iqH_eNP9eWAbKt3JlJfKYLrHP3J=w1560-h954-no?authuser=1"
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
      <Carousel items={bannerItems}/>
      <Highlights/>
    </React.Fragment>
  )
}
