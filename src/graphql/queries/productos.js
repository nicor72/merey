import { gql } from "apollo-boost"

export const PRODUCTS_BY_DEPARTMENT = gql`
  query deparments($deparment: String) {
    productos(where: {departamentoProducto: {nombre: {_eq: $deparment}}}) {
      codigo
      nombre_de_productos
      formato
      precio_de_venta
      url_fotos
    }
  }`

export const PRODUCT_BY_ID = gql`
  query product($productId: Int) {
    productos(where: {codigo: {_eq: $productId}}) {
      codigo
      departamento
      descripcion
      etiquetas
      formato
      ingredientes
      nombre_de_productos
      origen
      precio_de_venta
      url_fotos
    }
  }`