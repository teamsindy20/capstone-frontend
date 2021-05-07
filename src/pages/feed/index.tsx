import { useState } from 'react'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { handleApolloError } from 'src/apollo/error'
import PageHead from 'src/components/layouts/PageHead'
import PageLayout from 'src/components/layouts/PageLayout'
import PostCard, { PostLoadingCard } from 'src/components/PostCard'
import { usePostsByAddressQuery } from 'src/graphql/generated/types-and-hooks'
import { sleep } from 'src/utils/commons'
import styled from 'styled-components'

const GridContainerUl = styled.ul`
  display: grid;
  gap: 3rem;
`

const description = '가까운 매장 또는 구독한 매장의 글을 읽어보세요.'

function FeedPage() {
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

  return (
    <PageHead title="Deple - 새 소식" description={description}>
      <PageLayout>
        <h2>흑석동 주변 새 소식</h2>

        <GridContainerUl>
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

export default FeedPage
