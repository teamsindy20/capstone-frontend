import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { handleApolloError } from 'src/apollo/error'
import PageHead from 'src/components/layouts/PageHead'
import PageLayout from 'src/components/layouts/PageLayout'
import { usePickStoreMutation, useStoreLazyQuery } from 'src/graphql/generated/types-and-hooks'

const description = '매장에서 판매하는 메뉴를 볼 수 있어요.'

function StoreMenusPage() {
  const router = useRouter()
  const storeNameWithId = router.query.name as string | undefined
  const storeName = storeNameWithId?.substring(0, storeNameWithId.lastIndexOf('-'))
  const storeId = storeNameWithId?.substring(storeNameWithId.lastIndexOf('-') + 1)
  console.log(storeName, storeId)

  const [fetchStore, { loading: isStoreLoading }] = useStoreLazyQuery({
    fetchPolicy: 'network-only',
    onError: handleApolloError,
  })

  const [pickStore, { loading }] = usePickStoreMutation({
    onCompleted: (data) => {
      if (data.pickStore) {
        toast.success('매장을 찜했어요')
      } else {
        toast.success('매장 찜을 해제했어요')
      }
      fetchStore({ variables: { id: storeId ?? '' } }) // button disabled 로 항상 not null
    },
    onError: handleApolloError,
  })

  return (
    <PageHead title="디저트핏 - 매장 메뉴" description={`${storeName} ${description}`}>
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
