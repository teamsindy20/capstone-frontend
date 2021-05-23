import { Tabs } from 'antd'
import { useRouter } from 'next/router'
import PageHead from 'src/components/layouts/PageHead'
import PageLayout from 'src/components/layouts/PageLayout'

const description = '매장에서 판매하는 메뉴의 리뷰를 확인해보세요.'

function StoreReviewsPage() {
  const router = useRouter()

  function goToPage(activeKey: string) {
    switch (activeKey) {
      case 'menus':
        return `/stores/${router.query.name}`
      case 'feed':
      case 'reviews':
        return `/stores/${router.query.name}/${activeKey}`
      default:
        return ''
    }
  }

  return (
    <PageHead title="디저트핏 - 매장 리뷰" description={description}>
      <PageLayout>
        <Tabs
          defaultActiveKey="reviews"
          centered /* activeKey={activeKey} centered onTabClick={setActiveKey} */
          onTabClick={(activeKey) => router.push(goToPage(activeKey))}
        >
          <Tabs.TabPane tab="메뉴" key="menus" />
          <Tabs.TabPane tab="소식" key="feed" />
          <Tabs.TabPane tab="리뷰" key="reviews" />
        </Tabs>
        <div>리뷰 페이지</div>
        <div>메뉴 검색: {router.query.menu}</div>
      </PageLayout>
    </PageHead>
  )
}

export default StoreReviewsPage
