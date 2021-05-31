import Image from 'next/image'
import { useRouter } from 'next/router'
import { Button } from 'antd'

function NotLogin() {
  const router = useRouter()

  function goToRegisterPage() {
    sessionStorage.setItem('redirectUrlAfterLogin', router.asPath)
    router.push('/register')
  }

  function goToLoginPage() {
    sessionStorage.setItem('redirectUrlAfterLogin', router.asPath)
    router.push('/login')
  }

  return (
    <>
      <Image src="/DessertFit.png" alt="logo" width={124} height={124} />
      <h2>로그인이 필요합니다</h2>
      <Button onClick={goToLoginPage}>로그인 하러가기</Button>

      <h2>아직 회원이 아니신가요?</h2>
      <Button onClick={goToRegisterPage} type="default">
        디저트핏 가입하기
      </Button>
    </>
  )
}

export default NotLogin
