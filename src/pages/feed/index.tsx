import { Tabs, Divider, Button } from 'antd'
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
import { FlexContainerBetween, FlexContainerAlignCenter } from 'src/styles/FlexContainer'

const HorizontalBorder = styled.div`
  border: 2px solid #ddd;
  margin-bottom: 15px;
`

const ScrollDiv = styled.div`
  overflow: scroll hidden;
  display: flex;
  margin: 6px 0px;
`
const MarginDiv = styled.div`
  margin: 0.5rem;
`

const NoMarginh3 = styled.h3`
  margin: 0;
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
    notifyOnNetworkStatusChange: true,
    onError: handleApolloError,
  })

  const posts = data?.postsByAddress
  const isPostsLoading = networkStatus < 7

  async function fetchMorePosts() {
    if (posts?.length) {
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
        <ScrollDiv>
          <Tag color="rgb(190, 235, 253)" onClick={(e: any) => console.log(e.target.textContent)}>
            메뉴 소식
          </Tag>
          <Tag color="rgb(247, 231, 177)" onClick={(e: any) => console.log(e.target.textContent)}>
            영업 공지
          </Tag>
          <Tag color="rgb(169, 160, 252)" onClick={(e: any) => console.log(e.target.textContent)}>
            이벤트
          </Tag>

          <Tag color="rgb(207, 195, 181)" onClick={(e: any) => console.log(e.target.textContent)}>
            원데이 클래스
          </Tag>
          <Tag color="#FF8787" onClick={(e: any) => console.log(e.target.textContent)}>
            이모저모
          </Tag>
        </ScrollDiv>
        <HorizontalBorder />
        <Divider />
        <MarginDiv>
          <FlexContainerBetween>
            <NoMarginh3>찜한 매장 소식</NoMarginh3>
            <Button type="text">더보기</Button>
          </FlexContainerBetween>
          <Divider />
          <GridContainerUl onlyImage={false}>
            {posts?.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
            {isPostsLoading || hasMorePosts ? (
              <div ref={sentryRef}>
                <PostLoadingCard />
              </div>
            ) : (
              posts?.length === 0 && '매장 소식이 없어요...'
            )}
          </GridContainerUl>
        </MarginDiv>
        <Divider />
        <MarginDiv>
          <FlexContainerBetween>
            <NoMarginh3>전체 매장 소식</NoMarginh3>
            <Button type="text">더보기</Button>
          </FlexContainerBetween>
          <Divider />
          <GridContainerUl onlyImage={false}>
            {posts?.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
            {isPostsLoading || hasMorePosts ? (
              <div ref={sentryRef}>
                <PostLoadingCard />
              </div>
            ) : (
              posts?.length === 0 && '매장 소식이 없어요...'
            )}
          </GridContainerUl>
        </MarginDiv>
      </PageLayout>
    </PageHead>
  )
}

export default StoresFeedPage
