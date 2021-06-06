import PageHead from 'src/components/layouts/PageHead'
import LoginPageLayout from 'src/components/layouts/LoginPageLayout'
import { LockTwoTone, UnlockTwoTone } from '@ant-design/icons'
import { Input, Button, Checkbox, Divider, Modal } from 'antd'
import { useCallback, useContext } from 'react'
import { Controller, useForm, SubmitHandler } from 'react-hook-form'
import { handleApolloError } from 'src/apollo/error'
import { useLoginMutation } from 'src/graphql/generated/types-and-hooks'
import styled from 'styled-components'
import {
  continueWithGoogleOAuth,
  GridContainerColumn3,
  HeadMessage,
  RedText,
  validateEmail,
  validatePassword,
} from '../register'
import { digestMessageWithSHA256, ko2en } from 'src/utils/commons'
import { GlobalContext } from '../_app'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import ClientSideLink from 'src/components/atoms/ClientSideLink'
import Image from 'next/image'

const GridContainerForm = styled.form`
  display: grid;
  grid-template-columns: minmax(auto, 370px);
  justify-content: center;
`

export const LoginButton = styled.button`
  background-color: #ff9a88;
  border: 1px solid #ff9a88;
  color: white;
  text-align: center;
  text-decoration: none;
  padding: 0.5em 0.5rem;
  font-size: 1rem;
  border-radius: 0.3rem;
  cursor: pointer;
  display: inline-block;
  transition-duration: 0.4s;
  height: 3rem;
  margin: 19px 0;

  &:hover {
    background-color: white;
    border: #ff9a88;
    color: #ff9a88;
  }
`

const SNSLoginButton = styled.button`
  background-color: white;
  color: #2eccba;
  border: 1px solid #2eccba;
  text-align: center;
  text-decoration: none;
  padding: 0.5em 0.5rem;
  font-size: 1rem;
  margin: 19px 0;
  border-radius: 0.3rem;
  cursor: pointer;
  display: inline-block;
  transition-duration: 0.4s;
  height: 3rem;

  &:hover {
    background-color: #2eccba;
    border: white;
    color: white;
  }
`
const Logo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 6rem 0 3rem 0;
`

const LogoImg = styled.img`
  margin: 0;
  width: 9rem;
  height: 9rem;
`
const LogoTextImg = styled.img`
  /* padding-top: 100%;
  position: relative; */
  margin: 0;
  width: 8rem;
  height: 3rem;
`
const MarginDiv = styled.div`
  margin: 1.3rem;
`

const ContinueLoginDiv = styled.div`
  text-align: right;
`

const HeadLogin = styled.h2`
  color: #3c3c3c;
  text-align: center;
  font-weight: 3rem;
  margin: 1rem 1rem 0.2rem;
  letter-spacing: 0.3rem;
`
const RegisterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
`

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

  const [login, { loading }] = useLoginMutation({
    onCompleted: (data) => {
      toast.success('로그인에 성공했어요.')

      if (getValues('remember')) {
        localStorage.setItem('token', data.login)
      } else {
        sessionStorage.setItem('token', data.login)
      }

      refetchUser()
      router.replace(sessionStorage.getItem('redirectUrlAfterLogin') ?? '/')
      sessionStorage.removeItem('redirectUrlAfterLogin')
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
        <Logo>
          <LogoImg src="/DessertFit.png" alt="logo" />
          <LogoTextImg src="/542@3x.png" alt="logo-text" />
          {/* <Image
            src="/542@3x.png"
            alt="store-profile"
            width="50"
            height="50"
            objectFit="contain"
          /> */}
        </Logo>
        <MarginDiv>
          <GridContainerForm onSubmit={handleSubmit(onSubmit)}>
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
            <ContinueLoginDiv>
              <Controller
                control={control}
                name="remember"
                render={({ field }) => (
                  <Checkbox checked={field.value} disabled={loading} {...field}>
                    로그인 유지
                  </Checkbox>
                )}
              />
            </ContinueLoginDiv>
            <LoginButton disabled={loading} type="submit">
              로그인
            </LoginButton>
            <SNSLoginButton onClick={continueWithGoogleOAuth} type="button">
              구글로 로그인
            </SNSLoginButton>
            {/* <SNSLoginButton type="button">간편 로그인</SNSLoginButton> */}
            <RegisterDiv>
              <ClientSideLink href="/register">
                <Button type="link">회원가입</Button>
              </ClientSideLink>
              <Divider type="vertical" />
              <ClientSideLink href="/find/password">
                <Button type="link">비밀번호 찾기</Button>
              </ClientSideLink>
            </RegisterDiv>
          </GridContainerForm>
        </MarginDiv>
      </LoginPageLayout>
    </PageHead>
  )
}

export default LoginPage
