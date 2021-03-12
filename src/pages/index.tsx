import LocationOnTwoToneIcon from '@material-ui/icons/LocationOnTwoTone'
import SearchIcon from '@material-ui/icons/Search'
import styled from 'styled-components'
import Image from 'next/image'
import PageLayout from '../components/layouts/PageLayout'
import PageHead from '../components/layouts/PageHead'
import InfiniteScroll from 'react-infinite-scroller'
import FoodCard, { ImageRatioWrapper } from 'src/components/FoodCard'
import useBoolean from 'src/hooks/useBoolean'
import { useState } from 'react'
import { FlexContainerBetween, FlexContainerAlignCenter } from 'src/styles/FlexContainer'
import { food4, store3, food, store, food2, store2, food3, food5 } from 'src/models/mock-data'

const FlexContainerBetweenCenter = styled(FlexContainerBetween)`
  align-items: center;
`

const GridContainerUl = styled.ul<{ onlyImage: boolean }>`
  display: grid;
  ${(p) => (p.onlyImage ? 'grid-template-columns: 1fr 1fr 1fr;' : '')}
  gap: ${(p) => (p.onlyImage ? 'min(1vw, 0.5rem)' : '1rem')};
`

function HomePage() {
  const [onlyImage, toggleOnlyImage] = useBoolean(false)
  const [hasMore, setHasMore] = useState(true)

  async function handleLoadMore(page: any) {
    await new Promise((resolve) => setTimeout(resolve, 5000))
    console.log(page)
    setHasMore(false)
  }

  return (
    <PageHead title="캡스톤디자인 - 홈">
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
          <Image
            src="https://cdn.dribbble.com/users/2689908/screenshots/6544696/dribbble.jpg"
            alt="banner advertisement"
            layout="fill"
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
