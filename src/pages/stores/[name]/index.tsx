import { useRouter } from 'next/router'
import PageHead from 'src/components/layouts/PageHead'
import PageLayout from 'src/components/layouts/PageLayout'

const description = '매장에서 판매하는 메뉴를 볼 수 있어요.'

function StoreMenusPage() {
  const router = useRouter()
  const storeName = router.query.name ?? ''

  console.log(storeName)

  return (
    <PageHead title="Deple - 매장 메뉴" description={` ${description}`}>
      <PageLayout>
        <div></div>
      </PageLayout>
    </PageHead>
  )
}

export default StoreMenusPage
