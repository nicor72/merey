import axios from 'axios'

export const setWebpay = (cart) => {
  return async (dispatch) => {
    return axios.post('http://localhost:5000/webpay/init', { cart })
      .then(response => {
        dispatch({
          type: 'SET_WEBPAY',
          result: response.data,
        })
        return { success: true, detail: '' }
      }).catch(error => {
        return { success: false, detail: error }
      })
  }
}