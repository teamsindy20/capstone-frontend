import LocationOnTwoToneIcon from '@material-ui/icons/LocationOnTwoTone'
import SearchIcon from '@material-ui/icons/Search'
import styled from 'styled-components'
import PageLayout from '../components/layouts/PageLayout'
import PageHead from '../components/layouts/PageHead'
import FoodCard, { AbsolutePositionImage, ImageRatioWrapper } from 'src/components/FoodCard'
import Food from 'src/types/Food'
import Store from 'src/types/Store'
import useBoolean from 'src/hooks/useBoolean'

const FlexContainerBetween = styled.div`
  display: flex;
  justify-content: space-between;
`

const FlexContainerAlignCenter = styled.div`
  display: flex;
  align-items: center;
`

const GridContainerUl = styled.ul<{ onlyImage: boolean }>`
  display: grid;
  ${(p) => (p.onlyImage ? 'grid-template-columns: 1fr 1fr 1fr;' : '')}
  gap: 0.5rem;

  list-style: none;
  padding-left: 0;
`

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
  bookmark: true,
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
  bookmark: false,
}

const store2: Store = {
  name: '요거프레소',
  deliveryFees: [1500],
  deliveryTimeMin: 9,
  deliveryTimeMax: 15,
}

const food3: Food = {
  imageUrl:
    'https://globalassets.starbucks.com/assets/55525cd1303a4b18958b05f0705b4cbb.jpg?impolicy=1by1_wide_1242',
  name: '나이트로 콜드 브루 톨(355ml)',
  price: 5800,
  likeCount: 2442,
  likeRatio: 78,
  reviewCount: 2294,
  orderCount: 58766,
  reorderRatio: 45,
  hashtags: ['#씁쓸', '#콜드브루', '#스타벅스'],
  bookmark: false,
}

const store3: Store = {
  name: '스타벅스',
  deliveryFees: [2000],
  deliveryTimeMin: 13,
  deliveryTimeMax: 25,
}

const food4: Food = {
  imageUrl:
    'https://image.istarbucks.co.kr/upload/store/skuimg/2019/11/[9300000002488]_20191106172218633.jpg',
  name: '제주 한라봉 뺑오쇼콜라',
  price: 5800,
  likeCount: 1442,
  likeRatio: 58,
  reviewCount: 1294,
  orderCount: 19744,
  reorderRatio: 67,
  hashtags: ['#한라봉필', '#초코스틱', '#패스츄리'],
  bookmark: false,
}

function HomePage() {
  const [onlyImage, toggleOnlyImage] = useBoolean(false)

  return (
    <PageHead title="캡스톤디자인 - Home">
      <PageLayout>
        <FlexContainerBetween>
          <div />
          <FlexContainerAlignCenter>
            <LocationOnTwoToneIcon />
            주소
          </FlexContainerAlignCenter>
          <SearchIcon fontSize="large" />
        </FlexContainerBetween>

        <ImageRatioWrapper paddingTop="56.25%">
          <AbsolutePositionImage
            src="https://cdn.pixabay.com/photo/2015/09/26/11/21/banner-958962_960_720.jpg"
            alt="banner advertisement"
          />
        </ImageRatioWrapper>

        <div>카테고리</div>
        <div>테마</div>
        <div>정렬 기준</div>
        <button onClick={toggleOnlyImage}>사진만 보기</button>
        <GridContainerUl onlyImage={onlyImage}>
          <FoodCard food={food} store={store} onlyImage={onlyImage} />
          <FoodCard food={food2} store={store2} onlyImage={onlyImage} />
          <FoodCard food={food3} store={store3} onlyImage={onlyImage} />
          <FoodCard food={food4} store={store3} onlyImage={onlyImage} />
          <FoodCard food={food} store={store} onlyImage={onlyImage} />
          <FoodCard food={food2} store={store2} onlyImage={onlyImage} />
          <FoodCard food={food3} store={store3} onlyImage={onlyImage} />
          <FoodCard food={food4} store={store3} onlyImage={onlyImage} />
        </GridContainerUl>
      </PageLayout>
    </PageHead>
  )
}

export default HomePage
