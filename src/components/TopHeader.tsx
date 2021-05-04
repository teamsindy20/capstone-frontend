import styled from 'styled-components'
import PageLayout from '../components/layouts/PageLayout'
import PageHead from '../components/layouts/PageHead'
import { FlexContainerBetween, FlexContainerAlignCenter } from 'src/styles/FlexContainer'
import { TABLET_MIN_WIDTH } from 'src/models/constants'

const PADDING_TOP = '3rem'

const PaddingTop = styled.div`
  padding-top: ${PADDING_TOP};
`

const FlexContainerBetweenCenter = styled(FlexContainerBetween)`
  align-items: center;
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

function TopHeader() {
  return (
    <PageHead>
      <PageLayout>
        <FlexContainerBetweenCenter>
          <FlexContainerAlignCenter>매장소식</FlexContainerAlignCenter>
        </FlexContainerBetweenCenter>
        <PaddingTop />
      </PageLayout>
    </PageHead>
  )
}

export default TopHeader
