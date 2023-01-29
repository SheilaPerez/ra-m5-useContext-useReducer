import { useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import TableProvider, { TableContext } from './store/context'
import { Actions } from './store/reducer'
import { TableStyled } from './styles'
import TableBody from './TableBody'
import TableFooter from './TableFooter'
import TableHeader from './TableHeader'

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

function ITATable(props) {
  const { isLoading, isSuccess } = props
  return (
    <TableProvider>
      {isLoading && <p>Is loading</p>}
      {isSuccess && <Table {...props} />}
    </TableProvider>
  )
}

Table.propTypes = {
  columns: PropTypes.instanceOf(Array),
  data: PropTypes.instanceOf(Array),
  showHeader: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isSuccess: PropTypes.bool.isRequired,
}

export default ITATable
