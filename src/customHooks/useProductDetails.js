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

    return price
  }

  const getPrettyFormat = (formato) => {
    let prettyFormat = `${formato} kg`
    if (formato < 1) {
      prettyFormat = `${formato * 1000} grs`
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
      prettyFormat = getPrettyFormat(formatosWeb[0] / 1000)
    } else {
      prettyFormat = getPrettyFormat(formatoVenta)
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