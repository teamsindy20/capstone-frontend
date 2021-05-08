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
import { FlexContainerBetween, FlexContainerAlignCenter } from 'src/styles/FlexContainer'
import { TABLET_MIN_WIDTH } from 'src/models/constants'
import { sleep } from 'src/utils/commons'
import useGoToPage from 'src/hooks/useGoToPage'
import CategoryButton from 'src/components/CategoryButton'
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
  background: #fe6661;
`

const PaddingTop = styled.div`
  padding-top: ${PADDING_TOP};
`

const GridContainerUl = styled.ul<{ onlyImage: boolean }>`
  display: grid;
  ${(p) => (p.onlyImage ? 'grid-template-columns: 1fr 1fr 1fr;' : '')}
  gap: ${(p) => (p.onlyImage ? 'min(1vw, 0.5rem)' : '1rem')};
`

const ClickableDiv = styled.div`
  cursor: pointer;
`
const PhotoButton = styled.button`
  background: #f1f6fa;
  color: #fe6661;
  border-radius: 15px;
  background-size: cover;

  font-weight: bold;
  font-size: 20%;

  top: 5%;
  left: 5%;

  text-align: center;
  transition: all 200ms cubic-bezier(0.39, 0.5, 0.15, 1.36);

  display: block;
  margin: 20px auto;
  max-width: 180px;
  text-decoration: none;

  padding: 20px 30px;

  box-shadow: rgba(30, 22, 54, 0.4) 0 0px 0px 2px inset;
  :hover {
    background: #fe6661;
    box-shadow: rgba(30, 22, 54, 0.4) 0 0px 0px 40px inset;
  }
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
          <BookmarkTwoToneIcon fontSize="large" />
          <FlexContainerAlignCenter>
            <LocationOnTwoToneIcon />
            흑석로 84
          </FlexContainerAlignCenter>
          <ClickableDiv onClick={goToSearchPage}>
            <SearchIcon fontSize="large" />
          </ClickableDiv>
        </FlexContainerBetweenCenter>
        <PaddingTop />

        <ImageRatioWrapper paddingTop="56.25%">
          <Image
            src="https://www.smlounge.co.kr/upload/woman/article/201912/thumb/43530-394917-sample.jpg"
            alt="banner advertisement"
            layout="fill"
          />
        </ImageRatioWrapper>

        <CategoryButton></CategoryButton>
        <div>정렬 기준</div>
        <PhotoButton onClick={toggleOnlyImage}>사진만 보기</PhotoButton>

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
