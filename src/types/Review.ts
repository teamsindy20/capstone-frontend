import TMenu from './Menu'

type ReviewRating = '맛있어요' | '괜찮아요' | '별로에요'

type TReview = {
  id: string
  creationDate: string
  modificationDate: string
  imageUrl?: string
  contents?: string[]
  rating: ReviewRating
  menus: TMenu[]
  doesHelpOthers: boolean
}

export default TReview