import { useContext, useState } from 'react'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import PageHead from 'src/components/layouts/PageHead'
import NavigationLayout from 'src/components/layouts/NavigationLayout'
import OrderCard, { OrderLoadingCard } from 'src/components/OrderCard'
import { orders } from 'src/models/mock-data'
import { sleep } from 'src/utils/commons'
import styled from 'styled-components'
import { FlexContainerAlignCenter } from 'src/styles/FlexContainer'
import grey from '@material-ui/core/colors/grey'
import StoreRoundedIcon from '@material-ui/icons/StoreRounded'
import TopHeader from 'src/components/TopHeader'
import { GlobalContext } from 'src/pages/_app'
import NotLoginModal from 'src/components/NotLoginModal'

const GridContainerUl = styled.ul`
  display: grid;
`

const StyledStoreRoundedIcon = { fontSize: 28, color: grey[800] }

const FlexContainerCenterCenter = styled(FlexContainerAlignCenter)`
  justify-content: center;
  height: 100%;
`

const NoMarginH3 = styled.h3`
  margin: 0;
`

const description = '내가 지금까지 주문한 내역을 확인해보세요.'

function UserOrdersPage() {
  const { user } = useContext(GlobalContext)

  const [isLoadingOrders, setIsLoadingOrders] = useState(false)
  const [hasMoreOrders, setHasMoreOrders] = useState(true)

  async function fetchMoreOrders() {
    setIsLoadingOrders(true)
    await sleep(5000) // fetchMoreMenus(from, count)
    setIsLoadingOrders(false)

    console.log('page:')

    setHasMoreOrders(false)
  }

  const [sentryRef] = useInfiniteScroll({
    loading: isLoadingOrders,
    hasNextPage: hasMoreOrders,
    onLoadMore: fetchMoreOrders,
  })

  if (!user) {
    return (
      <PageHead title="디저트핏 - 주문 내역" description={description}>
        <NavigationLayout>
          <NotLoginModal />
        </NavigationLayout>
      </PageHead>
    )
  }

  return (
    <PageHead title="디저트핏 - 주문 내역" description={description}>
      <NavigationLayout>
        <TopHeader>
          <FlexContainerCenterCenter>주문내역</FlexContainerCenterCenter>
        </TopHeader>
        <GridContainerUl>
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} store={order.store} />
          ))}
          {(isLoadingOrders || hasMoreOrders) && (
            <div ref={sentryRef}>
              <OrderLoadingCard />
            </div>
          )}
        </GridContainerUl>
      </NavigationLayout>
    </PageHead>
  )
}

export default UserOrdersPage
