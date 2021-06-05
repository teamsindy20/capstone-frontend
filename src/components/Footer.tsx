import styled from 'styled-components'
import Image from 'next/image'

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 5rem 1fr;
  align-items: center;
`

const Line = styled.div`
  margin: 2rem;
  border: 1px solid black;
`

const FlexContainerCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 1rem;
  font-size: 0.8rem;
  /* text-align: center; */
`

function Footer() {
  return (
    <footer>
      <GridContainer>
        <Line />
        <div style={{ textAlign: 'center' }}>
          <Image src="/dessert-fit.webp" alt="logo" width={55} height={70} />
        </div>
        <Line />
      </GridContainer>
      <FlexContainerCenter>
        <div>
          <div>(주)신디 (대표자 : XXX)</div>
          <div>주소 : 서울특별시 동작구 흑석로 84</div>
          <div>사업자등록번호 : XXX-XX-XXXXX</div>
          <div>통신판매업신고 : 제 20XX-서울XX-XXXXX호</div>
          <div>E-mail : teamsindy20@gmail.com </div>
        </div>
        <div>
          <div>고객센터 010-9203-2837</div>
          <div>평일 09~18시 (점심시간 12~13시), 주말/공휴일 휴무</div>
          <div>자주 묻는 질문 입점</div>
          <div>제휴 안내</div>
        </div>
      </FlexContainerCenter>
    </footer>
  )
}

export default Footer
