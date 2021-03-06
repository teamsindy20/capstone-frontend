import { ReactNode } from 'react'
import { HEADER_HEIGHT } from 'src/models/constants'
import styled from 'styled-components'
import Footer from '../Footer'
import Header from '../Header'

const Padding = styled.div`
  padding: ${HEADER_HEIGHT} 0 0;
`

type Props = {
  children: ReactNode
}

function PageLayout({ children }: Props) {
  return (
    <>
      <main>{children}</main>
      <Padding />
      <Header />
    </>
  )
}

export default PageLayout
