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
import { Button, Input } from 'antd'
import { useContext, useCallback } from 'react'
import { toast } from 'react-toastify'
import ClientSideLink from 'src/components/atoms/ClientSideLink'

const GridContainerForm = styled.form`
  display: grid;
  grid-template-columns: minmax(auto, 370px);
  justify-content: center;
  gap: 0.5rem;
`

export const GridContainerColumn3 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  margin: 0.5rem 0;
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

export const HeadMessage = styled.h1`
  color: #3c3c3c;
  text-align: center;
  line-height: 1.5;
  margin: 6rem auto 3rem;
`

const HeadRegister = styled.h3`
  color: #3c3c3c;
  text-align: center;
  font-weight: 3rem;
  margin: 1rem auto 0.2rem;
  letter-spacing: 0.3rem;
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

export const RedText = styled.h5`
  margin: 0.5rem 0.2rem;
  color: #800000;
`

type FormValues = {
  email: string
  password: string
  password2: string
}

function RegisterPage() {
  const { refetchUser } = useContext(GlobalContext)
  const router = useRouter()

  const [register, { loading }] = useRegisterMutation({
    onCompleted: (data) => {
      toast.success('디저트핏에 가입한 것을 환영합니다!')
      sessionStorage.setItem('token', data.register)
      refetchUser()
      router.push(decodeURI((router.query.afterRegisterGoTo as string | undefined) ?? '/'))
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

  return (
    <PageHead>
      <LoginPageLayout>
        <ClientSideLink href="/">
          <HeadMessage>
            내게 딱 맞는
            <br />
            디저트 핏!
            <br />
            <b>신디에 가입해보세요.</b>
          </HeadMessage>
        </ClientSideLink>

        <HeadRegister>SIGN UP</HeadRegister>

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

          <label htmlFor="password2">
            <h4>비밀번호 확인</h4>
            <Controller
              control={control}
              name="password2"
              render={({ field }) => (
                <Input.Password
                  disabled={loading}
                  iconRender={renderPasswordInputIcon}
                  placeholder="비밀번호를 다시 한 번 입력해주세요."
                  size="large"
                  type="password"
                  {...field}
                />
              )}
              rules={validatePassword2}
            />
            <RedText>{errors.password2 ? errors.password2.message : <br />}</RedText>
          </label>

          <GridContainerColumn3>
            <ClientSideLink href="/login">
              <Button type="link">로그인</Button>
            </ClientSideLink>

            <ClientSideLink href="/find/email">
              <Button type="link">아이디 찾기</Button>
            </ClientSideLink>

            <ClientSideLink href="/find/password">
              <Button type="link">비밀번호 찾기</Button>
            </ClientSideLink>
          </GridContainerColumn3>

          <RegisterButton disabled={loading} type="submit">
            확인
          </RegisterButton>
        </GridContainerForm>
      </LoginPageLayout>
    </PageHead>
  )
}

export default RegisterPage
