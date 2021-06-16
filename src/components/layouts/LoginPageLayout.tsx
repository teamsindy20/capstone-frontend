import Image from 'next/image'
import { ReactNode } from 'react'
import { FlexContainerAlignCenter } from 'src/components/atoms/FlexContainer'
import styled from 'styled-components'
import ClientSideLink from '../atoms/ClientSideLink'

const Padding = styled.div`
  padding: 1rem;
`

const FlexContainerColumn = styled(FlexContainerAlignCenter)`
  flex-flow: column nowrap;
  gap: 1rem;
  padding: 1rem;
`

const LogoTextImg = styled.img`
  margin: 0;
  width: 8rem;
  height: 3rem;
`

type Props = {
  children: ReactNode
}

function LoginPageLayout({ children }: Props) {
  return (
    <>
      <Padding />
      <FlexContainerColumn>
        <ClientSideLink href="/">
          <Image
            src="/dessert-fit-logo-white.png"
            alt="dessert-fit-logo-white.png"
            width="150"
            height="150"
          />
        </ClientSideLink>
        <ClientSideLink href="/">
          <LogoTextImg src="/dessert-fit-text.png" alt="dessert-fit-text.png" />
        </ClientSideLink>
      </FlexContainerColumn>
      {children}
      <Padding />
    </>
  )
}

export default LoginPageLayout
