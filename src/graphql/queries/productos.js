import { gql } from "apollo-boost"

export const PRODUCTS_BY_DEPARTMENT = gql`
  query productsByDeparments($deparment: String) {
    productos(
      where: { 
        nombre_depto: {_eq: $deparment},
        precio_venta: {_gt: 0} 
      }, 
      order_by: {nombre: asc}
    ) {
      id
      codigo
      nombre
      formato_venta
      formato_web
      variante_web
      precio_venta
      fotos
      cantidad_disponible
    }
  }`

export const PRODUCT_BY_ID = gql`
  query product($productId: [uuid!]) {
    productos(where: {id: {_in: $productId} _and: {precio_venta: {_gt: 0}}}) {
      id
      codigo
      descripcion
      etiquetas
      formato_venta
      formato_web
      variante_web
      ingredientes
      nombre
      origen
      precio_venta
      fotos
      cantidad_disponible
    }
  }`

export const HIGHTLIGHTS_PRODUCTS = gql`
  query product {
    productos(where: {destacado: {_eq: true} _and: {precio_venta: {_gt: 0}}}) {
      id
      codigo
      nombre
      formato_venta
      formato_web
      variante_web
      precio_venta
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