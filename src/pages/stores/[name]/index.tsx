import TopHeader from 'src/components/TopHeader'
import { FlexContainerBetween, FlexContainerAlignCenter } from 'src/styles/FlexContainer'
import { Tabs, Divider, Button, Tooltip, Popover, Layout, Image } from 'antd'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { handleApolloError } from 'src/apollo/error'
import PageHead from 'src/components/layouts/PageHead'
import PageLayout from 'src/components/layouts/PageLayout'
import MenuCard from 'src/components/MenuCard'
import {
  useMenuLazyQuery,
  usePickStoreMutation,
  useStoreLazyQuery,
  useStoreMenusQuery,
} from 'src/graphql/generated/types-and-hooks'
import useBoolean from 'src/hooks/useBoolean'
import { GridContainerUl } from 'src/pages'
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded'
import grey from '@material-ui/core/colors/grey'
import useGoToPage from 'src/hooks/useGoToPage'
import { store } from 'src/models/mock-data'
import {
  HeartOutlined,
  BellOutlined,
  ReloadOutlined,
  StarOutlined,
  InstagramOutlined,
  CrownOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons'

const description = '매장에서 판매하는 메뉴를 볼 수 있어요.'

const StyledArrowBackIosRoundedIcon = { fontSize: 20, color: grey[800] }

const { Header, Footer, Sider, Content } = Layout

const FlexContainerBetween1 = styled.div`
  display: flex;
  justify-content: space-between;
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

function StoreMenusPage() {
  const router = useRouter()
  const storeNameWithId = (router.query.name ?? '') as string
  const storeName = storeNameWithId?.substring(0, storeNameWithId.lastIndexOf('-'))
  const storeId = storeNameWithId?.substring(storeNameWithId.lastIndexOf('-') + 1)
  const goToHomePage = useGoToPage('/')

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

  function goToPage(activeKey: string) {
    switch (activeKey) {
      case 'menus':
        return `/stores/${router.query.name}`
      case 'feed':
      case 'reviews':
        return `/stores/${router.query.name}/${activeKey}`
      default:
        return ''
    }
  }

  const [onlyImage, toggleOnlyImage] = useBoolean(false)

  const [fetchStore, { loading: isStoreLoading }] = useStoreLazyQuery({
    fetchPolicy: 'network-only',
    onError: handleApolloError,
  })

  const [fetchMenu, { loading: isMenuLoading }] = useMenuLazyQuery({
    fetchPolicy: 'network-only',
    onError: handleApolloError,
  })

  const a = useStoreMenusQuery({ onError: handleApolloError, variables: { id: storeId } })

  const menus = a.data?.store?.menus

  const [pickStore, { loading }] = usePickStoreMutation({
    onCompleted: (data) => {
      if (data.pickStore) {
        toast.success(
          <div>
            매장을 찜했어요{' '}
            <span onClick={() => pickStore({ variables: { id: storeId } })} role="alert">
              찜 해제하기
            </span>
          </div>
        )
      } else {
        toast.success(
          <div>
            매장 찜을 해제했어요{' '}
            <span onClick={() => pickStore({ variables: { id: storeId } })} role="alert">
              다시 찜하기
            </span>
          </div>
        )
      }
      fetchStore({ variables: { id: storeId } }) // storeId는 button disabled 로 항상 not null
    },
    onError: handleApolloError,
  })

  return (
    <PageHead title="디저트핏 - 매장 메뉴" description={`${storeName} ${description}`}>
      <PageLayout>
        <TopHeader>
          <FlexContainerBetween1>
            <FlexContainerAlignCenter>
              <ArrowBackIosRoundedIcon
                style={StyledArrowBackIosRoundedIcon}
                onClick={goToHomePage}
              />
            </FlexContainerAlignCenter>
            <FlexContainerAlignCenter>{store.name}</FlexContainerAlignCenter>
            <FlexContainerAlignCenter>
              <Tooltip title="매장 찜하기">
                <Button
                  shape="circle"
                  icon={<HeartOutlined />}
                  disabled={loading || !storeId}
                  onClick={() => {
                    pickStore({ variables: { id: storeId ?? '' } })
                  }}
                />
              </Tooltip>
              <Tooltip title="알림설정">
                <Button shape="circle" icon={<BellOutlined />} />
              </Tooltip>
            </FlexContainerAlignCenter>
          </FlexContainerBetween1>
        </TopHeader>
        <Layout>
          <Sider>
            <Image
              width={200}
              height={200}
              src="error"
              fallback="data:image/png;base64,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"
            />
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
        <Divider />
        <Tabs
          defaultActiveKey="feed"
          centered
          onTabClick={(activeKey) => router.push(goToPage(activeKey))}
        >
          <Tabs.TabPane tab="매장소식" key="feed" />
          <Tabs.TabPane tab="메뉴" key="menus" />
          <GridContainerUl onlyImage={onlyImage}>
            {menus?.map((menu) => (
              <MenuCard
                key={menu.id}
                afterPickingMenu={() => fetchMenu({ variables: { id: menu.id } })}
                menu={menu as any}
                onlyImage={onlyImage}
              />
            ))}
          </GridContainerUl>
          <Tabs.TabPane tab="리뷰" key="reviews" />
        </Tabs>
      </PageLayout>
    </PageHead>
  )
}

export default StoreMenusPage
