import { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import PageHead from 'src/components/layouts/PageHead'
import PageLayout from 'src/components/layouts/PageLayout'
import PostCard from 'src/components/PostCard'
import { post, store, store2, store4 } from 'src/models/mock-data'
import styled from 'styled-components'

const GridContainerUl = styled.ul`
  display: grid;
  gap: 3rem;

  list-style: none;
  padding-left: 0;
`

const description = '가까운 매장 또는 구독한 매장의 글을 읽어보세요.'

function FeedPage() {
  const [hasMore, setHasMore] = useState(true)

  async function handleLoadMore(page: any) {
    await new Promise((resolve) => setTimeout(resolve, 5000))
    console.log(page)
    setHasMore(false)
  }

  return (
    <PageHead title="캡스톤디자인 - 새 소식" description={description}>
      <PageLayout>
        <h2>흑석동 주변 새 소식</h2>
        <InfiniteScroll
          loadMore={handleLoadMore}
          hasMore={hasMore}
          loader={<PostCard post={post} store={store} loading={true} />}
        >
          <GridContainerUl>
            <PostCard post={post} store={store} loading={false} />
            <PostCard post={post} store={store2} loading={false} />
            <PostCard post={post} store={store4} loading={false} />
            <PostCard post={post} store={store} loading={true} />
          </GridContainerUl>
        </InfiniteScroll>
      </PageLayout>
    </PageHead>
  )
}

export default FeedPage
