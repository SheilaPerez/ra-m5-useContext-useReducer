import React, { useContext } from 'react'
import { TableContext } from './store/context'
import { TableCell } from './styles'
import tablePages from '../../../helpers/tablePages'

function TableBody() {
  const { state } = useContext(TableContext)
  const { data, columns } = state
  return (
    <tbody>
      {data
        .filter((house, idx) => tablePages(idx, state))
        .map((d) => (
          <tr key={d.id}>
            {columns
              .filter((col) => !col.isHidden)
              .map((col) => (
                <TableCell key={`${d.id}-${col.id}`}>
                  {col.cell ? col.cell(d) : d[col.id]}
                </TableCell>
              ))}
          </tr>
        ))}
    </tbody>
  )
}

export default TableBody
