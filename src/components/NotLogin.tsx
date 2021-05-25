import { useRouter } from 'next/router'
import useGoToPage from 'src/hooks/useGoToPage'
import { Button, Image } from 'antd'
import styled from 'styled-components'

function NotLogin() {
  const { asPath } = useRouter()

  const goToRegisterPage = useGoToPage(`/register?redirectUrl=${encodeURIComponent(asPath)}`)

  const goToLoginPage = useGoToPage(`/login?redirectUrl=${encodeURIComponent(asPath)}`)

  const CenterDiv = styled.div`
    justify-content: center;
    margin: 20%;
  `
  return (
    <CenterDiv>
      <Image width={200} src="/DessertFit.png" />
      <h2>로그인이 필요합니다</h2>
      <Button onClick={goToLoginPage}>로그인 하러가기</Button>

      <h2>아직 회원이 아니신가요?</h2>
      <Button onClick={goToRegisterPage} type="default">
        디저트핏 가입하기
      </Button>
    </CenterDiv>
  )
}

export default NotLogin
