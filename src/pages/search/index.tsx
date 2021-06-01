import PageHead from 'src/components/layouts/PageHead'
import styled from 'styled-components'
import { Button, Input, Space, Divider, Modal } from 'antd'
import TopHeader from 'src/components/TopHeader'
import { FlexContainerBetween, FlexContainerAlignCenter } from 'src/styles/FlexContainer'
import NotificationsRoundedIcon from '@material-ui/icons/NotificationsRounded'
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded'
import grey from '@material-ui/core/colors/grey'
import useGoToPage from 'src/hooks/useGoToPage'
import useGoBack from 'src/hooks/useGoBack'
import { AudioOutlined, EllipsisOutlined , SearchOutlined} from '@ant-design/icons'
import { useState } from 'react'

const description = '검색할 수 있는 페이지'

const { Search } = Input

const FlexContainerCenterCenter = styled(FlexContainerAlignCenter)`
  justify-content: center;
  height: 100%;
`
const MarginDiv = styled.div`
  margin: 0.5rem;
`

const TitleText = styled.h3`
  margin: 0;
  font-weight: bold;
`
const StyledSearchRoundedIcon = { fontSize: 30, color: grey[800] }

const StyledArrowBackIosRoundedIcon = { fontSize: 20, color: grey[800] }

const FlexContainerBetween1 = styled(FlexContainerBetween)`
  height: 100%;
`

const WhiteText = styled.h5`
  color: #ffffff;
`

const PreferenceButton = styled(Button)`
  margin: 5px;
`
const SelectedPreferenceButton = styled(PreferenceButton)`
  background-color: #ff9a87;
`

function SearchPage() {
  const goBack = useGoBack()

  const onSearch = (value: any) => console.log(value)

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
    <PageHead title="디저트핏 - 검색" description={description}>
      <TopHeader>
        <FlexContainerBetween1>
          <FlexContainerAlignCenter>
            <ArrowBackIosRoundedIcon style={StyledArrowBackIosRoundedIcon} onClick={goBack} />
          </FlexContainerAlignCenter>
          <FlexContainerCenterCenter>
            <Search
              placeholder="내용을 입력해주세요."
              allowClear
              onSearch={onSearch}
              style={{ width: 320 }}
            />
          </FlexContainerCenterCenter>
          <WhiteText>ㅇ</WhiteText>
        </FlexContainerBetween1>
      </TopHeader>
      <MarginDiv>
        <TitleText>
          <SearchOutlined />
          &nbsp; 인기검색어
        </TitleText>
        <TitleText>
          <SearchOutlined />
          &nbsp; 세부검색
        </TitleText>
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
    </PageHead>
  )
}

export default SearchPage
