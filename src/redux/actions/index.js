export const addProduct = (product) => {
  return {
    type: 'ADD_PRODUCT',
    product
  }  
}

export const removeProduct = (productCode) => {
  return {
    type: 'REMOVE_PRODUCT',
    productCode
  }  
}

export const addCrumb = (crumb) => {
  return {
    type: 'ADD_CRUMB',
    crumb
  }  
}

export const removeCrumb = (crumbCode) => {
  return {
    type: 'REMOVE_CRUMB',
    crumbCode
  }  
}