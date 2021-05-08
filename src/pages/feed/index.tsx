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
import { Select, Tag } from 'antd'
import StoreRoundedIcon from '@material-ui/icons/StoreRounded'
import grey from '@material-ui/core/colors/grey'

const StyledStoreRoundedIcon = { fontSize: 25, color: grey[800] }

const GridContainerUl = styled.ul`
  display: grid;
  gap: 3rem;
`
const options = [
  { value: '신메뉴소식' },
  { value: '오늘의라인업' },
  { value: '할인/이벤트' },
  { value: '휴무공지' },
  { value: '일상' },
  { value: '품절소식' },
  { value: 'cyan' },
  { value: '#fff5f5' },
]

const description = '가까운 매장 또는 구독한 매장의 글을 읽어보세요.'

const TopContainer = styled.div`
  width: 100%;
  height: 60px;
  background-color: #fff5f5;
  margin-bottom: 10px;
  text-align: center;
`

const Div = styled.div`
  height: 3rem;
  overflow: scroll hidden;
`

const Tag1 = styled.span`
  display: inline;
`

function tagRender(props: { label: any; value: any; closable: any; onClose: any }) {
  const { label, value, closable, onClose } = props
  const onPreventMouseDown = (event: any) => {
    event.preventDefault()
    event.stopPropagation()
  }
  return (
    <Tag
      color={value}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  )
}

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
        <TopHeader>
          <StoreRoundedIcon style={StyledStoreRoundedIcon} />
          매장소식
        </TopHeader>
        {/* <Select
          mode="multiple"
          showArrow
          tagRender={tagRender}
          defaultValue={['신메뉴소식', '오늘의라인업', '공지사항', 'cyan']}
          style={{ width: '100%' }}
          options={options}
        /> */}
        <Div>
          <Tag1 onClick={(e) => console.log(123)}>asdf1</Tag1>
          <Tag1>asdf</Tag1>
          <Tag1>asdf</Tag1>
          <Tag1>asdf</Tag1>
          <Tag1>asdf</Tag1>
          <Tag1>asdf</Tag1>
          <Tag1>asdf</Tag1>
          <Tag1>asdfasdfasdfasdfasdf</Tag1>
          <Tag1>asdfasdfasdfasdfasdf</Tag1>
          <Tag1>asdfasdfasdfasdfasdf</Tag1>
          <Tag1>asdfasdfasdfasdfasdf</Tag1>
          <Tag1>asdfasdfasdfasdfasdf</Tag1>
          <Tag1>asdfasdfasdfasdfasdf</Tag1>
          <Tag1>asdfasdfasdfasdfasdf</Tag1>
          <Tag1>asdfasdfasdfasdfasdf</Tag1>
          <Tag1>asdfasdfasdfasdfasdf</Tag1>
          <Tag1>asdfasdfasdfasdfasdf</Tag1>
          <Tag1>asdfasdfasdfasdfasdf</Tag1>
          <Tag1>asdfasdfasdfasdfasdf</Tag1>
        </Div>
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
