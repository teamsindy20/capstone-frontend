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
import {
  FlexContainerAlignCenter,
  FlexContainerBetween,
  FlexContainerAround,
} from 'src/styles/FlexContainer'
import { UserName, ReviewBadge, ImgInCard } from 'src/components/ReviewCard'
import { ProfileTitleGrid, FlexContainer } from 'src/components/PostCard'
import { PRIMARY_BACKGROUND_COLOR, PRIMARY_TEXT_COLOR } from 'src/models/constants'
import { StyledButton } from 'src/pages/register'

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
  padding: 0 2rem;
  align-items: center;
  background-color: #fcfcfc;
`

const WhiteFlexContainer = styled(FlexContainerAround)`
  height: 5rem;
  align-items: center;
  text-align: center;
  background-color: white;
  border: solid 1px #efefef;
  padding: 1rem;
  font-weight: 500;
  font-size: 1.1rem;
`

const TitleFlexContainer = styled(FlexContainerBetween)`
  height: 4rem;
  align-items: center;
  text-align: center;
  background-color: white;
  border: solid 1px #efefef;
  padding: 2rem;
  font-weight: 500;
  font-size: 1.1rem;
`
const ContentFlexContainer = styled(FlexContainerBetween)`
  padding: 0.5rem 2rem;
  align-items: center;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 500;
  color: #6c6c6c;
  background-color: #fcfcfc;
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

const LogoutButton = styled(StyledButton)`
  background-color: ${PRIMARY_BACKGROUND_COLOR};
  border: 1px solid ${PRIMARY_BACKGROUND_COLOR};
  color: white;

  :hover {
    background-color: white;
    color: ${PRIMARY_TEXT_COLOR};
  }
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
      <NavigationLayout>
        <TopHeader>
          <FlexContainerCenterCenter>
            <NoMarginH3>MY</NoMarginH3>
          </FlexContainerCenterCenter>
        </TopHeader>

        <GridContainer>
          <ProfileFlexContainer>
            <FlexContainer>
              <Image
                src="/605@2x.png"
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
          <TitleFlexContainer>회원정보수정</TitleFlexContainer>
          <TitleFlexContainer>설정</TitleFlexContainer>
          <TitleFlexContainer>고객설정</TitleFlexContainer>
          <ContentFlexContainer>1:1문의</ContentFlexContainer>
          <ContentFlexContainer>상품문의</ContentFlexContainer>
          <ContentFlexContainer>F&Q</ContentFlexContainer>
          <ContentFlexContainer>고객의소리</ContentFlexContainer>
          <TitleFlexContainer>ABOUT SINDY</TitleFlexContainer>
          <ContentFlexContainer>공지사항</ContentFlexContainer>
          <ContentFlexContainer>이벤트</ContentFlexContainer>
          <LogoutButton
            onClick={() => {
              localStorage.removeItem('token')
              sessionStorage.removeItem('token')
              refetchUser()
            }}
          >
            LOGOUT
          </LogoutButton>
        </GridContainer>

        <Footer />
      </NavigationLayout>
    </PageHead>
  )
}

export default MyDessertFitPage
