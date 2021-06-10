import { useRouter } from 'next/router'
import { handleApolloError } from 'src/apollo/error'
import PageHead from 'src/components/layouts/PageHead'
import MenuCard from 'src/components/MenuCard'
import { useSearchMenusQuery } from 'src/graphql/generated/types-and-hooks'
import { GridContainerUl } from 'src/pages'

const description = '원하는 것을 검색해보세요'

function SearchResultPage() {
  const { query } = useRouter()

  const { data, loading } = useSearchMenusQuery({
    onError: handleApolloError,
    skip: !query.query,
    variables: { hashtag: query.query },
  })

  const menus = data?.searchMenus

  return (
    <PageHead title={`디저트핏 - 검색: ${query.query}`} description={description}>
      <div>검색 결과 페이지: {query.query}</div>
      <div>{loading && '로딩 중'}</div>
      <GridContainerUl onlyImage={false}>
        {menus?.map((menu) => (
          <MenuCard key={menu.id} menu={menu} onlyImage={false} />
        ))}
      </GridContainerUl>
    </PageHead>
  )
}

export default SearchResultPage
