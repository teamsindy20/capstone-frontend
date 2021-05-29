import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { setCartMenus, cartMenusVar, setCartStore, cartStoreVar } from 'src/apollo/cache'
import { handleApolloError } from 'src/apollo/error'
import PageHead from 'src/components/layouts/PageHead'
import { useMenuDetailQuery } from 'src/graphql/generated/types-and-hooks'
import { TABLET_MIN_WIDTH } from 'src/models/constants'
import styled from 'styled-components'
import { Button, Divider } from 'antd'
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded'
import grey from '@material-ui/core/colors/grey'
import TopHeader, { HorizontalBorder } from 'src/components/TopHeader'
import { FlexContainerBetween } from 'src/styles/FlexContainer'
import useGoToPage from 'src/hooks/useGoToPage'
import ClientSideLink from 'src/components/atoms/ClientSideLink'
import useGoBack from 'src/hooks/useGoBack'
import { formatPrice } from 'src/utils/price'
import { useState, CSSProperties } from 'react'
import CountButton from 'src/components/atoms/CountButton'

const description = '메뉴 세부 정보를 확인해보세요'

const MarginContainer = styled.div`
  margin: 0.5rem;
  width: 100%;
`
export const ReviewButton = styled(Button)`
  background-color: #ff9a87;
  border-radius: 7px;
  color: #ffffff;
  height: 45px;
  font-size: 1rem;
`

export const FixedButton = styled(ReviewButton)`
  position: fixed !important;
  bottom: 0;
  z-index: 1;

  width: 100%;
  max-width: ${TABLET_MIN_WIDTH};
  border-radius: 0;
`

const StyledArrowBackIosRoundedIcon = { fontSize: 20, color: grey[800], cursor: 'pointer' }

const StyledArrowBackIosRoundedIcon2: CSSProperties = {
  fontSize: 20,
  color: grey[800],
  visibility: 'hidden',
}

const FlexContainerBetween1 = styled.div`
  display: flex;
  align-items: center;
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

function StoreMenuPage() {
  const router = useRouter()
  const menuNameId = (router.query.nameId as string | undefined) ?? ''
  const menuId = menuNameId.substring(menuNameId.lastIndexOf('-') + 1)

  const { data, loading, error } = useMenuDetailQuery({
    onError: handleApolloError,
    variables: { id: menuId },
  })

  const menu = data?.menu
  const store = menu?.store

  const goToMenuReviewPage = useGoToPage(`/stores/${router.query.name}/reviews?menu=${menu?.name}`)
  const goBack = useGoBack()

  const [count, setCount] = useState(1)

  function addToCart() {
    if (menu && store) {
      const cartStore = cartStoreVar()

      if (cartStore && cartStore.id !== store.id) {
        // TODO: 다른 매장의 메뉴를 담으면 경고 모달 띄우기
        setCartMenus([])
      }

      setCartStore({
        id: store.id,
        name: store.name,
        imageUrl: store.imageUrls ? store.imageUrls[0] : '',
      })
      setCartMenus([
        ...cartMenusVar(),
        {
          id: menu.id,
          name: menu.name,
          price: menu.price,
          count: count,
        },
      ])
      toast(
        <div>
          <b>{menu.name}</b> 장바구니 추가 완료!
        </div>
      )
      router.back()
    }
  }

  return (
    <PageHead title="디저트핏 - 메뉴 상세" description={description}>
      <TopHeader>
        <FlexContainerBetween1>
          <ArrowBackIosRoundedIcon onClick={goBack} style={StyledArrowBackIosRoundedIcon} />
          <h4>메뉴옵션</h4>
          <ArrowBackIosRoundedIcon style={StyledArrowBackIosRoundedIcon2} />
        </FlexContainerBetween1>
      </TopHeader>
      {loading || !menu || !store ? (
        <>
          <div>menu loading...</div>
          <FixedButton loading={true}>장바구니에 담기</FixedButton>
        </>
      ) : !error ? (
        <>
          <img src={menu.imageUrls ? menu.imageUrls[0] : ''} alt="menu" width="320px" />
          <HorizontalBorder />
          <MarginContainer>
            <GridOption>
              <ClientSideLink href={`/stores/${router.query.name}`}>
                <GreyNoMarginH3>{store.name}</GreyNoMarginH3>
              </ClientSideLink>
              <NoMarginH2>{menu.name}</NoMarginH2>
              <GreyLighterNoMarginH3>
                {menu.content}
                100%유기농 아몬드가루로 만든 쫀득하고 촉촉한 꼬끄, 비정제 설탕을 사용하여 달지
                않아요.
              </GreyLighterNoMarginH3>
              <Button disabled={loading} onClick={goToMenuReviewPage}>
                리뷰보기
              </Button>
            </GridOption>
          </MarginContainer>
          <MarginContainer>
            <GridOption>
              <Divider />
              <FlexContainerBetween>
                <NoMarginH2>가격</NoMarginH2>
                <NoMarginH2>{formatPrice(menu.price)}</NoMarginH2>
              </FlexContainerBetween>
              <Divider />
              <GreyLighterNoMarginH4>
                *최소주문금액 : {store.minimumDeliveryAmount}
              </GreyLighterNoMarginH4>
              <FlexContainerBetween>
                <NoMarginH2>옵션</NoMarginH2>
                <NoMarginH2></NoMarginH2>
              </FlexContainerBetween>
              <GreyLighterNoMarginH4>기본 : 생크림 보통</GreyLighterNoMarginH4>
              <Divider />
              <FlexContainerBetween>
                <NoMarginH2>수량</NoMarginH2>
                <CountButton onClick={setCount} value={count} />
              </FlexContainerBetween>
              <Divider />
              <FlexContainerBetween>
                <NoMarginH2>총 가격</NoMarginH2>
                <NoMarginH2>{formatPrice(menu.price * count)}</NoMarginH2>
              </FlexContainerBetween>
              <Divider />
            </GridOption>
          </MarginContainer>
          <FixedButton onClick={addToCart}>
            {count}개 담기 ({formatPrice(menu.price * count)})
          </FixedButton>
        </>
      ) : (
        <div>error</div>
      )}
    </PageHead>
  )
}

export default StoreMenuPage
