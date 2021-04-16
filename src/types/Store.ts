type TStore = {
  id: string
  creationDate: string
  modificationDate: string
  name: string
  deliveryFees: number[]
  deliveryTimeMin: number
  deliveryTimeMax: number
  location: string
  imageUrl: string
  reorderRatio: number
  regularCount: number
  hashtags: string[]
}

export default TStore
