import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded'
import grey from '@material-ui/core/colors/grey'
import { Button, Checkbox, Divider, Radio } from 'antd'
import { useRouter } from 'next/router'
import { Fragment, useState, CSSProperties } from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { setCartMenus, cartMenusVar, setCartStore, cartStoreVar } from 'src/apollo/cache'
import { handleApolloError } from 'src/apollo/error'
import PageHead from 'src/components/layouts/PageHead'
import { MenuOptionCategoryType, useMenuDetailQuery } from 'src/graphql/generated/types-and-hooks'
import { TABLET_MIN_WIDTH } from 'src/models/constants'
import TopHeader, { HorizontalBorder } from 'src/components/TopHeader'
import { FlexContainerAlignCenter, FlexContainerBetween } from 'src/styles/FlexContainer'
import useGoToPage from 'src/hooks/useGoToPage'
import ClientSideLink from 'src/components/atoms/ClientSideLink'
import useGoBack from 'src/hooks/useGoBack'
import { formatPrice } from 'src/utils/price'
import CountButton from 'src/components/atoms/CountButton'
import { GridContainerGap } from 'src/styles/GridContainer'
import { useForm } from 'react-hook-form'

const description = '메뉴 세부 정보를 확인해보세요'

const Padding = styled.div`
  padding: 0.5rem;
  width: 100%;
`
export const ReviewButton = styled(Button)`
  background-color: #ff9a87;
  border-radius: 7px;
  color: #ffffff;
  height: 45px;
  font-size: 1rem;
`

export const FixedButton = styled(ReviewButton)`
  position: fixed !important;
  bottom: 0;
  z-index: 1;

  width: 100%;
  max-width: ${TABLET_MIN_WIDTH};
  border-radius: 0;
`

const StyledArrowBackIosRoundedIcon = { fontSize: 20, color: grey[800], cursor: 'pointer' }

const StyledArrowBackIosRoundedIcon2: CSSProperties = {
  fontSize: 20,
  color: grey[800],
  visibility: 'hidden',
}

const FlexContainerBetween1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`

const GridContainerPadding = styled(GridContainerGap)`
  grid-template-rows: auto;

  padding: 0.5rem;
`

const NoMarginH2 = styled.h2`
  margin: 0;
`

const NoMarginH3 = styled.h3`
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
  font-weight: normal;
`

const GreyNoMarginH3 = styled.h3`
  margin: 0;
  color: #929393;
`

const RedText = styled.span`
  margin: 0.5rem;
  color: #a00000;
`

function StoreMenuPage() {
  const router = useRouter()
  const menuNameId = (router.query.nameId as string | undefined) ?? ''
  const menuId = menuNameId.substring(menuNameId.lastIndexOf('-') + 1)

  const { data, loading, error } = useMenuDetailQuery({
    onError: handleApolloError,
    variables: { id: menuId },
  })

  const menu = data?.menu
  const store = menu?.store

  const goToMenuReviewPage = useGoToPage(`/stores/${router.query.name}/reviews?menu=${menu?.name}`)
  const goBack = useGoBack()

  const [count, setCount] = useState(1)

  function addToCart() {
    // 아래 if문은 항상 true지만 menu와 store의 nullable을 없애기 위해 넣어줌
    if (menu && store) {
      const cartStore = cartStoreVar()

      if (cartStore && cartStore.id !== store.id) {
        // TODO: 다른 매장의 메뉴를 담으면 경고 모달 띄우기
        setCartMenus([])
      }

      setCartStore({
        id: store.id,
        name: store.name,
        imageUrl: store.imageUrls ? store.imageUrls[0] : '',
      })
      setCartMenus([
        ...cartMenusVar(),
        {
          id: menu.id,
          name: menu.name,
          price: menu.price,
          count: count,
        },
      ])
      toast(
        <div>
          <b>{menu.name}</b> 장바구니 추가 완료!
        </div>
      )
      router.back()
    }
  }

  const { control } = useForm()
  const [options, setOptions] = useState([])

  console.log(123)

  return (
    <PageHead title="디저트핏 - 메뉴 상세" description={description}>
      <TopHeader>
        <FlexContainerBetween1>
          <ArrowBackIosRoundedIcon onClick={goBack} style={StyledArrowBackIosRoundedIcon} />
          <h4>메뉴옵션</h4>
          <ArrowBackIosRoundedIcon style={StyledArrowBackIosRoundedIcon2} />
        </FlexContainerBetween1>
      </TopHeader>
      {loading || !menu || !store ? (
        <>
          <div>menu loading...</div>
          <FixedButton loading={true}>장바구니에 담기</FixedButton>
        </>
      ) : !error ? (
        <>
          <img src={menu.imageUrls ? menu.imageUrls[0] : ''} alt="menu" width="320px" />

          <HorizontalBorder />
          <GridContainerPadding>
            <ClientSideLink href={`/stores/${router.query.name}`}>
              <GreyNoMarginH3>{store.name}</GreyNoMarginH3>
            </ClientSideLink>
            <GreyLighterNoMarginH4>
              최소주문금액 : {store.minimumDeliveryAmount}
            </GreyLighterNoMarginH4>
            <NoMarginH2>{menu.name}</NoMarginH2>
            <GreyLighterNoMarginH3>
              {menu.content}
              100% 유기농 아몬드가루로 만든 쫀득하고 촉촉한 꼬끄, 비정제 설탕을 사용하여 달지
              않아요.
            </GreyLighterNoMarginH3>
            <Button disabled={loading} onClick={goToMenuReviewPage}>
              리뷰보기
            </Button>
          </GridContainerPadding>

          <GridContainerPadding>
            <Divider />
            <FlexContainerBetween>
              <NoMarginH3>가격</NoMarginH3>
              <NoMarginH2>{formatPrice(menu.price)}</NoMarginH2>
            </FlexContainerBetween>

            {menu.optionCategories && <Divider />}
            {menu.optionCategories?.map((optionCategory) => (
              <Fragment key={optionCategory.id}>
                <NoMarginH3>
                  {optionCategory.name}
                  {optionCategory.isNecessary && <RedText>*</RedText>}
                </NoMarginH3>
                {optionCategory.type === MenuOptionCategoryType.SingleSelection ? (
                  <Radio.Group
                    name={optionCategory.id}
                    onChange={(e) => console.log(e.target.value)}
                    style={{ fontSize: '1rem' }}
                  >
                    <GridContainerGap>
                      {optionCategory.menuOptions.map((menuOption) => (
                        <FlexContainerBetween key={menuOption.id}>
                          <FlexContainerAlignCenter>
                            <Radio
                              key={menuOption.id}
                              value={{ id: menuOption.id, price: menuOption.price }}
                            />
                            <GreyLighterNoMarginH4>{menuOption.name}</GreyLighterNoMarginH4>
                          </FlexContainerAlignCenter>
                          <GreyLighterNoMarginH4>
                            {`+ ${formatPrice(menuOption.price)}`}
                          </GreyLighterNoMarginH4>
                        </FlexContainerBetween>
                      ))}
                    </GridContainerGap>
                  </Radio.Group>
                ) : optionCategory.type === MenuOptionCategoryType.MultiSelection ? (
                  <Checkbox.Group
                    onChange={(values) => console.log(values)}
                    style={{ fontSize: '1rem' }}
                  >
                    <GridContainerGap>
                      {optionCategory.menuOptions.map((menuOption) => (
                        <FlexContainerBetween key={menuOption.id}>
                          <FlexContainerAlignCenter>
                            <Checkbox
                              key={menuOption.id}
                              value={{ id: menuOption.id, price: menuOption.price }}
                            />
                            &nbsp;
                            <GreyLighterNoMarginH4>{menuOption.name}</GreyLighterNoMarginH4>
                          </FlexContainerAlignCenter>
                          <GreyLighterNoMarginH4>
                            {`+ ${formatPrice(menuOption.price)}`}
                          </GreyLighterNoMarginH4>
                        </FlexContainerBetween>
                      ))}
                    </GridContainerGap>
                  </Checkbox.Group>
                ) : (
                  ''
                )}
              </Fragment>
            ))}

            <Divider />
            <FlexContainerBetween>
              <NoMarginH3>수량</NoMarginH3>
              <CountButton onClick={setCount} value={count} />
            </FlexContainerBetween>
            <Divider />
            <FlexContainerBetween>
              <NoMarginH2>총 가격</NoMarginH2>
              <NoMarginH2>{formatPrice(menu.price * count)}</NoMarginH2>
            </FlexContainerBetween>
            <Divider />
          </GridContainerPadding>

          <FixedButton onClick={addToCart}>
            {count}개 담기 ({formatPrice(menu.price * count)})
          </FixedButton>
        </>
      ) : (
        <div>메뉴 상세 정보 불러오기 오류 발생</div>
      )}
    </PageHead>
  )
}

export default StoreMenuPage
