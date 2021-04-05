import { useState } from 'react'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import PageHead from 'src/components/layouts/PageHead'
import PageLayout from 'src/components/layouts/PageLayout'
import OrderCard, { OrderLoadingCard } from 'src/components/OrderCard'
import { orders, store } from 'src/models/mock-data'
import { sleep } from 'src/utils/commons'
import styled from 'styled-components'

const GridContainerUl = styled.ul`
  display: grid;
  gap: 3rem;
`

const description = '내가 지금까지 주문한 내역을 확인해보세요.'

function UserOrdersPage() {
  const [isLoadingOrders, setIsLoadingOrders] = useState(false)
  const [hasMoreOrders, setHasMoreOrders] = useState(true)

  async function fetchMoreMenus() {
    setIsLoadingOrders(true)
    await sleep(5000) // fetchMoreMenus(from, count)
    setIsLoadingOrders(false)

    console.log('page:')

    setHasMoreOrders(false)
  }

  const infiniteRef = useInfiniteScroll<HTMLUListElement>({
    loading: isLoadingOrders,
    hasNextPage: hasMoreOrders,
    onLoadMore: fetchMoreMenus,
  })

  return (
    <PageHead title="디플 - Orders" description={description}>
      <PageLayout>
        <GridContainerUl ref={infiniteRef}>
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} store={store} />
          ))}
          <OrderLoadingCard />
          {isLoadingOrders && <OrderLoadingCard />}
        </GridContainerUl>
      </PageLayout>
    </PageHead>
  )
}

export default UserOrdersPage
