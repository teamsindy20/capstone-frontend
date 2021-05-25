import PageHead from 'src/components/layouts/PageHead'
import useGoToPage from 'src/hooks/useGoToPage'
import TopHeader from 'src/components/TopHeader'
import { useReactiveVar } from '@apollo/client'
import { cartMenusVar, setCartMenus } from 'src/apollo/cache'
import CartMenuCard from 'src/components/CartMenuCard'
import { FlexContainerBetween, FlexContainerAlignCenter } from 'src/styles/FlexContainer'
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded'
import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded'
import grey from '@material-ui/core/colors/grey'
import { Button } from 'antd'
import Link from 'next/link'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import { TABLET_MIN_WIDTH } from 'src/models/constants'
import useGoBack from 'src/hooks/useGoBack'

const StyledArrowBackIosRoundedIcon = { fontSize: 20, color: grey[800] }

const StyledKeyboardArrowRightRoundedIcon = { fontSize: 20, color: grey[800] }

export const ReviewButton = styled(Button)`
  background-color: #ff9a87;
  border-radius: 7px;
  color: #ffffff;
  height: 45px;
  font-size: 1rem;
`

export const FixedButton = styled(ReviewButton)`
  position: fixed;
  border-radius: 0;
  left: 50%;
  bottom: 0;
  z-index: 1;
  transform: translateX(-50%);
  width: 100%;
  max-width: ${TABLET_MIN_WIDTH};
`

const FlexContainerBetween1 = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
`
const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.8rem;
  height: 40px;
`

const StoreGrid = styled.div`
  display: grid;
  grid-template-columns: 30% 65% 5%;
`
const HorizontalBorder = styled.div`
  border: 2px solid #ddd;
`
const StyledImg = styled.img`
  width: 1.8rem;
  height: 1.8rem;
  object-fit: cover;
  border-radius: 50%;
`

const NoMarginH5 = styled.h5`
  margin: 0;
`

function CartPage() {
  const goToOrderPage = useGoToPage('/order')
  const goToStorePage = useGoToPage('/stores/${}')
  const goBack = useGoBack()

  const cartMenus = useReactiveVar(cartMenusVar)

  return (
    <PageHead>
      <TopHeader>
        <FlexContainerBetween1>
          <FlexContainerAlignCenter>
            <ArrowBackIosRoundedIcon style={StyledArrowBackIosRoundedIcon} onClick={goBack} />
          </FlexContainerAlignCenter>
          <FlexContainerAlignCenter>장바구니</FlexContainerAlignCenter>
          <FlexContainerAlignCenter>
            <Button size="small" onClick={() => setCartMenus([])}>
              전체삭제
            </Button>
          </FlexContainerAlignCenter>
        </FlexContainerBetween1>
      </TopHeader>
      <TopContainer>
        <Button size="small" onClick={goBack}>
          더담으러가기
        </Button>
        <StoreGrid>
          <StyledImg
            src="https://gramho.com/hosted-by-instagram/url=https%3A%7C%7C%7C%7Cinstagram.fiev22-2.fna.fbcdn.net%7C%7Cv%7C%7Ct51.2885-19%7C%7Cs150x150%7C%7C77348518_588370215301127_6004062485341011968_n.jpg%3Ftp%3D1%26_nc_ht%3Dinstagram.fiev22-2.fna.fbcdn.net%26_nc_ohc%3DXFdw14wQ6jYAX-kA6T8%26edm%3DABfd0MgBAAAA%26ccb%3D7-4%26oh%3D67c3fbe090ae332a4beac53e019ad4e8%26oe%3D60B07838%26_nc_sid%3D7bff83"
            alt="store profile"
          />
          <NoMarginH5>핏베이커리</NoMarginH5>
          <KeyboardArrowRightRoundedIcon style={StyledKeyboardArrowRightRoundedIcon} />
        </StoreGrid>
      </TopContainer>
      {cartMenus.map((cartMenu) => (
        <CartMenuCard key={cartMenu.id} menu={cartMenu} />
      ))}
      <FixedButton onClick={goToOrderPage}>주문하기</FixedButton>
    </PageHead>
  )
}

export default CartPage
