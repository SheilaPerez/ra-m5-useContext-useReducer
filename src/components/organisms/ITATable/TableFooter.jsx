import { useContext } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { FlexBox } from '../../../styles'
// eslint-disable-next-line import/named
import { Text, Select } from '../../atoms'
import { Actions } from './store/reducer'
import { TableContext } from './store/context'

const AlignDiv = styled(FlexBox)`
  align-items: center;
  width: 100%;
  padding: 0 7px;
`
const ArrowDiv = styled.div`
  cursor: pointer;
  padding: 7px 0;
`
const FooterFont = styled(Text)`
  font-weight: bold;
  margin-right: 6px;
`
function TableFooter({ columns }) {
  const { state, dispatch } = useContext(TableContext)

  const nextPage = () => {
    dispatch({ type: Actions.PREVIOUS_PAGE })
  }

  const previousPage = () => {
    dispatch({ type: Actions.NEXT_PAGE })
  }

  const handleChangeSelect = (e) => {
    dispatch({ payload: e.target.value, type: Actions.SHOW_MORE_HOUSES })
  }

  return (
    <tfoot>
      <tr>
        <td colSpan={columns}>
          <AlignDiv direction="row" justify="space-between">
            <FlexBox direction="row">
              <ArrowDiv onClick={() => nextPage()}>
                <span className="material-symbols-outlined">
                  arrow_back_ios
                </span>
              </ArrowDiv>
              <FooterFont fontSize="12px">
                Página {state.currentPage} de 2
              </FooterFont>
              <ArrowDiv onClick={() => previousPage()}>
                <span className="material-symbols-outlined">
                  arrow_forward_ios
                </span>
              </ArrowDiv>
            </FlexBox>
            <AlignDiv direction="row" justify="flex-end">
              <FooterFont fontSize="12px">Mostrar</FooterFont>
              <div>
                <Select onChange={(e) => handleChangeSelect(e)}>
                  <option value="10">10</option>
                  <option value="15">15</option>
                </Select>
              </div>
            </AlignDiv>
          </AlignDiv>
        </td>
      </tr>
    </tfoot>
  )
}

TableFooter.propTypes = {
  columns: PropTypes.number.isRequired,
}

export default TableFooter
