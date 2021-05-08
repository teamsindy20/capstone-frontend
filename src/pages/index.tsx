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
import { FlexContainerBetween, FlexContainerAlignCenter } from 'src/styles/FlexContainer'
import { TABLET_MIN_WIDTH } from 'src/models/constants'
import { sleep } from 'src/utils/commons'
import useGoToPage from 'src/hooks/useGoToPage'
import { useMenusQuery } from 'src/graphql/generated/types-and-hooks'
import { handleApolloError } from 'src/apollo/error'

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

const StyledBookmarkRoundedIcon = { fontSize: 30, color: red[500] }

const PaddingTop = styled.div`
  padding-top: ${PADDING_TOP};
`

const GridContainer = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 0.8rem;
  margin: 0.5rem;
`

const SmallText = styled.div`
  text-align: center;
`
const MiddleText = styled.div`
  /* width: 100%; */
  /* justify-content: center; */
  text-align: center;
  /* display: table-cell; */
  /* vertical-align: middle; */
  /* margin: 3rem; */
  padding: 0.5rem;
  margin: 0.5rem;
  border-radius: 1rem;
  background-color: #fff5f5;
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
  const [hasMoreMenus, setHasMoreMenus] = useState(true)
  const [onlyImage, toggleOnlyImage] = useBoolean(false)

  const { data, fetchMore, networkStatus, refetch } = useMenusQuery({
    onError: handleApolloError,
    notifyOnNetworkStatusChange: true,
  })

  const isEventsLoading = networkStatus < 7

  async function fetchMoreMenus() {
    if (data?.menus.length) {
      await sleep(5000) // fetchMore({ variables: { from, count } })
      setHasMoreMenus(false)
    } else {
      setHasMoreMenus(false)
    }
  }

  const [sentryRef] = useInfiniteScroll({
    loading: isEventsLoading,
    hasNextPage: hasMoreMenus,
    onLoadMore: fetchMoreMenus,
  })

  const goToSearchPage = useGoToPage('/search')

  return (
    <PageHead>
      <PageLayout>
        <FlexContainerBetweenCenter>
          <div>
            <BookmarkRoundedIcon style={StyledBookmarkRoundedIcon} />
            {/* <StyledBookmarkRoundedIcon fontSize="30px" /> */}
            <SearchRoundedIcon
              style={{ fontSize: 30, color: grey[800] }}
              onClick={goToSearchPage as any}
            />
          </div>
          <FlexContainerAlignCenter>
            <LocationOnRoundedIcon style={{ fontSize: 20, color: grey[800] }} />
            흑석동
            <ExpandMoreRoundedIcon style={{ fontSize: 20, color: grey[800] }} />
          </FlexContainerAlignCenter>
          <div>
            <TuneRoundedIcon style={{ fontSize: 30, color: '#3C3C3C' }} />
            <NotificationsRoundedIcon style={{ fontSize: 30, color: grey[800] }} />
          </div>
        </FlexContainerBetweenCenter>
        <PaddingTop />

        <ImageRatioWrapper paddingTop="36.25%">
          <Image src="/디저트정-광고.png" alt="banner advertisement" layout="fill" />
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
        <GridContainerUl onlyImage={onlyImage}>
          {data?.menus.map((menu) => (
            <MenuCard key={menu.id} menu={menu} onlyImage={onlyImage} />
          ))}
        </GridContainerUl>
        {(isEventsLoading || hasMoreMenus) && (
          <div ref={sentryRef}>
            <MenuLoadingCard onlyImage={onlyImage} />
          </div>
        )}
      </PageLayout>
    </PageHead>
  )
}

export default HomePage
