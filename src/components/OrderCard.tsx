import { useRouter } from 'next/router'
import { MouseEvent } from 'react'
import useGoToPage from 'src/hooks/useGoToPage'
import { TABLET_MIN_WIDTH } from 'src/models/constants'
import { FlexContainerBetween, FlexContainerAlignCenter } from 'src/components/atoms/FlexContainer'
import { formatPrice } from 'src/utils/price'
import styled from 'styled-components'
import { SkeletonImage, SkeletonText } from 'src/components/atoms/LoadingSkeleton'
import { Button } from 'antd'
import { RightOutlined } from '@ant-design/icons'
import { differenceInDays, format } from 'date-fns'
import { StoreImg, StoreName, CardHorizontalBorder, IconImg } from 'src/components/PostCard'
import ClientSideLink from 'src/components/atoms/ClientSideLink'
import { OrderCardFragment } from 'src/graphql/generated/types-and-hooks'

const GridContainerLi = styled.li`
  display: grid;
  grid-template-rows: repeat(3, auto);
  border-radius: 10px;
  border: solid 1px #e8e8e8;
  background-color: #ffffff;
  /* height: 13rem; */
  padding: 1rem;
  margin: 1rem;
`

const HalfWideButton = styled(Button)`
  width: 48%;
  height: 2.8rem;
  margin: 1rem 0;
`
const ratio = 30

const RelativePosition = styled.div`
  margin: auto;
  position: relative;
  width: ${ratio}vw;
  max-width: calc(${TABLET_MIN_WIDTH} * ${ratio / 100});
  height: ${ratio}vw;
  max-height: calc(${TABLET_MIN_WIDTH} * ${ratio / 100});
  grid-area: 'image';
`

const RoundSkeletonImage = styled(SkeletonImage)`
  border-radius: 5px;
`

const WideSkeletonText = styled(SkeletonText)`
  grid-column: auto / span 2;
`

const GridContainer = styled.div`
  display: grid;
  gap: 0.5rem;
  grid-template-rows: 1fr 2fr 1fr;
`

const GridContainerSpan2 = styled.div<{ hasReview: boolean }>`
  display: grid;
  gap: 0.5rem;
  grid-template-columns: ${(p) => (p.hasReview ? '1fr 1fr' : '1fr')};
  grid-column: auto / span 2;
`

const Width100Button = styled.button`
  width: 100%;
`

const MintText = styled.h4`
  color: #2eccba;
`

const GreyText = styled.h4`
  color: #a8a8a8;
`

export function OrderLoadingCard() {
  return (
    <GridContainerLi>
      <RelativePosition>
        <RoundSkeletonImage />
      </RelativePosition>
      <GridContainer>
        <SkeletonText width="40%" height="100%" />
        <SkeletonText width="80%" height="100%" />
        <SkeletonText height="100%" />
      </GridContainer>
      <WideSkeletonText height="3rem" />
      <GridContainerSpan2 hasReview={false}>
        <Width100Button disabled={true}>재주문</Width100Button>
      </GridContainerSpan2>
    </GridContainerLi>
  )
}

type Props = {
  order: OrderCardFragment
}

function OrderCard({ order }: Props) {
  const router = useRouter()

  const { name } = router.query
  const store = order.store

  const goToUserOrderPage = useGoToPage(`/users/${name}/orders/${order.id}`)
  const goToStoreMenusPage = useGoToPage(`/stores/${store.name}`)

  function reorder(e: MouseEvent) {
    e.stopPropagation()
    console.log('재주문하기')
  }

  function goToUserReviewPage(reviewId: number) {
    return (e: MouseEvent) => {
      e.stopPropagation()
      router.push(`/users/${name}/reviews/${reviewId}`)
    }
  }

  return (
    <GridContainerLi onClick={goToUserOrderPage}>
      <FlexContainerBetween>
        <ClientSideLink href={`/stores/${store.name}-${store.id}`}>
          <FlexContainerAlignCenter>
            <StoreImg src={store.imageUrls ? store.imageUrls[0] : ''} alt="store profile" />
            <StoreName>{store.name}</StoreName>
            <RightOutlined />
          </FlexContainerAlignCenter>
        </ClientSideLink>
        <FlexContainerAlignCenter>
          <IconImg src="/620@3x.png" />
          <MintText>배달완료</MintText>
        </FlexContainerAlignCenter>
      </FlexContainerBetween>
      <CardHorizontalBorder />
      <FlexContainerBetween>
        <ul>
          {order.selectedMenus.map((selectedMenu) => (
            <li key={selectedMenu.id}>- {selectedMenu.name}</li>
          ))}
        </ul>
        <div>{formatPrice(order.orderTotal)}</div>
      </FlexContainerBetween>
      <FlexContainerBetween>
        <HalfWideButton>재주문하기</HalfWideButton>
        <HalfWideButton>리뷰쓰기</HalfWideButton>
      </FlexContainerBetween>
      <FlexContainerBetween>
        <MintText>
          {`${differenceInDays(new Date(/* order.regularOrderDate */), new Date())}일 이내 
        ${/* order.regularOrderCount */ 1}번 더 주문시 단골등극!`}
        </MintText>
        <GreyText>{format(new Date(order.creationDate), 'yyyy.MM.dd iii')}</GreyText>
      </FlexContainerBetween>
    </GridContainerLi>
  )
}

export default OrderCard
