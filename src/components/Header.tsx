import AssignmentTwoToneIcon from '@material-ui/icons/AssignmentRounded'
import HomeRoundedIcon from '@material-ui/icons/HomeRounded'
import PersonRoundedIcon from '@material-ui/icons/PersonRounded'
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded'
import StoreRoundedIcon from '@material-ui/icons/StoreRounded'
import Link from 'next/link'
import { memo } from 'react'
import { HEADER_HEIGHT, TABLET_MIN_WIDTH } from 'src/models/constants'
import { username } from 'src/models/mock-data'
import ClientSideLink from 'src/components/atoms/ClientSideLink'
import { FlexContainerAlignCenter } from 'src/styles/FlexContainer'
import styled from 'styled-components'
import { grey } from '@material-ui/core/colors'

const FixedHeader = styled.header`
  position: fixed;
  left: 50%;
  bottom: 0;
  z-index: 1;
  transform: translateX(-50%);

  width: 100%;
  max-width: ${TABLET_MIN_WIDTH};
  height: ${HEADER_HEIGHT};

  background-color: #ffc9c3;
  box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.15), 0 0 0 rgba(16, 22, 26, 0), 0 0 0 rgba(16, 22, 26, 0);
`

const FlexContainerAroundNav = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;

  height: 100%;

  > a {
    flex-grow: 1;
    height: 100%;
  }
`

const FlexContainerColumnCenterCenter = styled(FlexContainerAlignCenter)`
  flex-flow: column nowrap;
  justify-content: center;

  height: 100%;
`

const NoMarginH6 = styled.h5`
  margin: 0;
`

const StyledHomeRoundedIcon = { fontSize: 30, color: grey[800] }

function Header() {
  return (
    <FixedHeader>
      <FlexContainerAroundNav>
        <ClientSideLink href="/">
          <FlexContainerColumnCenterCenter>
            <HomeRoundedIcon style={StyledHomeRoundedIcon} />
            <NoMarginH6>홈</NoMarginH6>
          </FlexContainerColumnCenterCenter>
        </ClientSideLink>
        <ClientSideLink href="/feed">
          <FlexContainerColumnCenterCenter>
            <StoreRoundedIcon style={{ fontSize: 30, color: grey[800] }} />
            <NoMarginH6>소식</NoMarginH6>
          </FlexContainerColumnCenterCenter>
        </ClientSideLink>
        <ClientSideLink href={`/users/${username}/favorite-menus`}>
          <FlexContainerColumnCenterCenter>
            <FavoriteRoundedIcon style={{ fontSize: 30, color: grey[800] }} />
            <NoMarginH6>찜</NoMarginH6>
          </FlexContainerColumnCenterCenter>
        </ClientSideLink>
        <ClientSideLink href={`/users/${username}/orders`}>
          <FlexContainerColumnCenterCenter>
            <AssignmentTwoToneIcon style={{ fontSize: 30, color: grey[800] }} />
            <NoMarginH6>주문내역</NoMarginH6>
          </FlexContainerColumnCenterCenter>
        </ClientSideLink>
        <ClientSideLink href={`/users/${username}`}>
          <FlexContainerColumnCenterCenter>
            <PersonRoundedIcon style={{ fontSize: 30, color: grey[800] }} />
            <NoMarginH6>마이페이지</NoMarginH6>
          </FlexContainerColumnCenterCenter>
        </ClientSideLink>
      </FlexContainerAroundNav>
    </FixedHeader>
  )
}

export default memo(Header)
