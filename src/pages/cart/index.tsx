import PageHead from 'src/components/layouts/PageHead'
import useGoToPage from 'src/hooks/useGoToPage'
import TopHeader from 'src/components/TopHeader'
import { useReactiveVar } from '@apollo/client'
import { cartMenusVar, setCartMenus } from 'src/apollo/cache'
import CartMenuCard from 'src/components/CartMenuCard'
import { FlexContainerBetween, FlexContainerAlignCenter } from 'src/styles/FlexContainer'
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded'
import grey from '@material-ui/core/colors/grey'
import { Button } from 'antd'
import Link from 'next/link'

const StyledArrowBackIosRoundedIcon = { fontSize: 20, color: grey[800] }

function CartPage() {
  const goToOrderPage = useGoToPage('/order')
  const goMainPage = useGoToPage('/')
  const cartMenus = useReactiveVar(cartMenusVar)

  return (
    <PageHead>
      <TopHeader>
        <FlexContainerBetween>
          <FlexContainerAlignCenter>
            <ArrowBackIosRoundedIcon style={StyledArrowBackIosRoundedIcon} onClick={goMainPage} />
          </FlexContainerAlignCenter>
          <FlexContainerAlignCenter>장바구니</FlexContainerAlignCenter>
          <FlexContainerAlignCenter>
            <Button size="small" onClick={() => setCartMenus([])}>
              전체삭제
            </Button>
          </FlexContainerAlignCenter>
        </FlexContainerBetween>
      </TopHeader>

      {cartMenus.map((cartMenu) => (
        <CartMenuCard key={cartMenu.id} menu={cartMenu} />
      ))}

      <Button onClick={goToOrderPage}>주문하기</Button>
    </PageHead>
  )
}

export default CartPage
