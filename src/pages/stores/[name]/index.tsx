import { useRouter } from 'next/router'
import PageHead from 'src/components/layouts/PageHead'
import PageLayout from 'src/components/layouts/PageLayout'

const description = '내가 찜한 매장 또는 단골 매장을 모아서 볼 수 있어요.'

function StoreMenuPage() {
  const router = useRouter()
  const { name } = router.query

  return (
    <PageHead title="디플 - 매장 메뉴" description={description}>
      <PageLayout>
        <>{name}</>
      </PageLayout>
    </PageHead>
  )
}

export default StoreMenuPage
