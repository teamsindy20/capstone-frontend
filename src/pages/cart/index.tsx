import PageHead from 'src/components/layouts/PageHead'
import useGoToPage from 'src/hooks/useGoToPage'

function CartPage() {
  const goToOrderPage = useGoToPage('/order')

  return (
    <PageHead>
      메뉴 장바구니 페이지<button onClick={goToOrderPage}>결제하기</button>
    </PageHead>
  )
}

export default CartPage
