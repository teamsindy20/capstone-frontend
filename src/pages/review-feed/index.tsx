import { Tabs, Divider, Button } from 'antd'
import { useRouter } from 'next/router'
import PageHead from 'src/components/layouts/PageHead'
import PageLayout from 'src/components/layouts/PageLayout'
import TopHeader from 'src/components/TopHeader'
import styled from 'styled-components'
import { FlexContainerBetween, FlexContainerAlignCenter } from 'src/styles/FlexContainer'
import ReviewCard from 'src/components/ReviewCard'
import {
  HorizontalBorder,
  ThinHorizontalBorder,
  FeedTitleContainer,
  FeedTitleText,
  FeedMoreText,
} from 'src/pages/feed'

const description = '다른 사람이 작성한 리뷰를 읽어보세요.'

const MarginDiv = styled.div`
  margin: 0.5rem;
`

const NoMarginh3 = styled.h3`
  margin: 0;
`

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
            size="large"
            onTabClick={(activeKey) => router.push(goToPage(activeKey))}
          >
            <Tabs.TabPane tab="매장 소식" key="feed" />
            <Tabs.TabPane tab="리뷰 소식" key="review-feed" />
          </Tabs>
        </TopHeader>
        <FeedTitleContainer>
          <FeedTitleText>찜한 매장 리뷰 소식</FeedTitleText>
          <FeedMoreText shape="round" type="text">
            더보기
          </FeedMoreText>
        </FeedTitleContainer>
        <ThinHorizontalBorder />

        <ReviewCard onlyImage={false} review={1 as any} />
        <HorizontalBorder />

        <FeedTitleContainer>
          <FeedTitleText>전체 매장 리뷰 소식</FeedTitleText>
          <FeedMoreText shape="round" type="text">
            더보기
          </FeedMoreText>
        </FeedTitleContainer>
        <ThinHorizontalBorder />
        <ReviewCard onlyImage={false} review={1 as any} />
      </PageLayout>
    </PageHead>
  )
}

export default FeedPage
