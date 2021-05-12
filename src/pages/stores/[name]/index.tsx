import { useRouter } from 'next/router'
import { handleApolloError } from 'src/apollo/error'
import PageHead from 'src/components/layouts/PageHead'
import PageLayout from 'src/components/layouts/PageLayout'
import { usePickStoreMutation } from 'src/graphql/generated/types-and-hooks'

const description = '매장에서 판매하는 메뉴를 볼 수 있어요.'

function StoreMenusPage() {
  const router = useRouter()
  const storeNameWithId = router.query.name as string | undefined
  const storeName = storeNameWithId?.substring(0, storeNameWithId.lastIndexOf('-'))
  const storeId = storeNameWithId?.substring(storeNameWithId.lastIndexOf('-') + 1)
  console.log(storeName, storeId)

  const [pickStore, { loading }] = usePickStoreMutation({ onError: handleApolloError })

  return (
    <PageHead title="Deple - 매장 메뉴" description={`${storeName} ${description}`}>
      <PageLayout>
        <button
          disabled={loading || !storeId}
          onClick={() => {
            pickStore({ variables: { id: storeId ?? '' } })
          }}
        >
          매장 찜하기
        </button>
      </PageLayout>
    </PageHead>
  )
}

export default StoreMenusPage
