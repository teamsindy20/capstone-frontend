import { useRouter } from 'next/router'

function useStoreNameIdUrl() {
  const router = useRouter()
  const storeNameId = (router.query.nameId ?? '') as string
  const storeName = storeNameId.substring(0, storeNameId.lastIndexOf('-'))
  const storeId = storeNameId.substring(storeNameId.lastIndexOf('-') + 1)

  function getStoreUrl(activeKey: string) {
    switch (activeKey) {
      case 'menus':
        return `/stores/${storeNameId}`
      case 'feed':
      case 'reviews':
        return `/stores/${storeNameId}/${activeKey}`
      default:
        return ''
    }
  }

  return { storeId, storeName, getStoreUrl }
}

export default useStoreNameIdUrl
