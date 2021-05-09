import useGoToPage from 'src/hooks/useGoToPage'

function NotLogin() {
  const goToRegisterPage = useGoToPage('/register')
  const goToLoginPage = useGoToPage('/login')

  return (
    <>
      <h3>로그인이 필요합니다ㅜㅠ</h3>
      <button onClick={goToRegisterPage}>회원가입 페이지 이동</button>
      <button onClick={goToLoginPage}>로그인 페이지 이동</button>
    </>
  )
}

export default NotLogin
