import styled from 'styled-components'
import Logo from './atoms/Logo'

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 5rem 1fr;
  align-items: center;
`

const Line = styled.div`
  margin: 2rem;
  border: 1px solid black;
`

const FlexContainerCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 3rem;
  text-align: center;
`

function Footer() {
  return (
    <footer>
      <GridContainer>
        <Line />
        <Logo />
        <Line />
      </GridContainer>
      <FlexContainerCenter>
        1.Price includes a $30 ATT, T-Mobile, Sprint, or Verizon discount. Requires activation with
        carrier. Monthly pricing: Available to qualified customers and requires 0% APR, 24-month
        installment loan with Citizens One or Apple Card Monthly Installments and iPhone activation
        with ATT, Sprint, T-Mobile, or Verizon for purchases in an Apple Store. Taxes and shipping
        not included. Additional Apple Card Monthly Installments and iPhone Payments terms apply.
      </FlexContainerCenter>
    </footer>
  )
}

export default Footer
