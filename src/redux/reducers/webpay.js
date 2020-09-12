const initialState = { url: '/', inputName: 'name', token: 'token' };

export const webpay = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_WEBPAY':
      return action.result

    default:
      return state
  }
}