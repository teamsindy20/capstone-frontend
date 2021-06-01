import { InMemoryCache, makeVar } from '@apollo/client'
import { DeepPartial } from 'react-hook-form'
import { MenuOption } from 'src/graphql/generated/types-and-hooks'
// import { persistCache, SessionStorageWrapper } from 'apollo3-cache-persist'

export type CartMenu = {
  id: string
  name: string
  price: number
  optionCategories?: Record<string, DeepPartial<MenuOption>>
  count: number
}

export const cartMenusVar = makeVar<CartMenu[]>(
  typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('cartMenus') ?? '[]') : []
)

export function setCartMenus(menus: any[]) {
  cartMenusVar(menus)
  localStorage.setItem('cartMenus', JSON.stringify(menus))
}

type CartStore = {
  id: string
  name: string
  imageUrl: string
}

export const cartStoreVar = makeVar<CartStore | null>(
  typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('cartStore') ?? 'null') : null
)

export function setCartStore(store: CartStore | null) {
  cartStoreVar(store)
  localStorage.setItem('cartStore', JSON.stringify(store))
}

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {},
    },
  },
})

// 지금 persistCache가 초반에 적용이 안 될 수 있다는 점이 있는데 나중에 top-level await 적용하기
// 페이지를 새로고침할 때 Apollo 캐시를 유지시키기 위해서 sessionStorage에 저장
// persistCache({
//   cache,
//   storage: new SessionStorageWrapper(typeof window !== 'undefined' ? sessionStorage : null),
// })

export default cache
