import {
  EnvironmentOutlined,
  PhoneOutlined,
  InstagramOutlined,
  ReloadOutlined,
  HeartOutlined,
  CrownOutlined,
} from '@ant-design/icons'
import { Divider, Layout, Popover } from 'antd'
import Image from 'next/image'
import { FlexContainerAlignCenter, FlexContainerBetween } from 'src/styles/FlexContainer'
import styled from 'styled-components'

const { Header, Footer, Sider, Content } = Layout

const FlexContainerBetweenCenter = styled(FlexContainerBetween)`
  align-items: center;
  height: 100%;
`
const FlexContainerSpaceEvenly = styled.div`
  display: flex;
  justify-content: space-evenly;
`
const NoMarginH3 = styled.h3`
  margin: 0;
`
const NoMarginH4 = styled.h4`
  margin: 0;
`

const VIPcontent = (
  <div>
    <p>30일 동안 5회 주문 시 단골 등극!</p>
    <p>10%할인쿠폰 증정</p>
  </div>
)
const ReOrderContent = (
  <div>
    <p>재주문율 설명</p>
  </div>
)

type Props = {
  storeId: string
}

function StoreInformation({ storeId }: Props) {
  return (
    <>
      <Layout>
        <Sider>
          <Image src="/error" width={200} height={200} />
        </Sider>
        <Content>
          <NoMarginH4>
            <EnvironmentOutlined />
            흑석로 12바길
          </NoMarginH4>
          <NoMarginH4>
            <PhoneOutlined />
            02-1234-5678
          </NoMarginH4>
          <NoMarginH4>
            <InstagramOutlined />
            @dessert_fit
          </NoMarginH4>
        </Content>
      </Layout>

      <Divider />
      <FlexContainerSpaceEvenly>
        <FlexContainerAlignCenter>
          <ReloadOutlined />
          <Popover title="재주문율이란?" content={ReOrderContent}>
            <NoMarginH3>재주문율 70%</NoMarginH3>
          </Popover>
        </FlexContainerAlignCenter>
        <Divider type="vertical" />
        <FlexContainerAlignCenter>
          <HeartOutlined />
          <NoMarginH3>찜 34</NoMarginH3>
        </FlexContainerAlignCenter>
        <Divider type="vertical" />
        <FlexContainerAlignCenter>
          <CrownOutlined />
          <Popover title="단골 혜택" content={VIPcontent}>
            <NoMarginH3>단골 10</NoMarginH3>
          </Popover>
        </FlexContainerAlignCenter>
      </FlexContainerSpaceEvenly>

      <Divider />
      <NoMarginH4>배달시간 : 10분 ~ 20분</NoMarginH4>
      <NoMarginH4>배달료 : 3,000원</NoMarginH4>
      <NoMarginH4>최소주문금액 : 7,000원</NoMarginH4>
    </>
  )
}

export default StoreInformation
