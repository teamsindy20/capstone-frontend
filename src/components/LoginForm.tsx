import { FormEvent } from 'react'

function handleSubmitLoginForm(e: FormEvent<HTMLFormElement>) {
  e.preventDefault()
}

function LoginForm() {
  return (
    <form onSubmit={handleSubmitLoginForm}>
      <input placeholder="이메일을 입력해주세요" type="email" />
      <input placeholder="패스워드를 입력해주세요" type="password" />
      <button type="submit">로그인</button>
    </form>
  )
}

export default LoginForm
