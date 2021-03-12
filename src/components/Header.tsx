import AssignmentTwoToneIcon from '@material-ui/icons/AssignmentTwoTone'
import HomeRoundedIcon from '@material-ui/icons/HomeRounded'
import InsertEmoticonTwoToneIcon from '@material-ui/icons/InsertEmoticonTwoTone'
import ListAltTwoTone from '@material-ui/icons/ListAltTwoTone'
import StoreRoundedIcon from '@material-ui/icons/StoreRounded'
import Link from 'next/link'
import { HEADER_HEIGHT, TABLET_MIN_WIDTH } from 'src/models/constants'
import { FlexContainerAlignCenter } from 'src/styles/FlexContainer'
import styled from 'styled-components'

const FixedHeader = styled.header`
  position: fixed;
  left: 50%;
  bottom: 0;
  z-index: 1;
  transform: translateX(-50%);

  width: 100%;
  max-width: ${TABLET_MIN_WIDTH};
  height: ${HEADER_HEIGHT};

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

const FlexContainerColumnCenterCenter = styled(FlexContainerAlignCenter)`
  flex-flow: column nowrap;
  justify-content: center;

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
            <FlexContainerColumnCenterCenter>
              <HomeRoundedIcon fontSize="large" />
              <NoMarginH6>홈</NoMarginH6>
            </FlexContainerColumnCenterCenter>
          </a>
        </Link>
        <Link href="/feed">
          <a href="/feed">
            <FlexContainerColumnCenterCenter>
              <ListAltTwoTone fontSize="large" />
              <NoMarginH6>피드</NoMarginH6>
            </FlexContainerColumnCenterCenter>
          </a>
        </Link>
        <Link href="/stores">
          <a href="/stores">
            <FlexContainerColumnCenterCenter>
              <StoreRoundedIcon fontSize="large" />
              <NoMarginH6>찜·단골 매장</NoMarginH6>
            </FlexContainerColumnCenterCenter>
          </a>
        </Link>
        <Link href={`/users/${username}/orders`}>
          <a href={`/users/${username}/orders`}>
            <FlexContainerColumnCenterCenter>
              <AssignmentTwoToneIcon fontSize="large" />
              <NoMarginH6>주문 내역</NoMarginH6>
            </FlexContainerColumnCenterCenter>
          </a>
        </Link>
        <Link href={`/users/${username}`}>
          <a href={`/users/${username}`}>
            <FlexContainerColumnCenterCenter>
              <InsertEmoticonTwoToneIcon fontSize="large" />
              <NoMarginH6>내 Sindy</NoMarginH6>
            </FlexContainerColumnCenterCenter>
          </a>
        </Link>
      </FlexContainerAroundNav>
    </FixedHeader>
  )
}

export default Header
