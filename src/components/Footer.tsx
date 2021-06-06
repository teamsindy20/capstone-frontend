import styled from 'styled-components'
import Image from 'next/image'

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 4rem 1fr;
  align-items: center;
  background-color: #fcfcfc;
`

const Line = styled.div`
  margin: 1rem;
  border: 0.5px solid black;
`

const FlexContainerCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fcfcfc;
  padding: 1rem;
  font-size: 0.8rem;
  color: #6c6c6c;
  /* text-align: center; */
`

function Footer() {
  return (
    <footer>
      <GridContainer>
        <Line />
        <div style={{ textAlign: 'center' }}>
          <Image src="/dessert-fit.webp" alt="logo" width={40} height={40} />
        </div>
        <Line />
      </GridContainer>
      <FlexContainerCenter>
        <div>
          <h2>
            <b>(주) SINDY</b>
          </h2>
          <h3>
            <b>주소 :</b> 서울특별시 동작구 흑석로 84
          </h3>
          <h3>
            <b>고객센터 :</b> 010-9203-2837
          </h3>
          <h3>
            <b>E-mail :</b> teamsindy20@gmail.com{' '}
          </h3>
          <h3>평일 09~18시 (점심시간 12~13시), 주말/공휴일 휴무</h3>
          <h3>
            <b>사업자등록번호 :</b> XXX-XX-XXXXX
          </h3>
          <h3>
            <b>통신판매업신고 </b>: 제 20XX-서울XX-XXXXX호
          </h3>
        </div>
      </FlexContainerCenter>
    </footer>
  )
}

export default Footer
