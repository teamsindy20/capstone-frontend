import PageHead from 'src/components/layouts/PageHead'
import PageLayout from 'src/components/layouts/PageLayout'
import LoginForm from 'src/components/LoginForm'

function LoginPage() {
  return (
    <PageHead>
      <PageLayout>
        <LoginForm />
        <button>sns 로그인</button>
      </PageLayout>
    </PageHead>
  )
}

export default LoginPage
