import styled from 'styled-components'
import { CSVLink } from 'react-csv'
import { useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import TableProvider, { TableContext } from './store/context'
import { Actions } from './store/reducer'
import { TableStyled } from './styles'
import TableBody from './TableBody'
import TableFooter from './TableFooter'
import TableHeader from './TableHeader'
import { FlexBox } from '../../../styles' // Elimina las referencias a componentes de fuera de ITA Table, la idea es que sea un componente que puedas reutilizar facilmente
import { Button, Text } from '../../atoms' // Elimina las referencias a componentes de fuera de ITA Table, la idea es que sea un componente que puedas reutilizar facilmente

const GapFlexBox = styled(FlexBox)`
  gap: 20px;
  margin-bottom: 2rem;
`
const MarginText = styled(Text)`
  margin: 0;
`

// Elimina CSVLink, tiene que ser una función creada por ti
const DownloadBnt = styled(CSVLink)`
  background-color: green;
  padding: 10px;
  border-radius: 4px;
  text-decoration: none;
  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`

const DownloadIcon = styled.span`
  color: white;
  margin-right: 5px;
`

function Table({ columns, data, showHeader = true }) {
  const { dispatch } = useContext(TableContext)

  useEffect(() => {
    dispatch({ type: Actions.SET_DATA, payload: data })
    dispatch({ type: Actions.SET_COLUMNS, payload: columns })
  }, [data, columns, dispatch])

  return (
    <TableStyled>
      {showHeader && <TableHeader />}
      <TableBody />
      <TableFooter columns={columns.length} />
    </TableStyled>
  )
}

// Haz el destruct en la declaración de la función. function ITATable({data}) {
function ITATable(props) {
  const { data } = props
  return (
    <TableProvider>
      <GapFlexBox direction="row" justify="flex-end">
        {/* Estos botones deben estar fuera de la tabla */}
        <Button background="#3777c4">
          <MarginText color="white">Viviendas</MarginText>
        </Button>
        <Button background="white">
          <MarginText color="grey">Por barrio</MarginText>
        </Button>
        <DownloadBnt data={data} background="green">
          <DownloadIcon className="material-symbols-outlined">
            system_update_alt
          </DownloadIcon>
          <MarginText color="white">Descargar</MarginText>
        </DownloadBnt>
      </GapFlexBox>
      <Table {...props} />
    </TableProvider>
  )
}

Table.propTypes = {
  columns: PropTypes.instanceOf(Array),
  data: PropTypes.instanceOf(Array),
  showHeader: PropTypes.bool.isRequired,
}

export default ITATable
