import PageHead from 'src/components/layouts/PageHead'
import PageLayout from 'src/components/layouts/PageLayout'

const description = ''

function MySindyPage() {
  return (
    <PageHead title="캡스톤디자인 - My Sindy" description={description}>
      <PageLayout>
        <>마이페이지</>
      </PageLayout>
    </PageHead>
  )
}

export default MySindyPage
