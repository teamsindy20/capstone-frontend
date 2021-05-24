import PageHead from 'src/components/layouts/PageHead'
import TopHeader from 'src/components/TopHeader'
import { FlexContainerBetween, FlexContainerAlignCenter } from 'src/styles/FlexContainer'
import styled from 'styled-components'
import { Button } from 'antd'
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded'
import grey from '@material-ui/core/colors/grey'
import useGoToPage from 'src/hooks/useGoToPage'

const StyledArrowBackIosRoundedIcon = { fontSize: 20, color: grey[800] }

const FlexContainerBetween1 = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
`

function OrderPage() {
  const goToCartPage = useGoToPage('/cart')

  return (
    <PageHead>
      <TopHeader>
        <FlexContainerBetween1>
          <FlexContainerAlignCenter>
            <ArrowBackIosRoundedIcon style={StyledArrowBackIosRoundedIcon} onClick={goToCartPage} />
          </FlexContainerAlignCenter>
          <FlexContainerAlignCenter>주문하기</FlexContainerAlignCenter>
          <FlexContainerAlignCenter></FlexContainerAlignCenter>
        </FlexContainerBetween1>
      </TopHeader>
      <Button>결제하기</Button>
    </PageHead>
  )
}

export default OrderPage
