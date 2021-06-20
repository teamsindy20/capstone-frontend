import PageHead from 'src/components/layouts/PageHead'
import useGoToPage from 'src/hooks/useGoToPage'
import TopHeader from 'src/components/TopHeader'
import { useReactiveVar } from '@apollo/client'
import { CartMenu, cartMenusVar, cartStoreVar, setCartMenus, setCartStore } from 'src/apollo/cache'
import CartMenuCard from 'src/components/CartMenuCard'
import { FlexContainerBetween, FlexContainerAlignCenter } from 'src/components/atoms/FlexContainer'
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded'
import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded'
import grey from '@material-ui/core/colors/grey'
import { Button } from 'antd'
import styled from 'styled-components'
import useGoBack from 'src/hooks/useGoBack'
import ClientSideLink from 'src/components/atoms/ClientSideLink'
import { Padding } from 'src/components/layouts/NavigationLayout'
import { getSelectedOptionsPrice } from '../stores/[nameId]/[name]'
import { formatPrice } from 'src/utils/price'
import { useState, useEffect } from 'react'
import { FixedButton } from 'src/components/atoms/Button'
import { useRouter } from 'next/router'

const StyledArrowBackIosRoundedIcon = { fontSize: 20, color: grey[800] }

const StyledKeyboardArrowRightRoundedIcon = { fontSize: 20, color: grey[800] }

const FlexContainerBetween1 = styled(FlexContainerBetween)`
  height: 100%;
`

const FlexContainerBetween2 = styled(FlexContainerBetween)`
  margin: 1rem;
  align-items: center;
`

const StoreGrid = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 0.5rem;
  align-items: center;
`

const GridContainerUl = styled.ul`
  display: grid;
  gap: 1rem;
  padding: 1rem;

  background-color: #fcfcfc;
`

const StyledImg = styled.img`
  width: 1.8rem;
  height: 1.8rem;
  object-fit: cover;
  border-radius: 50%;
  overflow: hidden;
`

const NoMarginH4 = styled.h4`
  margin: 0;
`

const description = '장바구니에 담긴 디저트를 확인해보세요'

export const ClearAllButton = styled(Button)`
  color: #f57861;
  border: none;
  margin: 0;
  font-size: 14px;
  font-weight: 500;
`

export function getTotalPrice(cartMenus: CartMenu[]) {
  return cartMenus.reduce(
    (acc, { count, price, optionCategories }) =>
      acc + count * (price + getSelectedOptionsPrice(optionCategories ?? {})),
    0
  )
}

function CartPage() {
  const router = useRouter()
  const goBack = useGoBack()

  const cartStore = useReactiveVar(cartStoreVar)
  const cartMenus = useReactiveVar(cartMenusVar)

  function clearCart() {
    // TODO: 전체 삭제 시 되돌리기 버튼 포함한 토스트 띄우기
    setCartMenus([])
    setCartStore(null)
  }

  const totalMenusPrice = getTotalPrice(cartMenus)

  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    setDisabled(!cartStore || totalMenusPrice < cartStore.minimumDeliveryAmount)
  }, [cartStore, totalMenusPrice])

  function goToOrderPage() {
    setLoading(true)
    router.push('/order')
  }

  return (
    <PageHead title="디저트핏 - 장바구니" description={description}>
      <TopHeader>
        <FlexContainerBetween1>
          <FlexContainerAlignCenter>
            <ArrowBackIosRoundedIcon style={StyledArrowBackIosRoundedIcon} onClick={goBack} />
          </FlexContainerAlignCenter>
          <FlexContainerAlignCenter>장바구니</FlexContainerAlignCenter>
          <FlexContainerAlignCenter>
            <ClearAllButton onClick={clearCart}>전체삭제</ClearAllButton>
          </FlexContainerAlignCenter>
        </FlexContainerBetween1>
      </TopHeader>

      {cartStore && (
        <FlexContainerBetween2>
          <ClientSideLink href={`/stores/${cartStore.name}-${cartStore.id}`}>
            더 담으러 가기
          </ClientSideLink>
          <ClientSideLink href={`/stores/${cartStore.name}-${cartStore.id}`}>
            <StoreGrid>
              <StyledImg src={cartStore.imageUrl} alt="store profile" />
              <NoMarginH4>{cartStore.name}</NoMarginH4>
              <KeyboardArrowRightRoundedIcon style={StyledKeyboardArrowRightRoundedIcon} />
            </StoreGrid>
          </ClientSideLink>
        </FlexContainerBetween2>
      )}

      <GridContainerUl>
        {cartMenus.map((cartMenu) => (
          <CartMenuCard key={cartMenu.id} cartMenu={cartMenu} />
        ))}
      </GridContainerUl>

      <FixedButton disabled={disabled} loading={loading} onClick={goToOrderPage}>
        ({cartMenus.length}) 총 {formatPrice(totalMenusPrice + (cartStore?.deliveryCharge ?? 0))}{' '}
        주문하기
      </FixedButton>
      <Padding />
    </PageHead>
  )
}

export default CartPage
