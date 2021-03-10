import LocationOnTwoToneIcon from '@material-ui/icons/LocationOnTwoTone'
import SearchIcon from '@material-ui/icons/Search'
import styled from 'styled-components'
import PageLayout from '../components/layouts/PageLayout'
import PageHead from '../components/layouts/PageHead'
import InfiniteScroll from 'react-infinite-scroller'
import FoodCard, { AbsolutePositionImage, ImageRatioWrapper } from 'src/components/FoodCard'
import TFood from 'src/types/Food'
import TStore from 'src/types/Store'
import useBoolean from 'src/hooks/useBoolean'
import { useState } from 'react'
import { FlexContainerBetween, FlexContainerAlignCenter } from 'src/components/styles/FlexContainer'

const FlexContainerBetweenCenter = styled(FlexContainerBetween)`
  align-items: center;
`

const GridContainerUl = styled.ul<{ onlyImage: boolean }>`
  display: grid;
  ${(p) => (p.onlyImage ? 'grid-template-columns: 1fr 1fr 1fr;' : '')}
  gap: ${(p) => (p.onlyImage ? 'min(1vw, 0.5rem)' : '1rem')};

  list-style: none;
  padding-left: 0;
`

const food: TFood = {
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

const store: TStore = {
  name: '설빙',
  deliveryFees: [2500],
  deliveryTimeMin: 10,
  deliveryTimeMax: 19,
  location: '흑석동',
  imageUrl:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5LjcsMKnMSPqH8PHSpGhV73CFjTf6ysHsgw&usqp=CAU',
}

const food2: TFood = {
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

const store2: TStore = {
  name: '요거프레소',
  deliveryFees: [1500],
  deliveryTimeMin: 9,
  deliveryTimeMax: 15,
  location: '흑석동',
  imageUrl:
    'https://file.namu.moe/file/cbfb693725816fbffef427ed9273e3cf0d9a6457dc3bf01a518761a3ce872f365ab0b96a243764e0af20e2adfbc297cf',
}

const food3: TFood = {
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

const store3: TStore = {
  name: '스타벅스',
  deliveryFees: [2000],
  deliveryTimeMin: 13,
  deliveryTimeMax: 25,
  location: '흑석동',
  imageUrl:
    'https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/1200px-Starbucks_Corporation_Logo_2011.svg.png',
}

const food4: TFood = {
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

const food5: TFood = {
  imageUrl: '',
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
  const [hasMore, setHasMore] = useState(true)

  async function handleLoadMore(page: any) {
    await new Promise((resolve) => setTimeout(resolve, 5000))
    console.log(page)
    setHasMore(false)
  }

  return (
    <PageHead title="캡스톤디자인 - Home">
      <PageLayout>
        <FlexContainerBetweenCenter>
          <div>로고</div>
          <FlexContainerAlignCenter>
            <LocationOnTwoToneIcon />
            주소
          </FlexContainerAlignCenter>
          <SearchIcon fontSize="large" />
        </FlexContainerBetweenCenter>

        <ImageRatioWrapper paddingTop="56.25%">
          <AbsolutePositionImage
            src="https://cdn.dribbble.com/users/2689908/screenshots/6544696/dribbble.jpg"
            alt="banner advertisement"
          />
        </ImageRatioWrapper>

        <div>카테고리</div>
        <div>테마</div>
        <div>정렬 기준</div>
        <button onClick={toggleOnlyImage}>사진만 보기</button>
        <InfiniteScroll
          loadMore={handleLoadMore}
          hasMore={hasMore}
          loader={<FoodCard food={food4} loading={true} store={store3} onlyImage={onlyImage} />}
        >
          <GridContainerUl onlyImage={onlyImage}>
            <FoodCard food={food} loading={false} store={store} onlyImage={onlyImage} />
            <FoodCard food={food2} loading={false} store={store2} onlyImage={onlyImage} />
            <FoodCard food={food3} loading={false} store={store3} onlyImage={onlyImage} />
            <FoodCard food={food4} loading={false} store={store3} onlyImage={onlyImage} />
            <FoodCard food={food} loading={false} store={store} onlyImage={onlyImage} />
            <FoodCard food={food2} loading={false} store={store2} onlyImage={onlyImage} />
            <FoodCard food={food3} loading={false} store={store3} onlyImage={onlyImage} />
            <FoodCard food={food4} loading={false} store={store3} onlyImage={onlyImage} />
            <FoodCard food={food5} loading={false} store={store3} onlyImage={onlyImage} />
            <FoodCard food={food5} loading={true} store={store3} onlyImage={onlyImage} />
          </GridContainerUl>
        </InfiniteScroll>
      </PageLayout>
    </PageHead>
  )
}

export default HomePage
