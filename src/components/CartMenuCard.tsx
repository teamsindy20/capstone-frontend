import { useReactiveVar } from '@apollo/client'
import { CartMenu, cartMenusVar, setCartMenus, setCartStore } from 'src/apollo/cache'
import styled from 'styled-components'
import { FlexContainerBetween } from '../styles/FlexContainer'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import { formatPrice } from 'src/utils/price'
import CountButton from './atoms/CountButton'
import { getSelectedOptionsPrice } from 'src/pages/stores/[nameId]/[name]'
import { DeepPartial } from 'react-hook-form'
import { MenuOption } from 'src/graphql/generated/types-and-hooks'

const GridContainerLi = styled.li`
  display: grid;
  gap: 1rem;
  padding: 1rem;
  overflow: hidden;
  position: relative;

  background: #ffffff;
  border-radius: min(20px, 2vw);
  box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.15), 0 0 0 rgba(16, 22, 26, 0), 0 0 0 rgba(16, 22, 26, 0);
`

const AbsolutePosition = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`

const StyledCloseRoundedIcon = {
  margin: '1rem',
  fontSize: '2rem',
  color: '#929393',
  cursor: 'pointer',
}

const MenuName = styled.h3``

const OptionA = styled.h4`
  font-size: 1em;
  color: #a8a8a8;
  word-break: keep-all;
`

const PriceA = styled.h2`
  font-size: 1.3em;
  color: #161f27;
  word-break: keep-all;
`

function formatSelectedMenuOption(menuOption: DeepPartial<MenuOption>) {
  return Array.isArray(menuOption)
    ? menuOption.map((multiSelectingMenuOption) => multiSelectingMenuOption.name).join(', ')
    : menuOption.name
}

export function getSelectedMenuOptionIdsFrom(optionCategories: CartMenu['optionCategories']) {
  return optionCategories
    ? Object.values(optionCategories)
        .map((menuOption) =>
          Array.isArray(menuOption)
            ? menuOption.map((multiSelectingMenuOption) => multiSelectingMenuOption.id)
            : menuOption.id
        )
        .flat()
    : null
}

type Func = (arg: number) => number

type Props = {
  cartMenu: CartMenu
}

function CartMenuCard({ cartMenu }: Props) {
  const cartMenus = useReactiveVar(cartMenusVar)

  const count = cartMenu.count
  const selectedOptionCategories = cartMenu?.optionCategories ?? {}
  const selectedOptionsPrice = getSelectedOptionsPrice(selectedOptionCategories)

  function removeCartMenu() {
    if (cartMenus.length === 1) setCartStore(null)
    setCartMenus(cartMenus.filter((newCartMenu) => newCartMenu.id !== cartMenu.id))
  }

  function updateCartMenuCount(getNewCartMenuCount: Func) {
    const newCartMenus = [...cartMenus]
    const newCartMenu = newCartMenus.find((newCartMenu) => newCartMenu.id === cartMenu.id)
    if (newCartMenu) newCartMenu.count = getNewCartMenuCount(count)
    setCartMenus(newCartMenus)
  }

  return (
    <GridContainerLi>
      <AbsolutePosition>
        <CloseRoundedIcon onClick={removeCartMenu} style={StyledCloseRoundedIcon} />
      </AbsolutePosition>

      <div>
        <MenuName>{cartMenu.name}</MenuName>
        <br />
        <OptionA>기본 : {formatPrice(cartMenu.price)}</OptionA>
        {Object.entries(selectedOptionCategories).map((optionCategory) =>
          Array.isArray(optionCategory[1]) && optionCategory[1].length === 0 ? null : (
            <OptionA key={optionCategory[0]}>
              {`${optionCategory[0]} : ${formatSelectedMenuOption(optionCategory[1])}`}
            </OptionA>
          )
        )}
        <br />
        <FlexContainerBetween>
          <PriceA>{formatPrice((cartMenu.price + selectedOptionsPrice) * count)}</PriceA>
          <CountButton onClick={updateCartMenuCount} value={count} />
        </FlexContainerBetween>
      </div>
    </GridContainerLi>
  )
}

export default CartMenuCard
