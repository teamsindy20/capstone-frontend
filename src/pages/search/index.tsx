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
import { AudioOutlined, EllipsisOutlined, SearchOutlined } from '@ant-design/icons'
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
  margin: 0.5rem 0.5rem;
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

const PopularGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  text-align: center;
`

const PopularContentGrid = styled.div`
  display: grid;
  grid-template-rows: 1fr 4fr 1fr;
  text-align: center;
  align-items: center;
`

const PopularImg = styled.img`
  border-radius: 15%;
  width: 90%;
  height: 90%;
  margin: auto;
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
        <PopularGrid>
          <PopularContentGrid>
            <div>1위</div>
            <PopularImg src="data:image/jpeg;base64,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" />
            <div>딸기케이크</div>
          </PopularContentGrid>
          <PopularContentGrid>
            <div>2위</div>
            <PopularImg src="https://lh3.googleusercontent.com/proxy/auY-9QfGPRBF9Nq11J0HhIun2xyqBozA08HH4oEE81r9Y8xwf7wbWdD3vGFG6dt6nZdGeLD2Ysyb8fMyIWwnyFP9DwKdbj-OQwcPJhVFk07Pmtxkbqo" />
            <div>크로플</div>
          </PopularContentGrid>
          <PopularContentGrid>
            <div>3위</div>
            <PopularImg src="https://ppss.kr/wp-content/uploads/2018/01/001-27.jpg" />
            <div>홍콩와플</div>
          </PopularContentGrid>
        </PopularGrid>
        <Divider />
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
