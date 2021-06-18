import styled from 'styled-components'
import Image from 'next/image'
import ClientSideLink from './atoms/ClientSideLink'

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

const anchorStyle = {
  color: '#400000',
}

const GridContainerGap = styled.div`
  display: grid;
  gap: 1rem;

  background-color: #fcfcfc;
  padding: 1rem;
  font-size: 0.8rem;
  color: #6c6c6c;
`

function Footer() {
  return (
    <footer>
      <GridContainer>
        <Line />
        <div style={{ textAlign: 'center' }}>
          <Image src="/dessert-fit-logo-white.png" alt="logo" width={100} height={100} />
        </div>
        <Line />
      </GridContainer>
      <GridContainerGap>
        <h3>Copyright © {new Date().getUTCFullYear()} Dessert Fit, Inc. All rights reserved.</h3>
        <h4>
          자주 묻는 질문 |{' '}
          <ClientSideLink href="/documents/terms-of-service" style={anchorStyle}>
            이용약관
          </ClientSideLink>{' '}
          |{' '}
          <ClientSideLink href="/documents/privacy-policy" style={anchorStyle}>
            개인정보보호정책
          </ClientSideLink>{' '}
          |{' '}
          <a
            href="https://www.notion.so/Signature-In-Dessert-SINDY-424f606b1cf6465da31a7e3e23b1e36e"
            style={anchorStyle}
          >
            팀 소개
          </a>
        </h4>
        <div>
          <div>
            <b>(주) SINDY (대표 : 김민호)</b>
          </div>
          <div>
            <b>사업자등록번호 :</b> XXX-XX-XXXXX <button>사업자정보확인</button>
          </div>
          <div>
            <b>통신판매업신고 </b>: 제 20XX-서울XX-XXXXX호
          </div>
          <div>
            <b>주소 :</b> 서울특별시 동작구 흑석로 84
          </div>
          <div>
            <b>E-mail :</b> teamsindy20@gmail.com
          </div>
          <div>
            <b>고객센터 :</b> 010-9203-2837
          </div>
          <div>평일 09~18시 (점심시간 12~13시), 주말/공휴일 휴무</div>
        </div>
        <p>
          디저트핏은 통신판매중개자로써 디저트 판매에 대한 거래 당사자 및 판매자가 아니며, 판매자가
          등록한 모든 내용과 거래에 대해 디저트핏은 일체의 책임을 지지 않습니다.
        </p>
      </GridContainerGap>
    </footer>
  )
}

export default Footer
