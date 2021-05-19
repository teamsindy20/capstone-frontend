import { useReactiveVar } from '@apollo/client'
import { cartMenusVar, setCartMenus } from 'src/apollo/cache'

type Props = {
  menu: any
}

function CartMenuCard({ menu }: Props) {
  const cartMenus = useReactiveVar(cartMenusVar)

  return (
    <li>
      {menu.name}
      <button onClick={() => setCartMenus(cartMenus.filter((cartMenu) => cartMenu.id !== menu.id))}>
        장바구니 제거
      </button>
    </li>
  )
}

export default CartMenuCard
