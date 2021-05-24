import { useRouter } from 'next/router'
import useGoToPage from 'src/hooks/useGoToPage'
import { Button } from 'antd'

function NotLogin() {
  const { asPath } = useRouter()

  const goToRegisterPage = useGoToPage(`/register?redirectUrl=${encodeURIComponent(asPath)}`)

  const goToLoginPage = useGoToPage(`/login?redirectUrl=${encodeURIComponent(asPath)}`)

  return (
    <>
      <h1>
        로그인이 필요합니다 <br />
        디저트핏에 가입해보세요!
      </h1>
      <Button onClick={goToRegisterPage} type="primary">
        회원가입
      </Button>
      <Button onClick={goToLoginPage} type="danger">로그인</Button>
    </>
  )
}

export default NotLogin
