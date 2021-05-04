import AssignmentRoundedIcon from '@material-ui/icons/AssignmentRounded'
import BookmarkRoundedIcon from '@material-ui/icons/BookmarkRounded'
import BookmarkBorderRoundedIcon from '@material-ui/icons/BookmarkBorderRounded'
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded'
import MotorcycleRoundedIcon from '@material-ui/icons/MotorcycleRounded'
import RateReviewRoundedIcon from '@material-ui/icons/RateReviewRounded'
import RefreshIcon from '@material-ui/icons/Refresh'
import TimerRoundedIcon from '@material-ui/icons/TimerRounded'
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined'
import { formatPrice, formatNumber, formatPricesWithFree } from 'src/utils/price'
import styled from 'styled-components'
import TMenu from 'src/types/Menu'
import TStore from 'src/types/Store'
import { FlexContainerAlignCenter, FlexContainerBetween } from '../styles/FlexContainer'
import { GridContainerGap } from '../styles/GridContainer'
import { CHOCO_COLOR } from 'src/models/constants'
import Link from 'next/link'
import useGoToPage from 'src/hooks/useGoToPage'
import grey from '@material-ui/core/colors/grey'
import red from '@material-ui/core/colors/red'

export const SkeletonGradient = styled.div`
  background: #eee;
  overflow: hidden;

  ::before {
    content: '';
    display: block;
    position: absolute;
    left: -30vw;
    top: 0;
    height: 100%;
    width: 30vw;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.4) 25%,
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0.4) 75%,
      rgba(255, 255, 255, 0) 100%
    );
    animation: shine 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }

  @keyframes shine {
    0% {
      left: -30vw;
    }
    66% {
      left: 100%;
    }
    100% {
      left: 100%;
    }
  }
`

export const SkeletonImage = styled(SkeletonGradient)`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
`

export const SkeletonText = styled(SkeletonGradient)<{ width?: string; height?: string }>`
  position: relative;
  width: ${({ width = '100%' }) => width};
  height: ${({ height = '1rem' }) => height};
`

const GridContainerLi = styled.li<{ column1by2: boolean }>`
  display: grid;
  ${(p) => (p.column1by2 ? 'grid-template-columns: 1fr 2fr;' : '')}

  cursor: pointer;
  background: #f1f6fa;
  box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.15), 0 0 0 rgba(16, 22, 26, 0), 0 0 0 rgba(16, 22, 26, 0);
  border-radius: max(10px, 1vw);
  overflow: hidden;
`

export const ImageRatioWrapper = styled.div<{ paddingTop: string }>`
  width: 100%;
  position: relative;
  padding-top: ${(p) => p.paddingTop};
`

export const AbsolutePositionImage = styled.img`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: max(10px, 1vw);

  background: #f3ccc7;
`

const FlexContainerColumnBetween = styled(FlexContainerBetween)`
  flex-flow: column nowrap;
  gap: 0.3rem;

  position: relative;
  padding: 0.5rem 0.5rem 0;
`

const AbsolutePosition = styled.div`
  position: absolute;
  top: 0.2rem;
  right: 0.1rem;
`

const GridContainer = styled.div`
  display: grid;
  gap: 0.5rem;
`

const LighterH5 = styled.h5`
  margin: 0;
  font-weight: lighter;
`
const NormalH5 = styled.h5`
  margin: 0;
  font-weight: normal;
`

const GridContainerColumn = styled(GridContainerGap)`
  grid-template-columns: repeat(3, 1fr);

  width: fit-content;
`

const NoMarginH4 = styled.h4`
  margin: 0;
  font-weight: bold;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const FlexContainerUl = styled.ul`
  display: flex;
  flex-flow: row wrap;

  list-style: none;
  padding-left: 0;
`

export const BoldA = styled.a`
  font-size: 0.83em;
  font-weight: bold;
  color: #fe6661;
  word-break: keep-all;

  color: 3c3c3c;
  transition: color 0.5s cubic-bezier(0.4, 0, 0.2, 1);

  :hover {
    color: ${CHOCO_COLOR};
  }
`

const HorizontalBorder = styled.div`
  border: 1px solid #ddd;
`

const VerticalBorder = styled.div`
  border: 1px solid #ddd;
  height: 100%;
`

const FlexContainerWrapAround = styled(FlexContainerAlignCenter)`
  flex-flow: row wrap;
  justify-content: space-around;

  grid-column: auto / span 2;
  padding: min(2vw, 0.5rem);
`

type Props2 = {
  onlyImage: boolean
}

export function MenuLoadingCard({ onlyImage }: Props2) {
  if (onlyImage) {
    return (
      <GridContainerLi column1by2={false}>
        <ImageRatioWrapper paddingTop="100%">
          <SkeletonImage />
        </ImageRatioWrapper>
      </GridContainerLi>
    )
  }

  return (
    <GridContainerLi column1by2={true}>
      <ImageRatioWrapper paddingTop="100%">
        <SkeletonImage />
      </ImageRatioWrapper>

      <FlexContainerColumnBetween>
        <SkeletonText width="30%" />
        <SkeletonText width="80%" height="1.2rem" />
        <SkeletonText width="50%" />
        <SkeletonText height="1.2rem" />
        <HorizontalBorder />
      </FlexContainerColumnBetween>

      <FlexContainerWrapAround>
        <SkeletonText />
      </FlexContainerWrapAround>
    </GridContainerLi>
  )
}

type Props = {
  menu: TMenu
  store: TStore
  onlyImage: boolean
}

function MenuCard({ menu, onlyImage }: Props) {
  const goToStoreReviewsPage = useGoToPage(
    `/stores/${menu.store.name}}/reviews?menu=${menu.store.name}}`
  )
  const goToStoreMenusPage = useGoToPage(`/stores/${menu.store.name}}`)

  if (onlyImage) {
    return (
      <GridContainerLi column1by2={false} onClick={goToStoreMenusPage}>
        <ImageRatioWrapper paddingTop="100%">
          <AbsolutePositionImage src={menu.imageUrl} alt="food" />
        </ImageRatioWrapper>
      </GridContainerLi>
    )
  }

  return (
    <GridContainerLi column1by2={true} onClick={goToStoreMenusPage}>
      <ImageRatioWrapper paddingTop="100%" onClick={goToStoreReviewsPage}>
        <AbsolutePositionImage src={menu.imageUrl} alt="food" />
      </ImageRatioWrapper>

      <FlexContainerColumnBetween>
        <AbsolutePosition>
          {menu.bookmark ? (
            <BookmarkRoundedIcon style={{ fontSize: 25, color: red[500] }} />
          ) : (
            <BookmarkBorderRoundedIcon style={{ fontSize: 25, color: grey[800] }} />
          )}
        </AbsolutePosition>
        <GridContainer>
          <NoMarginH4>{menu.name}</NoMarginH4>

          <FlexContainerUl>
            {menu.hashtags.map((hashtag) => (
              <>
                <li key={hashtag}>
                  <Link href={`/search/${hashtag.slice(1)}`}>
                    <BoldA
                      href={`/search/${hashtag.slice(1)}`}
                      onClick={(e) => e.stopPropagation()}
                    >{`${hashtag}`}</BoldA>
                  </Link>
                </li>
                &nbsp;
              </>
            ))}
          </FlexContainerUl>
          <GridContainerColumn>
            <FlexContainerAlignCenter>
              <LocationOnRoundedIcon style={{ fontSize: 18, color: grey[800] }} />
              <LighterH5>{menu.store.name}</LighterH5>
            </FlexContainerAlignCenter>
            <FlexContainerAlignCenter>
              <MotorcycleRoundedIcon style={{ fontSize: 18, color: grey[800] }} />
              <LighterH5>{formatPricesWithFree(menu.store.deliveryFees)}</LighterH5>
            </FlexContainerAlignCenter>
            <FlexContainerAlignCenter>
              <TimerRoundedIcon style={{ fontSize: 18, color: grey[800] }} />
              <LighterH5>{`${menu.store.deliveryTimeMin}-${menu.store.deliveryTimeMax}분`}</LighterH5>
            </FlexContainerAlignCenter>
          </GridContainerColumn>
        </GridContainer>
        <GridContainer>
          <FlexContainerBetween>
            <NoMarginH4>{formatPrice(menu.price)}</NoMarginH4>
          </FlexContainerBetween>
          <HorizontalBorder />
        </GridContainer>
      </FlexContainerColumnBetween>

      <FlexContainerWrapAround>
        <FlexContainerAlignCenter>
          <ThumbUpOutlinedIcon style={{ fontSize: 18, color: grey[800] }} />
          <NormalH5>좋아요 {menu.likeRatio}%</NormalH5>
        </FlexContainerAlignCenter>
        <VerticalBorder />
        <FlexContainerAlignCenter>
          <RefreshIcon style={{ fontSize: 18, color: grey[800] }} />
          <NormalH5>재주문율 {menu.reorderRatio}%</NormalH5>
        </FlexContainerAlignCenter>
        <VerticalBorder />
        <FlexContainerAlignCenter>
          <RateReviewRoundedIcon style={{ fontSize: 18, color: grey[800] }} />
          <NormalH5>리뷰수 {formatNumber(menu.reviewCount)}개</NormalH5>
        </FlexContainerAlignCenter>
        <VerticalBorder />
        <FlexContainerAlignCenter>
          <AssignmentRoundedIcon style={{ fontSize: 18, color: grey[800] }} />
          <NormalH5>주문수 {formatNumber(menu.orderCount)}개</NormalH5>
        </FlexContainerAlignCenter>
      </FlexContainerWrapAround>
    </GridContainerLi>
  )
}

export default MenuCard
