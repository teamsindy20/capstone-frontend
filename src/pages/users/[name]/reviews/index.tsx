import { useState } from 'react'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import PageHead from 'src/components/layouts/PageHead'
import PageLayout from 'src/components/layouts/PageLayout'
import ReviewCard, { ReviewLoadingCard } from 'src/components/ReviewCard'
import useBoolean from 'src/hooks/useBoolean'
import { reviews } from 'src/models/mock-data'
import { sleep } from 'src/utils/commons'
import styled from 'styled-components'

const GridContainerInfiniteScroll = styled.ul<{ onlyImage: boolean }>`
  display: grid;
  ${(p) => (p.onlyImage ? 'grid-template-columns: 1fr 1fr 1fr;' : '')}
  gap: ${(p) => (p.onlyImage ? 'min(1vw, 0.5rem)' : '1rem')};
`

const description = '내가 지금까지 쓴 리뷰를 확인해보세요'

function UserReviewsPage() {
  const [isLoadingMyReviews, setIsLoadingMyReviews] = useState(false)
  const [hasMoreMyReviews, setHasMoreMyReviews] = useState(true)
  const [onlyImage, toggleOnlyImage] = useBoolean(false)

  async function fetchMoreMenus() {
    setIsLoadingMyReviews(true)
    await sleep(5000) // fetchMoreMenus(from, count)
    setIsLoadingMyReviews(false)

    console.log('page:')

    setHasMoreMyReviews(false)
  }

  const [sentryRef] = useInfiniteScroll({
    loading: isLoadingMyReviews,
    hasNextPage: hasMoreMyReviews,
    onLoadMore: fetchMoreMenus,
  })

  return (
    <PageHead title="Deple - 내 리뷰" description={description}>
      <PageLayout>
        <button onClick={toggleOnlyImage}>사진만 보기</button>

        <GridContainerInfiniteScroll onlyImage={onlyImage}>
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} onlyImage={onlyImage} />
          ))}
        </GridContainerInfiniteScroll>
        {isLoadingMyReviews && (
          <div ref={sentryRef}>
            <ReviewLoadingCard onlyImage={onlyImage} />
          </div>
        )}
      </PageLayout>
    </PageHead>
  )
}

export default UserReviewsPage
