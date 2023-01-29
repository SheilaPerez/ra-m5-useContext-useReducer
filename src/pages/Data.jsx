/* eslint-disable no-restricted-syntax */
import React from 'react'
import styled from 'styled-components'
import { Body } from '../components/layout'
import { ITATable } from '../components/organisms'
import { Container } from '../styles'
import { urls } from '../constants'
import { useFetch } from '../hooks'
import FlexBox from '../styles/FlexBox'
import { Button, Text } from '../components/atoms'

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

const GapFlexBox = styled(FlexBox)`
  gap: 20px;
  margin-bottom: 2rem;
`
const MarginText = styled(Text)`
  margin: 0;
`
const DownloadBnt = styled(Button)`
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
function Data() {
  const { data, loading, isSuccess } = useFetch(`${urls.houses}`)

  const handleClickDownload = () => {
    let csv
    for (let row = 0; row < data.length; row += 1) {
      const keysAmount = Object.keys(data[row]).length
      let keysCounter = 0

      if (row === 0) {
        for (const key in data[row]) {
          if (key) {
            csv += key + (keysCounter + 1 < keysAmount ? ',' : '\r\n')
            keysCounter += 1
          }
        }
      } else {
        // eslint-disable-next-line guard-for-in
        for (const key in data[row]) {
          csv += data[row][key] + (keysCounter + 1 < keysAmount ? ',' : '\r\n')
          keysCounter += 1
        }
      }

      keysCounter = 0
    }
    downloadFile(csv)
  }

  const downloadFile = (csv) => {
    const link = document.createElement('a')
    link.id = 'download-csv'
    link.setAttribute(
      'href',
      `data:text/plain;charset=utf-8,${encodeURIComponent(csv)}`,
    )
    link.setAttribute('download', 'yourfiletextgoeshere.csv')
    document.body.appendChild(link)
    document.querySelector('#download-csv').click()
  }

  return (
    <Body>
      <Container style={{ marginTop: '2rem' }}>
        <GapFlexBox direction="row" justify="flex-end">
          <Button background="#3777c4">
            <MarginText color="white">Viviendas</MarginText>
          </Button>
          <Button background="white">
            <MarginText color="grey">Por barrio</MarginText>
          </Button>
          <DownloadBnt
            data={data}
            onClick={() => handleClickDownload()}
            background="green"
          >
            <MarginText color="white">Descargar</MarginText>
          </DownloadBnt>
        </GapFlexBox>
        <ITATable
          columns={columns}
          data={data}
          isLoading={loading}
          isSuccess={isSuccess}
        />
      </Container>
    </Body>
  )
}

export default Data
