import { useRouter } from 'next/router'
import useGoToPage from 'src/hooks/useGoToPage'

function NotLogin() {
  const { asPath } = useRouter()

  const goToRegisterPage = useGoToPage(`/register?redirectUrl=${encodeURIComponent(asPath)}`)

  const goToLoginPage = useGoToPage(`/login?redirectUrl=${encodeURIComponent(asPath)}`)

  return (
    <>
      <h3>로그인이 필요합니다ㅜㅠ</h3>
      <button onClick={goToRegisterPage}>회원가입 페이지 이동</button>
      <button onClick={goToLoginPage}>로그인 페이지 이동</button>
    </>
  )
}

export default NotLogin
