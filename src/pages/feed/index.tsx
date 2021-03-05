import PageHead from 'src/components/layouts/PageHead'
import PageLayout from 'src/components/layouts/PageLayout'
import Post from 'src/components/Post'

const description = '가까운 매장 또는 구독한 매장의 글을 읽어보세요.'

function FeedPage() {
  return (
    <PageHead title="캡스톤디자인 - Feed" description={description}>
      <PageLayout>
        <Post post="any post" />
        <Post post="any post2" />
        <Post post="any post3" />
      </PageLayout>
    </PageHead>
  )
}

export default FeedPage
