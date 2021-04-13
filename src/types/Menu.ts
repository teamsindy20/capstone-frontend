type TMenu = {
  id: string
  creationDate: string
  modificationDate: string
  imageUrl: string
  name: string
  price: number
  likeCount: number
  likeRatio: number
  reviewCount: number
  orderCount: number
  reorderRatio: number
  hashtags: string[]

  bookmark: boolean
}

export default TMenu
