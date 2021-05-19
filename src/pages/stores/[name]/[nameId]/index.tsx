import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { setCartMenus, cartMenusVar } from 'src/apollo/cache'
import PageHead from 'src/components/layouts/PageHead'

const description = '메뉴 세부 정보를 확인해보세요'

function StoreMenuPage() {
  const router = useRouter()
  const storeNameId = router.query.nameId as string | undefined
  const menuName = storeNameId?.substring(0, storeNameId.lastIndexOf('-'))
  const menuId = storeNameId?.substring(storeNameId.lastIndexOf('-') + 1)

  return (
    <PageHead title="디저트핏 - 메뉴 상세" description={description}>
      {}
      <button
        onClick={() => {
          setCartMenus([...cartMenusVar(), { id: menuId, name: menuName }])
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
