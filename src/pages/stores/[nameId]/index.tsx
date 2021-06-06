import { FlexContainerBetween, FlexContainerAlignCenter } from 'src/styles/FlexContainer'
import { Checkbox, Tabs, Tooltip, Button, Divider, Layout, Popover } from 'antd'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { handleApolloError } from 'src/apollo/error'
import PageHead from 'src/components/layouts/PageHead'
import PageLayout from 'src/components/layouts/PageLayout'
import MenuCard, { MenuLoadingCard, SquareFrame } from 'src/components/MenuCard'
import TopHeader from 'src/components/TopHeader'
import {
  useStoreMenusQuery,
  useStoreQuery,
  usePickStoreMutation,
  useStoreLazyQuery,
  StoreQuery,
} from 'src/graphql/generated/types-and-hooks'
import useBoolean from 'src/hooks/useBoolean'
import { GridContainerUl, useRefetchMenuFavorite, IconImg } from 'src/pages'
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded'
import { EnvironmentOutlined, PhoneOutlined, InstagramOutlined } from '@ant-design/icons'
import { grey } from '@material-ui/core/colors'
import { useRef, ReactText, ReactNode } from 'react'
import { toast } from 'react-toastify'
import useGoBack from 'src/hooks/useGoBack'
import Image from 'next/image'
import { HorizontalBorder } from 'src/pages/feed'

const TopIconDiv = styled.div`
  padding: 13px;
  /* display: flex; */
  /* align-items: center; */
`
const IconDiv = styled.div`
  padding: 7px;
  /* display: flex;
  align-items: center; */
`
const StoreHomeGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  padding: 1.1rem;
  align-items: center;
`

const RoundSquareFrame = styled(SquareFrame)`
  overflow: hidden;
  border-radius: 10px;
  background: #fcfcfc;
`

const TextInCard = styled.div`
  width: 100%;
  font-size: 13px;
  margin: 10px;
  //align-items: center;
`

const FlexContainerSpaceEvenly = styled.div`
  display: flex;
  justify-content: space-evenly;
  border: solid 1px #efefef;
  height: 60px;
  background-color: white;
`
const PickRegularGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  border: solid 1px #efefef;
  height: 60px;
  background-color: white;
`

const PickRegularContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  padding: 7px;
`

const PinkPickRegularText = styled(PickRegularContainer)`
  color: #ff5e3d;
`

const NoMarginHorizontalBorder = styled(HorizontalBorder)`
  margin: 0;
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

const FlexContainerBetweenCenter = styled(FlexContainerBetween)`
  align-items: center;
  height: 100%;
`

const StyledArrowBackIosRoundedIcon = { fontSize: 20, color: grey[800] }

export function useStoreNameIdUrl() {
  const router = useRouter()
  const storeNameId = (router.query.nameId ?? '') as string
  const storeName = storeNameId.substring(0, storeNameId.lastIndexOf('-'))
  const storeId = storeNameId.substring(storeNameId.lastIndexOf('-') + 1)

  function getStoreUrl(activeKey: string) {
    switch (activeKey) {
      case 'menus':
        return `/stores/${storeNameId}`
      case 'feed':
      case 'reviews':
        return `/stores/${storeNameId}/${activeKey}`
      default:
        return ''
    }
  }

  return { storeId, storeName, getStoreUrl }
}

type Props = {
  children: ReactNode
  defaultPage: string
  loading: boolean
  store: any
}

export function StorePageLayout({ children, defaultPage, loading, store }: Props) {
  const router = useRouter()
  const goBack = useGoBack()
  const { storeId, getStoreUrl } = useStoreNameIdUrl()

  const [storeLazyQuery] = useStoreLazyQuery({
    fetchPolicy: 'network-only',
    onError: handleApolloError,
  })

  const toastId = useRef<ReactText>('')

  const [pickStoreMutation, { loading: isPickingStoreLoading }] = usePickStoreMutation({
    onCompleted: (data) => {
      function restorePicking() {
        pickStoreMutation({ variables: { id: storeId } })
      }

      if (data.pickStore) {
        if (toastId.current) toast.dismiss(toastId.current)
        toastId.current = toast(
          <div>
            <b>{store.name}</b>을 찜했어요
            <button onClick={restorePicking}>되돌리기</button>
          </div>
        )
      } else {
        if (toastId.current) toast.dismiss(toastId.current)
        toastId.current = toast(
          <div>
            <b>{store.name}</b>의 찜을 해제했어요
            <button onClick={restorePicking}>되돌리기</button>
          </div>
        )
      }

      storeLazyQuery({ variables: { id: storeId } }) // storeId는 button disabled 로 항상 not null
    },
    onError: handleApolloError,
  })

  function pickStore() {
    if (!isPickingStoreLoading) {
      pickStoreMutation({ variables: { id: storeId } })
    }
  }

  return (
    <>
      <TopHeader>
        <FlexContainerBetweenCenter>
          <ArrowBackIosRoundedIcon style={StyledArrowBackIosRoundedIcon} onClick={goBack} />
          <FlexContainerAlignCenter>{store?.name}</FlexContainerAlignCenter>
          <TopIconDiv>
            <IconImg src="/441@3x.png" alt="notification" />
          </TopIconDiv>
        </FlexContainerBetweenCenter>
      </TopHeader>
      <StoreHomeGrid>
        <RoundSquareFrame>
          {store && (
            <Image
              src={store.imageUrls ? store.imageUrls[0] : ''}
              alt="store-profile"
              layout="fill"
              objectFit="contain"
            />
          )}
        </RoundSquareFrame>
        <TextInCard>
          <NoMarginH3>
            <EnvironmentOutlined />
            흑석로 12바길
          </NoMarginH3>
          <NoMarginH3>
            <PhoneOutlined />
            02-1234-5678
          </NoMarginH3>
          <NoMarginH3>
            <InstagramOutlined />
            @dessert_fit
          </NoMarginH3>
        </TextInCard>
      </StoreHomeGrid>
      <PickRegularGrid>
        <PickRegularContainer>
          <IconDiv>
            {store?.favorite ? (
              <IconImg src="/173@3x.png" alt="notification" onClick={pickStore} />
            ) : (
              <IconImg src="/358@3x.png" alt="notification" onClick={pickStore} />
            )}
          </IconDiv>
          찜<PinkPickRegularText>{store?.favoriteCount}</PinkPickRegularText>
        </PickRegularContainer>
        <PickRegularContainer>
          <Popover title="단골 혜택" content={VIPcontent}>
            <IconDiv>
              <IconImg src="/623@3x.png" alt="notification" />
            </IconDiv>
          </Popover>
          단골
          <PinkPickRegularText>{store?.regularCustomerCount}</PinkPickRegularText>
        </PickRegularContainer>
      </PickRegularGrid>
      <TextInCard>
        <NoMarginH3>재주문율 : {store?.reorderRatio}%</NoMarginH3>
        <NoMarginH3>
          배달시간 : {store?.minimumDeliveryTime}분 ~ {store?.maximumDeliveryTime}분
        </NoMarginH3>
        <NoMarginH3>배달료 : {store?.deliveryCharge}</NoMarginH3>
        <NoMarginH3>최소주문금액 : {store?.minimumDeliveryAmount}</NoMarginH3>
      </TextInCard>
      <NoMarginHorizontalBorder />
      <Tabs
        defaultActiveKey={defaultPage}
        centered
        size="large"
        onTabClick={(activeKey) => router.push(getStoreUrl(activeKey))}
      >
        <Tabs.TabPane tab="메뉴" key="menus" />
        <Tabs.TabPane tab="소식" key="feed" />
        <Tabs.TabPane tab="리뷰" key="reviews" />
      </Tabs>

      {children}
    </>
  )
}

const description = '매장에서 판매하는 메뉴를 볼 수 있어요.'

function StoreMenusPage() {
  const { storeId, storeName } = useStoreNameIdUrl()

  // store 정보는 cache-first 로 가져오기
  const storeQueryResult = useStoreQuery({ onError: handleApolloError, variables: { id: storeId } })

  const store = storeQueryResult.data?.store
  const isStoreLoading = storeQueryResult.loading

  const [onlyImage, toggleOnlyImage] = useBoolean(false)

  const { data, loading: isStoreMenusLoading } = useStoreMenusQuery({
    onError: handleApolloError,
    variables: { id: storeId },
  })

  const menus = data?.store?.menus

  const refetchMenuFavorite = useRefetchMenuFavorite()

  return (
    <PageHead title="디저트핏 - 매장 메뉴" description={`${storeName} ${description}`}>
      <PageLayout>
        <StorePageLayout defaultPage="menus" loading={isStoreLoading} store={store}>
          <Divider orientation="right">
            <Checkbox checked={onlyImage} onChange={toggleOnlyImage}>
              사진만 보기
            </Checkbox>
          </Divider>
          <GridContainerUl onlyImage={onlyImage}>
            {menus?.map((menu) => (
              <MenuCard
                key={menu.id}
                afterPickingMenu={refetchMenuFavorite(menu.id)}
                hideStoreName
                menu={menu}
                onlyImage={onlyImage}
              />
            ))}
            {isStoreMenusLoading ? (
              <MenuLoadingCard onlyImage={onlyImage} />
            ) : (
              !menus?.length && <h4>매장에 메뉴가 없어요..?!</h4>
            )}
          </GridContainerUl>
        </StorePageLayout>
      </PageLayout>
    </PageHead>
  )
}

export default StoreMenusPage
