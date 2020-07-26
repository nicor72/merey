export const cart = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return [
        ...state,
        action.product
      ]

    case 'REMOVE_PRODUCT':
      const newState = state.filter(product => 
        product.codigo === action.productCode
      )
      return newState

    default:
      return state
  }
}