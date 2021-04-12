import PageHead from 'src/components/layouts/PageHead'
import PageLayout from 'src/components/layouts/PageLayout'
import StoreCard from 'src/components/StoreCard'
import { store, store2, store3, store4, store5, store6, store7 } from 'src/models/mock-data'
import styled from 'styled-components'

const GridContainerBackground = styled.div`
  display: grid;
  gap: 0.5rem;

  background: #eee;
  border: 1px solid #eee;
`

const description = '내가 찜한 매장 또는 단골 매장을 모아서 볼 수 있어요.'

function StoresPage() {
  return (
    <PageHead title="Deple - 찜·단골 매장" description={description}>
      <PageLayout>
        <h2>찜·단골 매장</h2>
        <h3>단골 매장</h3>
        <GridContainerBackground>
          <StoreCard store={store} />
          <StoreCard store={store2} />
          <StoreCard store={store3} />
        </GridContainerBackground>
        <h3>찜한 매장</h3>
        <GridContainerBackground>
          <StoreCard store={store4} />
          <StoreCard store={store5} />
          <StoreCard store={store6} />
          <StoreCard store={store7} />
        </GridContainerBackground>
      </PageLayout>
    </PageHead>
  )
}

export default StoresPage
