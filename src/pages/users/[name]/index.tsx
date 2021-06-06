import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import PageHead from 'src/components/layouts/PageHead'
import NavigationLayout from 'src/components/layouts/NavigationLayout'
import Footer from 'src/components/Footer'
import NotLoginModal from 'src/components/NotLoginModal'
import { GlobalContext } from 'src/pages/_app'
import { Button, Divider } from 'antd'
import styled from 'styled-components'
import TopHeader from 'src/components/TopHeader'
import { FlexContainerAlignCenter, FlexContainerBetween } from 'src/styles/FlexContainer'
import { UserName, ReviewBadge, ImgInCard } from 'src/components/ReviewCard'
import { ProfileTitleGrid, FlexContainer } from 'src/components/PostCard'

const GridContainer = styled.div`
  display: grid;
  grid-template-rows: auto;
`

const GridContainerUl = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
`

const description = '내게 딱 맞는 디저트핏!을 만나보세요.'

const ProfileFlexContainer = styled(FlexContainerBetween)`
  height: 7rem;
  padding: 0 1rem;
  align-items: center;
  background-color: #fcfcfc;
`

const WhiteFlexContainer = styled(FlexContainerBetween)`
  height: 5rem;
  align-items: center;
  text-align: center;
  background-color: white;
  border: solid 1px #efefef;
  padding: 1rem;
`

const FlexContainerCenterCenter = styled(FlexContainerAlignCenter)`
  justify-content: center;
  height: 100%;
`
const PinkText = styled.h4`
  color: #ff5e3d;
`

const NoMarginH3 = styled.h3`
  margin: 0;
`

function MyDessertFitPage() {
  const { user, loading, refetchUser } = useContext(GlobalContext)
  const { query } = useRouter()

  if (loading) {
    return (
      <PageHead title="디저트핏 - 내 DessertFit" description={description}>
        <NavigationLayout>
          사용자 인증 중. 이때 여기 페이지만의 로딩 스켈레톤 또는 더미데이터로 채운 화면 보여주기
        </NavigationLayout>
      </PageHead>
    )
  }

  if (!user) {
    return (
      <PageHead title="디저트핏 - 내 DessertFit" description={description}>
        <NavigationLayout>
          <NotLoginModal />
          <Footer />
        </NavigationLayout>
      </PageHead>
    )
  }

  return (
    <PageHead title="디저트핏 - 내 DessertFit" description={description}>
      {/* <NavigationLayout> */}
        <TopHeader>
          <FlexContainerCenterCenter>
            <NoMarginH3>MY</NoMarginH3>
          </FlexContainerCenterCenter>
        </TopHeader>
      {/* </NavigationLayout> */}
      <GridContainer>
        <ProfileFlexContainer>
          <FlexContainer>
            <Image
              src="/605@3x.png"
              alt="user-profile"
              width="50"
              height="50"
              objectFit="contain"
            />

            <ProfileTitleGrid>
              <UserName>{query.name}</UserName>
              <ReviewBadge>BEST 리뷰어</ReviewBadge>
            </ProfileTitleGrid>
          </FlexContainer>
          <Button>프로필보기</Button>
        </ProfileFlexContainer>
        <WhiteFlexContainer>
          <div>
            <h4>리뷰수</h4>
            <PinkText>3개</PinkText>
          </div>
          <div>
            <h4>쿠폰</h4>
            <PinkText>3개</PinkText>
          </div>
          <div>
            <h4>포인트</h4>
            <PinkText>3000P</PinkText>
          </div>
        </WhiteFlexContainer>
      </GridContainer>
      {/* <Button
          onClick={() => {
            localStorage.removeItem('token')
            sessionStorage.removeItem('token')
            refetchUser()
          }}
          size="large"
          type="primary"
        >
          로그아웃
        </Button> */}
      {/* <Footer /> */}
    </PageHead>
  )
}

export default MyDessertFitPage
