import BookmarkRoundedIcon from '@material-ui/icons/BookmarkRounded'
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded'
import SearchRoundedIcon from '@material-ui/icons/SearchRounded'
import TuneRoundedIcon from '@material-ui/icons/TuneRounded'
import NotificationsRoundedIcon from '@material-ui/icons/NotificationsRounded'
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded'
import IconButton from '@material-ui/core/IconButton'
import LocalGroceryStoreRoundedIcon from '@material-ui/icons/LocalGroceryStoreRounded'
import grey from '@material-ui/core/colors/grey'
import red from '@material-ui/core/colors/red'
import styled from 'styled-components'
import PageLayout from '../components/layouts/PageLayout'
import PageHead from '../components/layouts/PageHead'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import MenuCard, { BoldA, MenuLoadingCard } from 'src/components/MenuCard'
import TopHeader from 'src/components/TopHeader'
import useBoolean from 'src/hooks/useBoolean'
import { Fragment, useState, useEffect, useContext } from 'react'
import { FlexContainerBetween, FlexContainerAlignCenter } from 'src/styles/FlexContainer'
import { HEADER_HEIGHT, TABLET_MIN_WIDTH } from 'src/models/constants'
import { sleep, stopPropagation } from 'src/utils/commons'
import useGoToPage from 'src/hooks/useGoToPage'
import {
  useMenuLazyQuery,
  useMenusQuery,
  useUserPreferencesQuery,
} from 'src/graphql/generated/types-and-hooks'
import { handleApolloError } from 'src/apollo/error'
import Slider from 'react-slick'
import ClientSideLink from 'src/components/atoms/ClientSideLink'
import Link from 'next/link'
import { GlobalContext } from './_app'

const PADDING_TOP = '3rem'

const BORDER_HEIGHT = '2px'

const FlexContainerBetweenCenter = styled(FlexContainerBetween)`
  align-items: center;
  height: 100%;
`

const StyledSearchRoundedIcon = { fontSize: 30, color: grey[800] }

const StyledNotificationsRoundedIcon = { fontSize: 30, color: grey[800] }

const StyledTuneRoundedIcon = { fontSize: 30, color: '#ffffff' }

const StyledLocationOnRoundedIcon = { fontSize: 20, color: grey[800] }

const StyledExpandMoreRoundedIcon = { fontSize: 20, color: grey[800] }

// const StyledLocalGroceryStoreRoundedIcon = { fontSize: 40, color: 'default', variant: 'outlined' }

const StyledLocalGroceryStoreRoundedIcon = styled(LocalGroceryStoreRoundedIcon)`
  font-size: 55px !important;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  padding: 10px;
  //font-color: #3c3c3c;
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
  grid-template-columns: 1fr 6fr 1fr;
  align-items: center;
`

// const SmallText = styled.div`
//   text-align: center;
// `

const MiddleText = styled.div`
  text-align: center;
  padding: 0.5rem;
  margin: 0rem 0.5rem 0.5rem 0.5rem;
  border-radius: 1rem;
  background-color: #fff5f5;
`

const StyledSlider = styled(Slider)`
  margin-bottom: 1rem;
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

export const GridContainerUl = styled.ul<{ onlyImage: boolean }>`
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

export const PhotoOnlyButton = styled.button`
  background-color: #f3c7ab;
  align-items: center;
  font-size: 13px;
  line-height: 13px;
  border: none;
  width: 80%;
  height: 60%;
  margin: auto;
`

const FixedPosition = styled.div`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: ${HEADER_HEIGHT};
  z-index: 1;
  width: 100%;
  max-width: ${TABLET_MIN_WIDTH};
  text-align: right;
`

function HomePage() {
  const { user, loading } = useContext(GlobalContext)

  const [hasMoreMenus, setHasMoreMenus] = useState(true)
  const [onlyImage, toggleOnlyImage] = useBoolean(false)

  const menusQueryResult = useMenusQuery({
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
    onError: handleApolloError,
  })

  const [fetchMenu, { loading: isMenuLoading }] = useMenuLazyQuery({
    fetchPolicy: 'network-only',
    onError: handleApolloError,
  })

  const userPreferencesQueryResult = useUserPreferencesQuery({
    notifyOnNetworkStatusChange: true,
    skip: !user,
  })

  const menus = menusQueryResult.data?.menus
  const isMenusLoading = menusQueryResult.networkStatus < 7

  const preferences = userPreferencesQueryResult.data?.me.preferences
  const isUserPreferencesLoading = userPreferencesQueryResult.networkStatus < 7

  async function fetchMoreMenus() {
    if (menus?.length) {
      await sleep(5000) // fetchMore({ variables: { from, count } })
      setHasMoreMenus(false)
    } else {
      setHasMoreMenus(false)
    }
  }

  const [sentryRef] = useInfiniteScroll({
    loading: isMenusLoading,
    hasNextPage: hasMoreMenus,
    onLoadMore: fetchMoreMenus,
  })

  return (
    <PageHead>
      <PageLayout>
        <TopHeader>
          <FlexContainerBetweenCenter>
            <FlexContainerAlignCenter>
              <LocationOnRoundedIcon style={StyledLocationOnRoundedIcon} />
              흑석동
              <ExpandMoreRoundedIcon style={StyledExpandMoreRoundedIcon} />
            </FlexContainerAlignCenter>
            <FlexContainerAlignCenter>
              <FlexContainerAlignCenter>
                <ClientSideLink href="/users/username/regulars">단골</ClientSideLink>
              </FlexContainerAlignCenter>
              <ClientSideLink href="/users/username/notifications">
                <NotificationsRoundedIcon style={StyledNotificationsRoundedIcon} />
              </ClientSideLink>
              <ClientSideLink href="/search">
                <SearchRoundedIcon style={StyledSearchRoundedIcon} />
              </ClientSideLink>
            </FlexContainerAlignCenter>
          </FlexContainerBetweenCenter>
        </TopHeader>

        <StyledSlider {...settings}>
          <BannerAd>
            <Img src="/banner.png" alt="banner advertisement"></Img>
            <AdTextDiv>
              <b>OPEN EVENT!</b> <br />
              초코칩쿠키 무조건 증정!
            </AdTextDiv>
          </BannerAd>
          <BannerAd>
            <Img src="/banner.png" alt="banner advertisement"></Img>
            <AdTextDiv>쿠폰증정2</AdTextDiv>
          </BannerAd>
          <BannerAd>
            <Img src="/banner.png" alt="banner advertisement"></Img>
            <AdTextDiv>쿠폰증정3</AdTextDiv>
          </BannerAd>
          <BannerAd>
            <Img src="/banner.png" alt="banner advertisement"></Img>
            <AdTextDiv>쿠폰증정4</AdTextDiv>
          </BannerAd>
        </StyledSlider>
        <GridContainer>
          <FixedDiv>정렬방식</FixedDiv>
          <Div>
            <Tag color="rgb(190, 235, 253)" onClick={(e: any) => console.log(e.target.textContent)}>
              맞춤추천
            </Tag>
            <Tag color="rgb(230, 230, 230)" onClick={(e: any) => console.log(e.target.textContent)}>
              좋아요순
            </Tag>
            <Tag color="rgb(230, 230, 230)" onClick={(e: any) => console.log(e.target.textContent)}>
              재주문율순
            </Tag>

            <Tag color="rgb(230, 230, 230)" onClick={(e: any) => console.log(e.target.textContent)}>
              주문수순
            </Tag>
            <Tag color="rgb(230, 230, 230)" onClick={(e: any) => console.log(e.target.textContent)}>
              배달팁적은순
            </Tag>
            <Tag color="rgb(230, 230, 230)" onClick={(e: any) => console.log(e.target.textContent)}>
              리뷰수순
            </Tag>
            <Tag color="rgb(230, 230, 230)" onClick={(e: any) => console.log(e.target.textContent)}>
              거리순
            </Tag>
          </Div>

          <PhotoOnlyButton onClick={toggleOnlyImage}>Photo Only</PhotoOnlyButton>
        </GridContainer>

        <MiddleText>
          {loading ? (
            'user authenticating...'
          ) : !user ? (
            <div>
              맞춤 추천: <ClientSideLink href="/login">로그인 필요</ClientSideLink>
            </div>
          ) : isUserPreferencesLoading ? (
            'user preferences loading...'
          ) : preferences?.length ? (
            <div>
              김빵순님의 취향:{' '}
              {preferences.map((hashtag) => (
                <Fragment key={hashtag}>
                  <li>
                    <Link href={`/search/${hashtag.slice(1)}`}>
                      <BoldA href={`/search/${hashtag.slice(1)}`} onClick={stopPropagation}>
                        {hashtag}
                      </BoldA>
                    </Link>
                  </li>
                  &nbsp;
                </Fragment>
              ))}
            </div>
          ) : (
            <div>
              설정한 취향이 아직 없어요.{' '}
              <ClientSideLink href="/users/username/preferences">취향 설정하러 가기</ClientSideLink>
            </div>
          )}
        </MiddleText>

        <GridContainerUl onlyImage={onlyImage}>
          {menus?.map((menu) => (
            <MenuCard
              key={menu.id}
              afterPickingMenu={() => fetchMenu({ variables: { id: menu.id } })}
              menu={menu as any}
              onlyImage={onlyImage}
            />
          ))}
        </GridContainerUl>
        {(isMenusLoading || hasMoreMenus) && (
          <div ref={sentryRef}>
            <MenuLoadingCard onlyImage={onlyImage} />
          </div>
        )}

        <FixedPosition>
          <ClientSideLink href="/cart">
            <IconButton aria-label="shopping cart" color="default" component="div">
              <StyledLocalGroceryStoreRoundedIcon />
            </IconButton>
          </ClientSideLink>
        </FixedPosition>
      </PageLayout>
    </PageHead>
  )
}

export default HomePage
