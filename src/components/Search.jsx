import React from 'react'
import 'react-bootstrap-typeahead/css/Typeahead.css'
import { useHistory } from "react-router-dom"
import { AsyncTypeahead, ClearButton } from 'react-bootstrap-typeahead'
import { ListGroup } from 'react-bootstrap'
import { useLazyQuery } from '@apollo/react-hooks'
import { SEARCH_PRODUCTS } from '../graphql/queries/productos'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding: 1rem;
  
  button {
    border: none;
    padding: 0;
  }

  .active {
    background-color: grey;
  }
`

export default ({setShowNav}) => {
  let history = useHistory()
  const [getProducts, {loading, data}] = useLazyQuery(SEARCH_PRODUCTS)

  const handleClick = (selected) => {
    if (selected) {
      setShowNav(false)
      history.push(`/productos/${selected.departamentoProducto.nombre}/${selected.codigo}`)
    }
  }

  return (
    <Wrapper>
      <AsyncTypeahead
        id="async-example"
        labelKey="nombre_de_productos"
        isLoading={loading}
        minLength={0}
        onSearch={(query) => getProducts({ variables: { name: `%${query}%` }})}
        options={data ? data.productos : []}
        placeholder="¿Qué estas buscando?"
        promptText="Escribe para buscar"
        searchText="Buscando..."
        emptyLabel="No se encontraron coincidencias"
        onChange={(selected) => handleClick(selected[0])}
        renderMenuItemChildren={(option, props) =>
          <ListGroup.Item action
            onClick={() => handleClick(option)}
          >
            {option.nombre_de_productos}
          </ListGroup.Item>
        }
      >
        {({ onClear, selected }) => 
          <div className="rbt-aux">
            {!!selected.length && <ClearButton onClick={onClear} />}
          </div>
        }
      </AsyncTypeahead>
    </Wrapper>
  )
}