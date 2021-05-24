import { useState } from 'react'
import { Modal, Button, Image } from 'antd'
import { useRouter } from 'next/router'
import useGoToPage from 'src/hooks/useGoToPage'
import styled from 'styled-components'

const FlexContainerAlignCenter = styled.div`
  display: grid;
  justify-content: center;
  row-gap: 20px;
`

const GridContainer = styled.div`
  display: grid;
  justify-content: center;
  width: 100%;
`

function NotLoginModal() {
  const { asPath } = useRouter()

  const goToRegisterPage = useGoToPage(`/register?redirectUrl=${encodeURIComponent(asPath)}`)

  const goToLoginPage = useGoToPage(`/login?redirectUrl=${encodeURIComponent(asPath)}`)

  const [isModalVisible, setIsModalVisible] = useState(true)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <>
      <Modal title="로그인" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <FlexContainerAlignCenter>
          <Image width={200} src="/DessertFit.png" />
          <GridContainer>
            <h2>로그인이 필요합니다</h2>
            <Button onClick={goToLoginPage}>로그인 하러가기</Button>
          </GridContainer>
          <GridContainer>
            <h2>아직 회원이 아니신가요?</h2>
            <Button onClick={goToRegisterPage} type="default">
              디저트핏 가입하기
            </Button>
          </GridContainer>
        </FlexContainerAlignCenter>
      </Modal>
    </>
  )
}

export default NotLoginModal
