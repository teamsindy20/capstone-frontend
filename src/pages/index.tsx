import BookmarkTwoToneIcon from '@material-ui/icons/BookmarkTwoTone'
import LocationOnTwoToneIcon from '@material-ui/icons/LocationOnTwoTone'
import SearchIcon from '@material-ui/icons/Search'
import styled from 'styled-components'
import Image from 'next/image'
import PageLayout from '../components/layouts/PageLayout'
import PageHead from '../components/layouts/PageHead'
import InfiniteScroll from 'react-infinite-scroller'
import MenuCard, { ImageRatioWrapper } from 'src/components/MenuCard'
import useBoolean from 'src/hooks/useBoolean'
import { useState } from 'react'
import {
  food4,
  store3,
  food,
  store,
  food2,
  store2,
  food3,
  food5,
  food6,
  store5,
} from 'src/models/mock-data'
import { FlexContainerBetween, FlexContainerAlignCenter } from 'src/styles/FlexContainer'

const PADDING_TOP = '3rem'

const FlexContainerBetweenCenter = styled(FlexContainerBetween)`
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: ${PADDING_TOP};

  background: #eee;
`

const PaddingTop = styled.div`
  padding-top: ${PADDING_TOP};
`

const GridContainerUl = styled.ul<{ onlyImage: boolean }>`
  display: grid;
  ${(p) => (p.onlyImage ? 'grid-template-columns: 1fr 1fr 1fr;' : '')}
  gap: ${(p) => (p.onlyImage ? 'min(1vw, 0.5rem)' : '1rem')};
`

function HomePage() {
  const [onlyImage, toggleOnlyImage] = useBoolean(false)
  const [hasMore, setHasMore] = useState(true)

  async function fetchMoreMenu(page: any) {
    await new Promise((resolve) => setTimeout(resolve, 5000))
    console.log(page)
    setHasMore(false)
  }

  return (
    <PageHead title="캡스톤디자인 - 홈">
      <PageLayout>
        <FlexContainerBetweenCenter>
          <BookmarkTwoToneIcon fontSize="large" />
          <FlexContainerAlignCenter>
            <LocationOnTwoToneIcon />
            주소
          </FlexContainerAlignCenter>
          <SearchIcon fontSize="large" />
        </FlexContainerBetweenCenter>
        <PaddingTop />

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
          loadMore={fetchMoreMenu}
          hasMore={hasMore}
          loader={<MenuCard food={food4} loading={true} store={store3} onlyImage={onlyImage} />}
        >
          <GridContainerUl onlyImage={onlyImage}>
            <MenuCard food={food} loading={false} store={store} onlyImage={onlyImage} />
            <MenuCard food={food2} loading={false} store={store2} onlyImage={onlyImage} />
            <MenuCard food={food3} loading={false} store={store3} onlyImage={onlyImage} />
            <MenuCard food={food4} loading={false} store={store3} onlyImage={onlyImage} />
            <MenuCard food={food} loading={false} store={store} onlyImage={onlyImage} />
            <MenuCard food={food2} loading={false} store={store2} onlyImage={onlyImage} />
            <MenuCard food={food3} loading={false} store={store3} onlyImage={onlyImage} />
            <MenuCard food={food4} loading={false} store={store3} onlyImage={onlyImage} />
            <MenuCard food={food5} loading={false} store={store3} onlyImage={onlyImage} />
            <MenuCard food={food6} loading={false} store={store5} onlyImage={onlyImage} />
            <MenuCard food={food5} loading={true} store={store3} onlyImage={onlyImage} />
          </GridContainerUl>
        </InfiniteScroll>
      </PageLayout>
    </PageHead>
  )
}

export default HomePage
