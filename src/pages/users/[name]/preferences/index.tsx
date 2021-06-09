import PageHead from 'src/components/layouts/PageHead'
import NavigationLayout from 'src/components/layouts/NavigationLayout'
import TopHeader from 'src/components/TopHeader'
import { FlexContainerBetween, FlexContainerAlignCenter } from 'src/styles/FlexContainer'
import styled from 'styled-components'
import grey from '@material-ui/core/colors/grey'
import { useState } from 'react'
import { Button, Divider, Modal } from 'antd'
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded'
import useGoBack from 'src/hooks/useGoBack'
import { EllipsisOutlined } from '@ant-design/icons'

const description = '홈 화면에 표시될 메뉴의 취향을 선택해봐요.'

const StyledArrowBackIosRoundedIcon = { fontSize: 20, color: grey[800] }

const WhiteText = styled.h5`
  color: #ffffff;
`
const MarginDiv = styled.div`
  margin: 0.5rem;
`
const FlexContainerBetween1 = styled(FlexContainerBetween)`
  height: 100%;
`
const TopGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 8fr;
  //background-color: #fcfcfc;
  padding: auto 1.5rem;
  align-items: center;
  height: 100px;
`

const TopText = styled.h3`
  font-weight: bold;
  padding: 10px 0;
`

export const PreferenceButton = styled(Button)`
  margin: 5px;
  background-color: white;
  color: black;
`
export const SelectedPreferenceButton = styled(Button)`
  margin: 5px;
  background-color: #ff9a87;
  color: white;
  border: none;
  font-size: 12px;
  font-weight: 400;
`
const ColoredLogo = styled.img`
  width: 56px;
  height: 56px;
  margin: auto;
  border-radius: 50%;
`

function UserPreferencesPage() {
  const goBack = useGoBack()

  const [isModalVisible, setIsModalVisible] = useState(false)

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
    <PageHead title="디저트핏 - 취향 선택" description={description}>
      <NavigationLayout>
        <TopHeader>
          <FlexContainerBetween1>
            <FlexContainerAlignCenter>
              <ArrowBackIosRoundedIcon style={StyledArrowBackIosRoundedIcon} onClick={goBack} />
            </FlexContainerAlignCenter>
            <FlexContainerAlignCenter>취향설정</FlexContainerAlignCenter>
            <FlexContainerAlignCenter>
              <WhiteText>ㅇ</WhiteText>
            </FlexContainerAlignCenter>
          </FlexContainerBetween1>
        </TopHeader>
        <MarginDiv>
          <TopGrid>
            <ColoredLogo src="/dessert-fit-logo-color.webp"></ColoredLogo>
            <TopText>
              홈 화면에서 보고싶은 <br /> 디저트 핏을 설정해보세요.
            </TopText>
          </TopGrid>
          <Divider orientation="left">#맛</Divider>
          <SelectedPreferenceButton shape="round">달달</SelectedPreferenceButton>
          <SelectedPreferenceButton shape="round">고소</SelectedPreferenceButton>
          <PreferenceButton shape="round">짭짤</PreferenceButton>
          <PreferenceButton shape="round">담백</PreferenceButton>
          <PreferenceButton shape="round">상큼</PreferenceButton>
          <PreferenceButton shape="round">씁쓸</PreferenceButton>
          <PreferenceButton shape="round">씁쓸</PreferenceButton>
          <PreferenceButton shape="round">씁쓸</PreferenceButton>
          <PreferenceButton shape="round">씁쓸</PreferenceButton>
          <PreferenceButton shape="round" onClick={showModal}>
            <EllipsisOutlined />
          </PreferenceButton>
          <Divider />
          <Divider orientation="left">#재료</Divider>
          <SelectedPreferenceButton shape="round">민트초코</SelectedPreferenceButton>
          <PreferenceButton shape="round">초코</PreferenceButton>
          <PreferenceButton shape="round">딸기</PreferenceButton>
          <SelectedPreferenceButton shape="round">말차</SelectedPreferenceButton>
          <PreferenceButton shape="round">흑당</PreferenceButton>
          <PreferenceButton shape="round">레몬</PreferenceButton>
          <PreferenceButton shape="round">흑당</PreferenceButton>
          <PreferenceButton shape="round">레몬</PreferenceButton>
          <PreferenceButton shape="round" onClick={showModal}>
            <EllipsisOutlined />
          </PreferenceButton>
          <Modal title="#맛" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <PreferenceButton shape="round">홍차</PreferenceButton>
            <PreferenceButton shape="round">오레오</PreferenceButton>
            <SelectedPreferenceButton shape="round">치즈</SelectedPreferenceButton>
            <SelectedPreferenceButton shape="round">요거트</SelectedPreferenceButton>
            <PreferenceButton shape="round">흑임자</PreferenceButton>
            <PreferenceButton shape="round">홍차</PreferenceButton>
            <PreferenceButton shape="round">오레오</PreferenceButton>
            <SelectedPreferenceButton shape="round">치즈</SelectedPreferenceButton>
            <SelectedPreferenceButton shape="round">요거트</SelectedPreferenceButton>
            <PreferenceButton shape="round">흑임자</PreferenceButton>
            <SelectedPreferenceButton shape="round">치즈</SelectedPreferenceButton>
            <SelectedPreferenceButton shape="round">요거트</SelectedPreferenceButton>
            <PreferenceButton shape="round">흑임자</PreferenceButton>
          </Modal>
          <Divider />
          <Divider orientation="left">#라이프스타일</Divider>
          <SelectedPreferenceButton shape="round">다이어트</SelectedPreferenceButton>
          <SelectedPreferenceButton shape="round">저탄수</SelectedPreferenceButton>
          <PreferenceButton shape="round">슈가프리</PreferenceButton>
          <PreferenceButton shape="round">디카페인</PreferenceButton>
          <PreferenceButton shape="round">락토프리</PreferenceButton>
          <PreferenceButton shape="round">비건</PreferenceButton>
          <PreferenceButton shape="round" onClick={showModal}>
            <EllipsisOutlined />
          </PreferenceButton>
          <Divider />
          <Divider orientation="left">#커피/음료</Divider>
          <SelectedPreferenceButton shape="round">아메리카노</SelectedPreferenceButton>
          <SelectedPreferenceButton shape="round">카페라떼</SelectedPreferenceButton>
          <PreferenceButton shape="round">콜드브루</PreferenceButton>
          <PreferenceButton shape="round">스무디</PreferenceButton>
          <PreferenceButton shape="round">에이드</PreferenceButton>
          <PreferenceButton shape="round">버블티</PreferenceButton>
          <PreferenceButton shape="round" onClick={showModal}>
            <EllipsisOutlined />
          </PreferenceButton>
          <Divider />
        </MarginDiv>
      </NavigationLayout>
    </PageHead>
  )
}

export default UserPreferencesPage
