import PageHead from 'src/components/layouts/PageHead'
import PageLayout from 'src/components/layouts/PageLayout'

const description = '내가 지금까지 주문한 내역을 확인해보세요.'

function UserOrdersPage() {
  return (
    <PageHead title="캡스톤디자인 - Orders" description={description}>
      <PageLayout>
        <>
          <>사용자 주문 목록</>
          <>클릭 시 /users/[name]/orders/[id] 로 이동</>
        </>
      </PageLayout>
    </PageHead>
  )
}

export default UserOrdersPage
