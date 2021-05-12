import PageHead from 'src/components/layouts/PageHead'
import LoginPageLayout from 'src/components/layouts/LoginPageLayout'
import { LockTwoTone, UnlockTwoTone } from '@ant-design/icons'
import { Input, Button, Checkbox } from 'antd'
import { useCallback, useContext } from 'react'
import Link from 'next/link'
import { Controller, useForm, SubmitHandler } from 'react-hook-form'
import { handleApolloError } from 'src/apollo/error'
import { useLoginMutation } from 'src/graphql/generated/types-and-hooks'
import styled from 'styled-components'
import { GridContainerColumn3, HeadMessage } from '../register'
import { digestMessageWithSHA256, ko2en } from 'src/utils/commons'
import { GlobalContext } from '../_app'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const GridContainerForm = styled.form`
  display: grid;
  grid-template-columns: minmax(auto, 370px);
  justify-content: center;
  gap: 0.5rem;
`

const LoginButton = styled.button`
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
const SNSLoginButton = styled.button`
  background-color: #f1f6fa;
  border: none;
  color: #3c3c3c;
  text-align: center;
  text-decoration: none;
  padding: 0.5em 0.5rem;
  font-size: 1rem;
  margin: 1px 1px;
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

const HeadLogin = styled.h2`
  color: #3c3c3c;
  text-align: center;
  font-weight: 3rem;
  margin: 1rem 1rem 0.2rem;
  letter-spacing: 0.3rem;
`

export const RedText = styled.h5`
  margin: 0.5rem 0.2rem;
  color: #800000;
`

export const validateEmail = {
  required: '필수 항목입니다.',
  pattern: {
    value: /\S+@\S+\.\S+/,
    message: '이메일을 형식에 맞게 입력해주세요.',
  },
}

export const validatePassword = {
  required: '필수 항목입니다.',
  minLength: {
    value: 5,
    message: '최소 5글자 이상 입력해주세요.',
  },
}

const PASSWORD_INPUT_ICONS = [
  <UnlockTwoTone key={1} style={{ fontSize: '1.2rem' }} twoToneColor="#c4801a" />,
  <LockTwoTone key={2} style={{ fontSize: '1.2rem' }} twoToneColor="#52c41a" />,
]

export function renderPasswordInputIcon(visible: boolean) {
  return visible ? PASSWORD_INPUT_ICONS[0] : PASSWORD_INPUT_ICONS[1]
}

type LoginFormValues = {
  email: string
  password: string
  remember: boolean
}

function LoginPage() {
  const { refetchUser } = useContext(GlobalContext)
  const router = useRouter()

  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm<LoginFormValues>({
    defaultValues: { email: '', password: '', remember: true },
  })

  // const notify = () => toast('Wow so easy!')

  const [login, { loading }] = useLoginMutation({
    onCompleted: (data) => {
      if (data.login) {
        if (getValues('remember')) {
          localStorage.setItem('token', data.login)
        } else {
          sessionStorage.setItem('token', data.login)
        }
        refetchUser()
        router.push('/')
      } else {
        // console.warn('이메일 또는 비밀번호를 잘못 입력했습니다.')
        toast('이메일 또는 비밀번호를 잘못 입력했습니다.')
        // toast.error('🦄 이메일 또는 비밀번호를 잘못 입력했습니다.', {
        //   position: 'top-right',
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        // })
      }
    },
    onError: handleApolloError,
  })

  const onSubmit = useCallback<SubmitHandler<LoginFormValues>>(
    async ({ email, password }) => {
      const passwordHash = await digestMessageWithSHA256(ko2en(password))
      login({ variables: { email, passwordHash } })
    },
    [login]
  )

  return (
    <PageHead>
      <LoginPageLayout>
        <HeadMessage>
          내가 원하는 디저트를
          <br />
          쉽고 빠르게!
        </HeadMessage>

        <GridContainerForm onSubmit={handleSubmit(onSubmit)}>
          <HeadLogin>LOGIN</HeadLogin>

          <label htmlFor="email">
            <h4>이메일</h4>
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <Input
                  disabled={loading}
                  placeholder="이메일을 입력해주세요."
                  size="large"
                  type="email"
                  {...field}
                />
              )}
              rules={validateEmail}
            />
            <RedText>{errors.email ? errors.email.message : <br />}</RedText>
          </label>

          <label htmlFor="password">
            <h4>비밀번호</h4>
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <Input.Password
                  disabled={loading}
                  iconRender={renderPasswordInputIcon}
                  placeholder="비밀번호를 입력해주세요."
                  size="large"
                  type="password"
                  {...field}
                />
              )}
              rules={validatePassword}
            />
            <RedText>{errors.password ? errors.password.message : <br />}</RedText>
          </label>

          <Controller
            control={control}
            name="remember"
            render={({ field }) => (
              <Checkbox checked={field.value} disabled={loading} {...field}>
                로그인 상태 유지
              </Checkbox>
            )}
          />

          <GridContainerColumn3>
            <Link href="/register">
              <a href="/register">
                <Button type="link">회원가입</Button>
              </a>
            </Link>

            <Link href="/findid">
              <a href="/findid">
                <Button type="link">아이디찾기</Button>
              </a>
            </Link>
            <Link href="/findpw">
              <a href="/findpw">
                <Button type="link">비밀번호찾기</Button>
              </a>
            </Link>
          </GridContainerColumn3>

          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <LoginButton disabled={loading} type="submit">
            로그인
          </LoginButton>
          <SNSLoginButton>카카오톡으로 로그인하기</SNSLoginButton>
          <SNSLoginButton>네이버로 로그인하기</SNSLoginButton>
          <SNSLoginButton>구글로 로그인하기</SNSLoginButton>
        </GridContainerForm>
      </LoginPageLayout>
    </PageHead>
  )
}

export default LoginPage
