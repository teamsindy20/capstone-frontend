import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded'
import grey from '@material-ui/core/colors/grey'
import { Button, Checkbox, Divider, Radio } from 'antd'
import { useRouter } from 'next/router'
import { Fragment, useState, CSSProperties } from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { setCartMenus, cartMenusVar, setCartStore, cartStoreVar, CartMenu } from 'src/apollo/cache'
import { handleApolloError } from 'src/apollo/error'
import PageHead from 'src/components/layouts/PageHead'
import { MenuOptionCategoryType, useMenuQuery } from 'src/graphql/generated/types-and-hooks'
import { TABLET_MIN_WIDTH } from 'src/models/constants'
import TopHeader, { HorizontalBorder } from 'src/components/TopHeader'
import { FlexContainerAlignCenter, FlexContainerBetween } from 'src/styles/FlexContainer'
import useGoToPage from 'src/hooks/useGoToPage'
import ClientSideLink from 'src/components/atoms/ClientSideLink'
import useGoBack from 'src/hooks/useGoBack'
import { formatPrice } from 'src/utils/price'
import CountButton from 'src/components/atoms/CountButton'
import { GridContainerGap } from 'src/styles/GridContainer'
import { Controller, useForm } from 'react-hook-form'
import { getSelectedMenuOptionIdsFrom } from 'src/components/CartMenuCard'
import { useStoreNameIdUrl } from '..'

const description = '메뉴 세부 정보를 확인해보세요'

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

export function getSelectedOptionsPrice(a: { [x: string]: any }): number {
  return Object.values(a)
    .filter((selectedOption) => selectedOption)
    .flat()
    .reduce((acc, current) => acc + current.price, 0)
}

function StoreMenuPage() {
  const router = useRouter()
  const { storeId } = useStoreNameIdUrl()
  const menuName = (router.query.name ?? '') as string

  const { data, loading } = useMenuQuery({
    onError: handleApolloError,
    variables: { storeId, name: menuName },
  })

  const menu = data?.menuByName
  const store = menu?.store

  const goToMenuReviewPage = useGoToPage(
    `/stores/${router.query.nameId}/reviews?menu=${menu?.name}`
  )
  const goBack = useGoBack()

  const [count, setCount] = useState(1)
  const [isAddingToCartButtonDisabled, setIsAddingToCartButtonDisabled] = useState(false)

  function addToCart(selectedOptionCategories: CartMenu['optionCategories']) {
    // 아래 if문은 항상 true지만 menu와 store의 nullable을 없애기 위해 넣어줌
    if (menu && store) {
      setIsAddingToCartButtonDisabled(true)

      const cartStore = cartStoreVar()
      const newCartStore = {
        id: store.id,
        name: store.name,
        imageUrl: store.imageUrls ? store.imageUrls[0] : '',
      }

      if (cartStore && cartStore.id !== newCartStore.id) {
        // TODO: 다른 매장의 메뉴를 담으면 경고 모달 띄우기
        setCartMenus([])
      }

      const selectedCartMenu = {
        id: `${menu.id}-${getSelectedMenuOptionIdsFrom(selectedOptionCategories)}`,
        name: menu.name,
        price: menu.price,
        count: count,
        optionCategories: selectedOptionCategories,
      }
      const newCartMenus = [...cartMenusVar()]
      const existingCartMenu = newCartMenus.find(
        (newCartMenu) => newCartMenu.id === selectedCartMenu.id
      )

      if (existingCartMenu) {
        existingCartMenu.count += count
      } else {
        newCartMenus.push(selectedCartMenu)
      }

      setCartStore(newCartStore)
      setCartMenus(newCartMenus)

      toast(
        <div>
          <b>{menu.name}</b> 장바구니 추가 완료!
        </div>
      )
      router.back()
    }
  }

  const { control, handleSubmit, watch } = useForm()

  const selectedOptionsPrice = getSelectedOptionsPrice(watch())

  const totalAmount = formatPrice(((menu?.price ?? 0) + selectedOptionsPrice) * count)

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
      ) : (
        <>
          <img src={menu.imageUrls ? menu.imageUrls[0] : ''} alt="menu" width="320px" />

          <HorizontalBorder />
          <GridContainerPadding>
            <ClientSideLink href={`/stores/${router.query.nameId}`}>
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
                  <Controller
                    control={control}
                    defaultValue={''}
                    name={`${optionCategory.name}`}
                    render={({ field }) => (
                      <Radio.Group style={{ fontSize: '1rem' }} {...field}>
                        <GridContainerGap>
                          {optionCategory.menuOptions.map((menuOption) => (
                            <FlexContainerBetween key={menuOption.id}>
                              <FlexContainerAlignCenter>
                                <Radio key={menuOption.id} value={menuOption} />
                                <GreyLighterNoMarginH4>{menuOption.name}</GreyLighterNoMarginH4>
                              </FlexContainerAlignCenter>
                              <GreyLighterNoMarginH4>
                                {`+ ${formatPrice(menuOption.price)}`}
                              </GreyLighterNoMarginH4>
                            </FlexContainerBetween>
                          ))}
                        </GridContainerGap>
                      </Radio.Group>
                    )}
                    rules={{
                      required: optionCategory.isNecessary && `${optionCategory.name}`,
                    }}
                  />
                ) : optionCategory.type === MenuOptionCategoryType.MultiSelection ? (
                  <Controller
                    control={control}
                    defaultValue={[]}
                    name={`${optionCategory.name}`}
                    render={({ field }) => (
                      <Checkbox.Group style={{ fontSize: '1rem' }} {...field}>
                        <GridContainerGap>
                          {optionCategory.menuOptions.map((menuOption) => (
                            <FlexContainerBetween key={menuOption.id}>
                              <FlexContainerAlignCenter>
                                <Checkbox key={menuOption.id} value={menuOption} />
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
                    )}
                  />
                ) : (
                  '나머지 메뉴 옵션 종류 (서술형, 양자택일형)'
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
              <NoMarginH2>{totalAmount}</NoMarginH2>
            </FlexContainerBetween>

            <Divider />
          </GridContainerPadding>

          <FixedButton
            loading={isAddingToCartButtonDisabled}
            onClick={handleSubmit(addToCart, (errors) =>
              toast.warning(
                <>
                  <b>{Object.values(errors).map((error) => error.message)}</b>을 선택해주세요
                </>
              )
            )}
          >
            {count}개 담기 ({totalAmount})
          </FixedButton>
        </>
      )}
    </PageHead>
  )
}

export default StoreMenuPage
