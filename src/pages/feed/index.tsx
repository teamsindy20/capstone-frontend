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
  imageUrl: [
    'https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/158898610_769503400650135_864312100874278057_n.jpg?tp=1&_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=103&_nc_ohc=n2QL5bi1mgAAX8GEg6s&oh=0fe3584ef45698e09940e917610370af&oe=607027AE',
  ],
}

const store: TStore = {
  name: 'starbucks',
  location: '흑석동',
  imageUrl:
    'https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/1200px-Starbucks_Corporation_Logo_2011.svg.png',
  deliveryFees: [2500],
  deliveryTimeMin: 10,
  deliveryTimeMax: 23,
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
            <Post post={post} store={store} loading={false} />
          </GridContainerUl>
        </InfiniteScroll>
      </PageLayout>
    </PageHead>
  )
}

export default FeedPage
