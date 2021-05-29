import PageHead from 'src/components/layouts/PageHead'
import useGoToPage from 'src/hooks/useGoToPage'
import TopHeader from 'src/components/TopHeader'
import { useReactiveVar } from '@apollo/client'
import { cartMenusVar, cartStoreVar, setCartMenus, setCartStore } from 'src/apollo/cache'
import CartMenuCard from 'src/components/CartMenuCard'
import { FlexContainerBetween, FlexContainerAlignCenter } from 'src/styles/FlexContainer'
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded'
import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded'
import grey from '@material-ui/core/colors/grey'
import { Button } from 'antd'
import Link from 'next/link'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import { TABLET_MIN_WIDTH } from 'src/models/constants'
import useGoBack from 'src/hooks/useGoBack'
import ClientSideLink from 'src/components/atoms/ClientSideLink'

const StyledArrowBackIosRoundedIcon = { fontSize: 20, color: grey[800] }

const StyledKeyboardArrowRightRoundedIcon = { fontSize: 20, color: grey[800] }

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

  background-color: #f8f8f8;
`

const StyledImg = styled.img`
  width: 1.8rem;
  height: 1.8rem;
  object-fit: cover;
  border-radius: 50%;
`

const NoMarginH4 = styled.h4`
  margin: 0;
`

function CartPage() {
  const goToOrderPage = useGoToPage('/order')
  const goBack = useGoBack()

  const cartStore = useReactiveVar(cartStoreVar)
  const cartMenus = useReactiveVar(cartMenusVar)

  function clearCart() {
    setCartMenus([])
    setCartStore(null)
  }

  return (
    <PageHead>
      <TopHeader>
        <FlexContainerBetween1>
          <FlexContainerAlignCenter>
            <ArrowBackIosRoundedIcon style={StyledArrowBackIosRoundedIcon} onClick={goBack} />
          </FlexContainerAlignCenter>
          <FlexContainerAlignCenter>장바구니</FlexContainerAlignCenter>
          <FlexContainerAlignCenter>
            <Button size="small" onClick={clearCart}>
              전체삭제
            </Button>
          </FlexContainerAlignCenter>
        </FlexContainerBetween1>
      </TopHeader>

      {cartStore && (
        <FlexContainerBetween2>
          더담으러가기
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
          <CartMenuCard key={cartMenu.id} menu={cartMenu} />
        ))}
      </GridContainerUl>
      <FixedButton onClick={goToOrderPage}>주문하기</FixedButton>
    </PageHead>
  )
}

export default CartPage
