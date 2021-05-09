import ChatBubbleOutlineRoundedIcon from '@material-ui/icons/ChatBubbleOutlineRounded'
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded'
import grey from '@material-ui/core/colors/grey'
import red from '@material-ui/core/colors/red'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
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
import { PostsByAddressQuery } from 'src/graphql/generated/types-and-hooks'

const StyledFavoriteRoundedIcon = { fontSize: 20, color: red[500] }

const StyledChatBubbleOutlineRoundedIcon = { fontSize: 20, color: grey[800] }

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

const AbsolutePosition = styled.div`
  position: absolute;
  bottom: 0;
`

const NoMarginP = styled.p`
  margin: 0;
`

const GridInCardColumn2 = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto min-content;
`

const ImgInCard = styled.img`
  overflow: hidden;
  border-radius: 5%;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 270px;
`
const TextInCard = styled.div`
  padding: 20px;
  font-size: 1rem;
  overflow: visible scroll;
  height: 270px;
`

const Tag = styled.span<{ color: string }>`
  margin: 10px;
  padding: 5px 10px;
  white-space: nowrap;
  border-radius: 12px;
  font-size: 14px;
  text-align: center;
  vertical-align: middle;
  background-color: ${(p) => p.color};
`

const FlexContainerBottomCard = styled.div`
  display: flex;
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
  post: PostsByAddressQuery['postsByAddress'][number]
}

function PostCard({ post }: Props) {
  const store = post.store

  return (
    <ShadowingLi>
      <GridInCardColumn2>
        <div>
          <StyledImg src={store.imageUrls ? store.imageUrls[0] : ''} alt="store profile" />
          <NoMarginH5>{store.name}</NoMarginH5>
        </div>

        <div>
          <Tag color="rgb(190, 235, 253)">오늘의라인업</Tag>
        </div>
        <div>
          <ImgInCard src={post.imageUrls ? post.imageUrls[0] : ''} alt="post" />
        </div>
        <TextInCard>
          {post.contents.map((content) => (content ? <NoMarginP>{content}</NoMarginP> : <br />))}
        </TextInCard>
      </GridInCardColumn2>
      <FlexContainerBottomCard>
        <ChatBubbleOutlineRoundedIcon style={StyledChatBubbleOutlineRoundedIcon} />
        <NoMarginH5>댓글</NoMarginH5>
        <FavoriteRoundedIcon style={StyledFavoriteRoundedIcon} /> {post.likeCount}
      </FlexContainerBottomCard>
      <FlexContainerBottomCard>
        <input placeholder="댓글을 입력해주세요." />
      </FlexContainerBottomCard>

      {/* <div>
        <img src="https://gramho.com/hosted-by-instagram/url=https%3A%7C%7C%7C%7Cinstagram.fiev22-2.fna.fbcdn.net%7C%7Cv%7C%7Ct51.2885-19%7C%7Cs150x150%7C%7C133784715_672813013398326_5083752991447256061_n.jpg%3Ftp%3D1%26_nc_ht%3Dinstagram.fiev22-2.fna.fbcdn.net%26_nc_ohc%3DkKzoh7bNOMsAX_yPtQp%26edm%3DABfd0MgBAAAA%26ccb%3D7-4%26oh%3Dd3276fb2af511a2070378be742c0d0aa%26oe%3D60BCEDE6%26_nc_sid%3D7bff83"></img>
      </div> */}
      {/* <FlexContainerBetweenPadding>
        <GridContainerColumn2>
          <div>
            <StyledImg src={store.imageUrls ? store.imageUrls[0] : ''} alt="store profile" />
            <NoMarginH5>{store.name}</NoMarginH5>
          </div>
          <div>
            <FavoriteRoundedIcon style={StyledFavoriteRoundedIcon} /> {post.likeCount}
          </div>
        </GridContainerColumn2>
      </FlexContainerBetweenPadding>

      <ImageRatioWrapper paddingTop="100%">
        <AbsolutePositionImage src={post.imageUrls ? post.imageUrls[0] : ''} alt="post" />
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
      </GridContainerPadding> */}
    </ShadowingLi>
  )
}

export default PostCard
