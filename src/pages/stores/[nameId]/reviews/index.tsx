import { Tabs, Input, Select, Divider } from 'antd'
import { useRouter } from 'next/router'
import PageHead from 'src/components/layouts/PageHead'
import PageLayout from 'src/components/layouts/PageLayout'
import styled from 'styled-components'
import { FlexContainerAlignCenter, FlexContainerBetween } from '../../../../styles/FlexContainer'
import ReviewCard from '../../../../components/ReviewCard'
import { useEffect, useState } from 'react'
import StoreInformation from 'src/components/StoreInformation'
import StoreTopHeader from 'src/components/StoreTopHeader'
import { useStoreNameIdUrl } from '..'
import { useStoreQuery } from 'src/graphql/generated/types-and-hooks'
import { handleApolloError } from 'src/apollo/error'

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
  const { storeId, getStoreUrl } = useStoreNameIdUrl()

  // store 정보는 cache-first 로 가져오기
  const storeQueryResult = useStoreQuery({ onError: handleApolloError, variables: { id: storeId } })

  const store = storeQueryResult.data?.store
  const isStoreLoading = storeQueryResult.loading

  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    setSearchTerm(decodeURIComponent(window.location.search.slice(6)))
  }, [])

  return (
    <PageHead title="디저트핏 - 매장 리뷰" description={description}>
      <PageLayout>
        <StoreTopHeader store={store} />

        <StoreInformation loading={isStoreLoading} store={store} />

        <Divider />
        <Tabs
          defaultActiveKey="reviews"
          centered
          onTabClick={(activeKey) => router.push(getStoreUrl(activeKey))}
        >
          <Tabs.TabPane tab="메뉴" key="menus" />
          <Tabs.TabPane tab="소식" key="feed" />
          <Tabs.TabPane tab="리뷰" key="reviews" />
        </Tabs>
        <MarginDiv>
          <FlexContainerBetween>
            <Search
              placeholder="내용을 입력해주세요."
              allowClear
              onSearch={onSearch}
              style={{ width: 230 }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select defaultValue="like" style={{ width: 120 }} onChange={handleChange}>
              <Option value="like">좋아요순</Option>
              <Option value="reorder">재주문율순</Option>
              <Option value="date">최신순</Option>
            </Select>
          </FlexContainerBetween>
          <Divider />
          <ReviewCard onlyImage={false} review={1 as any} />
        </MarginDiv>
      </PageLayout>
    </PageHead>
  )
}

export default StoreReviewsPage
