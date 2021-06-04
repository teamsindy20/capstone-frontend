import ChatBubbleOutlineRoundedIcon from '@material-ui/icons/ChatBubbleOutlineRounded'
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded'
import grey from '@material-ui/core/colors/grey'
import red from '@material-ui/core/colors/red'
import styled from 'styled-components'
import { FlexContainerBetween, FlexContainerAlignCenter } from '../styles/FlexContainer'
import { GridContainerGap } from '../styles/GridContainer'
import { PostsByAddressQuery } from 'src/graphql/generated/types-and-hooks'
import { Divider, Button } from 'antd'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons'
import { SkeletonGradient, SkeletonImage, SkeletonText } from 'src/styles/LoadingSkeleton'
import Image from 'next/image'

const StyledFavoriteRoundedIcon = { fontSize: 20, color: red[500] }

const StyledChatBubbleOutlineRoundedIcon = { fontSize: 20, color: grey[800] }

const SkeletonImageRound = styled(SkeletonGradient)`
  position: relative;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
`

const ShadowingLi = styled.li`
  background-color: #dddbdb;
`

const GridContainerPadding = styled(GridContainerGap)`
  padding: 1rem;
`

const StoreImg = styled.img`
  overflow: hidden;
  width: 32px;
  height: 32px;
  object-fit: contain;
  border-radius: 50%;
`

const NoMarginH5 = styled.h5`
  margin: 0;
`

const FlexContainerBetweenPadding = styled(FlexContainerBetween)`
  padding: 1rem;
`
const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 10fr;
  margin: 5px;
  border: none
  height: 3rem;
  background-color: #ffffff;
  grid-gap: 5px;
`

const ProfileTitleGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(2, auto);
`

const StoreName = styled.h4`
  font-size: 15px;
  font-weight: 500;
  color: #000000;
`
const TagName = styled.h4`
  font-size: 11px;
  font-weight: 500;
  color: #ff5e3d;
`
const CardGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(3, auto);
  border-radius: 10px;
  border: solid 1px #e8e8e8;
  background-color: #ffffff;
  height: 13rem;
`
const CardContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;
`
const CardHorizontalBorder = styled.div`
  justify-content: center;
  //width: 95%;
  height: 0.1px;
  border: solid 1px #e8e8e8;
`

const FeedMoreText = styled(Button)`
  font-size: 13px;
  font-weight: 500;
  color: #000000;
  border: none;
`

const SquareFrame = styled.div`
  padding-top: 100%;
  position: relative;
`
const IconGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 0 16px 16px 16px;
  top: 0;
  align-items: center;
  height: 100%;
  grid-gap: 10px;
`
const IconImg = styled.img`
  width: 18px;
  height: 18px;
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
  align-items: center;
  width: 112px;
  height: 112px;
  margin: 11px;
`
const TextInCard = styled.div`
  overflow: visible auto;
  width: 100%;
  height: 112px;
  margin: 11px 0px;
  font-size: 13px;
  color: #000000;
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

export function PostLoadingCard() {
  return (
    <ShadowingLi>
      <FlexContainerBetweenPadding>
        <GridContainerColumn2>
          <SkeletonImageRound />
          <SkeletonText width="min(10rem, 30vw)" />
        </GridContainerColumn2>
      </FlexContainerBetweenPadding>
      <SquareFrame>
        <SkeletonImage />
      </SquareFrame>

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
      <ProfileGrid>
        <StoreImg src={store.imageUrls ? store.imageUrls[0] : ''} alt="store profile" />
        <ProfileTitleGrid>
          <StoreName>{store.name}</StoreName>
          <TagName>신메뉴소식</TagName>
        </ProfileTitleGrid>
      </ProfileGrid>
      <CardGrid>
        <CardContent>
          <ImgInCard src={post.imageUrls ? post.imageUrls[0] : ''} alt="post" />
          <TextInCard>
            {post.contents.map((content, i) =>
              content ? <NoMarginP key={i}>{content}</NoMarginP> : <br key={i} />
            )}
          </TextInCard>
        </CardContent>
        <CardHorizontalBorder />
        <FlexContainerBetween>
          <FeedMoreText>더보기</FeedMoreText>
          <IconGrid>
            <IconImg src="like.png" />
            <IconImg src="comment.png" />
            <IconImg src="share.png" />
          </IconGrid>
        </FlexContainerBetween>
      </CardGrid>

      {/* <GridInCardColumn2>
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
          {post.contents.map((content, i) =>
            content ? <NoMarginP key={i}>{content}</NoMarginP> : <br key={i} />
          )}
        </TextInCard>
      </GridInCardColumn2>
      <FlexContainerBottomCard>
        <ChatBubbleOutlineRoundedIcon style={StyledChatBubbleOutlineRoundedIcon} />
        <NoMarginH5>댓글</NoMarginH5>
        <FavoriteRoundedIcon style={StyledFavoriteRoundedIcon} /> {post.likeCount}
      </FlexContainerBottomCard>
      <FlexContainerBottomCard>
        <input placeholder="댓글을 입력해주세요." />
      </FlexContainerBottomCard> */}

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
