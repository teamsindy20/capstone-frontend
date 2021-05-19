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
  useMenuLazyQuery,
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
import { useRouter } from 'next/router'

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

  const [onlyImage, toggleOnlyImage] = useBoolean(false)
  const [hasMoreStores, setHasMoreStores] = useState(true)

  const { data, loading: isFavoriteStoresLoading } = useFavoriteStoresQuery({
    fetchPolicy: 'cache-and-network',
    onError: handleApolloError,
    skip: !user,
  })

  const favoriteStores = data?.me.favoriteStores

  async function fetchMoreStores() {
    if (favoriteStores?.length) {
      await sleep(5000) // fetchMore({ variables: { from, count } })
      setHasMoreStores(false)
    } else {
      setHasMoreStores(false)
    }
  }

  const [sentryRef] = useInfiniteScroll({
    loading: isFavoriteStoresLoading,
    hasNextPage: hasMoreStores,
    onLoadMore: fetchMoreStores,
  })

  const router = useRouter()

  function goToPage(activeKey: string) {
    switch (activeKey) {
      case 'favoriteMenus':
      case 'favoriteStores':
        return `/users/${router.query.name}/${activeKey}`
      default:
        return ''
    }
  }

  if (!user) {
    return (
      <PageHead title="디저트핏 - 찜 매장" description={description}>
        <PageLayout>{loading ? 'user loading...' : <NotLogin />}</PageLayout>
      </PageHead>
    )
  }

  return (
    <PageHead title="디저트핏 - 찜 매장" description={description}>
      <PageLayout>
        <Tabs
          defaultActiveKey="favoriteStores"
          centered
          onTabClick={(activeKey) => router.push(goToPage(activeKey))}
        >
          <Tabs.TabPane tab="메뉴" key="favoriteMenus" />
          <Tabs.TabPane tab="매장" key="favoriteStores" />
        </Tabs>

        <GridContainerBackground>
          {favoriteStores?.map((regularStore) => (
            <StoreCard key={regularStore.id} store={regularStore} />
          ))}
          {!favoriteStores?.length && <h4>찜한 매장이 없어요</h4>}
        </GridContainerBackground>
      </PageLayout>
    </PageHead>
  )
}

export default UserFavoritesPage
