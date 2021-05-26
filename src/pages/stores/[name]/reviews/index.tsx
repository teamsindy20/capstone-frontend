import { Tabs, Input, Space, Select, Divider, Row, Col } from 'antd'
import { useRouter } from 'next/router'
import PageHead from 'src/components/layouts/PageHead'
import PageLayout from 'src/components/layouts/PageLayout'
import styled from 'styled-components'
import { FlexContainerAlignCenter, FlexContainerBetween } from '../../../../styles/FlexContainer'
import ReviewCard from '../../../../components/ReviewCard'

const description = '매장에서 판매하는 메뉴의 리뷰를 확인해보세요.'

const { Search } = Input

const { Option } = Select

const MarginDiv = styled.div`
  margin: 0.5rem;
`

const onSearch = (value: any) => console.log(value)

function handleChange(value: any) {
  console.log(`selected ${value}`)
}

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
        <MarginDiv>
          <FlexContainerBetween>
            <Search
              placeholder="내용을 입력해주세요."
              allowClear
              onSearch={onSearch}
              style={{ width: 230 }}
            />
            <Select defaultValue="like" style={{ width: 120 }} onChange={handleChange}>
              <Option value="like">좋아요순</Option>
              <Option value="reorder">재주문율순</Option>
              <Option value="date">최신순</Option>
            </Select>
          </FlexContainerBetween>
          <Divider />
          <ReviewCard />
        </MarginDiv>
      </PageLayout>
    </PageHead>
  )
}

export default StoreReviewsPage
