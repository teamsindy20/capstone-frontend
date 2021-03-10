import ChatBubbleOutlineRoundedIcon from '@material-ui/icons/ChatBubbleOutlineRounded'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import TPost from 'src/types/Post'
import TStore from 'src/types/Store'
import styled from 'styled-components'
import {
  AbsolutePositionImage,
  ImageRatioWrapper,
  SkeletonGradient,
  SkeletonImage,
  SkeletonText,
} from './FoodCard'

const SkeletonImageRound = styled(SkeletonGradient)`
  position: relative;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
`

const NoStyleLi = styled.li`
  list-style-type: none;
  box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.15), 0 0 0 rgba(16, 22, 26, 0), 0 0 0 rgba(16, 22, 26, 0);
  border-radius: 3px;
`

const GridContainerGap = styled.div`
  display: grid;
  gap: 1rem;
  margin: 1rem 0;
`

const StyledImg = styled.img`
  width: 3rem;
  height: 3rem;
  object-fit: cover;
  border-radius: 50%;
`

const NoMarginH3 = styled.h3`
  margin: 0;
`

const FlexContainerBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 1rem;
`

const GridContainerAlignCenter = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  align-items: center;
  gap: 1rem;
`

const AbsolutePosition = styled.div`
  position: absolute;
  bottom: 0;
`

type Props = {
  post: TPost
  store: TStore
  loading: boolean
}

function Post({ post, store, loading }: Props) {
  if (loading) {
    return (
      <NoStyleLi>
        <FlexContainerBetween>
          <GridContainerAlignCenter>
            <SkeletonImageRound />
            <SkeletonText width="min(10rem, 30vw)" />
          </GridContainerAlignCenter>
        </FlexContainerBetween>

        <ImageRatioWrapper paddingTop="100%">
          <SkeletonImage />
        </ImageRatioWrapper>

        <GridContainerGap>
          <SkeletonText height="1.5rem" />
          <SkeletonText width="30%" />
          <SkeletonText width="80%" />
          <SkeletonText width="50%" />
          <input placeholder="댓글 달기..." disabled={true} />
        </GridContainerGap>
      </NoStyleLi>
    )
  }

  return (
    <NoStyleLi>
      <FlexContainerBetween>
        <GridContainerAlignCenter>
          <StyledImg
            src="https://i.pinimg.com/originals/3f/3d/d9/3f3dd9219f7bb1c9617cf4f154b70383.jpg"
            alt="store profile"
          />
          <NoMarginH3>{store.name}</NoMarginH3>
          <div>{store.location}</div>
        </GridContainerAlignCenter>
        <div>...</div>
      </FlexContainerBetween>

      <ImageRatioWrapper paddingTop="100%">
        <AbsolutePositionImage
          src="https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/e35/s1080x1080/158898610_769503400650135_864312100874278057_n.jpg?tp=1&_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=103&_nc_ohc=n2QL5bi1mgAAX8GEg6s&oh=0fe3584ef45698e09940e917610370af&oe=607027AE"
          alt="post"
        />
        <AbsolutePosition>Photo location indicator</AbsolutePosition>
      </ImageRatioWrapper>

      <div>
        <FavoriteBorderIcon fontSize="large" /> 283
        <ChatBubbleOutlineRoundedIcon fontSize="large" /> 14
        <OpenInNewIcon fontSize="large" />
      </div>

      <p>
        깔끔히 정리된 서재는
        <br /> 일의 능률을 올려주죠.
        <br />
        <br />
        넉넉한 수납장만 있다면
        <br /> 더 능률적인 홈오피스를 만들 수 있어요.
        <br />
        <br />
        IKEA 매장과 IKEA.kr에서
        <br /> 더 많은 홈퍼니싱 아이디어를 확인하세요!
      </p>
      <div>더 보기</div>
      <div>작성일</div>
      <ul>
        <li>
          <div>댓글 작성자</div>
          <p>댓글 내용</p>
          <div>댓글 좋아요</div>
        </li>
        <li>
          <div>댓글 작성자2</div>
          <p>댓글 내용2</p>
        </li>
      </ul>

      <input placeholder="댓글 달기..." />
    </NoStyleLi>
  )
}

export default Post
