import AssignmentRoundedIcon from '@material-ui/icons/AssignmentRounded'
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded'
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded'
import RateReviewRoundedIcon from '@material-ui/icons/RateReviewRounded'
import RefreshIcon from '@material-ui/icons/Refresh'
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded'
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded'
import ArrowDropUpRoundedIcon from '@material-ui/icons/ArrowDropUpRounded'
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined'
import { memo, MouseEvent, ReactText, useRef, useState } from 'react'
import { formatPrice, formatNumber } from 'src/utils/price'
import styled from 'styled-components'
import { FlexContainerAlignCenter, FlexContainerBetween } from '../styles/FlexContainer'
import useGoToPage from 'src/hooks/useGoToPage'
import {
  MenuCardFragment,
  useMenuFavoriteLazyQuery,
  usePickMenuMutation,
} from 'src/graphql/generated/types-and-hooks'
import grey from '@material-ui/core/colors/grey'
import { handleApolloError } from 'src/apollo/error'
import ClientSideLink from './atoms/ClientSideLink'
import { toast } from 'react-toastify'
import useBoolean from 'src/hooks/useBoolean'
import { Button } from 'antd'
import Image from 'next/image'
import { SkeletonImage, SkeletonText } from 'src/styles/LoadingSkeleton'
import {
  PRIMARY_ACHROMATIC_BACKGROUND_COLOR,
  PRIMARY_BACKGROUND_COLOR,
  PRIMARY_TEXT_COLOR,
} from 'src/models/constants'

const GridContainerLi = styled.li<{ onlyImage: boolean }>`
  display: grid;
  grid-template-columns: ${(p) => (p.onlyImage ? '1fr' : '1fr 2fr')};
  position: relative;
  overflow: hidden;
  background-color: white;
  cursor: pointer;
  box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.15), 0 0 0 rgba(16, 22, 26, 0), 0 0 0 rgba(16, 22, 26, 0);
  border-radius: ${(p) => (p.onlyImage ? '0' : 'max(10px, 1vw);')};
  background: #fff;
`

export const SquareFrame = styled.div`
  padding-top: 100%;
  position: relative;
`

const FlexContainerBetweenColumn = styled(FlexContainerBetween)`
  flex-flow: column nowrap;
  position: relative;
  padding: 0.5rem 1rem;
  box-shadow: 0 1.5px 0 #dbdcdd;
`

const AbsolutePositionTopRight = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`

export const favoriteRoundedIconStyle = {
  fontSize: '1.8rem',
  color: PRIMARY_BACKGROUND_COLOR,
  margin: '0.5rem',
}

export const favoriteBorderRoundedIconStyle = {
  fontSize: '1.8rem',
  color: PRIMARY_TEXT_COLOR,
  margin: '0.5rem',
}

export const favoriteRoundedIconLoadingStyle = {
  fontSize: '1.8rem',
  color: PRIMARY_ACHROMATIC_BACKGROUND_COLOR,
  margin: '0.5rem',
}

const StoreName = styled.h5`
  font-size: 0.9rem;
  color: #929393;
`

const StyledArrowForwardIosRoundedIcon = styled(ArrowForwardIosRoundedIcon)`
  font-size: 0.9rem !important;
  color: #929393;
  font-weight: lighter;
`

const MenuName = styled.h3`
  font-size: 1rem;
  padding: min(1vw, 0.5rem) 0;
`

export const Hashtags = styled.ul`
  position: absolute;
  width: calc(100% - 3.5rem);
  display: flex;
  overflow: hidden;
`

export const Hashtag = styled.h5`
  font-size: 0.9rem;
  white-space: nowrap;
`

const FlexContainerRelativePosition = styled.div`
  display: flex;
  position: relative;
`

const MenuPrice = styled.h3`
  font-size: 1.1rem;
`

const DetailButton = styled(Button)`
  position: absolute;
  right: 0;
  bottom: 0rem;
  margin: 0;

  border: 1px solid #fcfcfc;

  :active,
  :focus,
  :hover {
    border-color: #eee;
  }
`

const StyledArrowDropUpRoundedIcon = styled(ArrowDropUpRoundedIcon)`
  font-size: 1.8rem !important;
  color: #929393;
  padding: 0;
`

const StyledArrowDropDownRoundedIcon = styled(ArrowDropDownRoundedIcon)`
  font-size: 1.8rem !important;
  color: #929393;
  padding: 0;
`

const FlexContainerWrapAround = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  grid-column: 1 / 3;
`

const FlexContainerCenterPadding = styled(FlexContainerAlignCenter)`
  padding: 0.5rem;
`

const NormalH5 = styled.h5`
  margin: 0;
  font-weight: normal;
`

type Props2 = {
  onlyImage: boolean
}

export function MenuLoadingCard({ onlyImage }: Props2) {
  if (onlyImage) {
    return (
      <GridContainerLi onlyImage>
        <SquareFrame>
          <SkeletonImage />
        </SquareFrame>
      </GridContainerLi>
    )
  }

  return (
    <GridContainerLi onlyImage={false}>
      <SquareFrame>
        <SkeletonImage />
      </SquareFrame>

      <FlexContainerBetweenColumn>
        <SkeletonText width="30%" height="0.9rem" />
        <SkeletonText width="80%" />
        <SkeletonText width="50%" height="0.9rem" />
        <SkeletonText height="1.1rem" />
      </FlexContainerBetweenColumn>

      <FlexContainerWrapAround>
        <SkeletonText />
      </FlexContainerWrapAround>
    </GridContainerLi>
  )
}

type Props = {
  hideStoreName?: boolean
  menu: MenuCardFragment
  onlyImage: boolean
}

function MenuCard({ hideStoreName, menu, onlyImage }: Props) {
  const [isCardDetailOpened, toggleCardDetail] = useBoolean(false)

  const toastId = useRef<ReactText>('')

  const [isPickingMenuLoading, setIsPickingMenuLoading] = useState(false)

  const [menuFavoriteLazyQuery] = useMenuFavoriteLazyQuery({
    fetchPolicy: 'network-only',
    onCompleted: () => setTimeout(() => setIsPickingMenuLoading(false), 300),
    onError: handleApolloError,
  })

  const [pickMenu] = usePickMenuMutation({
    onCompleted: (data) => {
      function restorePicking() {
        setIsPickingMenuLoading(true)
        pickMenu({ variables: { id: menu.id } })
      }

      if (data.pickMenu) {
        if (toastId.current) toast.dismiss(toastId.current)
        toastId.current = toast(
          <div>
            <b>{menu.name}</b>을 찜했어요
            <button onClick={restorePicking}>되돌리기</button>
          </div>
        )
      } else {
        if (toastId.current) toast.dismiss(toastId.current)
        toastId.current = toast(
          <div>
            <b>{menu.name}</b>의 찜을 해제했어요
            <button onClick={restorePicking}>되돌리기</button>
          </div>
        )
      }

      menuFavoriteLazyQuery({ variables: { id: menu.id } })
    },
    onError: handleApolloError,
  })

  function pickMenuStopPropagation(e: MouseEvent) {
    e.stopPropagation()
    if (!isPickingMenuLoading) {
      setIsPickingMenuLoading(true)
      pickMenu({ variables: { id: menu.id } })
    }
  }

  const store = menu.store

  const storeMenuPage = `/stores/${store.name}-${store.id}/${menu.name}`
  const goToStoreMenuPage = useGoToPage(storeMenuPage)
  const storeReviewsPage = `/stores/${store.name}-${store.id}/reviews?menu=${menu.name}`

  if (onlyImage) {
    return (
      <GridContainerLi onlyImage onClick={goToStoreMenuPage}>
        <SquareFrame>
          <ClientSideLink href={storeReviewsPage}>
            <Image
              src={menu.imageUrls ? menu.imageUrls[0] : ''}
              alt="menu"
              layout="fill"
              objectFit="cover"
            />
          </ClientSideLink>
        </SquareFrame>
      </GridContainerLi>
    )
  }

  return (
    <GridContainerLi onlyImage={false} onClick={goToStoreMenuPage}>
      <SquareFrame>
        <ClientSideLink href={storeMenuPage}>
          <Image
            src={menu.imageUrls ? menu.imageUrls[0] : ''}
            alt="menu"
            layout="fill"
            objectFit="cover"
          />
        </ClientSideLink>
      </SquareFrame>

      <FlexContainerBetweenColumn>
        <div>
          {!hideStoreName && (
            <ClientSideLink href={`/stores/${store.name}-${store.id}`}>
              <FlexContainerAlignCenter>
                <StoreName>{store.name}</StoreName>&nbsp;
                <StyledArrowForwardIosRoundedIcon />
              </FlexContainerAlignCenter>
            </ClientSideLink>
          )}

          <AbsolutePositionTopRight onClick={pickMenuStopPropagation}>
            {isPickingMenuLoading ? (
              <FavoriteRoundedIcon style={favoriteRoundedIconLoadingStyle} />
            ) : menu.favorite ? (
              <FavoriteRoundedIcon style={favoriteRoundedIconStyle} />
            ) : (
              <FavoriteBorderRoundedIcon style={favoriteBorderRoundedIconStyle} />
            )}
          </AbsolutePositionTopRight>

          <MenuName>{menu.name}</MenuName>

          <Hashtags>
            {menu.hashtags?.map((hashtag) => (
              <Hashtag key={hashtag}>
                <ClientSideLink href={`/search/${hashtag}`}>{hashtag}&nbsp;</ClientSideLink>
              </Hashtag>
            ))}
          </Hashtags>
          <br />
        </div>

        <FlexContainerRelativePosition>
          <MenuPrice>{formatPrice(menu.price)}</MenuPrice>
          <DetailButton shape="circle" size="small" onClick={toggleCardDetail}>
            {isCardDetailOpened ? (
              <StyledArrowDropUpRoundedIcon />
            ) : (
              <StyledArrowDropDownRoundedIcon />
            )}
          </DetailButton>
        </FlexContainerRelativePosition>
      </FlexContainerBetweenColumn>

      {isCardDetailOpened && (
        <FlexContainerWrapAround>
          {menu.positiveReviewRatio !== undefined && (
            <FlexContainerCenterPadding>
              <ThumbUpOutlinedIcon style={{ fontSize: 18, color: grey[800] }} />
              <NormalH5>좋아요 {menu.positiveReviewRatio}%</NormalH5>
            </FlexContainerCenterPadding>
          )}
          {menu.reorderRatio !== undefined && (
            <FlexContainerCenterPadding>
              <RefreshIcon style={{ fontSize: 18, color: grey[800] }} />
              <NormalH5>재주문율 {menu.reorderRatio}%</NormalH5>
            </FlexContainerCenterPadding>
          )}
          {menu.totalReviewCount !== undefined && (
            <FlexContainerCenterPadding>
              <RateReviewRoundedIcon style={{ fontSize: 18, color: grey[800] }} />
              <NormalH5>리뷰수 {formatNumber(menu.totalReviewCount)}개</NormalH5>
            </FlexContainerCenterPadding>
          )}
          {menu.totalOrderCount !== undefined && (
            <FlexContainerCenterPadding>
              <AssignmentRoundedIcon style={{ fontSize: 18, color: grey[800] }} />
              <NormalH5>주문수 {formatNumber(menu.totalOrderCount)}개</NormalH5>
            </FlexContainerCenterPadding>
          )}
          {/* {&&<></>} */}
        </FlexContainerWrapAround>
      )}
    </GridContainerLi>
  )
}

export default memo(MenuCard)
