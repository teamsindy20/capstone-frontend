import PageHead from 'src/components/layouts/PageHead'
import { Button } from 'antd'
import styled from 'styled-components'
import TopHeader from 'src/components/TopHeader'
import { FlexContainerAlignCenter } from 'src/styles/FlexContainer'
import NotificationsRoundedIcon from '@material-ui/icons/NotificationsRounded'
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded'
import grey from '@material-ui/core/colors/grey'
import useGoToPage from 'src/hooks/useGoToPage'
import useGoBack from 'src/hooks/useGoBack'

const description = '알림 설정한 매장의 새로운 소식을 확인해보세요.'

const FlexContainerCenterCenter = styled(FlexContainerAlignCenter)`
  justify-content: center;
  height: 100%;
`

const NoMarginH3 = styled.h3`
  margin: 0;
`
const StyledArrowBackIosRoundedIcon = { fontSize: 20, color: grey[800] }

const StyledNotificationsRoundedIcon = { fontSize: 30, color: grey[800] }

function UserNotificationsPage() {
  const goBack = useGoBack()

  return (
    <PageHead title="디저트핏 - 알림" description={description}>
      <TopHeader>
        <FlexContainerCenterCenter>
          <FlexContainerAlignCenter>
            <ArrowBackIosRoundedIcon style={StyledArrowBackIosRoundedIcon} onClick={goBack} />
          </FlexContainerAlignCenter>
          <NotificationsRoundedIcon style={StyledNotificationsRoundedIcon} />
          <NoMarginH3>알림</NoMarginH3>
        </FlexContainerCenterCenter>
      </TopHeader>
    </PageHead>
  )
}

export default UserNotificationsPage
