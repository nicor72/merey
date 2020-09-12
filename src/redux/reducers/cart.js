let initialState = JSON.parse(localStorage.getItem('state'))

if (initialState === null) {
  initialState = [];
}

export const cart = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT':

      const product = {
        codigo: action.productCode,
        cantidad: 1
      }

      return [...state, product]

    case 'UPDATE_PRODUCT':
      const stateProduct = state.find(
        product => product.codigo === action.productCode
      )

      stateProduct.cantidad = Number(action.quantity)

      return [...state]

    case 'REMOVE_PRODUCT':
      const newState = state.filter(
        product => product.codigo !== action.productCode
      )

      return newState

    default:
      return state
  }
}