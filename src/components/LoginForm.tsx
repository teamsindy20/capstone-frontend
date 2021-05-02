import { LockTwoTone, UnlockTwoTone } from '@ant-design/icons'
import { Input, Button } from 'antd'
import { useCallback } from 'react'
import { Controller, useForm, SubmitHandler } from 'react-hook-form'
import { handleApolloError } from 'src/apollo/error'
import { useLoginMutation } from 'src/graphql/generated/types-and-hooks'
import { digestMessageWithSHA256, ko2en } from 'src/utils/commons'
import styled from 'styled-components'

const GridContainerForm = styled.form`
  display: grid;
  grid-template-columns: minmax(auto, 400px);
  justify-content: center;
  gap: 1rem;
`

export const RedText = styled.h5`
  margin: 0.4rem 0;
  color: #800000;
`

export const validateEmail = {
  required: '필수 항목입니다',
  pattern: {
    value: /\S+@\S+\.\S+/,
    message: '이메일을 형식에 맞게 입력해주세요',
  },
}

export const validatePassword = {
  required: '필수 항목입니다',
  minLength: {
    value: 8,
    message: '최소 8글자 이상 입력해주세요',
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
}

function LoginForm() {
  const [login, { loading }] = useLoginMutation({
    onCompleted: (data) => {
      if (data.login) {
        console.log(data.login)
        localStorage.setItem('token', data.login)
      } else {
        console.warn('이메일 또는 비밀번호를 잘못 입력했습니다.')
      }
    },
    onError: handleApolloError,
  })

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = useCallback<SubmitHandler<FormValues>>(
    async ({ email, password }) => {
      const passwordHash = await digestMessageWithSHA256(ko2en(password))
      login({ variables: { email, passwordHash } })
    },
    [login]
  )

  return (
    <GridContainerForm onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">
        이메일
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <Input
              disabled={loading}
              placeholder="이메일을 입력해주세요"
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
        비밀번호
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <Input.Password
              disabled={loading}
              iconRender={renderPasswordInputIcon}
              placeholder="비밀번호를 입력해주세요"
              size="large"
              type="password"
              {...field}
            />
          )}
          rules={validatePassword}
        />
        <RedText>{errors.password ? errors.password.message : <br />}</RedText>
      </label>

      <Button htmlType="submit" loading={loading} size="large" type="primary">
        로그인
      </Button>
    </GridContainerForm>
  )
}

export default LoginForm
