import React from 'react'
import { Body } from '../components/layout'
import { ITATable } from '../components/organisms'
import { Container } from '../styles'
import { urls } from '../constants'
import { useFetch } from '../hooks'

const columns = [
  {
    id: 'title',
    label: 'Nombre',
  },
  {
    id: 'price',
    label: 'Precio',
  },
  {
    id: 'district',
    label: 'Barrio',
  },
  {
    id: 'type',
    label: 'Tipo vivienda',
  },
]

function Data() {
  const { data, loading, isSuccess } = useFetch(`${urls.houses}`)

  return (
    <Body>
      <Container style={{ marginTop: '2rem' }}>
        {/* El loading debe gestionarse desde la tabla, no fuera, generando una tabla vacia con X columnas y filas, para parecer que esta cargando, los datos a mostrar un Shimmer */}
        {loading && <div>Loading...</div>}
        {isSuccess && <ITATable columns={columns} data={data} />}
      </Container>
    </Body>
  )
}

export default Data
