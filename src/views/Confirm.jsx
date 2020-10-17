import React from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { setWebpay } from '../redux/actions/webpay'

export default () => {
  // const ref = useRef(null)
  // const dispatch = useDispatch()
  // const { cart, webpay } = useSelector((state) => state)
  
  // useEffect(() => {
  //   const response = dispatch(setWebpay(cart))
  //   if (response.success) ref.current.submit()
  // }, [])

  return (
    <React.Fragment>
      <h2>CONFIRMAR</h2>
      {/* <form ref={ref} id="webpay-form" action={webpay.url} method="post">
        <input type="hidden" name={webpay.inputName} value={webpay.token} />
      </form> */}
    </React.Fragment>
  )
}