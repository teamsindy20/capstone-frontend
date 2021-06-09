import PageHead from 'src/components/layouts/PageHead'
import LoginPageLayout from 'src/components/layouts/LoginPageLayout'
import { CenterH1, GridContainerForm } from '../../register'
import { PrimaryButton, SecondaryButton } from 'src/components/atoms/Button'

function FindPasswordPage() {
  return (
    <PageHead>
      <LoginPageLayout>
        <CenterH1>비밀번호 찾기</CenterH1>
        <GridContainerForm>
          <PrimaryButton>확인?</PrimaryButton>
          <SecondaryButton>확인!</SecondaryButton>
        </GridContainerForm>
      </LoginPageLayout>
    </PageHead>
  )
}

export default FindPasswordPage
