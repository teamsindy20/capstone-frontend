import TReview from 'src/types/Review'
import styled from 'styled-components'
import { Card, Avatar, Divider, Tag } from 'antd'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons'
import {
  ProfileGrid,
  ProfileTitleGrid,
  StoreImg,
  StoreName,
  TagName,
  ShadowingLi,
} from 'src/components/PostCard'
import Image from 'next/image'
import ClientSideLink from 'src/components/atoms/ClientSideLink'

const { Meta: Review } = Card

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

const ImgInCard = styled.div`
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
const UserName = styled(StoreName)`
  font-size: 15px;
  font-weight: 500;
  color: black;
`
const ReviewBadge = styled(TagName)`
  font-size: 11px;
  font-weight: 500;
  color: #ff5e3d;
`
const IsRegular = styled(TagName)`
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

const ReviewImg = styled.img`
  width: 100%;
  height: 18rem;
  object-fit: cover;
`
function ReviewCard({ onlyImage, review }: Props) {
  return (
    <ShadowingLi>
      <ProfileGrid>
        <ImgInCard>
          <Image src="/605@3x.png" alt="user-profile" layout="fill" objectFit="contain" />
        </ImgInCard>
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
      </ProfileGrid>
      <ImgInCard>
        <Image src="/15@3x.png" alt="user-profile" layout="fill" objectFit="contain" />
      </ImgInCard>
      {/* <Card
        style={{ width: 350 }}
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <Review
          avatar={
            <Avatar src="data:image/jpeg;base64,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" />
          }
          title="김빵순"
          description="BEST 리뷰어"
        />
        <Divider />
        <ImgInCard
          src="data:image/jpeg;base64,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"
          alt="img_review"
        />
        <Divider />
        <div>
          <Tag color="#F57961">#딸기</Tag>
          <Tag color="#2ECCBA">#말차</Tag>
          <Tag color="#5C4D42">#초코</Tag>
          <Tag color="#C4C4C4">#저탄수</Tag>
        </div>
        <Divider />
        <p>
          하이~ 에이치아이~ 우리 오빠들 오프라인 팬미팅 절대 못하니까.. 집에서 무대 보면서 먹으려고
          시켰는데 역시 맛있네요ㅠㅠ 자주 사먹을게용ㅎㅎ 그럼 BYE~ 비와이이~
        </p>
      </Card> */}
    </ShadowingLi>
  )
}

export default ReviewCard
