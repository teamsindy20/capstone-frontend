import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import PageHead from 'src/components/layouts/PageHead'
import PageLayout from 'src/components/layouts/PageLayout'
import PostCard, { PostLoadingCard } from 'src/components/PostCard'
import { posts, store, store2, store4 } from 'src/models/mock-data'
import { sleep } from 'src/utils/commons'
import styled from 'styled-components'
import TopHeader from 'src/components/TopHeader'
import { Select, Tag } from 'antd'

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
function tagRender(props) {
  const { label, value, closable, onClose } = props
  const onPreventMouseDown = (event) => {
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
  const [isLoadingPosts, setIsLoadingPosts] = useState(false)
  const [hasMorePosts, setHasMorePosts] = useState(true)

  async function fetchMorePosts() {
    setIsLoadingPosts(true)
    await sleep(5000) // fetchMorePosts(from, count)
    setIsLoadingPosts(false)

    setHasMorePosts(false)
  }

  const infiniteRef = useInfiniteScroll<HTMLUListElement>({
    loading: isLoadingPosts,
    hasNextPage: hasMorePosts,
    onLoadMore: fetchMorePosts,
  })

  return (
    <PageHead title="Deple - 새 소식" description={description}>
      <PageLayout>
        <TopHeader></TopHeader>
        <Select
          mode="multiple"
          showArrow
          tagRender={tagRender}
          defaultValue={['신메뉴소식', '오늘의라인업', '공지사항', 'cyan']}
          style={{ width: '100%' }}
          options={options}
        />
        <GridContainerUl ref={infiniteRef}>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
          <PostLoadingCard />
          {isLoadingPosts && <PostLoadingCard />}
        </GridContainerUl>
      </PageLayout>
    </PageHead>
  )
}

export default FeedPage
