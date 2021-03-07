import BookmarkBorderTwoToneIcon from '@material-ui/icons/BookmarkBorderTwoTone'
import BookmarkTwoToneIcon from '@material-ui/icons/BookmarkTwoTone'
import LocationOnTwoToneIcon from '@material-ui/icons/LocationOnTwoTone'
import MotorcycleTwoToneIcon from '@material-ui/icons/MotorcycleTwoTone'
import RateReviewTwoToneIcon from '@material-ui/icons/RateReviewTwoTone'
import TimerRoundedIcon from '@material-ui/icons/TimerRounded'
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined'
import { formatPrice, formatNumber, formatPricesWithFree } from 'src/utils/price'
import styled from 'styled-components'
import Food from 'src/types/Food'
import Store from 'src/types/Store'

const GridContainerLi = styled.li<{ onlyImage: boolean }>`
  display: grid;
  ${(p) => (p.onlyImage ? '' : 'grid-template-columns: 1fr 2fr;')}

  background: #f8f2f8;
`

const FlexContainerAlignCenter = styled.div`
  display: flex;
  align-items: center;
  gap: 0.1rem;
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
`

const FlexContainerColumnBetween = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;

  position: relative;
  padding: 0.5rem;
`

const AbsolutePosition = styled.div`
  position: absolute;
  top: 0.2rem;
  right: 0.1rem;
`

const FlexContainerColumnGap = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 0.3rem;
`

const LighterH5 = styled.h5`
  margin: 0;
  font-weight: lighter;
`

const FlexContainerAlignCenterGap = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const NoMarginH3 = styled.h3`
  margin: 0;
`

const FlexContainerUl = styled.ul`
  display: flex;
  gap: 0.5rem;

  list-style: none;
  padding-left: 0;
`

const FlexContainerBetweenCenter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const BorderLine = styled.div`
  border: 1px solid grey;
`

const FlexContainerCenterGap = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: center;
`

type Props = {
  food: Food
  store: Store
  onlyImage: boolean
}

function FoodCard({ food, store, onlyImage }: Props) {
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
          <FlexContainerColumnGap>
            <FlexContainerAlignCenterGap>
              <FlexContainerAlignCenter>
                <LocationOnTwoToneIcon fontSize="small" />
                <LighterH5>{store.name}</LighterH5>
              </FlexContainerAlignCenter>
              <FlexContainerAlignCenter>
                <MotorcycleTwoToneIcon />
                <LighterH5>{formatPricesWithFree(store.deliveryFees)}</LighterH5>
              </FlexContainerAlignCenter>
            </FlexContainerAlignCenterGap>
            <NoMarginH3>{food.name}</NoMarginH3>
            <FlexContainerUl>
              {food.hashtags.map((hashtag) => (
                <li key={hashtag}>{hashtag}</li>
              ))}
            </FlexContainerUl>
          </FlexContainerColumnGap>
          <FlexContainerColumnGap>
            <FlexContainerBetweenCenter>
              <FlexContainerAlignCenter>
                <TimerRoundedIcon />
                {`${store.deliveryTimeMin}-${store.deliveryTimeMax}분`}
              </FlexContainerAlignCenter>
              <NoMarginH3>{formatPrice(food.price)}</NoMarginH3>
            </FlexContainerBetweenCenter>
            <BorderLine />
            <FlexContainerCenterGap>
              <FlexContainerAlignCenter>
                <ThumbUpOutlinedIcon />
                <div>{food.likeRatio}%</div>
              </FlexContainerAlignCenter>
              <div>재주문율 {food.reorderRatio}%</div>
              <FlexContainerAlignCenter>
                <RateReviewTwoToneIcon />
                <div>{formatNumber(food.reviewCount)}개</div>
              </FlexContainerAlignCenter>
              <div>{formatNumber(food.orderCount)}개 구매</div>
            </FlexContainerCenterGap>
          </FlexContainerColumnGap>
        </FlexContainerColumnBetween>
      )}
    </GridContainerLi>
  )
}

export default FoodCard
