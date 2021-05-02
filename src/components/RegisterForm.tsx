import { Button, Input } from 'antd'
import { useCallback } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { RegisterInput, useRegisterMutation } from 'src/graphql/generated/types-and-hooks'
import { digestMessageWithSHA256, ko2en } from 'src/utils/commons'
import styled from 'styled-components'
import { validateEmail, renderPasswordInputIcon, validatePassword, RedText } from './LoginForm'

const GridContainerForm = styled.form`
  display: grid;
`

type FormValues = {
  email: string
  password: string
  name: string
  phoneNumber: string
  gender: string
  birthDate: Date
  address: string
}

function RegisterForm() {
  const [register, { loading }] = useRegisterMutation()

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: { email: '', password: '', birthDate: '2021-04-17T10:59:40.876Z' },
  })

  const onSubmit = useCallback<SubmitHandler<FormValues>>(
    async ({ email, password }) => {
      const input: RegisterInput = {
        email,
        passwordHash: await digestMessageWithSHA256(ko2en(password)),
      }

      register({ variables: { input } })
    },
    [register]
  )

  return (
    <GridContainerForm onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">
        이메일 <span style={{ color: 'red' }}>*</span>
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
        비밀번호 <span style={{ color: 'red' }}>*</span>
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

      <label htmlFor="name">
        이름
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <Input disabled={loading} placeholder="이름을 입력해주세요" size="large" {...field} />
          )}
          rules={validatePassword}
        />
        <RedText>{errors.password ? errors.password.message : <br />}</RedText>
      </label>

      <label htmlFor="phoneNumber">
        전화번호
        <Controller
          control={control}
          name="phoneNumber"
          render={({ field }) => (
            <Input
              disabled={loading}
              placeholder="예: 010-1234-5678"
              size="large"
              type="tel"
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

export default RegisterForm
