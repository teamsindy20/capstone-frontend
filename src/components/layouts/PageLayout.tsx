import { ReactNode } from 'react'
import styled from 'styled-components'
import Footer from '../Footer'
import Header from '../Header'

const FlexContainerGap = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 5rem;
`

type Props = {
  children: ReactNode
}

function PageLayout({ children }: Props) {
  return (
    <FlexContainerGap>
      <Header />
      <main>{children}</main>
      <Footer />
    </FlexContainerGap>
  )
}

export default PageLayout
