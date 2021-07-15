let initialState = JSON.parse(localStorage.getItem('state'))

if (initialState === null) {
  initialState = [];
}

export const cart = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT':

      const product = {
        id: action.productCode,
        cantidad: 1,
        selectedFormatoWeb: action.selectedFormatoWeb
      }

      return [...state, product]

    case 'UPDATE_PRODUCT':
      const stateProduct = state.find(
        product => product.id === action.productCode
      )

      stateProduct.cantidad = Number(action.quantity)

      return [...state]

    case 'UPDATE_SELECTED_FORMAT':
      const stateFormat = state.find(
        product => product.id === action.productCode
      )

      if (stateFormat) {
        stateFormat.selectedFormatoWeb = action.selectedFormatoWeb
      }


      return [...state]

    case 'REMOVE_PRODUCT':
      const newState = state.filter(
        product => product.id !== action.productCode
      )

      return newState

    case 'CLEAN_CART':
      return []

    default:
      return state
  }
}