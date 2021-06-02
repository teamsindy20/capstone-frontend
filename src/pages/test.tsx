import PageHead from 'src/components/layouts/PageHead'
import PageLayout from 'src/components/layouts/PageLayout'
import NewCard from 'src/components/NewCard'

const description = ''

function Page() {
  return (
    <PageHead title="디저트핏 - 테스트" description={description}>
      <PageLayout>
        <NewCard />
      </PageLayout>
    </PageHead>
  )
}

export default Page
