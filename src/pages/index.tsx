import SearchIcon from '@material-ui/icons/Search'
import styled from 'styled-components'
import PageLayout from '../components/layouts/PageLayout'
import PageHead from '../components/layouts/PageHead'
import { TABLET_MIN_WIDTH } from 'src/models/constants'

const MaxWidth = styled.div`
  max-width: ${TABLET_MIN_WIDTH};

  margin: 0 auto;
`

const FlexContainerBetween = styled.div`
  display: flex;
  justify-content: space-between;
`

function HomePage() {
  return (
    <PageHead title="캡스톤디자인 - Home">
      <PageLayout>
        <MaxWidth>
          <FlexContainerBetween>
            <div />
            <div>주소</div>
            <SearchIcon fontSize="large" />
          </FlexContainerBetween>

          <div>광고 - 사진 가로 세로 비율 고정</div>
          <div>카테고리</div>
          <div>정렬 기준</div>
          <button>사진만 보기</button>
          <ul>
            <li>
              <img src="" alt="menu" />
              <div>메뉴 이름</div>
              <div>가격</div>
              <div>좋아요</div>
              <div>매장 이름</div>
              <div>재주문율</div>
              <div>배달팁</div>
              <div>최소주문 금액</div>
              <ul>
                <li>#달달</li>
                <li>#비건</li>
                <li>#저칼로리</li>
              </ul>
            </li>
            <li>
              <img src="" alt="menu" />
              <div>메뉴 이름2</div>
              <div>가격2</div>
              <div>좋아요2</div>
              <div>매장 이름2</div>
              <div>재주문율2</div>
              <div>배달팁2</div>
              <div>최소주문 금액2</div>
              <ul>
                <li>#달달</li>
                <li>#비건</li>
                <li>#저칼로리</li>
              </ul>
            </li>
          </ul>
        </MaxWidth>
      </PageLayout>
    </PageHead>
  )
}

export default HomePage
