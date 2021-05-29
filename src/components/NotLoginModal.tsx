import Image from 'next/image'
import { useState } from 'react'
import { Modal, Button } from 'antd'
import { useRouter } from 'next/router'
import useGoToPage from 'src/hooks/useGoToPage'
import styled from 'styled-components'

const FlexContainerAlignCenter = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
`

const GridContainer = styled.div`
  display: grid;
  justify-content: center;
  width: 100%;
`

function NotLoginModal() {
  const router = useRouter()

  const [isModalVisible, setIsModalVisible] = useState(true)

  function goToRegisterPage() {
    sessionStorage.setItem('redirectUrlAfterLogin', router.asPath)
    router.push('/register')
    // setIsModalVisible(false)
  }

  function goToLoginPage() {
    sessionStorage.setItem('redirectUrlAfterLogin', router.asPath)
    router.push('/login')
    // setIsModalVisible(false)
  }

  return (
    <Modal
      title="로그인"
      footer={null}
      visible={isModalVisible}
      onOk={() => setIsModalVisible(false)}
      onCancel={() => setIsModalVisible(false)}
    >
      <FlexContainerAlignCenter>
        <div style={{ textAlign: 'center' }}>
          <Image src="/DessertFit.png" alt="logo" width={124} height={124} />
        </div>
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
  )
}

export default NotLoginModal
