import { Tabs } from 'antd'
import { useRouter } from 'next/router'
import { useState } from 'react'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { handleApolloError } from 'src/apollo/error'
import PageHead from 'src/components/layouts/PageHead'
import PageLayout from 'src/components/layouts/PageLayout'
import TopHeader from 'src/components/TopHeader'
import { usePostsByAddressQuery } from 'src/graphql/generated/types-and-hooks'
import { GridContainerUl } from 'src/pages'
import { sleep } from 'src/utils/commons'
import styled from 'styled-components'
import PostCard, { PostLoadingCard } from '../../components/PostCard'

const HorizontalBorder = styled.div`
  border: 2px solid #ddd;
  margin-bottom: 15px;
`

const Div = styled.div`
  overflow: scroll hidden;
  display: flex;
  margin: 6px 0px;
`

const Tag = styled.span<{ color: string }>`
  margin: 10px;
  padding: 5px 10px;
  white-space: nowrap;
  border-radius: 12px;
  font-size: 14px;
  text-align: center;
  vertical-align: middle;
  background-color: ${(p) => p.color};
`

const description = '가까운 매장 또는 구독한 매장의 글을 읽어보세요.'

function StoresFeedPage() {
  const [hasMorePosts, setHasMorePosts] = useState(true)

  const { data, fetchMore, networkStatus, refetch } = usePostsByAddressQuery({
    onError: handleApolloError,
    notifyOnNetworkStatusChange: true,
  })

  const isPostsLoading = networkStatus < 7

  async function fetchMorePosts() {
    if (data?.postsByAddress.length) {
      await sleep(5000) // fetchMore({ variables: { from, count } })
      setHasMorePosts(false)
    } else {
      setHasMorePosts(false)
    }
  }

  const [sentryRef] = useInfiniteScroll({
    loading: isPostsLoading,
    hasNextPage: hasMorePosts,
    onLoadMore: fetchMorePosts,
  })

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
    <PageHead title="디저트핏 - 매장 소식" description={description}>
      <PageLayout>
        <TopHeader>
          <Tabs
            defaultActiveKey="feed"
            centered
            onTabClick={(activeKey) => router.push(goToPage(activeKey))}
          >
            <Tabs.TabPane tab="매장 소식" key="feed" />
            <Tabs.TabPane tab="리뷰 소식" key="review-feed" />
          </Tabs>
        </TopHeader>

        <Div>
          <Tag color="rgb(190, 235, 253)" onClick={(e: any) => console.log(e.target.textContent)}>
            이벤트
          </Tag>
          <Tag color="rgb(247, 231, 177)" onClick={(e: any) => console.log(e.target.textContent)}>
            메뉴 소식
          </Tag>
          <Tag color="rgb(169, 160, 252)" onClick={(e: any) => console.log(e.target.textContent)}>
            영업 공지
          </Tag>

          <Tag color="rgb(207, 195, 181)" onClick={(e: any) => console.log(e.target.textContent)}>
            원데이 클래스
          </Tag>
          <Tag color="#FF8787" onClick={(e: any) => console.log(e.target.textContent)}>
            이모저모
          </Tag>
        </Div>
        <HorizontalBorder />
        <GridContainerUl onlyImage={false}>
          {data?.postsByAddress.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
          {(isPostsLoading || hasMorePosts) && (
            <div ref={sentryRef}>
              <PostLoadingCard />
            </div>
          )}
        </GridContainerUl>
      </PageLayout>
    </PageHead>
  )
}

export default StoresFeedPage
