import { useContext } from 'react'
import { handleApolloError } from 'src/apollo/error'
import PageHead from 'src/components/layouts/PageHead'
import PageLayout from 'src/components/layouts/PageLayout'
import TopHeader from 'src/components/TopHeader'
import NotLogin from 'src/components/NotLogin'
import StoreCard from 'src/components/StoreCard'
import {
  useFavoriteStoresQuery,
  useRegularStoresQuery,
} from 'src/graphql/generated/types-and-hooks'
import styled from 'styled-components'
import { GlobalContext } from '../_app'
import { FlexContainerAlignCenter } from 'src/styles/FlexContainer'
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded'
import grey from '@material-ui/core/colors/grey'
import red from '@material-ui/core/colors/red'

const StyledFavoriteRoundedIcon = { fontSize: 24, color: grey[800] }

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

const description = '내가 찜한 매장 또는 단골 매장을 모아서 볼 수 있어요.'

function StoresPage() {
  const { user } = useContext(GlobalContext)

  const favoriteStoresQueryResult = useFavoriteStoresQuery({
    onError: handleApolloError,
    skip: !user,
  })
  const regularStoresQueryResult = useRegularStoresQuery({
    onError: handleApolloError,
    skip: !user,
  })

  const favoriteStores = favoriteStoresQueryResult.data?.me.favoriteStores
  const regularStores = regularStoresQueryResult.data?.me.regularStores

  if (!user) {
    return (
      <PageHead title="Deple - 찜·단골 매장" description={description}>
        <PageLayout>
          <NotLogin />
        </PageLayout>
      </PageHead>
    )
  }

  return (
    <PageHead title="Deple - 찜·단골 매장" description={description}>
      <PageLayout>
        <TopHeader>
          <FlexContainerCenterCenter>
            <FavoriteRoundedIcon style={StyledFavoriteRoundedIcon} />
            <NoMarginH3>찜·단골</NoMarginH3>
          </FlexContainerCenterCenter>
        </TopHeader>

        <h3>단골 매장</h3>
        <GridContainerBackground>
          {regularStores?.map((regularStore) => (
            <StoreCard key={regularStore.id} store={regularStore} />
          ))}
          {!regularStores?.length && <h4>단골 매장이 없어요</h4>}
        </GridContainerBackground>
        <h3>찜한 매장</h3>
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

export default StoresPage
