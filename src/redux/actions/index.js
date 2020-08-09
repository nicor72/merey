export const addProduct = (productCode) => {
  return {
    type: 'ADD_PRODUCT',
    productCode
  }  
}

export const removeProduct = (productCode) => {
  return {
    type: 'REMOVE_PRODUCT',
    productCode
  }  
}

export const updateProduct = (productCode, quantity) => {
  return {
    type: 'UPDATE_PRODUCT',
    productCode,
    quantity
  }  
}

export const reduceProduct = (productCode) => {
  return {
    type: 'REDUCE_PRODUCT',
    productCode
  }  
}