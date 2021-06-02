import { FlexContainerBetween } from 'src/styles/FlexContainer'
import { Tabs, Divider } from 'antd'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { handleApolloError } from 'src/apollo/error'
import PageHead from 'src/components/layouts/PageHead'
import PageLayout from 'src/components/layouts/PageLayout'
import MenuCard from 'src/components/MenuCard'
import {
  useMenuLazyQuery,
  useStoreLazyQuery,
  useStoreMenusQuery,
} from 'src/graphql/generated/types-and-hooks'
import useBoolean from 'src/hooks/useBoolean'
import { GridContainerUl } from 'src/pages'
import grey from '@material-ui/core/colors/grey'
import { store } from 'src/models/mock-data'
import useGoBack from 'src/hooks/useGoBack'
import StoreInformation from 'src/components/StoreInformation'
import React from 'react'
import StoreTopHeader from 'src/components/StoreTopHeader'
import useStoreNameIdUrl from 'src/hooks/useStoreNameIdUrl'

const description = '매장에서 판매하는 메뉴를 볼 수 있어요.'

const StyledArrowBackIosRoundedIcon = { fontSize: 20, color: grey[800] }

const FlexContainerBetweenCenter = styled(FlexContainerBetween)`
  align-items: center;
  height: 100%;
`

function StoreMenusPage() {
  const router = useRouter()
  const { storeId, storeName, getStoreUrl } = useStoreNameIdUrl()

  const [onlyImage, toggleOnlyImage] = useBoolean(false)

  const { data, loading: isStoreMenusLoading } = useStoreMenusQuery({
    onError: handleApolloError,
    variables: { id: storeId },
  })

  const menus = data?.store?.menus

  // store 정보는 cache-first 로 가져오기

  return (
    <PageHead title="디저트핏 - 매장 메뉴" description={`${storeName} ${description}`}>
      <PageLayout>
        <StoreTopHeader store={store} />

        <StoreInformation store={store} />

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
        <GridContainerUl onlyImage={onlyImage}>
          {menus?.map((menu) => (
            <MenuCard key={menu.id} menu={menu} onlyImage={onlyImage} />
          ))}
        </GridContainerUl>
      </PageLayout>
    </PageHead>
  )
}

export default StoreMenusPage
function useStoreUrl(): { storeId: any; storeName: any } {
  throw new Error('Function not implemented.')
}
