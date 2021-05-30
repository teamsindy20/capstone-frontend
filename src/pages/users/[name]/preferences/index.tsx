import PageHead from 'src/components/layouts/PageHead'
import PageLayout from 'src/components/layouts/PageLayout'
import TopHeader from 'src/components/TopHeader'
import { FlexContainerBetween, FlexContainerAlignCenter } from 'src/styles/FlexContainer'
import styled from 'styled-components'
import grey from '@material-ui/core/colors/grey'
import { Button } from 'antd'
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
      </PageLayout>
    </PageHead>
  )
}

export default UserPreferencesPage
