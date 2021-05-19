import { Tabs } from 'antd'
import { useRouter } from 'next/router'
import PageHead from 'src/components/layouts/PageHead'
import PageLayout from 'src/components/layouts/PageLayout'
import TopHeader from 'src/components/TopHeader'

const description = '다른 사람이 작성한 리뷰를 읽어보세요.'

function FeedPage() {
  const router = useRouter()

  function goToPage(activeKey: string) {
    switch (activeKey) {
      case 'feed':
      case 'review-feed':
        return `/${activeKey}`
      default:
        return ''
    }
  }

  return (
    <PageHead title="디저트핏 - 리뷰 소식" description={description}>
      <PageLayout>
        <TopHeader>
          <Tabs
            defaultActiveKey="review-feed"
            centered
            onTabClick={(activeKey) => router.push(goToPage(activeKey))}
          >
            <Tabs.TabPane tab="매장 소식" key="feed" />
            <Tabs.TabPane tab="리뷰 소식" key="review-feed" />
          </Tabs>
        </TopHeader>

        <div>리뷰</div>
      </PageLayout>
    </PageHead>
  )
}

export default FeedPage
