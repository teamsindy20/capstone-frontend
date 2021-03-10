import PageHead from 'src/components/layouts/PageHead'
import PageLayout from 'src/components/layouts/PageLayout'
import StoreCard from 'src/components/StoreCard'
import { store, store2, store3, store4 } from 'src/models/mock-data'

const description = '내가 찜한 매장 또는 단골 매장을 모아서 볼 수 있어요.'

function StoresPage() {
  return (
    <PageHead title="캡스톤디자인 - Stores" description={description}>
      <PageLayout>
        <h1>찜·단골 매장</h1>
        <h2>단골 매장</h2>
        <StoreCard store={store} />
        <StoreCard store={store2} />
        <StoreCard store={store3} />
        <h2>찜한 매장</h2>
        <StoreCard store={store4} />
        <>
          <>단골 가게, 찜한 가게</>
          <>클릭 시 /stores/[name] 으로 이동</>
        </>
      </PageLayout>
    </PageHead>
  )
}

export default StoresPage
