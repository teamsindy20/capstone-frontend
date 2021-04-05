import BookmarkTwoToneIcon from '@material-ui/icons/BookmarkTwoTone'
import LocationOnTwoToneIcon from '@material-ui/icons/LocationOnTwoTone'
import SearchIcon from '@material-ui/icons/Search'
import styled from 'styled-components'
import Image from 'next/image'
import PageLayout from '../components/layouts/PageLayout'
import PageHead from '../components/layouts/PageHead'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import MenuCard, { ImageRatioWrapper, MenuLoadingCard } from 'src/components/MenuCard'
import useBoolean from 'src/hooks/useBoolean'
import { useState } from 'react'
import { store3, store, store2, store5, menus } from 'src/models/mock-data'
import { FlexContainerBetween, FlexContainerAlignCenter } from 'src/styles/FlexContainer'
import { TABLET_MIN_WIDTH } from 'src/models/constants'
import { sleep } from 'src/utils/commons'

const PADDING_TOP = '3rem'

const FlexContainerBetweenCenter = styled(FlexContainerBetween)`
  align-items: center;

  position: fixed;
  top: 0;
  left: 50%;
  z-index: 1;
  width: 100%;
  max-width: ${TABLET_MIN_WIDTH};
  height: ${PADDING_TOP};
  transform: translateX(-50%);

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
  const [isLoadingMenus, setIsLoadingMenus] = useState(false)
  const [hasMoreMenus, setHasMoreMenus] = useState(true)
  const [onlyImage, toggleOnlyImage] = useBoolean(false)

  async function fetchMoreMenus() {
    setIsLoadingMenus(true)
    await sleep(5000) // fetchMoreMenus(from, count)
    setIsLoadingMenus(false)

    console.log('page:')

    setHasMoreMenus(false)
  }

  const infiniteRef = useInfiniteScroll<HTMLUListElement>({
    loading: isLoadingMenus,
    hasNextPage: hasMoreMenus,
    onLoadMore: fetchMoreMenus,
  })

  return (
    <PageHead title="디플">
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

        <GridContainerUl onlyImage={onlyImage} ref={infiniteRef}>
          {menus.map((menu) => (
            <MenuCard key={menu.id} menu={menu} store={store} onlyImage={onlyImage} />
          ))}
          <MenuLoadingCard onlyImage={onlyImage} />
          {isLoadingMenus &&
            (onlyImage ? (
              <>
                <MenuLoadingCard onlyImage={onlyImage} />
                <MenuLoadingCard onlyImage={onlyImage} />
                <MenuLoadingCard onlyImage={onlyImage} />
              </>
            ) : (
              <MenuLoadingCard onlyImage={onlyImage} />
            ))}
        </GridContainerUl>
      </PageLayout>
    </PageHead>
  )
}

export default HomePage
