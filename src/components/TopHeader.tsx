import styled from 'styled-components'
import { TOP_HEADER_HEIGHT, TABLET_MIN_WIDTH } from 'src/models/constants'
import { ReactNode } from 'react'

export const BORDER_HEIGHT = '2px'

const PaddingTop = styled.div`
  padding-top: ${TOP_HEADER_HEIGHT};
`

const FixedPosition = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  z-index: 1;
  width: 100%;
  max-width: ${TABLET_MIN_WIDTH};
  height: ${TOP_HEADER_HEIGHT};
  transform: translateX(-50%);
  background: #ffffff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
`

const Height = styled.div`
  height: calc(${TOP_HEADER_HEIGHT} - ${BORDER_HEIGHT});
`

export const HorizontalBorder = styled.div`
  border: ${BORDER_HEIGHT} solid #ddd;
`

type Props = {
  children: ReactNode
}

function TopHeader({ children }: Props) {
  return (
    <>
      <FixedPosition>
        <Height>{children}</Height>
      </FixedPosition>
      <PaddingTop />
    </>
  )
}

export default TopHeader
