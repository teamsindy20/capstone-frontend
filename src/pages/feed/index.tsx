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

const PADDING_TOP = '3rem'

const BORDER_HEIGHT = '2px'

const StyledStoreRoundedIcon = { fontSize: 28, color: grey[800] }

const GridContainerUl = styled.ul`
  display: grid;
  gap: 3rem;
`

const description = '가까운 매장 또는 구독한 매장의 글을 읽어보세요.'

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

const HorizontalBorder = styled.div`
  border: ${BORDER_HEIGHT} solid #ddd;
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

const NoMarginH3 = styled.h3`
  margin: 0;
`

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
    <PageHead title="디저트핏 - 새 소식" description={description}>
      <PageLayout>
        <TopHeader>
          <FlexContainerCenterCenter>
            <StoreRoundedIcon style={StyledStoreRoundedIcon} />
            <NoMarginH3>매장소식</NoMarginH3>
          </FlexContainerCenterCenter>
        </TopHeader>

        <Div>
          <Tag color="rgb(190, 235, 253)" onClick={(e: any) => console.log(e.target.textContent)}>
            오늘의라인업
          </Tag>
          <Tag color="rgb(247, 231, 177)" onClick={(e: any) => console.log(e.target.textContent)}>
            신메뉴소식
          </Tag>
          <Tag color="rgb(169, 160, 252)" onClick={(e: any) => console.log(e.target.textContent)}>
            할인/이벤트
          </Tag>

          <Tag color="rgb(207, 195, 181)" onClick={(e: any) => console.log(e.target.textContent)}>
            휴무일정
          </Tag>
          <Tag color="#FF8787" onClick={(e: any) => console.log(e.target.textContent)}>
            빵나오는시간
          </Tag>
          <Tag color="#99E9F2" onClick={(e: any) => console.log(e.target.textContent)}>
            일상
          </Tag>
          <Tag color="#F1F3F5" onClick={(e: any) => console.log(e.target.textContent)}>
            기타
          </Tag>
        </Div>
        <HorizontalBorder />
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
