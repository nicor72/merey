import { gql } from "apollo-boost"

export const PRODUCTS_BY_DEPARTMENT = gql`
  query productsByDeparments($deparment: String) {
    productos(where: {departamentoProducto: {nombre: {_eq: $deparment}} _and: {precio_de_venta: {_gt: 0}}}) {
      codigo
      nombre_de_productos
      formato
      precio_de_venta
      url_fotos
      cantidad_disponible
    }
  }`

export const PRODUCT_BY_ID = gql`
  query product($productId: [Int!]) {
    productos(where: {codigo: {_in: $productId} _and: {precio_de_venta: {_gt: 0}}}) {
      codigo
      descripcion
      etiquetas
      formato
      ingredientes
      nombre_de_productos
      origen
      precio_de_venta
      url_fotos
      cantidad_disponible
    }
  }`

export const HIGHTLIGHTS_PRODUCTS = gql`
  query product {
    productos(where: {producto_destacado: {_eq: 1} _and: {precio_de_venta: {_gt: 0}}}) {
      codigo
      nombre_de_productos
      formato
      precio_de_venta
      url_fotos
      cantidad_disponible
      departamentoProducto {
        nombre
      }
    }
  }`