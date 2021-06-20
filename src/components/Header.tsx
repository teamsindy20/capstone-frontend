import AssignmentTwoToneIcon from '@material-ui/icons/AssignmentRounded'
import HomeRoundedIcon from '@material-ui/icons/HomeRounded'
import PersonRoundedIcon from '@material-ui/icons/PersonRounded'
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded'
import StoreRoundedIcon from '@material-ui/icons/StoreRounded'
import { memo } from 'react'
import {
  HEADER_HEIGHT,
  PRIMARY_ACHROMATIC_BACKGROUND_COLOR,
  PRIMARY_BACKGROUND_COLOR,
  TABLET_MIN_WIDTH,
} from 'src/models/constants'
import { username } from 'src/models/mock-data'
import ClientSideLink from 'src/components/atoms/ClientSideLink'
import { FlexContainerAlignCenter } from 'src/components/atoms/FlexContainer'
import styled from 'styled-components'
import { useRouter } from 'next/router'

const FixedHeader = styled.header`
  position: fixed;
  bottom: 0;
  z-index: 1;
  width: 100%;
  max-width: ${TABLET_MIN_WIDTH};
  height: ${HEADER_HEIGHT};
  box-shadow: 0 -2px 5px 0 rgba(142, 142, 142, 0.25);
  background-color: #ffffff;
`

const GridContainerAlignCenter = styled.nav`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: center;

  height: 100%;
`

const FlexContainerColumnCenterCenter = styled(FlexContainerAlignCenter)`
  flex-flow: column nowrap;
  justify-content: center;

  height: 100%;
`

const NoMarginH6 = styled.h5`
  margin: 0;
`

const SelectedIconStyle = { fontSize: 28, color: PRIMARY_BACKGROUND_COLOR }

const UnSelectedIconStyle = { fontSize: 28, color: PRIMARY_ACHROMATIC_BACKGROUND_COLOR }
const UnSelectedTextStyle = { color: PRIMARY_ACHROMATIC_BACKGROUND_COLOR }

function Header() {
  const { asPath } = useRouter()

  const homePageUrl = '/'
  const feedPageUrl = '/feed'
  const favoritePageUrl = `/users/${username}/favorite-menus`
  const userOrdersPageUrl = `/users/${username}/orders`
  const myPageUrl = `/users/${username}`

  return (
    <FixedHeader>
      <GridContainerAlignCenter>
        <ClientSideLink href={homePageUrl}>
          <FlexContainerColumnCenterCenter>
            <HomeRoundedIcon
              style={asPath === homePageUrl ? SelectedIconStyle : UnSelectedIconStyle}
            />
            <NoMarginH6 style={asPath === homePageUrl ? undefined : UnSelectedTextStyle}>
              홈
            </NoMarginH6>
          </FlexContainerColumnCenterCenter>
        </ClientSideLink>
        <ClientSideLink href={feedPageUrl}>
          <FlexContainerColumnCenterCenter>
            <StoreRoundedIcon
              style={asPath === feedPageUrl ? SelectedIconStyle : UnSelectedIconStyle}
            />
            <NoMarginH6 style={asPath === feedPageUrl ? undefined : UnSelectedTextStyle}>
              소식
            </NoMarginH6>
          </FlexContainerColumnCenterCenter>
        </ClientSideLink>
        <ClientSideLink href={favoritePageUrl}>
          <FlexContainerColumnCenterCenter>
            <FavoriteRoundedIcon
              style={asPath === favoritePageUrl ? SelectedIconStyle : UnSelectedIconStyle}
            />
            <NoMarginH6 style={asPath === favoritePageUrl ? undefined : UnSelectedTextStyle}>
              찜
            </NoMarginH6>
          </FlexContainerColumnCenterCenter>
        </ClientSideLink>
        <ClientSideLink href={userOrdersPageUrl}>
          <FlexContainerColumnCenterCenter>
            <AssignmentTwoToneIcon
              style={asPath === userOrdersPageUrl ? SelectedIconStyle : UnSelectedIconStyle}
            />
            <NoMarginH6 style={asPath === userOrdersPageUrl ? undefined : UnSelectedTextStyle}>
              주문내역
            </NoMarginH6>
          </FlexContainerColumnCenterCenter>
        </ClientSideLink>
        <ClientSideLink href={myPageUrl}>
          <FlexContainerColumnCenterCenter>
            <PersonRoundedIcon
              style={asPath === myPageUrl ? SelectedIconStyle : UnSelectedIconStyle}
            />
            <NoMarginH6 style={asPath === myPageUrl ? undefined : UnSelectedTextStyle}>
              my디핏
            </NoMarginH6>
          </FlexContainerColumnCenterCenter>
        </ClientSideLink>
      </GridContainerAlignCenter>
    </FixedHeader>
  )
}

export default memo(Header)
