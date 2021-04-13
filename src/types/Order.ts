import TMenu from './Menu'
import TReview from './Review'
import TStore from './Store'

type OrderStatus = '접수 대기' | '준비 중' | '배달 중' | '배달 완료'

type TOrder = {
  id: string
  imageUrl: string[]
  menus: TMenu[]
  orderDate: string
  orderTotal: number
  orderStatus: OrderStatus
  review: TReview
  regularOrderDate: string
  regularOrderCount: number
  store: TStore
}

export default TOrder
