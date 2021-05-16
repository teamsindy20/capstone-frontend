import { useState } from 'react'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import PageHead from 'src/components/layouts/PageHead'
import PageLayout from 'src/components/layouts/PageLayout'
import OrderCard, { OrderLoadingCard } from 'src/components/OrderCard'
import { orders, store } from 'src/models/mock-data'
import { sleep } from 'src/utils/commons'
import styled from 'styled-components'
import grey from '@material-ui/core/colors/grey'
import StoreRoundedIcon from '@material-ui/icons/StoreRounded'
import TopHeader from 'src/components/TopHeader'
import { FlexContainerAlignCenter } from 'src/styles/FlexContainer'

const description = '내가 지금까지 주문한 내역을 확인해보세요.'

const StyledStoreRoundedIcon = { fontSize: 28, color: grey[800] }

const FlexContainerCenterCenter = styled(FlexContainerAlignCenter)`
  justify-content: center;
  height: 100%;
`

const NoMarginH3 = styled.h3`
  margin: 0;
`

function StoreMenuRankingPage() {
  return (
    <>
      <>매장 메뉴별 랭킹 페이지</>
      <PageHead title="디저트핏 - 주문 내역" description={description}>
        <PageLayout>
          <TopHeader>
            <FlexContainerCenterCenter>
              <StoreRoundedIcon style={StyledStoreRoundedIcon} />
              <NoMarginH3>{store.name}</NoMarginH3>
            </FlexContainerCenterCenter>
          </TopHeader>
        </PageLayout>
      </PageHead>
    </>
  )
}

export default StoreMenuRankingPage
