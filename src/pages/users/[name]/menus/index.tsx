import { useContext, useState } from 'react'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { handleApolloError } from 'src/apollo/error'
import PageHead from 'src/components/layouts/PageHead'
import PageLayout from 'src/components/layouts/PageLayout'
import MenuCard, { MenuLoadingCard } from 'src/components/MenuCard'
import NotLogin from 'src/components/NotLogin'
import { useFavoriteMenusQuery } from 'src/graphql/generated/types-and-hooks'
import useBoolean from 'src/hooks/useBoolean'
import { GridContainerUl, PhotoOnlyButton } from 'src/pages'
import { GlobalContext } from 'src/pages/_app'
import { sleep } from 'src/utils/commons'

const description = '자기가 찜한 메뉴를 확인해보세요'

function UserFavoriteMenusPage() {
  const [hasMoreMenus, setHasMoreMenus] = useState(true)
  const [onlyImage, toggleOnlyImage] = useBoolean(false)
  const { user } = useContext(GlobalContext)

  const { data, loading, refetch } = useFavoriteMenusQuery({
    fetchPolicy: 'cache-and-network',
    onError: handleApolloError,
    skip: !user,
  })

  const favoriteMenus = data?.me.favoriteMenus

  async function fetchMoreMenus() {
    if (favoriteMenus?.length) {
      await sleep(5000) // fetchMore({ variables: { from, count } })
      setHasMoreMenus(false)
    } else {
      setHasMoreMenus(false)
    }
  }

  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage: hasMoreMenus,
    onLoadMore: fetchMoreMenus,
  })

  if (!user) {
    return (
      <PageHead title="디저트핏 - 찜 메뉴" description={description}>
        <PageLayout>
          <NotLogin />
        </PageLayout>
      </PageHead>
    )
  }

  return (
    <PageHead title="디저트핏 - 찜 메뉴" description={description}>
      <PageLayout>
        <PhotoOnlyButton onClick={toggleOnlyImage}>Photo Only</PhotoOnlyButton>

        <GridContainerUl onlyImage={onlyImage}>
          {favoriteMenus?.map((favoriteMenu) => (
            <MenuCard key={favoriteMenu.id} menu={favoriteMenu} onlyImage={onlyImage} />
          ))}
        </GridContainerUl>
        {(loading || hasMoreMenus) && (
          <div ref={sentryRef}>
            <MenuLoadingCard onlyImage={onlyImage} />
          </div>
        )}
      </PageLayout>
    </PageHead>
  )
}

export default UserFavoriteMenusPage
