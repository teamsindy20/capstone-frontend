import PageHead from 'src/components/layouts/PageHead'
import useGoToPage from 'src/hooks/useGoToPage'
import TopHeader from 'src/components/TopHeader'
import { useReactiveVar } from '@apollo/client'
import { cartMenusVar } from 'src/apollo/cache'
import CartMenuCard from 'src/components/CartMenuCard'

function CartPage() {
  const goToOrderPage = useGoToPage('/order')

  const cartMenus = useReactiveVar(cartMenusVar)

  return (
    <PageHead>
      <TopHeader>장바구니</TopHeader>

      {cartMenus.map((cartMenu) => (
        <CartMenuCard key={cartMenu.id} menu={cartMenu} />
      ))}

      <button onClick={goToOrderPage}>결제하기</button>
    </PageHead>
  )
}

export default CartPage
