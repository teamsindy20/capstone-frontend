import BookmarkRoundedIcon from '@material-ui/icons/BookmarkRounded'
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded'
import SearchRoundedIcon from '@material-ui/icons/SearchRounded'
import TuneRoundedIcon from '@material-ui/icons/TuneRounded'
import NotificationsRoundedIcon from '@material-ui/icons/NotificationsRounded'
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded'
import grey from '@material-ui/core/colors/grey'
import red from '@material-ui/core/colors/red'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
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
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const PADDING_TOP = '3rem'

const BORDER_HEIGHT = '2px'

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

const StyledSearchRoundedIcon = { fontSize: 30, color: grey[800] }

const StyledNotificationsRoundedIcon = { fontSize: 30, color: grey[800] }

const StyledTuneRoundedIcon = { fontSize: 30, color: grey[800] }

const StyledLocationOnRoundedIcon = { fontSize: 20, color: grey[800] }

const StyledExpandMoreRoundedIcon = { fontSize: 20, color: grey[800] }

const PaddingTop = styled.div`
  padding-top: ${PADDING_TOP};
`

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
}

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 7fr;
`

const SmallText = styled.div`
  text-align: center;
`
const MiddleText = styled.div`
  text-align: center;
  padding: 0.5rem;
  margin: 0.5rem;
  border-radius: 1rem;
  background-color: #fff5f5;
`
const StyledSlider = styled(Slider)`
  margin-bottom: 3rem;
  object-fit: cover;
`

const BannerAd = styled.div`
  position: relative;
  height: 10rem;
  text-align: center;
  background-color: #fff5f5;
  display: inline-block;
  object-fit: cover;
`

const AdTextDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 1.6rem;
`

const GridContainerUl = styled.ul<{ onlyImage: boolean }>`
  display: grid;
  ${(p) => (p.onlyImage ? 'grid-template-columns: 1fr 1fr 1fr;' : '')}
  gap: ${(p) => (p.onlyImage ? 'min(1vw, 0.5rem)' : '1rem')};
`

const Img = styled.img`
  width: 100%;
  overflow: hidden;
`

const Div = styled.div`
  overflow: scroll hidden;
  display: flex;
  margin: 6px 0px;
`

const FixedDiv = styled.div`
  position: sticky;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  height: 60px;
  line-height: 60px;
  background-color: #fff;
`
const Tag = styled.span<{ color: string }>`
  margin: 10px;
  padding: 5px 10px;
  white-space: nowrap;
  border-radius: 12px;
  font-size: 14px;
  text-align: center;
  vertical-align: middle;
  background-color: ${(p) => p.color};
`

const HorizontalBorder = styled.div`
  border: ${BORDER_HEIGHT} solid #ddd;
  margin-bottom: 15px;
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
            <TuneRoundedIcon style={StyledTuneRoundedIcon} />
          </div>
          <FlexContainerAlignCenter>
            <LocationOnRoundedIcon style={StyledLocationOnRoundedIcon} />
            흑석동
            <ExpandMoreRoundedIcon style={StyledExpandMoreRoundedIcon} />
          </FlexContainerAlignCenter>
          <div>
            <SearchRoundedIcon style={StyledSearchRoundedIcon} onClick={goToSearchPage as any} />
            <NotificationsRoundedIcon style={StyledNotificationsRoundedIcon} />
          </div>
        </FlexContainerBetweenCenter>
        <PaddingTop />
        <StyledSlider {...settings}>
          <BannerAd>
            <Img src="/디저트정-광고.png" alt="banner advertisement"></Img>
            <AdTextDiv>
              <b>OPEN EVENT!</b> <br />
              초코칩쿠키 무조건 증정!
            </AdTextDiv>
          </BannerAd>
          <BannerAd>
            <Img src="/디저트정-광고.png" alt="banner advertisement"></Img>
            <AdTextDiv>쿠폰증정2</AdTextDiv>
          </BannerAd>
          <BannerAd>
            <Img src="/디저트정-광고.png" alt="banner advertisement"></Img>
            <AdTextDiv>쿠폰증정3</AdTextDiv>
          </BannerAd>
          <BannerAd>
            <Img src="/디저트정-광고.png" alt="banner advertisement"></Img>
            <AdTextDiv>쿠폰증정4</AdTextDiv>
          </BannerAd>
        </StyledSlider>
        <GridContainer>
          <FixedDiv>정렬방식</FixedDiv>
          <Div>
            <Button variant="contained" color="primary" size="small" onClick={toggleOnlyImage}>
              사진만보기
            </Button>
            <Tag color="rgb(190, 235, 253)" onClick={(e: any) => console.log(e.target.textContent)}>
              오늘의라인업
            </Tag>
            <Tag color="rgb(247, 231, 177)" onClick={(e: any) => console.log(e.target.textContent)}>
              신메뉴소식
            </Tag>
            <Tag color="rgb(169, 160, 252)" onClick={(e: any) => console.log(e.target.textContent)}>
              할인/이벤트
            </Tag>

            <Tag color="rgb(207, 195, 181)" onClick={(e: any) => console.log(e.target.textContent)}>
              휴무일정
            </Tag>
            <Tag color="#FF8787" onClick={(e: any) => console.log(e.target.textContent)}>
              빵나오는시간
            </Tag>
            <Tag color="#99E9F2" onClick={(e: any) => console.log(e.target.textContent)}>
              일상
            </Tag>
            <Tag color="#F1F3F5" onClick={(e: any) => console.log(e.target.textContent)}>
              기타
            </Tag>
          </Div>
        </GridContainer>
        <HorizontalBorder />

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
