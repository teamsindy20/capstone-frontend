import BookmarkRoundedIcon from '@material-ui/icons/BookmarkRounded'
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded'
import SearchRoundedIcon from '@material-ui/icons/SearchRounded'
import TuneRoundedIcon from '@material-ui/icons/TuneRounded'
import NotificationsRoundedIcon from '@material-ui/icons/NotificationsRounded'
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded'
import grey from '@material-ui/core/colors/grey'
import red from '@material-ui/core/colors/red'
import styled from 'styled-components'
import Image from 'next/image'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
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
import useGoToPage from 'src/hooks/useGoToPage'

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
  background: #ffffff;
`

const PaddingTop = styled.div`
  padding-top: ${PADDING_TOP};
`

const GridContainer = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  column-gap: 0.8rem;
  margin: 1rem;
`

const SmallText = styled.div`
  text-align: center;
  display: table-cell;
  vertical-align: middle;
`
const MiddleText = styled.div`
  justify-content: center;
  text-align: center;
  display: table-cell;
  vertical-align: middle;
  margin: 3rem;
`

const GridContainerUl = styled.ul<{ onlyImage: boolean }>`
  display: grid;
  ${(p) => (p.onlyImage ? 'grid-template-columns: 1fr 1fr 1fr;' : '')}
  gap: ${(p) => (p.onlyImage ? 'min(1vw, 0.5rem)' : '1rem')};
`

const ClickableDiv = styled.div`
  cursor: pointer;
`

function HomePage() {
  const [isLoadingMenus, setIsLoadingMenus] = useState(false)
  const [hasMoreMenus, setHasMoreMenus] = useState(true)
  const [onlyImage, toggleOnlyImage] = useBoolean(false)

  const goToSearchPage = useGoToPage('/search')

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
    <PageHead>
      <PageLayout>
        <FlexContainerBetweenCenter>
          <BookmarkRoundedIcon style={{ fontSize: 30, color: red[500] }} />
          <FlexContainerAlignCenter>
            <LocationOnRoundedIcon style={{ fontSize: 20, color: grey[800] }} />
            흑석동
            <ExpandMoreRoundedIcon style={{ fontSize: 20, color: grey[800] }} />
          </FlexContainerAlignCenter>
          <ClickableDiv onClick={goToSearchPage}>
            <SearchRoundedIcon style={{ fontSize: 30, color: grey[800] }} />
            <TuneRoundedIcon style={{ fontSize: 30, color: grey[800] }} />
            <NotificationsRoundedIcon style={{ fontSize: 30, color: grey[800] }} />
          </ClickableDiv>
        </FlexContainerBetweenCenter>
        <PaddingTop />

        <ImageRatioWrapper paddingTop="36.25%">
          <Image
            src="/../public/디저트정-광고.png"
            alt="banner advertisement"
            layout="fill"
          />
        </ImageRatioWrapper>

        <GridContainer>
          <SmallText>정렬방식</SmallText>
          <Button variant="contained" color="secondary" size="small">
            맞춤추천
          </Button>
          <Button variant="contained" size="small">
            좋아요순
          </Button>
          <Button variant="contained" size="small">
            재주문율순
          </Button>
          <Button variant="contained" color="primary" size="small" onClick={toggleOnlyImage}>
            사진만보기
          </Button>
        </GridContainer>
        <MiddleText>김빵순님이 설정하신 취향 : #딸기 #초코 #말차 #저탄수 #비건</MiddleText>
        <GridContainerUl onlyImage={onlyImage} ref={infiniteRef}>
          {menus.map((menu) => (
            <MenuCard key={menu.id} menu={menu} store={store} onlyImage={onlyImage} />
          ))}
        </GridContainerUl>
        <MenuLoadingCard onlyImage={onlyImage} />
        {isLoadingMenus && <MenuLoadingCard onlyImage={onlyImage} />}
      </PageLayout>
    </PageHead>
  )
}

export default HomePage
