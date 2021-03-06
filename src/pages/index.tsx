import LocationOnTwoToneIcon from '@material-ui/icons/LocationOnTwoTone'
import SearchIcon from '@material-ui/icons/Search'
import styled from 'styled-components'
import PageLayout from '../components/layouts/PageLayout'
import PageHead from '../components/layouts/PageHead'
import { TABLET_MIN_WIDTH } from 'src/models/constants'
import FoodCard from 'src/components/FoodCard'
import Food from 'src/types/Food'
import Store from 'src/types/Store'

const MaxWidth = styled.div`
  max-width: ${TABLET_MIN_WIDTH};
  margin: 0 auto;
`

const FlexContainerBetween = styled.div`
  display: flex;
  justify-content: space-between;
`

const FlexContainerAlignCenter = styled.div`
  display: flex;
  align-items: center;
`

const ImageWrapper = styled.div<{ paddingTop: string }>`
  position: relative;
  height: 0;
  padding-top: ${(p) => p.paddingTop};
`

const StyledImg = styled.img`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const GridContainerUl = styled.ul`
  display: grid;
  gap: 0.5rem;

  list-style: none;
  padding-left: 0;
`

function HomePage() {
  const food: Food = {
    imageUrl: 'https://cdn.crowdpic.net/list-thumb/thumb_l_F22044335599802DDF4A7ABF5778ACE5.jpg',
    name: '팥빙수',
    price: 5900,
    likeCount: 644,
    likeRatio: 77,
    reviewCount: 429,
    orderCount: 4213,
    reorderRatio: 23,
    hashtags: ['#달달', '#비건', '#다이어트'],
  }

  const store: Store = {
    name: '설빙',
    deliveryFees: [2500],
    deliveryTimeMin: 10,
    deliveryTimeMax: 19,
  }

  const food2: Food = {
    imageUrl:
      'https://img1.daumcdn.net/thumb/R720x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fliveboard%2Fcemmarketing%2F88cdaed005bf44a6bcb1f228e250458d.jpg',
    name: '메리딸기',
    price: 6500,
    likeCount: 244,
    likeRatio: 92,
    reviewCount: 229,
    orderCount: 2974,
    reorderRatio: 43,
    hashtags: ['#달달', '#딸기', '#라떼'],
  }

  const store2: Store = {
    name: '요거프레소',
    deliveryFees: [1500],
    deliveryTimeMin: 9,
    deliveryTimeMax: 15,
  }

  return (
    <PageHead title="캡스톤디자인 - Home">
      <PageLayout>
        <MaxWidth>
          <FlexContainerBetween>
            <div />
            <FlexContainerAlignCenter>
              <LocationOnTwoToneIcon />
              주소
            </FlexContainerAlignCenter>
            <SearchIcon fontSize="large" />
          </FlexContainerBetween>

          <ImageWrapper paddingTop="56.25%">
            <StyledImg
              src="https://cdn.pixabay.com/photo/2015/09/26/11/21/banner-958962_960_720.jpg"
              alt="banner advertisement"
            />
          </ImageWrapper>

          <div>카테고리</div>
          <div>정렬 기준</div>
          <button>사진만 보기</button>
          <GridContainerUl>
            <FoodCard food={food} store={store} />
            <FoodCard food={food2} store={store2} />
          </GridContainerUl>
        </MaxWidth>
      </PageLayout>
    </PageHead>
  )
}

export default HomePage
