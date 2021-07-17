import { useState, useEffect } from 'react'

const useProductDetails = (data) => {
  const [productState, setProductState] = useState(null)

  const getPrice = (product) => {
    let price
    if (product.formatosWeb.length > 1) {
      price = (product.precioVenta * (product.selectedFormatoWeb / 1000))
    } else {
      price = (product.precioVenta * product.formatoVenta)
    }

    return price.toFixed()
  }

  const getVariantArray = (variant) => {
    switch (variant) {
      case 'ml':
      case 'ltr':
        return ['ml', 'ltr']
      case 'cm':
      case 'mtrs':
        return ['cm', 'mtrs']
      case 'sobres':
        return ['sobres', 'sobres']
      case 'cap':
        return ['cap', 'cap']
      default:
        return ['grs', 'kg']
    }
  }

  const getPrettyFormat = (formato, variant = 'grs') => {
    const variantArray = getVariantArray(variant)
    let prettyFormat = `${formato} ${variantArray[1]}`
    if (formato < 1) {
      prettyFormat = `${formato * 1000} ${variantArray[0]}`
    }

    return prettyFormat
  }

  const initProductDetails = (product) => {
    const precioVenta = product.precio_venta
    const formatosWeb = product.formato_web.split(',')
    const selectedFormatoWeb = formatosWeb[0]
    const formatoVenta = product.formato_venta.replace(',', '.')
    const productPhotos = product.fotos ? product.fotos.split(',') : []

    const price = getPrice({
      formatosWeb,
      precioVenta,
      formatoVenta,
      selectedFormatoWeb
    })

    // let price
    let prettyFormat
    if (formatosWeb.length > 1) {
      // price = (precioVenta * (formatosWeb[0] / 1000))
      prettyFormat = getPrettyFormat(formatosWeb[0] / 1000, product.variante_web)
    } else {
      prettyFormat = getPrettyFormat(formatoVenta, product.variante_web)
      // price = (precioVenta * formatoVenta)
    }

    const initProduct = {
      ...product,
      price,
      formatosWeb,
      selectedFormatoWeb,
      formatoVenta,
      precioVenta,
      prettyFormat,
      productPhotos
    }

    setProductState(initProduct)

    return initProduct
  }

  useEffect(() => {
    if (data) {
      initProductDetails(data)
    }
  }, [data])

  return {
    productState,
    setProductState,
    initProductDetails,
    getPrettyFormat,
    getPrice
  }
}

export default useProductDetails