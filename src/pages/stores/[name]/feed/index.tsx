import { Tabs } from 'antd'
import { useRouter } from 'next/router'
import { useState } from 'react'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { handleApolloError } from 'src/apollo/error'
import PageHead from 'src/components/layouts/PageHead'
import PageLayout from 'src/components/layouts/PageLayout'
import PostCard, { PostLoadingCard } from 'src/components/PostCard'
import { HorizontalBorder } from 'src/components/TopHeader'
import { usePostsByStoreQuery } from 'src/graphql/generated/types-and-hooks'
import { GridContainerUl } from 'src/pages'
import { sleep } from 'src/utils/commons'
import styled from 'styled-components'
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded'

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

const description = '매장의 소식을 확인해보세요'

function StoreFeedPage() {
  const router = useRouter()
  const storeNameWithId = (router.query.name ?? '') as string
  const storeName = storeNameWithId?.substring(0, storeNameWithId.lastIndexOf('-'))
  const storeId = storeNameWithId?.substring(storeNameWithId.lastIndexOf('-') + 1)

  function goToPage(activeKey: string) {
    switch (activeKey) {
      case 'menus':
        return `/stores/${router.query.name}`
      case 'feed':
      case 'reviews':
        return `/stores/${router.query.name}/${activeKey}`
      default:
        return ''
    }
  }

  const [hasMorePosts, setHasMorePosts] = useState(true)

  const { data, networkStatus } = usePostsByStoreQuery({
    notifyOnNetworkStatusChange: true,
    onError: handleApolloError,
    variables: { storeId },
  })

  const posts = data?.postsByStore
  const isPostsLoading = networkStatus < 7

  console.log(posts)

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

  return (
    <PageHead title="디저트핏 - 매장 소식" description={`${storeName} ${description}`}>
      <PageLayout>
        <Tabs
          defaultActiveKey="feed"
          centered
          onTabClick={(activeKey) => router.push(goToPage(activeKey))}
        >
          <Tabs.TabPane tab="메뉴" key="menus" />
          <Tabs.TabPane tab="소식" key="feed" />
          <Tabs.TabPane tab="리뷰" key="reviews" />
        </Tabs>

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
          {posts?.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
          {(isPostsLoading || hasMorePosts) && (
            <div ref={sentryRef}>
              <PostLoadingCard />
            </div>
          )}
          {posts?.length === 0 && '매장 소식이 없어요...'}
        </GridContainerUl>
      </PageLayout>
    </PageHead>
  )
}

export default StoreFeedPage
