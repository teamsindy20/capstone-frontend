import TimerRoundedIcon from '@material-ui/icons/TimerRounded'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { MouseEvent as ReactMouseEvent } from 'react'
import useGoToPage from 'src/hooks/useGoToPage'
import { TABLET_MIN_WIDTH } from 'src/models/constants'
import { FlexContainerBetween, FlexContainerAlignCenter } from 'src/styles/FlexContainer'
import TOrder from 'src/types/Order'
import TStore from 'src/types/Store'
import { formatPrice } from 'src/utils/price'
import styled from 'styled-components'
import styles from '../styles/NextImage.module.css'
import { SkeletonImage, SkeletonText } from './MenuCard'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import RateReviewRoundedIcon from '@material-ui/icons/RateReviewRounded'
import ReplayRoundedIcon from '@material-ui/icons/ReplayRounded'
import { Card, Avatar, Divider, Button } from 'antd'
import { EditOutlined, ReloadOutlined, SettingOutlined, RightOutlined } from '@ant-design/icons'
import * as dateFns from 'date-fns'

const { Meta } = Card

const GridContainerLi = styled.li`
  display: grid;
  gap: 0.5rem;
  grid-template-columns: 1fr 2fr;

  position: relative;
  background: #fff;
  padding: 0.5rem;
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

const GridItemColumn2 = styled.div`
  grid-column: auto / span 2;
`

const Width100Button = styled.button`
  width: 100%;
`

const AbsolutePosition = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
`

function formatOrderDate(orderDate: string) {
  return orderDate
}

function formatRegularOrderDate(regularOrderDate: string) {
  return regularOrderDate
}

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
  order: TOrder
  store: TStore
}

function OrderCard({ order, store }: Props) {
  const router = useRouter()

  const { name } = router.query

  const goToUserOrderPage = useGoToPage(`/users/${name}/orders/${order.id}`)
  const goToStoreMenusPage = useGoToPage(`/stores/${store.name}`)

  function goToUserReviewPage(reviewId: number) {
    return (e: ReactMouseEvent<HTMLElement, MouseEvent>) => {
      e.stopPropagation()
      router.push(`/users/${name}/reviews/${reviewId}`)
    }
  }

  return (
    <GridContainerLi onClick={goToUserOrderPage}>
      <Card
        style={{ width: 360 }}
        actions={[
          <Button
            shape="circle"
            icon={<ReloadOutlined />}
            key="reorder"
            onClick={(e) => e.stopPropagation()}
          />,
          <Button
            shape="circle"
            icon={<EditOutlined />}
            key="review"
            onClick={goToUserReviewPage(+order.review.id)}
          />,
        ]}
      >
        <Meta
          avatar={<Avatar src={order.menus[0].imageUrl} />}
          title={`${store.name} >`}
          description={order.orderStatus}
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
          onClick={goToStoreMenusPage}
>>>>>>> Stashed changes
=======
          onClick={goToStoreMenusPage}
>>>>>>> Stashed changes
        />
        <Divider />
        <div>
          <FlexContainerBetween>
            <ul>
              {order.menus.map((menu) => (
                <li key={menu.id}>- {menu.name}</li>
              ))}
            </ul>
            <div>{formatPrice(order.orderTotal)}</div>
          </FlexContainerBetween>
          <FlexContainerBetween>
            <div>
              {`${formatRegularOrderDate(order.regularOrderDate)}까지 
        ${order.regularOrderCount}번 더 주문 시 단골이 될 수 있어요!`}
            </div>
          </FlexContainerBetween>
          <FlexContainerBetween>
            <div>주문일자</div>
            <div>{dateFns.format({order.orderDate}, 'yyyy.MM.dd')}</div>
          </FlexContainerBetween>
        </div>
      </Card>

      <RelativePosition onClick={goToStoreMenusPage}>
        <Image
          src={order.menus[0].imageUrl}
          alt="store"
          layout="fill"
          objectFit="cover"
          className={styles.storeCard}
        />
      </RelativePosition>
      <div>
        <AbsolutePosition>
          <FlexContainerAlignCenter>
            <TimerRoundedIcon />
            {`${store.deliveryTimeMin}-${store.deliveryTimeMax}분`}
          </FlexContainerAlignCenter>
        </AbsolutePosition>
        <h3 onClick={goToStoreMenusPage}>{store.name}</h3>
        <ul>
          {order.menus.map((menu) => (
            <li key={menu.id}>- {menu.name}</li>
          ))}
        </ul>
        <div>{formatOrderDate(order.orderDate)}</div>
        <div>{formatPrice(order.orderTotal)}</div>
      </div>
      <GridItemColumn2>
        {`${formatRegularOrderDate(order.regularOrderDate)}까지 
        ${order.regularOrderCount}번 만 더 주문하면 단골이 될 수 있어요!`}
      </GridItemColumn2>
      <div>{order.orderStatus}</div>
      <GridContainerSpan2 hasReview={!!order.review}>
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        <Button
          onClick={(e) => {
            e.stopPropagation()
          }}
          // variant="contained"
          color="primary"
          // startIcon={<ReplayRoundedIcon />}
        >
          재주문하기
        </Button>
        {order.review && (
          <Button
            onClick={(e) => {
              e.stopPropagation()
              goToUserReviewPage(+order.review.id)
            }}
            // variant="contained"
            color="primary"
            // startIcon={<RateReviewRoundedIcon />}
          >
            리뷰쓰기
          </Button>
        )}
=======
        <button onClick={(e) => e.stopPropagation()}>재주문하기</button>
        {order.review && <button onClick={goToUserReviewPage(+order.review.id)}>리뷰쓰기</button>}
>>>>>>> Stashed changes
=======
        <button onClick={(e) => e.stopPropagation()}>재주문하기</button>
        {order.review && <button onClick={goToUserReviewPage(+order.review.id)}>리뷰쓰기</button>}
>>>>>>> Stashed changes
      </GridContainerSpan2>
    </GridContainerLi>
  )
}

export default OrderCard
