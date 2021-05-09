import Image from 'next/image'
import { useRouter } from 'next/router'
import PageHead from 'src/components/layouts/PageHead'
import PageLayout from 'src/components/layouts/PageLayout'

import styled from 'styled-components'

const FlexContainer = styled.div`
  display: flex;
`

const GridContainerUl = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
`

const description = '내 취향이 반영된 나만의 Deple을 만나보세요.'

function MyDeplePage() {
  const { query } = useRouter()

  return (
    <PageHead title="Deple - 내 Deple" description={description}>
      <PageLayout>
        <h2>마이페이지</h2>
        <div>
          <button>환경 설정</button>
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
            <button>디플 포인트 324원</button>
          </li>
          <li>
            <button>쿠폰함 (3개)</button>
          </li>
          <li>
            <button>결제 수단</button>
          </li>
          <li>
            <button>공지사항</button>
          </li>
          <li>
            <button>이벤트</button>
          </li>
          <li>
            <button>디플 팀</button>
          </li>
          <li>
            <button>고객 지원</button>
          </li>
          <li>
            <button>약관·정책</button>
          </li>
        </GridContainerUl>
        <div>작성 리뷰 수: 14, 리뷰 관리(다중삭제)</div>
      </PageLayout>
    </PageHead>
  )
}

export default MyDeplePage
