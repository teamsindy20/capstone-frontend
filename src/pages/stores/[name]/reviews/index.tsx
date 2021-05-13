import { useRouter } from 'next/router'
import PageHead from 'src/components/layouts/PageHead'


function StoreReviewsPage() {
  const router = useRouter()

  console.log(router.query.menu)

  return (
    <PageHead>
      <>리뷰 페이지 메뉴 검색: {router.query.menu}</>
    </PageHead>
  )
}

export default StoreReviewsPage
