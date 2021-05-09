import styled from 'styled-components'
import PageLayout from '../components/layouts/PageLayout'
import PageHead from '../components/layouts/PageHead'
import { FlexContainerBetween, FlexContainerAlignCenter } from 'src/styles/FlexContainer'
import { TABLET_MIN_WIDTH } from 'src/models/constants'
import { ReactNode } from 'react'

const PADDING_TOP = '3rem'

const PaddingTop = styled.div`
  padding-top: ${PADDING_TOP};
`

const FixedPosition = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  z-index: 1;
  width: 100%;
  max-width: ${TABLET_MIN_WIDTH};
  height: ${PADDING_TOP};
  transform: translateX(-50%);
  background: #ffffff;
`

const HorizontalBorder = styled.div`
  border: 2px solid #ddd;
`

type Props = {
  children: ReactNode
}

function TopHeader({ children }: Props) {
  return (
    <>
      <FixedPosition>
        {children}
        <HorizontalBorder></HorizontalBorder>
      </FixedPosition>
      <PaddingTop />
    </>
  )
}

export default TopHeader
