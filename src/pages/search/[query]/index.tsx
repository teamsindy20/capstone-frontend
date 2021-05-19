import { useRouter } from 'next/router'
import PageHead from 'src/components/layouts/PageHead'

const description = ''

function SearchResultPage() {
  const { query } = useRouter()
  return (
    <PageHead title={`디저트핏 - `} description={description}>
      <div>검색 결과 페이지: {query.query}</div>
    </PageHead>
  )
}

export default SearchResultPage
