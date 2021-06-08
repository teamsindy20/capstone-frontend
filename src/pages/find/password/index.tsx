import PageHead from 'src/components/layouts/PageHead'
import LoginPageLayout from 'src/components/layouts/LoginPageLayout'
import {
  CenterH1,
  GridContainerForm,
  RedText,
  StyledButton,
  validateEmail,
  validatePassword,
} from '../../register'
import { Button, Input, Divider } from 'antd'
import { useContext, useCallback } from 'react'
import { toast } from 'react-toastify'
import { Controller, useForm, SubmitHandler } from 'react-hook-form'
import { handleApolloError } from 'src/apollo/error'
import styled from 'styled-components'
import { PRIMARY_BACKGROUND_COLOR, PRIMARY_TEXT_COLOR } from 'src/models/constants'

const FindPWButton = styled(StyledButton)`
  background-color: ${PRIMARY_BACKGROUND_COLOR};
  border: 1px solid ${PRIMARY_BACKGROUND_COLOR};
  color: white;

  :hover {
    background-color: white;
    color: ${PRIMARY_TEXT_COLOR};
  }
`

function FindPasswordPage() {
  return (
    <PageHead>
      <LoginPageLayout>
        <CenterH1>비밀번호 찾기</CenterH1>
        <GridContainerForm>
          <FindPWButton>확인</FindPWButton>
        </GridContainerForm>
      </LoginPageLayout>
    </PageHead>
  )
}

export default FindPasswordPage
