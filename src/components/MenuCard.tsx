import AssignmentRoundedIcon from '@material-ui/icons/AssignmentRounded'
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded'
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded'
import RateReviewRoundedIcon from '@material-ui/icons/RateReviewRounded'
import RefreshIcon from '@material-ui/icons/Refresh'
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded'
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded'
import ArrowDropUpRoundedIcon from '@material-ui/icons/ArrowDropUpRounded'
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined'
import { MouseEvent, ReactText, useRef } from 'react'
import { formatPrice, formatNumber } from 'src/utils/price'
import styled from 'styled-components'
import { FlexContainerAlignCenter, FlexContainerBetween } from '../styles/FlexContainer'
import useGoToPage from 'src/hooks/useGoToPage'
import { Menu, MenuCardFragment, usePickMenuMutation } from 'src/graphql/generated/types-and-hooks'
import grey from '@material-ui/core/colors/grey'
import { handleApolloError } from 'src/apollo/error'
import ClientSideLink from './atoms/ClientSideLink'
import { toast } from 'react-toastify'
import useBoolean from 'src/hooks/useBoolean'
import { Button } from 'antd'
import Image from 'next/image'
import { SkeletonImage, SkeletonText } from 'src/styles/LoadingSkeleton'

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

export const StyledFavoriteRoundedIcon = styled(FavoriteRoundedIcon)`
  font-size: 1.5rem !important;
  color: #ff8e77;
  margin: 0.5rem;
`

export const StyledFavoriteBorderRoundedIcon = styled(FavoriteBorderRoundedIcon)`
  font-size: 1.5rem !important;
  color: #ff8e77;
  margin: 0.5rem;
`

const StoreName = styled.h5`
  font-size: 0.9rem;
  color: #929393;
`

const StyledArrowForwardIosRoundedIcon = styled(ArrowForwardIosRoundedIcon)`
  font-size: 0.9rem !important;
  color: #929393;
  font-weight: lighter;
`

const MenuName = styled.h4`
  font-size: 1rem;
`

export const Hashtags = styled.ul`
  position: absolute;
  width: calc(100% - 3.5rem);
  display: flex;
  overflow: hidden;
`

export const Hashtag = styled.h5`
  color: #ff9a87;
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
  bottom: 0.2rem;
  margin: 0;
  border: #ffffff;
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
  /* background: #ddd; */
`

const FlexContainerCenterPadding = styled(FlexContainerAlignCenter)`
  padding: 0.5rem;
  /* outline: 1px solid #ddd; */
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
  afterPickingMenu: () => void
  hideStoreName?: boolean
  menu: MenuCardFragment
  onlyImage: boolean
}

function MenuCard({ afterPickingMenu, hideStoreName, menu, onlyImage }: Props) {
  const toastId = useRef<ReactText>('')
  const [isCardDetailOpened, toggleCardDetail] = useBoolean(false)

  const [pickMenu, { loading: isPickingMenuLoading }] = usePickMenuMutation({
    onCompleted: (data) => {
      function restorePicking() {
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

      afterPickingMenu()
    },
    onError: handleApolloError,
  })

  function pickMenuStopPropagation(e: MouseEvent) {
    e.stopPropagation()
    if (!isPickingMenuLoading) {
      pickMenu({ variables: { id: menu.id } })
    }
  }

  const store = menu.store

  const goToStoreMenuPage = useGoToPage(`/stores/${store.name}-${store.id}/${menu.name}`)
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
        <ClientSideLink href={storeReviewsPage}>
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

          <AbsolutePositionTopRight>
            {menu.favorite ? (
              <StyledFavoriteRoundedIcon onClick={pickMenuStopPropagation} />
            ) : (
              <StyledFavoriteBorderRoundedIcon onClick={pickMenuStopPropagation} />
            )}
          </AbsolutePositionTopRight>

          <MenuName>{menu.name}</MenuName>

          <Hashtags>
            {menu.hashtags?.map((hashtag) => (
              <ClientSideLink key={hashtag} href={`/search/${hashtag.slice(1)}`}>
                <Hashtag key={hashtag}>{hashtag}&nbsp;</Hashtag>
              </ClientSideLink>
            ))}
          </Hashtags>
          <br />
        </div>

        <FlexContainerRelativePosition>
          <MenuPrice>{formatPrice(menu.price)}</MenuPrice>
          <DetailButton shape="circle" onClick={toggleCardDetail}>
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
            <>
              <FlexContainerCenterPadding>
                <ThumbUpOutlinedIcon style={{ fontSize: 18, color: grey[800] }} />
                <NormalH5>좋아요 {menu.positiveReviewRatio}%</NormalH5>
              </FlexContainerCenterPadding>{' '}
            </>
          )}
          {menu.reorderRatio !== undefined && (
            <>
              <FlexContainerCenterPadding>
                <RefreshIcon style={{ fontSize: 18, color: grey[800] }} />
                <NormalH5>재주문율 {menu.reorderRatio}%</NormalH5>
              </FlexContainerCenterPadding>
            </>
          )}
          {menu.totalReviewCount !== undefined && (
            <>
              <FlexContainerCenterPadding>
                <RateReviewRoundedIcon style={{ fontSize: 18, color: grey[800] }} />
                <NormalH5>리뷰수 {formatNumber(menu.totalReviewCount)}개</NormalH5>
              </FlexContainerCenterPadding>{' '}
            </>
          )}
          {menu.totalOrderCount !== undefined && (
            <>
              <FlexContainerCenterPadding>
                <AssignmentRoundedIcon style={{ fontSize: 18, color: grey[800] }} />
                <NormalH5>주문수 {formatNumber(menu.totalOrderCount)}개</NormalH5>
              </FlexContainerCenterPadding>
            </>
          )}
          {/* {&&<></>} */}
        </FlexContainerWrapAround>
      )}
    </GridContainerLi>
  )
}

export default MenuCard
