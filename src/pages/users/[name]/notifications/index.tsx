import PageHead from 'src/components/layouts/PageHead'
import { Button } from 'antd'
import styled from 'styled-components'
import TopHeader from 'src/components/TopHeader'
import { FlexContainerBetween, FlexContainerAlignCenter } from 'src/styles/FlexContainer'
import NotificationsRoundedIcon from '@material-ui/icons/NotificationsRounded'
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded'
import grey from '@material-ui/core/colors/grey'
import useGoToPage from 'src/hooks/useGoToPage'
import useGoBack from 'src/hooks/useGoBack'
import NotificationCard from 'src/components/NotificationCard'
import { ClearAllButton } from 'src/pages/cart/index'
import PageLayout from 'src/components/layouts/PageLayout'

const description = '알림 설정한 매장의 새로운 소식을 확인해보세요.'

const FlexContainerBetween1 = styled(FlexContainerBetween)`
  height: 100%;
`

const WhiteText = styled.h5`
  color: #ffffff;
`

const NoMarginH3 = styled.h3`
  margin: 0;
`
const StyledArrowBackIosRoundedIcon = { fontSize: 20, color: grey[800] }

const StyledNotificationsRoundedIcon = { fontSize: 30, color: grey[800] }

const MarginDiv = styled.div`
  margin: 0.5rem;
`

function UserNotificationsPage() {
  const goBack = useGoBack()

  return (
    <PageHead title="디저트핏 - 알림" description={description}>
      <PageLayout>
        <TopHeader>
          <FlexContainerBetween1>
            <FlexContainerAlignCenter>
              <ArrowBackIosRoundedIcon style={StyledArrowBackIosRoundedIcon} onClick={goBack} />
            </FlexContainerAlignCenter>
            <FlexContainerAlignCenter>알림</FlexContainerAlignCenter>
            <FlexContainerAlignCenter>
              <ClearAllButton>전체삭제</ClearAllButton>
            </FlexContainerAlignCenter>
          </FlexContainerBetween1>
        </TopHeader>
        <MarginDiv>
          <NotificationCard />
          <NotificationCard />
          <NotificationCard />
        </MarginDiv>
      </PageLayout>
    </PageHead>
  )
}

export default UserNotificationsPage
