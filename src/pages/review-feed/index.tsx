import { useState } from 'react'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { handleApolloError } from 'src/apollo/error'
import PageHead from 'src/components/layouts/PageHead'
import PageLayout from 'src/components/layouts/PageLayout'
import PostCard, { PostLoadingCard } from 'src/components/PostCard'
import { usePostsByAddressQuery } from 'src/graphql/generated/types-and-hooks'
import { sleep } from 'src/utils/commons'
import styled from 'styled-components'
import TopHeader from 'src/components/TopHeader'
import StoreRoundedIcon from '@material-ui/icons/StoreRounded'
import grey from '@material-ui/core/colors/grey'
import { FlexContainerAlignCenter } from 'src/styles/FlexContainer'
import { Tabs } from 'antd'
import StoresFeedPage from 'src/pages/feed'
import { useRouter } from 'next/router'

const PADDING_TOP = '3rem'

const BORDER_HEIGHT = '2px'

const StyledStoreRoundedIcon = { fontSize: 28, color: grey[800] }

const GridContainerUl = styled.ul`
  display: grid;
  gap: 3rem;
`

const description = '다른 사람이 작성한 리뷰를 읽어보세요.'

const TopContainer = styled.div`
  width: 100%;
  height: 60px;
  background-color: #fff5f5;
  margin-bottom: 10px;
  text-align: center;
`

const FlexContainerCenterCenter = styled(FlexContainerAlignCenter)`
  justify-content: center;
  height: 100%;
`

const NoMarginH3 = styled.h3`
  margin: 0;
`

function FeedPage() {
  const router = useRouter()

  function goToPage(activeKey: string) {
    switch (activeKey) {
      case 'feed':
      case 'review-feed':
        return `/${activeKey}`
      default:
        return ''
    }
  }

  return (
    <PageHead title="디저트핏 - 리뷰 소식" description={description}>
      <PageLayout>
        <TopHeader>
          <Tabs
            defaultActiveKey="review-feed"
            centered
            onTabClick={(activeKey) => router.push(goToPage(activeKey))}
          >
            <Tabs.TabPane tab="매장 소식" key="feed" />
            <Tabs.TabPane tab="리뷰 소식" key="review-feed" />
          </Tabs>
        </TopHeader>

        <div>리뷰</div>
      </PageLayout>
    </PageHead>
  )
}

export default FeedPage
