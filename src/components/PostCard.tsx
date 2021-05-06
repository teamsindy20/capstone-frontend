import ChatBubbleOutlineRoundedIcon from '@material-ui/icons/ChatBubbleOutlineRounded'
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded'
import grey from '@material-ui/core/colors/grey'
import red from '@material-ui/core/colors/red'
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
} from './MenuCard'
import { FlexContainerBetween, FlexContainerAlignCenter } from '../styles/FlexContainer'
import { GridContainerGap } from '../styles/GridContainer'
import { Fragment } from 'react'

const StyledFavoriteRoundedIcon = { fontSize: 20, color: red[500] }

const SkeletonImageRound = styled(SkeletonGradient)`
  position: relative;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
`

const ShadowingLi = styled.li`
  background-color: #f1f6fa;
  border-radius: 15px;
`

const GridContainerPadding = styled(GridContainerGap)`
  padding: 1rem;
`

const StyledImg = styled.img`
  width: 1.8rem;
  height: 1.8rem;
  object-fit: cover;
  border-radius: 50%;
`

const NoMarginH5 = styled.h5`
  margin: 0;
`

const FlexContainerBetweenPadding = styled(FlexContainerBetween)`
  padding: 1rem;
`
const GridContainerRow3Column2 = styled(GridContainerGap)`
  grid-template-rows: repeat(3, auto);
  grid-template-columns: repeat(2, auto);
  align-items: center;
`

const GridContainerColumn2 = styled(GridContainerGap)`
  grid-template-columns: 3fr 1fr;
  align-items: center;
`

const GridContainerColumn3 = styled(GridContainerGap)`
  grid-template-columns: 3fr 1fr;
  align-items: center;
`

const AbsolutePosition = styled.div`
  position: absolute;
  bottom: 0;
`

const NoMarginP = styled.p`
  margin: 0;
`

export function PostLoadingCard() {
  return (
    <ShadowingLi>
      <FlexContainerBetweenPadding>
        <GridContainerColumn2>
          <SkeletonImageRound />
          <SkeletonText width="min(10rem, 30vw)" />
        </GridContainerColumn2>
      </FlexContainerBetweenPadding>

      <ImageRatioWrapper paddingTop="100%">
        <SkeletonImage />
      </ImageRatioWrapper>

      <GridContainerPadding>
        <SkeletonText height="1.5rem" />
        <SkeletonText width="80%" />
        <SkeletonText width="40%" />
        <input placeholder="댓글 달기..." disabled={true} />
      </GridContainerPadding>
    </ShadowingLi>
  )
}

type Props = {
  post: TPost
}

function PostCard({ post }: Props) {
  const store = post.store

  return (
    <ShadowingLi>
      <FlexContainerBetweenPadding>
        <GridContainerColumn2>
          <div>
            <StyledImg src={store.imageUrl} alt="store profile" />
            <NoMarginH5>{store.name}</NoMarginH5>
          </div>
          <div>
            <FavoriteRoundedIcon style={StyledFavoriteRoundedIcon} /> {post.likeCount}
          </div>
        </GridContainerColumn2>
      </FlexContainerBetweenPadding>

      <ImageRatioWrapper paddingTop="100%">
        <AbsolutePositionImage src={post.imageUrl[0]} alt="post" />
        <AbsolutePosition>Photo location indicator</AbsolutePosition>
      </ImageRatioWrapper>

      <GridContainerPadding>
        <FlexContainerBetween>
          <GridContainerColumn2>
            <FlexContainerAlignCenter></FlexContainerAlignCenter>
            <FlexContainerAlignCenter>
              <ChatBubbleOutlineRoundedIcon /> {post.commentCount}
            </FlexContainerAlignCenter>
          </GridContainerColumn2>
          <OpenInNewIcon />
        </FlexContainerBetween>
        <div>
          {post.contents.map((content) => (content ? <NoMarginP>{content}</NoMarginP> : <br />))}
        </div>

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
      </GridContainerPadding>
    </ShadowingLi>
  )
}

export default PostCard
