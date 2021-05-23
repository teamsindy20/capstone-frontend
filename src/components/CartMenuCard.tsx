import { useReactiveVar } from '@apollo/client'
import { cartMenusVar, setCartMenus } from 'src/apollo/cache'
import styled from 'styled-components'
import { FlexContainerAlignCenter, FlexContainerBetween } from '../styles/FlexContainer'
import { GridContainerGap } from '../styles/GridContainer'
import ClientSideLink from './atoms/ClientSideLink'
import { Fragment } from 'react'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'


type Props = {
  menu: any
}
const GridContainerLi = styled.li`
  display: grid;
  cursor: pointer;
  background: #ffffff;
  box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.15), 0 0 0 rgba(16, 22, 26, 0), 0 0 0 rgba(16, 22, 26, 0);
  border-radius: min(20px, 2vw);
  overflow: hidden;
`

const StyledCloseRoundedIcon = styled(CloseRoundedIcon)`
  font-size: 10px;
  color: #929393;
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

function CartMenuCard({ menu }: Props) {
  const cartMenus = useReactiveVar(cartMenusVar)

  return (
    <div>
      <FlexContainerColumnBetween>
        <AbsolutePosition>
          <StyledCloseRoundedIcon
            onClick={() => setCartMenus(cartMenus.filter((cartMenu) => cartMenu.id !== menu.id))}
          />
        </AbsolutePosition>
        <GridContainerGap>
          <FlexContainerAlignCenter>
            <MenuName>{menu.name}</MenuName>
          </FlexContainerAlignCenter>
        </GridContainerGap>
      </FlexContainerColumnBetween>
    </div>
  )
}

export default CartMenuCard
