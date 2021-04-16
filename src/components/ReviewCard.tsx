import TReview from 'src/types/Review'

type LoadingProps = {
  onlyImage: boolean
}

export function ReviewLoadingCard({ onlyImage }: LoadingProps) {
  return <div />
}

type Props = {
  onlyImage: boolean
  review: TReview
}

function ReviewCard({ onlyImage, review }: Props) {
  return <li></li>
}

export default ReviewCard
