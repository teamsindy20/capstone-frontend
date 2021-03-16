import { useState } from 'react'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import PageHead from 'src/components/layouts/PageHead'
import PageLayout from 'src/components/layouts/PageLayout'
import PostCard, { PostLoadingCard } from 'src/components/PostCard'
import { posts, store, store2, store4 } from 'src/models/mock-data'
import { sleep } from 'src/utils/commons'
import styled from 'styled-components'

const GridContainerUl = styled.ul`
  display: grid;
  gap: 3rem;
`

const description = '가까운 매장 또는 구독한 매장의 글을 읽어보세요.'

function FeedPage() {
  const [isLoadingPosts, setIsLoadingPosts] = useState(false)
  const [hasMorePosts, setHasMorePosts] = useState(true)

  async function fetchMorePosts() {
    setIsLoadingPosts(true)
    await sleep(5000) // fetchMorePosts(from, count)
    setIsLoadingPosts(false)

    console.log('page:')

    setHasMorePosts(false)
  }

  const infiniteRef = useInfiniteScroll<HTMLUListElement>({
    loading: isLoadingPosts,
    hasNextPage: hasMorePosts,
    onLoadMore: fetchMorePosts,
  })

  return (
    <PageHead title="캡스톤디자인 - 새 소식" description={description}>
      <PageLayout>
        <h2>흑석동 주변 새 소식</h2>

        <GridContainerUl ref={infiniteRef}>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} store={store} />
          ))}
          {isLoadingPosts && <PostLoadingCard />}
        </GridContainerUl>
      </PageLayout>
    </PageHead>
  )
}

export default FeedPage
