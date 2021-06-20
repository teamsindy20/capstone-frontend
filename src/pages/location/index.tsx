import PageHead from 'src/components/layouts/PageHead'
import styled from 'styled-components'
import TopHeader from 'src/components/TopHeader'
import { FlexContainerBetween, FlexContainerAlignCenter } from 'src/components/atoms/FlexContainer'
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded'
import grey from '@material-ui/core/colors/grey'
import useGoBack from 'src/hooks/useGoBack'
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded'
import { Button, Input, Space, Divider, Modal } from 'antd'

const { Search } = Input

const FlexContainerBetween1 = styled(FlexContainerBetween)`
  height: 100%;
`
const FlexContainerCenterCenter = styled(FlexContainerAlignCenter)`
  justify-content: center;
  height: 100%;
`
const WhiteText = styled.h5`
  color: #ffffff;
`
const StyledArrowBackIosRoundedIcon = { fontSize: 20, color: grey[800] }

const StyledLocationOnRoundedIcon = styled(LocationOnRoundedIcon)`
  color: #ff9a88;
  font-size: 16px;
  margin: 0;
`

const GridContainer = styled.div`
  display: grid;
  margin: 1.2rem;
  grid-template-row: auto;
  grid-gap: 3px;
`

const TitleText = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 18px;
`
const AdressText = styled.h3`
  font-size: 16px;
  font-weight: 500;
`
const Adress2Text = styled(AdressText)`
  color: #7c7c7c;
`
const AddresContainer = styled.div`
  display: flex;
`
const Adress2Icon = styled.div`
  width: 54px;
  height: 26px;
  border-radius: 13px;
  border: solid 1px #f57861;
  background-color: #ffffff;
  color: #f57861;
  font-size: 13px;
  font-weight: 500;
  text-align: center;
  margin: 0 6px 0 0;
`

const PinkButton = styled.button`
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

function Location() {
  const goBack = useGoBack()

  const onSearch = (value: any) => console.log(value)

  return (
    <PageHead>
      <TopHeader>
        <FlexContainerBetween1>
          <FlexContainerAlignCenter>
            <ArrowBackIosRoundedIcon style={StyledArrowBackIosRoundedIcon} onClick={goBack} />
          </FlexContainerAlignCenter>
          <FlexContainerCenterCenter>주소지 설정</FlexContainerCenterCenter>
          <WhiteText>ㅇ</WhiteText>
        </FlexContainerBetween1>
      </TopHeader>
      <GridContainer>
        <TitleText>현주소</TitleText>
        <AddresContainer>
          <StyledLocationOnRoundedIcon />
          <AdressText>동작구 흑석동 221 208관 1층</AdressText>
        </AddresContainer>
        <AddresContainer>
          <Adress2Icon>도로명</Adress2Icon>
          <Adress2Text>흑석로 84 208관 1층</Adress2Text>
        </AddresContainer>
        <Search
          placeholder="주소를 입력해주세요."
          allowClear
          onSearch={onSearch}
          style={{ width: 320 }}
        />
        <PinkButton>현위치 주소설정</PinkButton>
      </GridContainer>
      <Divider />
      <GridContainer>
        <TitleText>현주소</TitleText>
        <AddresContainer>
          <StyledLocationOnRoundedIcon />
          <AdressText>동작구 흑석동 221 208관 1층</AdressText>
        </AddresContainer>
        <AddresContainer>
          <Adress2Icon>도로명</Adress2Icon>
          <Adress2Text>흑석로 84 208관 1층</Adress2Text>
        </AddresContainer>
      </GridContainer>
    </PageHead>
  )
}

export default Location
