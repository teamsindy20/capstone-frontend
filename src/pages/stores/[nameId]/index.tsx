import { FlexContainerBetween } from 'src/styles/FlexContainer'
import { Checkbox, Tabs, Divider } from 'antd'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { handleApolloError } from 'src/apollo/error'
import PageHead from 'src/components/layouts/PageHead'
import PageLayout from 'src/components/layouts/PageLayout'
import MenuCard, { MenuLoadingCard } from 'src/components/MenuCard'
import { useStoreMenusQuery, useStoreQuery } from 'src/graphql/generated/types-and-hooks'
import useBoolean from 'src/hooks/useBoolean'
import { GridContainerUl, useRefetchMenuFavorite } from 'src/pages'
import StoreInformation from 'src/components/StoreInformation'
import StoreTopHeader from 'src/components/StoreTopHeader'

export function useStoreNameIdUrl() {
  const router = useRouter()
  const storeNameId = (router.query.nameId ?? '') as string
  const storeName = storeNameId.substring(0, storeNameId.lastIndexOf('-'))
  const storeId = storeNameId.substring(storeNameId.lastIndexOf('-') + 1)

  function getStoreUrl(activeKey: string) {
    switch (activeKey) {
      case 'menus':
        return `/stores/${storeNameId}`
      case 'feed':
      case 'reviews':
        return `/stores/${storeNameId}/${activeKey}`
      default:
        return ''
    }
  }

  return { storeId, storeName, getStoreUrl }
}

const description = '매장에서 판매하는 메뉴를 볼 수 있어요.'

function StoreMenusPage() {
  const router = useRouter()
  const { storeId, storeName, getStoreUrl } = useStoreNameIdUrl()

  // store 정보는 cache-first 로 가져오기
  const storeQueryResult = useStoreQuery({ onError: handleApolloError, variables: { id: storeId } })

  const store = storeQueryResult.data?.store
  const isStoreLoading = storeQueryResult.loading

  const [onlyImage, toggleOnlyImage] = useBoolean(false)

  const { data, loading: isStoreMenusLoading } = useStoreMenusQuery({
    onError: handleApolloError,
    variables: { id: storeId },
  })

  const menus = data?.store?.menus

  const refetchMenuFavorite = useRefetchMenuFavorite()

  return (
    <PageHead title="디저트핏 - 매장 메뉴" description={`${storeName} ${description}`}>
      <PageLayout>
        <StoreTopHeader store={store} />

        <StoreInformation loading={isStoreLoading} store={store} />

        <Divider />
        <Tabs
          defaultActiveKey="menus"
          centered
          onTabClick={(activeKey) => router.push(getStoreUrl(activeKey))}
        >
          <Tabs.TabPane tab="메뉴" key="menus" />
          <Tabs.TabPane tab="소식" key="feed" />
          <Tabs.TabPane tab="리뷰" key="reviews" />
        </Tabs>
        <Divider orientation="right">
          <Checkbox checked={onlyImage} onChange={toggleOnlyImage}>
            사진만 보기
          </Checkbox>
        </Divider>

        <GridContainerUl onlyImage={onlyImage}>
          {menus?.map((menu) => (
            <MenuCard
              key={menu.id}
              afterPickingMenu={refetchMenuFavorite(menu.id)}
              hideStoreName
              menu={menu}
              onlyImage={onlyImage}
            />
          ))}
          {isStoreMenusLoading ? (
            <MenuLoadingCard onlyImage={onlyImage} />
          ) : (
            !menus?.length && <h4>매장에 메뉴가 없어요..?!</h4>
          )}
        </GridContainerUl>
      </PageLayout>
    </PageHead>
  )
}

export default StoreMenusPage
