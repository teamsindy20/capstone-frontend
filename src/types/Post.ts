import TStore from "./Store"

type TPost = {
  id: string
  creationDate: string
  modificationDate: string
  contents: string[]
  imageUrl: string[]
  likeCount: number
  commentCount: number

  store: TStore
}

export default TPost
