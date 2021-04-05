import PageHead from 'src/components/layouts/PageHead'
import PageLayout from 'src/components/layouts/PageLayout'

const description = '내 취향이 반영된 나만의 Deple을 만나보세요.'

function MyDisinPage() {
  return (
    <PageHead title="Deple - 내 Deple" description={description}>
      <PageLayout>
        <>마이페이지</>
      </PageLayout>
    </PageHead>
  )
}

export default MyDisinPage
