import { ReactNode } from 'react'
import { HEADER_HEIGHT } from 'src/models/constants'
import styled from 'styled-components'
import Header from '../Header'

export const Padding = styled.div`
  padding: ${HEADER_HEIGHT} 0 0;
`

type Props = {
  children: ReactNode
}

function PageLayout({ children }: Props) {
  return (
    <>
      {children}
      <Padding />
      <Header />
    </>
  )
}

export default PageLayout
