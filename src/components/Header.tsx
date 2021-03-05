import Link from 'next/link'
import { HEADER_HEIGHT, TABLET_MIN_WIDTH } from 'src/models/constants'
import styled from 'styled-components'

const FixedHeader = styled.header`
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);

  width: ${TABLET_MIN_WIDTH};
  height: ${HEADER_HEIGHT};
  z-index: 1;

  background-color: #fff;
`

const StyledNav = styled.nav`
  height: 100%;
`

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 100%;
`

function Header() {
  const username = 'username'
  return (
    <FixedHeader>
      <StyledNav>
        <FlexContainer>
          <Link href="/">
            <a href="/">홈</a>
          </Link>
          <Link href="/feed">
            <a href="/feed">피드</a>
          </Link>
          <Link href="/stores">
            <a href="/stores">찜 · 단골 가게</a>
          </Link>
          <Link href={`/users/${username}/orders`}>
            <a href={`/users/${username}/orders`}>주문 내역</a>
          </Link>
          <Link href={`/users/${username}`}>
            <a href={`/users/${username}`}>내 Sindy</a>
          </Link>
        </FlexContainer>
      </StyledNav>
    </FixedHeader>
  )
}

export default Header
