import PageHead from 'src/components/layouts/PageHead'
import LoginPageLayout from 'src/components/layouts/LoginPageLayout'
import LoginForm from 'src/components/LoginForm'

function LoginPage() {
  return (
    <PageHead>
      <LoginPageLayout>
        <LoginForm />
        <button>sns 로그인</button>
      </LoginPageLayout>
    </PageHead>
  )
}

export default LoginPage
