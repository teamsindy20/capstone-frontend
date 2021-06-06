import TReview from 'src/types/Review'
import styled from 'styled-components'
import { Divider } from 'antd'
import {
  FlexContainer,
  ProfileTitleGrid,
  StoreImg,
  StoreName,
  TagName,
  GridContainerLi,
} from 'src/components/PostCard'
import Image from 'next/image'
import ClientSideLink from 'src/components/atoms/ClientSideLink'
import { IconImg } from 'src/pages'
import { Hashtag } from 'src/components/MenuCard'
import { MarginDiv } from 'src/pages/feed'

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

export const ImgInCard = styled.div`
  padding-top: 100%;
  position: relative;
`
const ReviewImgCard = styled.div`
  padding-top: 100%;
  position: relative;
`
const UserImg = styled(StoreImg)`
  overflow: hidden;
  padding-top: 40%;
  object-fit: contain;
  border-radius: 50%;
  border: none;
`
export const UserName = styled(StoreName)`
  font-size: 15px;
  font-weight: 500;
  color: black;
`
export const ReviewBadge = styled(TagName)`
  font-size: 11px;
  font-weight: 500;
  color: #ff5e3d;
`
export const IsRegular = styled(TagName)`
  display: inline-block;
  font-size: 11px;
  font-weight: 500;
  color: black;
`
const DateText = styled(IsRegular)`
  font-size: 10px;
  font-weight: normal;
  color: #6c6c6c;
`

const IsLikeContainer = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  margin-bottom: 8px;
`

const IsLikeText = styled.h4`
  display: inline-block;
  font-weight: 500;
  margin-left: 2px;
  margin-right: 10px;
`

const ReviewContent = styled.h4`
  overflow: visible auto;
  width: 100%;
  height: 80px;
`

function ReviewCard({ onlyImage, review }: Props) {
  return (
    <GridContainerLi>
      <MarginDiv>
        <FlexContainer>
          <Image src="/605@2x.png" alt="user-profile" width="40" height="40" objectFit="contain" />
          <ProfileTitleGrid>
            <UserName>
              김빵순
              <Divider type="vertical" />
              <DateText>어제</DateText>
            </UserName>
            <ReviewBadge>
              BEST 리뷰어
              <Divider type="vertical" /> <IsRegular>단골</IsRegular>
            </ReviewBadge>
          </ProfileTitleGrid>
        </FlexContainer>
      </MarginDiv>
      <ReviewImgCard>
        <Image src="/15@3x.png" alt="user-profile" layout="fill" objectFit="cover" />
      </ReviewImgCard>
      <MarginDiv>
        <IsLikeContainer>
          <IconImg src="/600@3x.png" />
          <IsLikeText>23</IsLikeText>
          <IconImg src="/607@3x.png" />
          <IsLikeText>23</IsLikeText>
        </IsLikeContainer>
        <Hashtag style={{ marginBottom: '5px' }}>#딸기 #초코 #말차 #저탄수</Hashtag>
        <ReviewContent>
          하이~ 에이치아이~ 우리 오빠들 오프라인 팬미팅 절대 못하니까.. 집에서 무대 보면서 먹으려고
          시켰는데 역시 맛있네요ㅠㅠ 자주 사먹을게용ㅎㅎ 그럼 BYE~ 비와이이~ <br />
          하이~ 에이치아이~ 우리 오빠들 오프라인 팬미팅 절대 못하니까.. 집에서 무대 보면서 먹으려고
          시켰는데 역시 맛있네요ㅠㅠ 자주 사먹을게용ㅎㅎ 그럼 BYE~ 비와이이~
        </ReviewContent>
      </MarginDiv>
    </GridContainerLi>
  )
}

export default ReviewCard
