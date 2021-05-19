import PageHead from 'src/components/layouts/PageHead'
import useGoToPage from 'src/hooks/useGoToPage'
import TopHeader from 'src/components/TopHeader'
import { useReactiveVar } from '@apollo/client'
import { cartMenusVar, setCartMenus } from 'src/apollo/cache'
import CartMenuCard from 'src/components/CartMenuCard'

function CartPage() {
  const goToOrderPage = useGoToPage('/order')

  const cartMenus = useReactiveVar(cartMenusVar)

  return (
    <PageHead>
      <TopHeader>
        장바구니 <button onClick={() => setCartMenus([])}>전체삭제</button>
      </TopHeader>

      {cartMenus.map((cartMenu) => (
        <CartMenuCard key={cartMenu.id} menu={cartMenu} />
      ))}

      <button onClick={goToOrderPage}>주문하기</button>
    </PageHead>
  )
}

export default CartPage
