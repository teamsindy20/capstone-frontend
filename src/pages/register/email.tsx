import PageHead from 'src/components/layouts/PageHead'
import LoginPageLayout from 'src/components/layouts/LoginPageLayout'
import styled from 'styled-components'
import { Controller, useForm, SubmitHandler } from 'react-hook-form'
import Link from 'next/link'
import { Input } from 'antd'
import { handleApolloError } from 'src/apollo/error'
import { useLoginMutation } from 'src/graphql/generated/types-and-hooks'

const GridContainerForm = styled.form`
  display: grid;
  grid-template-columns: minmax(auto, 370px);
  justify-content: center;
  gap: 1rem;
`
const RegisterButton = styled.button`
  background-color: #ffc9c3;
  border: none;
  color: #3c3c3c;
  text-align: center;
  text-decoration: none;
  padding: 0.5em 0.5rem;
  font-size: 1rem;
  margin: 4px 2px;
  border-radius: 0.3rem;
  cursor: pointer;
  display: inline-block;
  transition-duration: 0.4s;

  &:hover {
    background-color: #f1f6fa;
    border: #ffc9c3;
    color: #ffc9c3;
  }
`
const HeadMessage = styled.h1`
  color: #3c3c3c;
  text-align: left;
  line-height: 1.5;
  margin: 6rem 1rem 3rem 1rem;
`
const HeadRegister = styled.h2`
  color: #3c3c3c;
  text-align: center;
  font-weight: 3rem;
  margin: 1rem 1rem 0.2rem;
  letter-spacing: 0.3rem;
`

export const validateEmail = {
  required: '필수 항목입니다.',
  pattern: {
    value: /\S+@\S+\.\S+/,
    message: '이메일을 형식에 맞게 입력해주세요.',
  },
}

export const RedText = styled.h5`
  margin: 0.5rem 0.2rem;
  color: #800000;
`

type FormValues = {
  email: string
  password: string
}

function RegisterIDPage() {
  const [login, { loading }] = useLoginMutation({
    onCompleted: (data) => {
      if (data.login) {
        console.log(data.login)
        sessionStorage.setItem('token', data.login)
      } else {
        console.warn('이메일 또는 비밀번호를 잘못 입력했습니다.')
      }
    },
    onError: handleApolloError,
  })

  const { control, errors, handleSubmit } = useForm<FormValues>({
    defaultValues: { email: '', password: '' },
  })

  return (
    <PageHead>
      <LoginPageLayout>
        <GridContainerForm>
          <HeadMessage>
            로그인에 사용할<br></br>
            이메일을 입력해주세요.
          </HeadMessage>
          <HeadRegister>SIGN UP</HeadRegister>
          <label htmlFor="email">
            <Controller
              control={control}
              name="email"
              render={(props) => (
                <Input
                  disabled={loading}
                  placeholder="이메일을 입력해주세요."
                  size="large"
                  type="email"
                  {...props}
                />
              )}
              rules={validateEmail}
            />
            <RedText>{errors.email ? errors.email.message : <br />}</RedText>
          </label>
          <Link href="/register/pw">
            <a href="/register/pw">
              <RegisterButton type="submit">다음</RegisterButton>
            </a>
          </Link>
        </GridContainerForm>
      </LoginPageLayout>
    </PageHead>
  )
}

export default RegisterIDPage
