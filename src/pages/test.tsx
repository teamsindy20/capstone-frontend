import PageHead from 'src/components/layouts/PageHead'
import NavigationLayout from 'src/components/layouts/NavigationLayout'
import NewCard from 'src/components/NewCard'

const description = ''

function Page() {
  return (
    <PageHead title="디저트핏 - 테스트" description={description}>
      <NavigationLayout>
        <NewCard />
      </NavigationLayout>
    </PageHead>
  )
}

export default Page
