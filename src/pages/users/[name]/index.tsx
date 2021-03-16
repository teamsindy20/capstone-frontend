import PageHead from 'src/components/layouts/PageHead'
import PageLayout from 'src/components/layouts/PageLayout'

const description = ''

function MyDisinPage() {
  return (
    <PageHead title="디신 - My 디신" description={description}>
      <PageLayout>
        <>마이페이지</>
      </PageLayout>
    </PageHead>
  )
}

export default MyDisinPage
