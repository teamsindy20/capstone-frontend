import PageHead from 'src/components/layouts/PageHead'
import TopHeader from 'src/components/TopHeader'
import { FlexContainerBetween, FlexContainerAlignCenter } from 'src/styles/FlexContainer'
import styled from 'styled-components'
import { Button, Divider, Dropdown, Menu, Input, Select, Tooltip } from 'antd'
import {
  DownOutlined,
  UserOutlined,
  SmileOutlined,
  AimOutlined,
  GiftOutlined,
  MailOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  CrownOutlined,
  RocketOutlined,
} from '@ant-design/icons'
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

const SmallSelect = styled(Select)`
  width: 15rem;
  color: #929393;
`
const DropdownButton = styled(Button)`
  width: 15rem;
  color: #929393;
`
const DropdownInput = styled(Input)`
  width: 15rem;
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
    <Menu.Item key="3" icon={<SmileOutlined />}>
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
          <FlexContainerBetween>
            <Tooltip title="이 주소가 맞으신가요?">
              <NoMarginH3>
                <EnvironmentOutlined />
                동작구 흑석동 221 208관 1층
              </NoMarginH3>
            </Tooltip>
            <Button>변경</Button>
          </FlexContainerBetween>
          <NoMarginH3>도로명 : 흑석로 84 208관 1층</NoMarginH3>
          <FlexContainerBetween>
            <NoMarginH3>
              <PhoneOutlined />
              010-1234-5678
            </NoMarginH3>
            <Button>변경</Button>
          </FlexContainerBetween>
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
            <NoMarginH3>
              <MailOutlined />
              사장님께
            </NoMarginH3>
            <DropdownInput placeholder="ex. 시럽 추가해주세요." />
          </FlexContainerBetween>
          <FlexContainerBetween>
            <NoMarginH3>
              <GiftOutlined />
              리뷰이벤트
            </NoMarginH3>
            <SmallSelect placeholder="선택해주세요.">
              <Select.Option value="1">눈꽃치즈토핑 추가</Select.Option>
              <Select.Option value="2">감자튀김 증정</Select.Option>
              <Select.Option value="3">콜라 1.25L</Select.Option>
            </SmallSelect>
          </FlexContainerBetween>
          <FlexContainerBetween>
            <NoMarginH3>
              <CrownOutlined />
              단골혜택
            </NoMarginH3>
            <SmallSelect placeholder="선택해주세요.">
              <Select.Option value="1">10% 할인</Select.Option>
              <Select.Option value="2">뿌링치즈볼 5개</Select.Option>
              <Select.Option value="3">콜라 1.25L</Select.Option>
            </SmallSelect>
          </FlexContainerBetween>
          <FlexContainerBetween>
            <NoMarginH3>
              <RocketOutlined />
              라이더님께
            </NoMarginH3>
            <DropdownInput placeholder="ex. 문앞에 놓아주세요." />
          </FlexContainerBetween>
          <Divider />
          <FlexContainerBetween>
            <NoMarginH2>결제수단</NoMarginH2>
            <NoMarginH2></NoMarginH2>
          </FlexContainerBetween>
          <Select>
            <Select.Option value="card">신용/체크카드</Select.Option>
            <Select.Option value="cash">현금</Select.Option>
          </Select>
          <FlexContainerBetween>
            <NoMarginH3>쿠폰사용</NoMarginH3>
            <NoMarginH3>0개</NoMarginH3>
          </FlexContainerBetween>
          <FlexContainerBetween>
            <NoMarginH3>포인트사용</NoMarginH3>
            <NoMarginH3>1,200P</NoMarginH3>
          </FlexContainerBetween>
          <GreyLighterNoMarginH4>기본 : 생크림 보통</GreyLighterNoMarginH4>
          <Divider />
          <FlexContainerBetween>
            <NoMarginH2>결제금액</NoMarginH2>
            <NoMarginH2></NoMarginH2>
          </FlexContainerBetween>
          <FlexContainerBetween>
            <NoMarginH3>주문금액</NoMarginH3>
            <NoMarginH3>15,900원</NoMarginH3>
          </FlexContainerBetween>
          <FlexContainerBetween>
            <NoMarginH3>배달팁</NoMarginH3>
            <NoMarginH3>3,000원</NoMarginH3>
          </FlexContainerBetween>
          <FlexContainerBetween>
            <NoMarginH3>할인금액</NoMarginH3>
            <NoMarginH3>-6,000원</NoMarginH3>
          </FlexContainerBetween>
          <FlexContainerBetween>
            <GreyLighterNoMarginH4>상품권</GreyLighterNoMarginH4>
            <GreyLighterNoMarginH4>-5,000원</GreyLighterNoMarginH4>
          </FlexContainerBetween>
          <FlexContainerBetween>
            <GreyLighterNoMarginH4>쿠폰</GreyLighterNoMarginH4>
            <GreyLighterNoMarginH4>-500원</GreyLighterNoMarginH4>
          </FlexContainerBetween>
          <FlexContainerBetween>
            <GreyLighterNoMarginH4>포인트</GreyLighterNoMarginH4>
            <GreyLighterNoMarginH4>-500원</GreyLighterNoMarginH4>
          </FlexContainerBetween>
          <FlexContainerBetween>
            <NoMarginH3>적립포인트</NoMarginH3>
            <NoMarginH3>190P</NoMarginH3>
          </FlexContainerBetween>
          <Divider />
          <FlexContainerBetween>
            <NoMarginH2>최종 결제금액</NoMarginH2>
            <NoMarginH2>23,000원</NoMarginH2>
          </FlexContainerBetween>
          <Divider />
        </GridOption>
      </MarginContainer>
      <FixedButton>총 23,000원 결제</FixedButton>
    </PageHead>
  )
}

export default OrderPage
