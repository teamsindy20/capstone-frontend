import styled from 'styled-components'
import PageLayout from '../components/layouts/PageLayout'
import PageHead from '../components/layouts/PageHead'
import { FlexContainerBetween, FlexContainerAlignCenter } from 'src/styles/FlexContainer'
import { TABLET_MIN_WIDTH } from 'src/models/constants'
import { ReactNode } from 'react'

const PADDING_TOP = '3rem'
const BORDER_HEIGHT = '2px'

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

const Height = styled.div`
  height: calc(${PADDING_TOP} - ${BORDER_HEIGHT});
`

const HorizontalBorder = styled.div`
  border: ${BORDER_HEIGHT} solid #ddd;
  /* position: fixed; */
`

type Props = {
  children: ReactNode
}

function TopHeader({ children }: Props) {
  return (
    <>
      <FixedPosition>
        <Height>{children}</Height>
        <HorizontalBorder />
      </FixedPosition>
      <PaddingTop />
    </>
  )
}

export default TopHeader
