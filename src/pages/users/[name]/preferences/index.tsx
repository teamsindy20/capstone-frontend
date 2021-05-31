import PageHead from 'src/components/layouts/PageHead'
import PageLayout from 'src/components/layouts/PageLayout'
import TopHeader from 'src/components/TopHeader'
import { FlexContainerBetween, FlexContainerAlignCenter } from 'src/styles/FlexContainer'
import styled from 'styled-components'
import grey from '@material-ui/core/colors/grey'
import { Button, Divider } from 'antd'
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded'
import useGoBack from 'src/hooks/useGoBack'

const description = '홈 화면에 표시될 메뉴의 취향을 선택해봐요.'

const StyledArrowBackIosRoundedIcon = { fontSize: 20, color: grey[800] }

const MarginDiv = styled.div`
  margin: 0.5rem;
`
const FlexContainerBetween1 = styled(FlexContainerBetween)`
  height: 100%;
`
const TopGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 8fr;
`

const TopImage = styled.img`
  border-radius: 50%;
  width: 4rem;
  align-items: center;
`

const TopText = styled.h3`
  font-weight: bold;
`
function UserPreferencesPage() {
  const goBack = useGoBack()

  return (
    <PageHead title="디저트핏 - 취향 선택" description={description}>
      <PageLayout>
        <TopHeader>
          <FlexContainerBetween1>
            <FlexContainerAlignCenter>
              <ArrowBackIosRoundedIcon style={StyledArrowBackIosRoundedIcon} onClick={goBack} />
            </FlexContainerAlignCenter>
            <FlexContainerAlignCenter>취향선택</FlexContainerAlignCenter>
            <FlexContainerAlignCenter>
              <Button size="small">ㅇ</Button>
            </FlexContainerAlignCenter>
          </FlexContainerBetween1>
        </TopHeader>
        <MarginDiv>
          <TopGrid>
            <TopImage src="/DessertFit.png"></TopImage>
            <TopText>
              홈 화면에서 보고싶은 <br /> 디저트 핏을 설정해보세요!
            </TopText>
          </TopGrid>
          <Divider orientation="left">#맛</Divider>
          <Button shape="round">달콤</Button>
          <Button shape="round">달콤</Button>
          <Button shape="round">달콤</Button>
          <Button shape="round">달콤</Button>
          <Divider />
        </MarginDiv>
      </PageLayout>
    </PageHead>
  )
}

export default UserPreferencesPage
