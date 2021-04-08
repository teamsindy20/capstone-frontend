import AssignmentTwoToneIcon from '@material-ui/icons/AssignmentTwoTone'
import BookmarkBorderTwoToneIcon from '@material-ui/icons/BookmarkBorderTwoTone'
import BookmarkTwoToneIcon from '@material-ui/icons/BookmarkTwoTone'
import LocationOnTwoToneIcon from '@material-ui/icons/LocationOnTwoTone'
import MotorcycleTwoToneIcon from '@material-ui/icons/MotorcycleTwoTone'
import RateReviewTwoToneIcon from '@material-ui/icons/RateReviewTwoTone'
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
  background: #f8f2f8;
  box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.15), 0 0 0 rgba(16, 22, 26, 0), 0 0 0 rgba(16, 22, 26, 0);
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

  background: #eee;
`

const FlexContainerColumnBetween = styled(FlexContainerBetween)`
  flex-flow: column nowrap;
  gap: 0.5rem;

  position: relative;
  padding: 0.5rem 0.5rem 0;
`

const AbsolutePosition = styled.div`
  position: absolute;
  top: 0.2rem;
  right: 0.1rem;
`

const GridContainer2 = styled.div`
  display: grid;
  gap: 0.5rem;
`

const LighterH5 = styled.h5`
  margin: 0;
  font-weight: lighter;
`

const GridContainerColumn2 = styled(GridContainerGap)`
  grid-template-columns: min-content auto;

  width: fit-content;
`

const NoMarginH3 = styled.h3`
  margin: 0;

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
  word-break: keep-all;

  color: maroon;
  transition: color 0.5s cubic-bezier(0.4, 0, 0.2, 1);

  :hover {
    color: ${CHOCO_COLOR};
  }
`

const HorizontalBorder = styled.div`
  border: 1px solid grey;
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

function MenuCard({ menu, store, onlyImage }: Props) {
  const goToStoreReviewsPage = useGoToPage(`/stores/${store.name}/reviews?menu=${menu.name}`)
  const goToStoreMenusPage = useGoToPage(`/stores/${store.name}`)

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
            <BookmarkTwoToneIcon fontSize="large" />
          ) : (
            <BookmarkBorderTwoToneIcon fontSize="large" />
          )}
        </AbsolutePosition>
        <GridContainer2>
          <GridContainerColumn2>
            <FlexContainerAlignCenter>
              <LocationOnTwoToneIcon fontSize="small" />
              <LighterH5>{store.name}</LighterH5>
            </FlexContainerAlignCenter>
            <FlexContainerAlignCenter>
              <MotorcycleTwoToneIcon />
              <LighterH5>{formatPricesWithFree(store.deliveryFees)}</LighterH5>
            </FlexContainerAlignCenter>
          </GridContainerColumn2>
          <NoMarginH3>{menu.name}</NoMarginH3>
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
        </GridContainer2>
        <GridContainer2>
          <FlexContainerBetween>
            <FlexContainerAlignCenter>
              <TimerRoundedIcon />
              {`${store.deliveryTimeMin}-${store.deliveryTimeMax}분`}
            </FlexContainerAlignCenter>
            <NoMarginH3>{formatPrice(menu.price)}</NoMarginH3>
          </FlexContainerBetween>
          <HorizontalBorder />
        </GridContainer2>
      </FlexContainerColumnBetween>

      <FlexContainerWrapAround>
        <FlexContainerAlignCenter>
          <ThumbUpOutlinedIcon />
          <div>{menu.likeRatio}%</div>
        </FlexContainerAlignCenter>
        <VerticalBorder />
        <FlexContainerAlignCenter>
          <RateReviewTwoToneIcon />
          <div>{formatNumber(menu.reviewCount)}개</div>
        </FlexContainerAlignCenter>
        <VerticalBorder />
        <FlexContainerAlignCenter>
          <RefreshIcon />
          <div>{menu.reorderRatio}%</div>
        </FlexContainerAlignCenter>
        <VerticalBorder />
        <FlexContainerAlignCenter>
          <AssignmentTwoToneIcon />
          <div>{formatNumber(menu.orderCount)}개</div>
        </FlexContainerAlignCenter>
      </FlexContainerWrapAround>
    </GridContainerLi>
  )
}

export default MenuCard
