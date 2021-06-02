import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import PageHead from 'src/components/layouts/PageHead'
import PageLayout from 'src/components/layouts/PageLayout'
import NotLoginModal from 'src/components/NotLoginModal'
import { GlobalContext } from 'src/pages/_app'
import { Button } from 'antd'
import styled from 'styled-components'
import TopHeader from 'src/components/TopHeader'
import { FlexContainerAlignCenter } from 'src/styles/FlexContainer'

const FlexContainer = styled.div`
  display: flex;
`

const GridContainerUl = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
`

const description = '내게 딱 맞는 디저트핏!을 만나보세요.'

const FlexContainerCenterCenter = styled(FlexContainerAlignCenter)`
  justify-content: center;
  height: 100%;
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
        <PageLayout>
          사용자 인증 중. 이때 여기 페이지만의 로딩 스켈레톤 또는 더미데이터로 채운 화면 보여주기
        </PageLayout>
      </PageHead>
    )
  }

  if (!user) {
    return (
      <PageHead title="디저트핏 - 내 DessertFit" description={description}>
        <PageLayout>
          <NotLoginModal />
        </PageLayout>
      </PageHead>
    )
  }

  return (
    <PageHead title="디저트핏 - 내 DessertFit" description={description}>
      <PageLayout>
        <TopHeader>
          <FlexContainerCenterCenter>
            <NoMarginH3>마이페이지</NoMarginH3>
          </FlexContainerCenterCenter>
        </TopHeader>
        <div>
          <Button>환경 설정</Button>
        </div>
        <FlexContainer>
          <Image src="/sindy.jpeg" alt="user profile" width="128" height="128" />
          <div>
            <div>{query.name}</div>
            <div>내 취향: #저칼로리 #다이어트</div>
            <div>내 리뷰 배지: 아마추어 리뷰어, 메뉴 선택 도우미</div>
          </div>
        </FlexContainer>

        <GridContainerUl>
          <li>
            <Button>디플 포인트 324원</Button>
          </li>
          <li>
            <Button>쿠폰함 (3개)</Button>
          </li>
          <li>
            <Button>결제 수단</Button>
          </li>
          <li>
            <Button>공지사항</Button>
          </li>
          <li>
            <Button>이벤트</Button>
          </li>
          <li>
            <Button>디플 팀</Button>
          </li>
          <li>
            <Button>고객 지원</Button>
          </li>
          <li>
            <Button>약관·정책</Button>
          </li>
        </GridContainerUl>
        <Button
          onClick={() => {
            localStorage.removeItem('token')
            sessionStorage.removeItem('token')
            refetchUser()
          }}
          size="large"
          type="primary"
          danger
        >
          로그아웃
        </Button>
        <div>작성 리뷰 수: 14, 리뷰 관리(다중삭제)</div>
      </PageLayout>
    </PageHead>
  )
}

export default MyDessertFitPage
