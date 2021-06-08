import PageHead from 'src/components/layouts/PageHead'
import LoginPageLayout from 'src/components/layouts/LoginPageLayout'
import styled from 'styled-components'
import { Controller, useForm, SubmitHandler } from 'react-hook-form'
import { handleApolloError } from 'src/apollo/error'
import { useRegisterMutation } from 'src/graphql/generated/types-and-hooks'
import { LockTwoTone, UnlockTwoTone } from '@ant-design/icons'
import { digestMessageWithSHA256, ko2en } from 'src/utils/commons'
import { useRouter } from 'next/router'
import { GlobalContext } from '../_app'
import { Input } from 'antd'
import { useContext, useCallback, useState } from 'react'
import { toast } from 'react-toastify'
import ClientSideLink from 'src/components/atoms/ClientSideLink'
import { PrimaryButton, SecondaryButton } from 'src/components/atoms/Button'

export const GridContainerForm = styled.form`
  display: grid;
  grid-template-columns: minmax(auto, 370px);
  justify-content: center;

  padding: 1rem;
`

export const GridContainerColumn3 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 0.5rem 0;
`

export const MarginH4 = styled.h4`
  margin: 0.5rem;
`

export const CenterH1 = styled.h2`
  text-align: center;
`

export const RedText = styled.h5`
  margin: 0.5rem 0.2rem;
  color: #800000;
`

const FlexContainerCenterCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Padding = styled.div`
  padding: 0.5rem;
`

export const validateEmail = {
  required: '필수 항목입니다.',
  maxLength: {
    value: 64,
    message: '최대 64글자 이하로 입력해주세요.',
  },
  pattern: {
    value: /\S+@\S+\.\S+/,
    message: '이메일을 형식에 맞게 입력해주세요.',
  },
}

export const validatePassword = {
  required: '필수 항목입니다.',
  minLength: {
    value: 8,
    message: '최소 8글자 이상 입력해주세요.',
  },
}

const PASSWORD_INPUT_ICONS = [
  <UnlockTwoTone key={1} style={{ fontSize: '1.2rem' }} twoToneColor="#c4801a" />,
  <LockTwoTone key={2} style={{ fontSize: '1.2rem' }} twoToneColor="#52c41a" />,
]

export function renderPasswordInputIcon(visible: boolean) {
  return visible ? PASSWORD_INPUT_ICONS[0] : PASSWORD_INPUT_ICONS[1]
}

type FormValues = {
  email: string
  password: string
  password2: string
}

function RegisterPage() {
  const { user, refetchUser } = useContext(GlobalContext)
  const router = useRouter()
  const [isSNSLoading, setIsSNSLoading] = useState(false)

  const [register, { loading }] = useRegisterMutation({
    onCompleted: (data) => {
      toast('디저트핏에 가입한 것을 환영합니다!')

      sessionStorage.setItem('token', data.register)
      refetchUser()
      router.replace(sessionStorage.getItem('redirectUrlAfterLogin') ?? '/')
      sessionStorage.removeItem('redirectUrlAfterLogin')
    },
    onError: handleApolloError,
  })

  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: { email: '', password: '', password2: '' },
  })

  const validatePassword2 = {
    required: '필수 항목입니다.',
    validate: {
      same: (password2: string) =>
        password2 === getValues('password') || '비밀번호가 일치하지 않습니다.',
    },
  }

  const onSubmit = useCallback<SubmitHandler<FormValues>>(
    async ({ email, password }) => {
      const passwordHash = await digestMessageWithSHA256(ko2en(password))
      register({ variables: { input: { email, passwordHash } } })
    },
    [register]
  )

  function continueWithGoogleOAuth() {
    setIsSNSLoading(true)
    router.replace(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`)
  }

  return (
    <PageHead>
      <LoginPageLayout>
        <CenterH1>회원가입</CenterH1>
        <GridContainerForm onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email">
            <MarginH4>이메일</MarginH4>
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <Input
                  autoFocus
                  disabled={isSNSLoading || loading || Boolean(user)}
                  placeholder={user ? '이미 로그인되어 있습니다.' : '밥은 대충 먹더라도'}
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
                  disabled={isSNSLoading || loading || Boolean(user)}
                  iconRender={renderPasswordInputIcon}
                  placeholder="디저트는 예쁘고 맛있는 걸 먹자"
                  size="large"
                  type="password"
                  {...field}
                />
              )}
              rules={validatePassword}
            />
            <RedText>{errors.password ? errors.password.message : <br />}</RedText>
          </label>

          <label htmlFor="password2">
            <MarginH4>비밀번호 확인</MarginH4>
            <Controller
              control={control}
              name="password2"
              render={({ field }) => (
                <Input.Password
                  disabled={isSNSLoading || loading || Boolean(user)}
                  iconRender={renderPasswordInputIcon}
                  placeholder="나만의 디저트를 핏하다, 디저트핏"
                  size="large"
                  type="password"
                  {...field}
                />
              )}
              rules={validatePassword2}
            />
            <RedText>{errors.password2 ? errors.password2.message : <br />}</RedText>
          </label>

          <PrimaryButton
            disabled={isSNSLoading || Boolean(user)}
            loading={loading}
            htmlType="submit"
          >
            다음
          </PrimaryButton>

          <SecondaryButton
            disabled={loading || Boolean(user)}
            loading={isSNSLoading}
            onClick={continueWithGoogleOAuth}
            htmlType="button"
          >
            구글 계정으로 계속하기
          </SecondaryButton>

          <FlexContainerCenterCenter>
            <ClientSideLink href="/login">
              <Padding>로그인</Padding>
            </ClientSideLink>
          </FlexContainerCenterCenter>
        </GridContainerForm>
      </LoginPageLayout>
    </PageHead>
  )
}

export default RegisterPage
