import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { setCartMenus, cartMenusVar } from 'src/apollo/cache'
import { handleApolloError } from 'src/apollo/error'
import PageHead from 'src/components/layouts/PageHead'
import { useMenuDetailQuery } from 'src/graphql/generated/types-and-hooks'

const description = '메뉴 세부 정보를 확인해보세요'

function StoreMenuPage() {
  const router = useRouter()
  const menuNameId = (router.query.nameId as string | undefined) ?? ''
  const menuName = menuNameId.substring(0, menuNameId.lastIndexOf('-'))
  const menuId = menuNameId.substring(menuNameId.lastIndexOf('-') + 1)

  const { data, loading, error } = useMenuDetailQuery({
    onError: handleApolloError,
    variables: { id: menuId },
  })

  const menu = data?.menu

  return (
    <PageHead title="디저트핏 - 메뉴 상세" description={description}>
      {}
      <button
        onClick={() => {
          setCartMenus([...cartMenusVar(), { id: menuId, name: menuName, price: menu?.price }])
          toast.success(`${menuName} 장바구니 추가 완료!`)
          router.back()
        }}
      >
        장바구니 추가
      </button>
    </PageHead>
  )
}

export default StoreMenuPage
