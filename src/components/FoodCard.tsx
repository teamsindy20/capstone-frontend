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
import TFood from 'src/types/Food'
import TStore from 'src/types/Store'
import { FlexContainerAlignCenter, FlexContainerBetween } from '../styles/FlexContainer'
import { GridContainerGap } from '../styles/GridContainer'

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

const GridContainerLi = styled.li<{ onlyImage: boolean }>`
  display: grid;
  ${(p) => (p.onlyImage ? '' : 'grid-template-columns: 1fr 2fr;')}
  grid-template-rows: auto auto;

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

const GridContainerColumn2 = styled(GridContainerGap)`
  grid-template-columns: auto auto;

  width: fit-content;
`

const NoMarginH3 = styled.h3`
  margin: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  /* white-space: nowrap; 이름 길면 줄이기 */
`

const FlexContainerUl = styled.ul`
  display: flex;
  gap: 0.5rem;

  list-style: none;
  padding-left: 0;
`

const BoldH5 = styled.h5`
  margin-top: 0;
  font-weight: bold;
  color: #555;
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

type Props = {
  food: TFood
  loading: boolean
  store: TStore
  onlyImage: boolean
}

export function Fee() {
  return null
}

function FoodCard({ food, loading, store, onlyImage }: Props) {
  if (loading) {
    return (
      <GridContainerLi onlyImage={onlyImage}>
        <FlexContainerAlignCenter>
          <ImageRatioWrapper paddingTop="100%">
            <SkeletonImage />
          </ImageRatioWrapper>
        </FlexContainerAlignCenter>
        {!onlyImage && (
          <FlexContainerColumnBetween>
            <SkeletonText width="30%" />
            <SkeletonText width="80%" height="1.2rem" />
            <SkeletonText width="50%" />

            <GridContainer>
              <SkeletonText height="1.2rem" />
              <HorizontalBorder />
            </GridContainer>
          </FlexContainerColumnBetween>
        )}
        {!onlyImage && (
          <FlexContainerWrapAround>
            <SkeletonText />
          </FlexContainerWrapAround>
        )}
      </GridContainerLi>
    )
  }

  return (
    <GridContainerLi onlyImage={onlyImage}>
      <FlexContainerAlignCenter>
        <ImageRatioWrapper paddingTop="100%">
          <AbsolutePositionImage src={food.imageUrl} alt="food" />
        </ImageRatioWrapper>
      </FlexContainerAlignCenter>
      {!onlyImage && (
        <FlexContainerColumnBetween>
          <AbsolutePosition>
            {food.bookmark ? (
              <BookmarkTwoToneIcon fontSize="large" />
            ) : (
              <BookmarkBorderTwoToneIcon fontSize="large" />
            )}
          </AbsolutePosition>
          <GridContainer>
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
            <div>
              <NoMarginH3>{food.name}</NoMarginH3>
            </div>
            <FlexContainerUl>
              {food.hashtags.map((hashtag) => (
                <li key={hashtag}>
                  <BoldH5>{hashtag}</BoldH5>
                </li>
              ))}
            </FlexContainerUl>
          </GridContainer>
          <GridContainer>
            <FlexContainerBetween>
              <FlexContainerAlignCenter>
                <TimerRoundedIcon />
                {`${store.deliveryTimeMin}-${store.deliveryTimeMax}분`}
              </FlexContainerAlignCenter>
              <NoMarginH3>{formatPrice(food.price)}</NoMarginH3>
            </FlexContainerBetween>
            <HorizontalBorder />
          </GridContainer>
        </FlexContainerColumnBetween>
      )}
      {!onlyImage && (
        <FlexContainerWrapAround>
          <FlexContainerAlignCenter>
            <ThumbUpOutlinedIcon />
            <div>{food.likeRatio}%</div>
          </FlexContainerAlignCenter>
          <VerticalBorder />
          <FlexContainerAlignCenter>
            <RateReviewTwoToneIcon />
            <div>{formatNumber(food.reviewCount)}개</div>
          </FlexContainerAlignCenter>
          <VerticalBorder />
          <FlexContainerAlignCenter>
            <RefreshIcon />
            <div>{food.reorderRatio}%</div>
          </FlexContainerAlignCenter>
          <VerticalBorder />
          <FlexContainerAlignCenter>
            <AssignmentTwoToneIcon />
            <div>{formatNumber(food.orderCount)}개</div>
          </FlexContainerAlignCenter>
        </FlexContainerWrapAround>
      )}
    </GridContainerLi>
  )
}

export default FoodCard
