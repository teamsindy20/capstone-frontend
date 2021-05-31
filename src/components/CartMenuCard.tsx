import { useReactiveVar } from '@apollo/client'
import { CartMenu, cartMenusVar, setCartMenus, setCartStore } from 'src/apollo/cache'
import styled from 'styled-components'
import { FlexContainerAlignCenter, FlexContainerBetween } from '../styles/FlexContainer'
import { GridContainerGap } from '../styles/GridContainer'
import ClientSideLink from './atoms/ClientSideLink'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import { formatPrice, formatNumber } from 'src/utils/price'
import CountButton from './atoms/CountButton'
import { SetStateAction, useEffect, useState } from 'react'
import { getSelectedOptionsPrice } from 'src/pages/stores/[name]/[nameId]'

const Li = styled.li`
  background: #ffffff;
  box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.15), 0 0 0 rgba(16, 22, 26, 0), 0 0 0 rgba(16, 22, 26, 0);
  border-radius: min(20px, 2vw);
  overflow: hidden;
  padding: 0.5rem;
`

const StyledCloseRoundedIcon = styled(CloseRoundedIcon)`
  font-size: 10px;
  color: #929393;
  cursor: pointer;
`

const AbsolutePosition = styled.div`
  position: absolute;
  top: 0.2rem;
  right: 0.1rem;
`

const FlexContainerColumnBetween = styled(FlexContainerBetween)`
  flex-flow: column nowrap;
  gap: 0.3rem;
  position: relative;
  padding: 0.5rem 0.5rem 0;
`
const MenuName = styled.h2`
  margin: 0;
  font-weight: normal;
`
const GridContainer = styled.div`
  display: grid;
  gap: 0.5rem;
`
const FlexContainerUl = styled.ul`
  display: flex;
  flex-flow: row wrap;
  list-style: none;
  padding-left: 0;
  margin-left: 1rem;
`

export const BoldA = styled.a`
  font-size: 1em;
  font-weight: bold;
  color: #ff8e77;
  word-break: keep-all;
  transition: color 0.5s cubic-bezier(0.4, 0, 0.2, 1);
`

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

function formatSelectedOption(option: any) {
  if (Array.isArray(option)) {
    return option.map((multiSelectingOption) => multiSelectingOption.name).join(', ')
  } else {
    return option.name
  }
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

  function updateCartMenuCount(getNewCount: Func) {
    const newCartMenus = [...cartMenus]
    const newCartMenu = newCartMenus.find((newCartMenu) => newCartMenu.id === cartMenu.id)
    if (newCartMenu) newCartMenu.count = getNewCount(count)
    setCartMenus(newCartMenus)
  }

  return (
    <Li>
      <FlexContainerColumnBetween>
        <AbsolutePosition>
          <StyledCloseRoundedIcon onClick={removeCartMenu} />
        </AbsolutePosition>
        <GridContainerGap>
          <div>
            <MenuName>{cartMenu.name}</MenuName>
            <br />
            <OptionA>기본 : {formatPrice(cartMenu.price)}</OptionA>
            {Object.entries(selectedOptionCategories).map((optionCategory) => (
              <OptionA key={optionCategory[0]}>
                {`${optionCategory[0]} : ${formatSelectedOption(optionCategory[1])}`}
              </OptionA>
            ))}
            <br />
            <FlexContainerBetween>
              <PriceA>총 {formatPrice((cartMenu.price + selectedOptionsPrice) * count)}</PriceA>
              <CountButton onClick={updateCartMenuCount} value={count} />
            </FlexContainerBetween>
          </div>
        </GridContainerGap>
      </FlexContainerColumnBetween>
    </Li>
  )
}

export default CartMenuCard
