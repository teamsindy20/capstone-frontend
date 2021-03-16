import { OrderStatus } from 'src/models/mock-data'
import TMenu from './Menu'

type TOrder = {
  id: number
  imageUrl: string[]
  menus: TMenu[]
  orderDate: string
  orderTotal: number
  orderStatus: OrderStatus
}

export default TOrder
