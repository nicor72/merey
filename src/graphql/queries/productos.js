import { gql } from "apollo-boost"

export const PRODUCTS_BY_DEPARTMENT = gql`
  query productsByDeparments($deparment: String) {
    productos(where: { nombre_depto: {_eq: $deparment} _and: {precio_web: {_gt: 0}}}) {
      codigo
      nombre
      formato_web
      variante_web
      precio_web
      fotos
      cantidad_disponible
    }
  }`

export const PRODUCT_BY_ID = gql`
  query product($productId: [bigint!]) {
    productos(where: {codigo: {_in: $productId} _and: {precio_web: {_gt: 0}}}) {
      codigo
      descripcion
      etiquetas
      formato_web
      variante_web
      ingredientes
      nombre
      origen
      precio_web
      fotos
      cantidad_disponible
    }
  }`

export const HIGHTLIGHTS_PRODUCTS = gql`
  query product {
    productos(where: {destacado: {_eq: true} _and: {precio_web: {_gt: 0}}}) {
      codigo
      nombre
      formato_web
      variante_web
      precio_web
      fotos
      cantidad_disponible
      departamentoProducto {
        nombre
      }
    }
  }`

export const SEARCH_PRODUCTS = gql`
  query product($name: String) {
    productos(where: {nombre: {_ilike: $name}}) {
      codigo
      nombre
      departamentoProducto {
        nombre
      }
    }
  }`