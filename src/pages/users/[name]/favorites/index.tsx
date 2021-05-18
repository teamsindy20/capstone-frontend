import { useContext, useState } from 'react'
import { handleApolloError } from 'src/apollo/error'
import PageHead from 'src/components/layouts/PageHead'
import PageLayout from 'src/components/layouts/PageLayout'
import TopHeader from 'src/components/TopHeader'
import NotLogin from 'src/components/NotLogin'
import StoreCard from 'src/components/StoreCard'
import {
  useFavoriteMenusQuery,
  useFavoriteStoresQuery,
} from 'src/graphql/generated/types-and-hooks'
import styled from 'styled-components'
import { GlobalContext } from '../../../_app'
import { FlexContainerAlignCenter } from 'src/styles/FlexContainer'
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded'
import grey from '@material-ui/core/colors/grey'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import useBoolean from 'src/hooks/useBoolean'
import { sleep } from 'src/utils/commons'
import MenuCard, { MenuLoadingCard } from 'src/components/MenuCard'
import { PhotoOnlyButton, GridContainerUl } from 'src/pages'
import { Tabs } from 'antd'

const StyledFavoriteRoundedIcon = { fontSize: 22, color: grey[800] }

const GridContainerBackground = styled.div`
  display: grid;
  gap: 0.5rem;

  background: #eee;
  border: 1px solid #eee;
`

const FlexContainerCenterCenter = styled(FlexContainerAlignCenter)`
  justify-content: center;
  height: 100%;
`

const NoMarginH3 = styled.h3`
  margin: 0;
`

const description = '내가 찜한 매장 및 찜한 메뉴를 모아서 볼 수 있어요.'

function UserFavoritesPage() {
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

  const [hasMoreStores, setHasMoreStores] = useState(true)

  const favoriteStoresQueryResult = useFavoriteStoresQuery({
    fetchPolicy: 'cache-and-network',
    onError: handleApolloError,
    skip: !user,
  })

  const favoriteStores = favoriteStoresQueryResult.data?.me.favoriteStores

  async function fetchMoreStores() {
    if (favoriteStores?.length) {
      await sleep(5000) // fetchMore({ variables: { from, count } })
      setHasMoreMenus(false)
    } else {
      setHasMoreMenus(false)
    }
  }

  if (!user) {
    return (
      <PageHead title="디저트핏 - 찜" description={description}>
        <PageLayout>{loading ? 'user loading...' : <NotLogin />}</PageLayout>
      </PageHead>
    )
  }

  return (
    <PageHead title="디저트핏 - 찜" description={description}>
      <PageLayout>
        <Tabs defaultActiveKey="1" centered>
          <Tabs.TabPane tab="메뉴" key="1">
            <div>
              <PhotoOnlyButton onClick={toggleOnlyImage}>Photo Only</PhotoOnlyButton>
              <GridContainerUl onlyImage={onlyImage}>
                {favoriteMenus?.map((favoriteMenu) => (
                  <MenuCard key={favoriteMenu.id} menu={favoriteMenu} onlyImage={onlyImage} />
                ))}
              </GridContainerUl>
              {loading || hasMoreMenus ? (
                <div ref={sentryRef}>
                  <MenuLoadingCard onlyImage={onlyImage} />
                </div>
              ) : (
                !favoriteMenus?.length && <h4>찜한 메뉴가 없어요</h4>
              )}
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="매장" key="2">
            <GridContainerBackground>
              {favoriteStores?.map((regularStore) => (
                <StoreCard key={regularStore.id} store={regularStore} />
              ))}
              {!favoriteStores?.length && <h4>찜한 매장이 없어요</h4>}
            </GridContainerBackground>
          </Tabs.TabPane>
        </Tabs>
      </PageLayout>
    </PageHead>
  )
}

export default UserFavoritesPage
