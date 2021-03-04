import PageHead from 'src/components/layouts/PageHead'
import Post from 'src/components/Post'

const description = '가까운 매장 또는 구독한 매장의 글이 올라오는 페이지'

function FeedPage() {
  return (
    <PageHead title="캡스톤디자인 - Feed" description={description}>
      <Post post="any post" />
      <Post post="any post2" />
      <Post post="any post3" />
    </PageHead>
  )
}

export default FeedPage
