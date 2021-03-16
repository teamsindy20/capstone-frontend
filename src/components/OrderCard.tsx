import Image from 'next/image'
import { useRouter } from 'next/router'
import { TABLET_MIN_WIDTH } from 'src/models/constants'
import TOrder from 'src/types/Order'
import TStore from 'src/types/Store'
import { formatPrice } from 'src/utils/price'
import styled from 'styled-components'
import { FlexContainerAlignCenter, FlexContainerBetween } from '../styles/FlexContainer'
import styles from '../styles/NextImage.module.css'
import { SkeletonImage, SkeletonText } from './MenuCard'

const GridContainerLi = styled.li`
  display: grid;
  gap: 0.5rem;
  grid-template-columns: 1fr 2fr;
  grid-auto-rows: max-content;

  background: #fff;
  padding: 0.5rem;
`

const FlexContainerBetweenCenter = styled(FlexContainerBetween)`
  align-items: center;
  padding: 1rem;
`

const ratio = 30

const RelativePosition = styled.div`
  margin: auto;
  position: relative;
  width: ${ratio}vw;
  max-width: calc(${TABLET_MIN_WIDTH} * ${ratio / 100});
  height: ${ratio}vw;
  max-height: calc(${TABLET_MIN_WIDTH} * ${ratio / 100});
`

const RoundSkeletonImage = styled(SkeletonImage)`
  border-radius: 5px;
`

const FlexContainerColumnBetween = styled(FlexContainerBetween)`
  flex-flow: column nowrap;
`

const WideSkeletonText = styled(SkeletonText)`
  grid-column: auto / span 2;
`

const GridContainer = styled.div`
  display: grid;
  gap: 0.5rem;
  grid-template-rows: 1fr 2fr 1fr;
`

const Width100Button = styled.button`
  width: 100%;
  grid-column: auto / span 2;
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
      <Width100Button disabled={true}>재주문</Width100Button>
    </GridContainerLi>
  )
}

type Props = {
  order: TOrder
  store: TStore
}

function OrderCard({ order, store }: Props) {
  const router = useRouter()

  const { name } = router.query

  function goToUserOrderPage() {
    router.push(`/users/${name}/orders/${order.id}`)
  }

  return (
    <GridContainerLi onClick={goToUserOrderPage}>
      <RelativePosition>
        <Image
          src={order.menus[0].imageUrl}
          alt="store"
          layout="fill"
          objectFit="cover"
          className={styles.storeCard}
        />
      </RelativePosition>
      <div>
        <h3>{store.name}</h3>
        <ul>
          {order.menus.map((menu) => (
            <li key={menu.id}>{menu.name}</li>
          ))}
        </ul>
        <div>{order.orderDate}</div>
        <div>{formatPrice(order.orderTotal)}</div>
      </div>
      <div>{order.orderStatus}</div>
      <ul>
        <li>
          <a href="인기인기">#인기인기</a>
        </li>
      </ul>
      <ul>
        <FlexContainerAlignCenter>{/* <FaceIcon /> */}</FlexContainerAlignCenter>
        <FlexContainerAlignCenter>{/* <RefreshIcon /> */}</FlexContainerAlignCenter>
      </ul>
    </GridContainerLi>
  )
}

export default OrderCard
