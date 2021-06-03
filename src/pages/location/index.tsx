import PageHead from 'src/components/layouts/PageHead'
import styled from 'styled-components'
import TopHeader from 'src/components/TopHeader'
import { FlexContainerBetween, FlexContainerAlignCenter } from 'src/styles/FlexContainer'
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded'
import grey from '@material-ui/core/colors/grey'
import useGoBack from 'src/hooks/useGoBack'

const FlexContainerBetween1 = styled(FlexContainerBetween)`
  height: 100%;
`
const FlexContainerCenterCenter = styled(FlexContainerAlignCenter)`
  justify-content: center;
  height: 100%;
`
const WhiteText = styled.h5`
  color: #ffffff;
`
const StyledArrowBackIosRoundedIcon = { fontSize: 20, color: grey[800] }

function Location() {
  const goBack = useGoBack()

  return (
    <PageHead>
      <TopHeader>
        <FlexContainerBetween1>
          <FlexContainerAlignCenter>
            <ArrowBackIosRoundedIcon style={StyledArrowBackIosRoundedIcon} onClick={goBack} />
          </FlexContainerAlignCenter>
          <FlexContainerCenterCenter>주소지 설정</FlexContainerCenterCenter>
          <WhiteText>ㅇ</WhiteText>
        </FlexContainerBetween1>
      </TopHeader>
    </PageHead>
  )
}

export default Location
