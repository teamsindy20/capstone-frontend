import PageHead from 'src/components/layouts/PageHead'
import LoginForm from 'src/components/LoginForm'

function LoginPage() {
  return (
    <PageHead>
      <LoginForm />
      <button>sns 로그인</button>
    </PageHead>
  )
}

export default LoginPage
