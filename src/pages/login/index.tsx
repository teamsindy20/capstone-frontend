import PageHead from 'src/components/layouts/PageHead'
import LoginPageLayout from 'src/components/layouts/LoginPageLayout'
import { LockTwoTone, UnlockTwoTone, LoadingOutlined } from '@ant-design/icons'
import { Input, Checkbox, Divider } from 'antd'
import { useCallback, useContext, useState } from 'react'
import { Controller, useForm, SubmitHandler } from 'react-hook-form'
import { handleApolloError } from 'src/apollo/error'
import { useLoginMutation } from 'src/graphql/generated/types-and-hooks'
import styled from 'styled-components'
import {
  RedText,
  StyledButton,
  validateEmail,
  validatePassword,
  MarginH4,
  CenterH1,
} from '../register'
import { digestMessageWithSHA256, ko2en } from 'src/utils/commons'
import { GlobalContext } from '../_app'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import ClientSideLink from 'src/components/atoms/ClientSideLink'
import { PRIMARY_BACKGROUND_COLOR, PRIMARY_TEXT_COLOR } from 'src/models/constants'

const GridContainerForm = styled.form`
  display: grid;
  grid-template-columns: minmax(auto, 370px);
  justify-content: center;

  padding: 1rem;
`

const ContinueLoginDiv = styled.div`
  text-align: right;
`

const LoginButton = styled(StyledButton)`
  background-color: ${PRIMARY_BACKGROUND_COLOR};
  border: 1px solid ${PRIMARY_BACKGROUND_COLOR};
  color: white;

  :hover {
    background-color: white;
    color: ${PRIMARY_TEXT_COLOR};
  }
`

const SNSLoginButton = styled(StyledButton)`
  background-color: white;
  border: 1px solid #2eccba;
  color: #2eccba;

  :hover {
    background-color: #2eccba;
    color: white;
  }
`

const FlexContainerAroundCenter = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const Padding = styled.div`
  padding: 0.5rem;
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
  const { user, refetchUser } = useContext(GlobalContext)
  const router = useRouter()
  const [isSNSLoading, setIsSNSLoading] = useState(false)

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

  function continueWithGoogleOAuth() {
    setIsSNSLoading(true)
    router.replace(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`)
  }

  return (
    <PageHead>
      <LoginPageLayout>
        <CenterH1>로그인</CenterH1>
        <GridContainerForm onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email">
            <MarginH4>이메일</MarginH4>
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <Input
                  autoFocus
                  disabled={isSNSLoading || loading}
                  placeholder="어? 나 디저트 좋아하네"
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
            <MarginH4>비밀번호</MarginH4>
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <Input.Password
                  disabled={isSNSLoading || loading}
                  iconRender={renderPasswordInputIcon}
                  placeholder="나만의 디저트를 핏하다"
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

          <LoginButton disabled={isSNSLoading || loading || Boolean(user)} type="submit">
            로그인
          </LoginButton>

          <SNSLoginButton
            disabled={isSNSLoading || Boolean(user)}
            onClick={continueWithGoogleOAuth}
            type="button"
          >
            {isSNSLoading && <LoadingOutlined />} 구글 계정으로 계속하기
          </SNSLoginButton>

          <FlexContainerAroundCenter>
            <ClientSideLink href="/register">
              <Padding>회원가입</Padding>
            </ClientSideLink>
            <Divider type="vertical" />
            <ClientSideLink href="/find/password">
              <Padding>비밀번호 찾기</Padding>
            </ClientSideLink>
          </FlexContainerAroundCenter>
        </GridContainerForm>
      </LoginPageLayout>
    </PageHead>
  )
}

export default LoginPage
