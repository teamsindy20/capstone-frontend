import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { setCartMenus, cartMenusVar } from 'src/apollo/cache'
import { handleApolloError } from 'src/apollo/error'
import PageHead from 'src/components/layouts/PageHead'
import { useMenuDetailQuery } from 'src/graphql/generated/types-and-hooks'
import { HEADER_HEIGHT, TABLET_MIN_WIDTH } from 'src/models/constants'
import styled from 'styled-components'
import { Button, Divider } from 'antd'
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded'
import grey from '@material-ui/core/colors/grey'
import TopHeader, { HorizontalBorder } from 'src/components/TopHeader'
import { FlexContainerBetween, FlexContainerAlignCenter } from 'src/styles/FlexContainer'
import { CountNumber, Minus, Plus, MinusNoClick, Quantity } from 'src/components/CartMenuCard'
import useGoToPage from 'src/hooks/useGoToPage'
import ClientSideLink from 'src/components/atoms/ClientSideLink'
import useGoBack from 'src/hooks/useGoBack'

const description = '메뉴 세부 정보를 확인해보세요'

const MarginContainer = styled.div`
  margin: 0.5rem;
  weight: 100%;
`
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
const StyledArrowBackIosRoundedIcon = { fontSize: 20, color: grey[800] }

const StyledArrowBackIosRoundedIcon2 = { fontSize: 20, color: grey[800], visible: 'hidden' }

const FlexContainerBetween1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`
const GridOption = styled.div`
  display: grid;
  grid-template-rows: auto;
  row-gap: 1em;
`

const NoMarginH2 = styled.h2`
  margin: 0;
`
const GreyLighterNoMarginH3 = styled.h3`
  margin: 0;
  color: #929393;
  font-weight: lighter;
`
const GreyLighterNoMarginH4 = styled.h4`
  margin: 0;
  color: #929393;
  font-weight: lighter;
`
const GreyNoMarginH3 = styled.h3`
  margin: 0;
  color: #929393;
`

function StoreMenuPage() {
  const router = useRouter()
  const goMainPage = useGoToPage('/')
  const menuNameId = (router.query.nameId as string | undefined) ?? ''
  const menuName = menuNameId.substring(0, menuNameId.lastIndexOf('-'))
  const menuId = menuNameId.substring(menuNameId.lastIndexOf('-') + 1)

  const { data, loading, error } = useMenuDetailQuery({
    onError: handleApolloError,
    variables: { id: menuId },
  })

  const menu = data?.menu

  const goToMenuReviewPage = useGoToPage(`/stores/${router.query.name}/reviews?menu=${menu?.name}`)
  const goBack = useGoBack()

  return (
    <PageHead title="디저트핏 - 메뉴 상세" description={description}>
      <TopHeader>
        <FlexContainerBetween1>
          <ArrowBackIosRoundedIcon onClick={goBack} style={StyledArrowBackIosRoundedIcon} />
          <h4>메뉴옵션</h4>
          <ArrowBackIosRoundedIcon style={StyledArrowBackIosRoundedIcon2} />
        </FlexContainerBetween1>
      </TopHeader>
      <img src={menu?.imageUrls ? menu.imageUrls[0] : ''} alt="menu" width="320px" />
      <HorizontalBorder />
      <MarginContainer>
        <GridOption>
          <ClientSideLink href={`/stores/${router.query.name}`}>
            <GreyNoMarginH3>{menu?.store.name}</GreyNoMarginH3>
          </ClientSideLink>
          <NoMarginH2>{menuName}</NoMarginH2>
          <GreyLighterNoMarginH3>
            100%유기농 아몬드가루로 만든 쫀득하고 촉촉한 꼬끄, 비정제 설탕을 사용하여 달지 않아요.
          </GreyLighterNoMarginH3>
          <Button disabled={loading} onClick={goToMenuReviewPage}>
            리뷰보기
          </Button>
        </GridOption>
      </MarginContainer>
      <MarginContainer>
        <GridOption>
          <Divider />
          <FlexContainerBetween>
            <NoMarginH2>가격</NoMarginH2>
            <NoMarginH2>3,000원</NoMarginH2>
          </FlexContainerBetween>
          <Divider />
          <GreyLighterNoMarginH4>
            *최소주문금액 : {menu?.store.minimumDeliveryAmount}
          </GreyLighterNoMarginH4>
          <FlexContainerBetween>
            <NoMarginH2>옵션</NoMarginH2>
            <NoMarginH2></NoMarginH2>
          </FlexContainerBetween>
          <GreyLighterNoMarginH4>기본 : 생크림 보통</GreyLighterNoMarginH4>
          <Divider />
          <FlexContainerBetween>
            <NoMarginH2>수량</NoMarginH2>
            <Quantity>
              <MinusNoClick />
              <CountNumber>1</CountNumber>
              <Plus />
            </Quantity>
          </FlexContainerBetween>
          <Divider />
          <FlexContainerBetween>
            <NoMarginH2>총가격</NoMarginH2>
            <NoMarginH2>3,000원</NoMarginH2>
          </FlexContainerBetween>
          <Divider />
        </GridOption>
      </MarginContainer>
      <FixedButton
        onClick={() => {
          setCartMenus([...cartMenusVar(), { id: menuId, name: menuName, price: menu?.price }])
          toast.success(`${menuName} 장바구니 추가 완료!`)
          router.back()
        }}
      >
        1개 담기 (3,000원)
      </FixedButton>
    </PageHead>
  )
}

export default StoreMenuPage
