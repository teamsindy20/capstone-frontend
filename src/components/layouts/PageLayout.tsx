import { ReactNode } from 'react'
import { HEADER_HEIGHT, TABLET_MIN_WIDTH } from 'src/models/constants'
import styled from 'styled-components'
import Footer from '../Footer'
import Header from '../Header'

const MaxWidth = styled.div`
  max-width: ${TABLET_MIN_WIDTH};
  margin: 0 auto;
`

const Padding = styled.div`
  padding: ${HEADER_HEIGHT} 0 0;
`

type Props = {
  children: ReactNode
}

function PageLayout({ children }: Props) {
  return (
    <>
      <main>
        <MaxWidth>{children}</MaxWidth>
      </main>
      <Padding />
      <Header />
    </>
  )
}

export default PageLayout
