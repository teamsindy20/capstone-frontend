import { Tabs } from 'antd'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { handleApolloError } from 'src/apollo/error'
import PageHead from 'src/components/layouts/PageHead'
import PageLayout from 'src/components/layouts/PageLayout'
import MenuCard, { MenuLoadingCard } from 'src/components/MenuCard'
import NotLogin from 'src/components/NotLogin'
import {
  useFavoriteMenusQuery,
  useFavoriteStoresQuery,
  useMenuLazyQuery,
} from 'src/graphql/generated/types-and-hooks'
import useBoolean from 'src/hooks/useBoolean'
import { PhotoOnlyButton, GridContainerUl } from 'src/pages'
import { GlobalContext } from 'src/pages/_app'
import { sleep } from 'src/utils/commons'

const description = ''

function UserFavoriteMenusPage() {
  const { user, loading } = useContext(GlobalContext)

  const [hasMoreMenus, setHasMoreMenus] = useState(true)
  const [onlyImage, toggleOnlyImage] = useBoolean(false)

  const favoriteMenusQueryResult = useFavoriteMenusQuery({
    fetchPolicy: 'cache-and-network',
    onError: handleApolloError,
    skip: !user,
  })

  const favoriteMenus = favoriteMenusQueryResult.data?.me.favoriteMenus

  async function fetchMoreMenus() {
    if (favoriteMenus?.length) {
      await sleep(5000) // fetchMore({ variables: { from, count } })
      setHasMoreMenus(false)
    } else {
      setHasMoreMenus(false)
    }
  }

  const [sentryRef] = useInfiniteScroll({
    loading: favoriteMenusQueryResult.loading,
    hasNextPage: hasMoreMenus,
    onLoadMore: fetchMoreMenus,
  })

  const router = useRouter()

  function goToPage(activeKey: string) {
    switch (activeKey) {
      case 'favorite-menus':
      case 'favorite-stores':
        return `/users/${router.query.name}/${activeKey}`
      default:
        return ''
    }
  }

  if (!user) {
    return (
      <PageHead title="디저트핏 - 찜 메뉴" description={description}>
        <PageLayout>{loading ? 'user loading...' : <NotLogin />}</PageLayout>
      </PageHead>
    )
  }

  return (
    <PageHead title="디저트핏 - 찜 메뉴" description={description}>
      <PageLayout>
        <Tabs
          defaultActiveKey="favorite-menus"
          centered
          onTabClick={(activeKey) => router.push(goToPage(activeKey))}
        >
          <Tabs.TabPane tab="메뉴" key="favorite-menus" />
          <Tabs.TabPane tab="매장" key="favorite-stores" />
        </Tabs>

        <PhotoOnlyButton onClick={toggleOnlyImage}>Photo Only</PhotoOnlyButton>
        <GridContainerUl onlyImage={onlyImage}>
          {favoriteMenus?.map((favoriteMenu) => (
            <MenuCard
              key={favoriteMenu.id}
              afterPickingMenu={() => favoriteMenusQueryResult.refetch()}
              menu={favoriteMenu as any}
              onlyImage={onlyImage}
            />
          ))}
        </GridContainerUl>
        {loading || hasMoreMenus ? (
          <div ref={sentryRef}>
            <MenuLoadingCard onlyImage={onlyImage} />
          </div>
        ) : (
          !favoriteMenus?.length && <h4>찜한 메뉴가 없어요</h4>
        )}
      </PageLayout>
    </PageHead>
  )
}

export default UserFavoriteMenusPage