import { useContext } from 'react'
import { handleApolloError } from 'src/apollo/error'
import PageHead from 'src/components/layouts/PageHead'
import PageLayout from 'src/components/layouts/PageLayout'
import StoreCard from 'src/components/StoreCard'
import { useRegularStoresQuery } from 'src/graphql/generated/types-and-hooks'
import { GlobalContext } from 'src/pages/_app'
import styled from 'styled-components'

const GridContainerBackground = styled.div`
  display: grid;
  gap: 0.5rem;

  background: #eee;
  border: 1px solid #eee;
`

const description = '자기가 찜한 메뉴를 확인해보세요'

function UserRegularStoresPage() {
  const { user } = useContext(GlobalContext)

  const regularStoresQueryResult = useRegularStoresQuery({
    onError: handleApolloError,
    skip: !user,
  })

  const regularStores = regularStoresQueryResult.data?.me.regularStores

  return (
    <PageHead title="디저트핏 - 단골 매장" description={description}>
      <PageLayout>
        <GridContainerBackground>
          {regularStores?.map((regularStore) => (
            <StoreCard key={regularStore.id} store={regularStore} />
          ))}
          {!regularStores?.length && <h4>텅! 단골 매장이 없어요..</h4>}
        </GridContainerBackground>
      </PageLayout>
    </PageHead>
  )
}

export default UserRegularStoresPage
