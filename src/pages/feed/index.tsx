import { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import PageHead from 'src/components/layouts/PageHead'
import PageLayout from 'src/components/layouts/PageLayout'
import Post from 'src/components/Post'
import TPost from 'src/types/Post'
import TStore from 'src/types/Store'
import styled from 'styled-components'

const GridContainerUl = styled.ul`
  display: grid;
  gap: 3rem;

  list-style: none;
  padding-left: 0;
`

const description = '가까운 매장 또는 구독한 매장의 글을 읽어보세요.'

const post: TPost = {
  title: '새로운 메뉴',
  content: 'ㅈㄱㄴ',
}

const store: TStore = {
  name: 'starbucks',
  location: '흑석동',
  imageUrl: '',
}

function FeedPage() {
  const [hasMore, setHasMore] = useState(true)

  async function handleLoadMore(page: any) {
    await new Promise((resolve) => setTimeout(resolve, 5000))
    console.log(page)
    setHasMore(false)
  }

  return (
    <PageHead title="캡스톤디자인 - Feed" description={description}>
      <PageLayout>
        <InfiniteScroll
          loadMore={handleLoadMore}
          hasMore={hasMore}
          loader={<Post post={post} store={store} loading={true} />}
        >
          <GridContainerUl>
            <Post post={post} store={store} loading={false} />
            <Post post={post} store={store} loading={false} />
            <Post post={post} store={store} loading={true} />
          </GridContainerUl>
        </InfiniteScroll>
      </PageLayout>
    </PageHead>
  )
}

export default FeedPage
