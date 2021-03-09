import PageHead from 'src/components/layouts/PageHead'
import PageLayout from 'src/components/layouts/PageLayout'
import Post from 'src/components/Post'
import TPost from 'src/types/Post'
import TStore from 'src/types/Store'

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
  return (
    <PageHead title="캡스톤디자인 - Feed" description={description}>
      <PageLayout>
        <Post post={post} store={store} loading={false} />
        <Post post={post} store={store} loading={false} />
        <Post post={post} store={store} loading={true} />
      </PageLayout>
    </PageHead>
  )
}

export default FeedPage
