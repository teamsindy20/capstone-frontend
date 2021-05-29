import { Dispatch, MouseEvent, SetStateAction, useCallback } from 'react'
import styled from 'styled-components'

const Minus = styled.div`
  display: inline-block;
  width: 32px;
  height: 32px;
  background: linear-gradient(#000, #000), linear-gradient(#000, #000);
  background-position: center;
  background-size: 40% 2px;
  background-repeat: no-repeat;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  cursor: pointer;
`

const DisabledMinus = styled(Minus)`
  opacity: 0.15;
  border: 1px solid rgba(0, 0, 0, 0.8);
  cursor: default;
`

const Plus = styled(Minus)`
  background-size: 40% 2px, 2px 40%;
`

const CountNumber = styled.h3`
  display: inline-block;
  text-align: center;
  padding: 5px 0;
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  text-align: center;
`

type Props = {
  onClick: (getNewValue: (prevValue: number) => number) => void
  value: number
}

function CountButton({ onClick, value }: Props) {
  const decreaseCount = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation()
      onClick((prev) => prev - 1)
    },
    [onClick]
  )

  const increaseCount = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation()
      onClick((prev) => prev + 1)
    },
    [onClick]
  )

  return (
    <GridContainer>
      {value === 1 ? <DisabledMinus /> : <Minus onClick={decreaseCount} />}
      <CountNumber>{value}</CountNumber>
      <Plus onClick={increaseCount} />
    </GridContainer>
  )
}

export default CountButton
