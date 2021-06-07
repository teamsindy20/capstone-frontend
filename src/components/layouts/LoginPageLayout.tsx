import Image from 'next/image'
import { ReactNode } from 'react'
import { FlexContainerAlignCenter } from 'src/styles/FlexContainer'
import styled from 'styled-components'

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
        <Image
          src="/dessert-fit-logo-white.png"
          alt="dessert-fit-logo-white.png"
          width="124"
          height="124"
        />
        <LogoTextImg src="/dessert-fit-text.png" alt="dessert-fit-text.png" />
        <h4>어? 나 디저트 좋아하네</h4>
        <h4>나만의 디저트를 핏하다</h4>
      </FlexContainerColumn>
      {children}

      <Padding />
    </>
  )
}

export default LoginPageLayout
