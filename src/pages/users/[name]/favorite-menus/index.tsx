import { Checkbox, Divider, Tabs } from 'antd'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { handleApolloError } from 'src/apollo/error'
import PageHead from 'src/components/layouts/PageHead'
import PageLayout from 'src/components/layouts/PageLayout'
import MenuCard, { MenuLoadingCard } from 'src/components/MenuCard'
import NotLoginModal from 'src/components/NotLoginModal'
import TopHeader from 'src/components/TopHeader'
import {
  useFavoriteMenusQuery,
  useFavoriteMenusFavoriteLazyQuery,
} from 'src/graphql/generated/types-and-hooks'
import useBoolean from 'src/hooks/useBoolean'
import { GridContainerUl } from 'src/pages'
import { GlobalContext } from 'src/pages/_app'
import { sleep } from 'src/utils/commons'

const description = '내가 찜한 메뉴를 모아서 볼 수 있어요.'

function UserFavoriteMenusPage() {
  const { user, loading } = useContext(GlobalContext)

  const [hasMoreMenus, setHasMoreMenus] = useState(true)
  const [onlyImage, toggleOnlyImage] = useBoolean(false)

  const { data, fetchMore, networkStatus } = useFavoriteMenusQuery({
    fetchPolicy: 'cache-and-network',
    onError: handleApolloError,
    skip: !user,
  })

  const favoriteMenus = data?.me.favoriteMenus
  const isFavoriteMenusLoading = networkStatus < 7

  const [refetchfavoriteMenusFavorite] = useFavoriteMenusFavoriteLazyQuery({
    fetchPolicy: 'network-only',
    onError: handleApolloError,
  })

  async function fetchMoreMenus() {
    if (favoriteMenus?.length) {
      await sleep(5000) // fetchMore({ variables: { from, count } })
      setHasMoreMenus(false)
    } else {
      setHasMoreMenus(false)
    }
  }

  const [sentryRef] = useInfiniteScroll({
    loading: isFavoriteMenusLoading,
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

  return (
    <PageHead title="디저트핏 - 찜 메뉴" description={description}>
      <PageLayout>
        <TopHeader>
          <Tabs
            defaultActiveKey="favorite-menus"
            centered
            onTabClick={(activeKey) => router.push(goToPage(activeKey))}
          >
            <Tabs.TabPane tab="메뉴" key="favorite-menus" />
            <Tabs.TabPane tab="매장" key="favorite-stores" />
          </Tabs>
        </TopHeader>

        {loading ? (
          'user loading...'
        ) : !user ? (
          <NotLoginModal />
        ) : (
          <>
            <Divider orientation="right">
              <Checkbox checked={onlyImage} onChange={toggleOnlyImage}>
                사진만 보기
              </Checkbox>
            </Divider>

            <GridContainerUl onlyImage={onlyImage}>
              {favoriteMenus?.map((favoriteMenu) => (
                <MenuCard
                  key={favoriteMenu.id}
                  afterPickingMenu={refetchfavoriteMenusFavorite}
                  menu={favoriteMenu}
                  onlyImage={onlyImage}
                />
              ))}
              {isFavoriteMenusLoading || hasMoreMenus ? (
                <div ref={sentryRef}>
                  <MenuLoadingCard onlyImage={onlyImage} />
                </div>
              ) : (
                !favoriteMenus?.length && <h4>찜한 메뉴가 없어요</h4>
              )}
            </GridContainerUl>
          </>
        )}
      </PageLayout>
    </PageHead>
  )
}

export default UserFavoriteMenusPage
