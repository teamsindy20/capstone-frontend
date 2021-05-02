import PageHead from 'src/components/layouts/PageHead'
import LoginPageLayout from 'src/components/layouts/LoginPageLayout'

function RegisterPage() {
  return (
    <PageHead>
      <LoginPageLayout>
        <button>회원가입</button>
      </LoginPageLayout>
    </PageHead>
  )
}

export default RegisterPage
