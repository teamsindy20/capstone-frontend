import { useRouter } from 'next/router'
import PageHead from 'src/components/layouts/PageHead'
import PageLayout from 'src/components/layouts/PageLayout'

const description = '매장에서 판매하는 메뉴를 볼 수 있어요.'

function StoreMenusPage() {
  const router = useRouter()
  const { name } = router.query

  return (
    <PageHead title="Deple - 매장 메뉴" description={`${name} ${description}`}>
      <PageLayout>
        <>{name}</>
      </PageLayout>
    </PageHead>
  )
}

export default StoreMenusPage
