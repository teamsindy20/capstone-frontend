import PageHead from 'src/components/layouts/PageHead'
import TopHeader from 'src/components/TopHeader'
import { FlexContainerBetween, FlexContainerAlignCenter } from 'src/styles/FlexContainer'
import styled from 'styled-components'
import { Button, Divider, Dropdown, Menu } from 'antd'
import { DownOutlined, UserOutlined, SmileOutlined } from '@ant-design/icons'
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded'
import grey from '@material-ui/core/colors/grey'
import useGoToPage from 'src/hooks/useGoToPage'
import { TABLET_MIN_WIDTH } from 'src/models/constants'

const StyledArrowBackIosRoundedIcon = { fontSize: 20, color: grey[800] }

export const ReviewButton = styled(Button)`
  background-color: #ff9a87;
  border-radius: 7px;
  color: #ffffff;
  height: 45px;
  font-size: 1rem;
`

export const FixedButton = styled(ReviewButton)`
  position: fixed;
  border-radius: 0;
  left: 50%;
  bottom: 0;
  z-index: 1;
  transform: translateX(-50%);
  width: 100%;
  max-width: ${TABLET_MIN_WIDTH};
`
const MarginContainer = styled.div`
  margin: 0.5rem;
  weight: 100%;
`

const FlexContainerBetween1 = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
`
const GridOption = styled.div`
  display: grid;
  grid-template-rows: auto;
  row-gap: 1em;
`

const NoMarginH2 = styled.h2`
  margin: 0;
`

const NoMarginH3 = styled.h3`
  margin: 0;
  font-weight: lighter;
`
const GreyLighterNoMarginH3 = styled.h3`
  margin: 0;
  color: #929393;
  font-weight: lighter;
`
const GreyLighterNoMarginH4 = styled.h4`
  margin: 0;
  color: #929393;
  font-weight: lighter;
`
const GreyNoMarginH3 = styled.h3`
  margin: 0;
  color: #929393;
`

const menu = (
  <Menu>
    <Menu.Item key="1" icon={<SmileOutlined />}>
      뿌링치즈볼 3개
    </Menu.Item>
    <Menu.Item key="2" icon={<UserOutlined />}>
      콜라 1.5L
    </Menu.Item>
    <Menu.Item key="3" icon={<UserOutlined />}>
      눈꽃치즈토핑
    </Menu.Item>
  </Menu>
)

function OrderPage() {
  const goToCartPage = useGoToPage('/cart')

  return (
    <PageHead>
      <TopHeader>
        <FlexContainerBetween1>
          <FlexContainerAlignCenter>
            <ArrowBackIosRoundedIcon style={StyledArrowBackIosRoundedIcon} onClick={goToCartPage} />
          </FlexContainerAlignCenter>
          <FlexContainerAlignCenter>주문하기</FlexContainerAlignCenter>
          <FlexContainerAlignCenter></FlexContainerAlignCenter>
        </FlexContainerBetween1>
      </TopHeader>
      <MarginContainer>
        <GridOption>
          <NoMarginH2>배달정보</NoMarginH2>
          <GreyLighterNoMarginH3>
            100%유기농 아몬드가루로 만든 쫀득하고 촉촉한 꼬끄, 비정제 설탕을 사용하여 달지 않아요.
          </GreyLighterNoMarginH3>
        </GridOption>
      </MarginContainer>
      <MarginContainer>
        <GridOption>
          <Divider />
          <FlexContainerBetween>
            <NoMarginH2>부탁해요</NoMarginH2>
            <NoMarginH2></NoMarginH2>
          </FlexContainerBetween>
          <FlexContainerBetween>
            <NoMarginH3>리뷰이벤트</NoMarginH3>
            <Dropdown overlay={menu}>
              <Button size="large">
                선택해주세요 <DownOutlined />
              </Button>
            </Dropdown>
          </FlexContainerBetween>
          <GreyLighterNoMarginH4>*최소주문금액 : 13,000원</GreyLighterNoMarginH4>
          <Divider />
          <FlexContainerBetween>
            <NoMarginH2>결제수단</NoMarginH2>
            <NoMarginH2></NoMarginH2>
          </FlexContainerBetween>
          <GreyLighterNoMarginH4>기본 : 생크림 보통</GreyLighterNoMarginH4>
          <Divider />
          <FlexContainerBetween>
            <NoMarginH2>결제금액</NoMarginH2>
            <NoMarginH2></NoMarginH2>
          </FlexContainerBetween>
          <Divider />
          <FlexContainerBetween>
            <NoMarginH2>최종 결제금액</NoMarginH2>
            <NoMarginH2>23,000원</NoMarginH2>
          </FlexContainerBetween>
        </GridOption>
      </MarginContainer>
      <FixedButton>총 23,000원 결제</FixedButton>
    </PageHead>
  )
}

export default OrderPage
