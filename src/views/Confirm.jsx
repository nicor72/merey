import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios';

export default () => {
  const { cart } = useSelector((state) => state)
  
  const [response, setResponse] = useState({})

  useEffect(() => {
    axios.post('http://localhost:5000/webpay/init', { cart })
    .then(res => {
      setResponse(res.data)
      ref.current.submit()
    })
  }, [])

  const ref = useRef(null)

  return (
    <React.Fragment>
      <h2>CONFIRM</h2>
      <form ref={ref} id="webpay-form" action={response.url} method="post">
        <input type="hidden" name={response.inputName} value={response.token} />
      </form>
    </React.Fragment>
  )
}