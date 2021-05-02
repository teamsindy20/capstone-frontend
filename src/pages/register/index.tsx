import PageHead from 'src/components/layouts/PageHead'
import RegisterForm from 'src/components/RegisterForm'

function RegisterPage() {
  return (
    <PageHead>
      <RegisterForm />
      <button>sns 회원가입</button>
    </PageHead>
  )
}

export default RegisterPage
