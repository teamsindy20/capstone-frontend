import PageHead from 'src/components/layouts/PageHead'
import LoginPageLayout from 'src/components/layouts/LoginPageLayout'
import {
  MarginDiv,
  HeadMessage,
  GridContainerForm,
  RedText,
  validateEmail,
  validatePassword,
} from '../../register'
import { Button, Input, Divider } from 'antd'
import { useContext, useCallback } from 'react'
import { toast } from 'react-toastify'
import { Controller, useForm, SubmitHandler } from 'react-hook-form'
import { handleApolloError } from 'src/apollo/error'
import styled from 'styled-components'

const FindPWButton = styled.button`
  background-color: #ff9a88;
  border: 1px solid #ff9a88;
  color: white;
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
    background-color: white;
    border: #ff9a88;
    color: #ff9a88;
  }
`

function FindPasswordPage() {
  return (
    <PageHead>
      <LoginPageLayout>
        <HeadMessage>비밀번호 찾기</HeadMessage>
        <MarginDiv>
          <GridContainerForm>
            <FindPWButton>확인</FindPWButton>
          </GridContainerForm>
        </MarginDiv>
      </LoginPageLayout>
    </PageHead>
  )
}

export default FindPasswordPage
