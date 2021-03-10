import AssignmentTwoToneIcon from '@material-ui/icons/AssignmentTwoTone'
import HomeRoundedIcon from '@material-ui/icons/HomeRounded'
import InsertEmoticonTwoToneIcon from '@material-ui/icons/InsertEmoticonTwoTone'
import ListAltTwoTone from '@material-ui/icons/ListAltTwoTone'
import StoreRoundedIcon from '@material-ui/icons/StoreRounded'
import Link from 'next/link'
import { HEADER_HEIGHT, TABLET_MIN_WIDTH } from 'src/models/constants'
import styled from 'styled-components'

const FixedHeader = styled.header`
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);

  width: min(100%, ${TABLET_MIN_WIDTH});
  height: ${HEADER_HEIGHT};
  z-index: 1;

  background-color: #fff;
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

const FlexContainerCenterCenter = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  height: 100%;
`

const NoMarginH6 = styled.h5`
  margin: 0;
`

function Header() {
  const username = 'username'
  return (
    <FixedHeader>
      <FlexContainerAroundNav>
        <Link href="/">
          <a href="/">
            <FlexContainerCenterCenter>
              <HomeRoundedIcon fontSize="large" />
              <NoMarginH6>홈</NoMarginH6>
            </FlexContainerCenterCenter>
          </a>
        </Link>
        <Link href="/feed">
          <a href="/feed">
            <FlexContainerCenterCenter>
              <ListAltTwoTone fontSize="large" />
              <NoMarginH6>피드</NoMarginH6>
            </FlexContainerCenterCenter>
          </a>
        </Link>
        <Link href="/stores">
          <a href="/stores">
            <FlexContainerCenterCenter>
              <StoreRoundedIcon fontSize="large" />
              <NoMarginH6>찜·단골 매장</NoMarginH6>
            </FlexContainerCenterCenter>
          </a>
        </Link>
        <Link href={`/users/${username}/orders`}>
          <a href={`/users/${username}/orders`}>
            <FlexContainerCenterCenter>
              <AssignmentTwoToneIcon fontSize="large" />
              <NoMarginH6>주문 내역</NoMarginH6>
            </FlexContainerCenterCenter>
          </a>
        </Link>
        <Link href={`/users/${username}`}>
          <a href={`/users/${username}`}>
            <FlexContainerCenterCenter>
              <InsertEmoticonTwoToneIcon fontSize="large" />
              <NoMarginH6>내 Sindy</NoMarginH6>
            </FlexContainerCenterCenter>
          </a>
        </Link>
      </FlexContainerAroundNav>
    </FixedHeader>
  )
}

export default Header
