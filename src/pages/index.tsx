import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded'
import SearchRoundedIcon from '@material-ui/icons/SearchRounded'
import NotificationsRoundedIcon from '@material-ui/icons/NotificationsRounded'
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded'
import IconButton from '@material-ui/core/IconButton'
import LocalActivityRoundedIcon from '@material-ui/icons/LocalActivityRounded'
import LocalGroceryStoreRoundedIcon from '@material-ui/icons/LocalGroceryStoreRounded'
import grey from '@material-ui/core/colors/grey'
import styled from 'styled-components'
import PageLayout from '../components/layouts/PageLayout'
import PageHead from '../components/layouts/PageHead'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import MenuCard, { NormalA, MenuLoadingCard } from 'src/components/MenuCard'
import TopHeader from 'src/components/TopHeader'
import useBoolean from 'src/hooks/useBoolean'
import { Fragment, useState, useContext, CSSProperties } from 'react'
import { FlexContainerBetween, FlexContainerAlignCenter } from 'src/styles/FlexContainer'
import { HEADER_HEIGHT, TABLET_MIN_WIDTH } from 'src/models/constants'
import { sleep, stopPropagation } from 'src/utils/commons'
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
import { Tabs, Carousel, Divider, Tag, Select, Checkbox } from 'antd'
import { SmileOutlined } from '@ant-design/icons'

const { TabPane } = Tabs

const contentStyle: CSSProperties = {
  height: '150px',
  color: '#929393',
  lineHeight: '150px',
  background: '#EAEAEA',
  textAlign: 'center',
}

const MarginDiv = styled.div`
  margin: 0.5rem;
`

const FlexContainerBetweenCenter = styled(FlexContainerBetween)`
  align-items: center;
  height: 100%;
`

const StyledLocalActivityRoundedIcon = { fontSize: 30, color: grey[800] }

const StyledSearchRoundedIcon = { fontSize: 30, color: grey[800] }

const StyledNotificationsRoundedIcon = { fontSize: 30, color: grey[800] }

const StyledLocationOnRoundedIcon = { fontSize: 20, color: grey[800] }

const StyledExpandMoreRoundedIcon = { fontSize: 20, color: grey[800] }

const StyledLocalGroceryStoreRoundedIcon = styled(LocalGroceryStoreRoundedIcon)`
  font-size: 55px !important;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  padding: 10px;
  //font-color: #3c3c3c;
`
const { Option } = Select

const StyledTab = styled(Tabs)`
  color: #f57961;
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
const StyledTag = styled.span<{ color: string }>`
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
function handleChange(value: any) {
  console.log(`selected ${value}`)
}

function HomePage() {
  const { user, loading } = useContext(GlobalContext)

  const [hasMoreMenus, setHasMoreMenus] = useState(true)
  const [onlyImage, toggleOnlyImage] = useBoolean(false)
  const [doesFranchiseIncluded, toggleWhetherIncludeFranchise] = useBoolean(false)

  const menusQueryResult = useMenusQuery({
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
    onError: handleApolloError,
  })

  const [fetchMenu] = useMenuLazyQuery({
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

  console.log(isUserPreferencesLoading, preferences)

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
                <ClientSideLink href="/users/username/regulars">
                  <LocalActivityRoundedIcon
                    style={StyledLocalActivityRoundedIcon}
                  ></LocalActivityRoundedIcon>
                </ClientSideLink>
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

        <Tabs defaultActiveKey="1" size="small" tabBarStyle={{ color: '#929393' }}>
          <TabPane tab="디저트핏" key="1">
            <Carousel autoplay>
              <div>
                <h3 style={contentStyle}>내게 딱 맞는 디저트핏!</h3>
              </div>
              <div>
                <h3 style={contentStyle}>Dessert Fit!</h3>
              </div>
              <div>
                <h3 style={contentStyle}>김빵순 사랑해</h3>
              </div>
              <div>
                <h3 style={contentStyle}>Hi~ 에이치아이~ </h3>
              </div>
            </Carousel>
            {/* <StyledSlider {...settings}>
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
            </StyledSlider> */}
            <Divider orientation="left">
              {loading ? (
                ''
              ) : !user ? (
                ''
              ) : isUserPreferencesLoading || !preferences ? (
                ''
              ) : (
                <>
                  <SmileOutlined />
                  &nbsp;{userPreferencesQueryResult.data?.me.name ?? '김빵순'}님이 설정한
                  디저트핏은?
                </>
              )}
            </Divider>
            <MiddleText>
              {loading ? (
                '사용자 인증 중'
              ) : !user ? (
                '로그인 후 나만의 디저트핏을 설정해보세요!'
              ) : isUserPreferencesLoading || !preferences ? (
                '디저트핏 로딩 중...'
              ) : preferences.length ? (
                preferences.map((hashtag) => (
                  <Link key={hashtag} href={`/search/${hashtag.slice(1)}`}>
                    <NormalA href={`/search/${hashtag.slice(1)}`} onClick={stopPropagation}>
                      <Tag color="#F57961">{hashtag}</Tag>
                    </NormalA>
                  </Link>
                ))
              ) : (
                <ClientSideLink href="/users/username/preferences">
                  내게 딱 맞는 디저트핏을 설정해보세요!
                </ClientSideLink>
              )}
            </MiddleText>
            <Divider />
            <Checkbox checked={doesFranchiseIncluded} onChange={toggleWhetherIncludeFranchise}>
              프렌차이즈 포함
            </Checkbox>
            <Checkbox checked={onlyImage} onChange={toggleOnlyImage}>
              사진만 보기
            </Checkbox>
            <Divider />
            <MarginDiv>
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
            </MarginDiv>
          </TabPane>

          <TabPane tab="카테고리" key="2">
            카테고리 선택
          </TabPane>

          <TabPane tab="트렌드" key="3">
            트렌드 디저트
          </TabPane>

          <TabPane tab="베스트" key="4">
            베스트 메뉴들 순위
            <MarginDiv>
              <GridContainer>
                <FixedDiv>정렬방식</FixedDiv>
                <Div>
                  <StyledTag
                    color="rgb(190, 235, 253)"
                    onClick={(e: any) => console.log(e.target.textContent)}
                  >
                    맞춤추천
                  </StyledTag>
                  <StyledTag
                    color="rgb(230, 230, 230)"
                    onClick={(e: any) => console.log(e.target.textContent)}
                  >
                    좋아요순
                  </StyledTag>
                  <StyledTag
                    color="rgb(230, 230, 230)"
                    onClick={(e: any) => console.log(e.target.textContent)}
                  >
                    재주문율순
                  </StyledTag>

                  <StyledTag
                    color="rgb(230, 230, 230)"
                    onClick={(e: any) => console.log(e.target.textContent)}
                  >
                    주문수순
                  </StyledTag>
                  <StyledTag
                    color="rgb(230, 230, 230)"
                    onClick={(e: any) => console.log(e.target.textContent)}
                  >
                    배달팁적은순
                  </StyledTag>
                  <StyledTag
                    color="rgb(230, 230, 230)"
                    onClick={(e: any) => console.log(e.target.textContent)}
                  >
                    리뷰수순
                  </StyledTag>
                  <StyledTag
                    color="rgb(230, 230, 230)"
                    onClick={(e: any) => console.log(e.target.textContent)}
                  >
                    거리순
                  </StyledTag>
                </Div>
                <Select defaultValue="fit" style={{ width: 120 }} onChange={handleChange}>
                  <Option value="fit">맞춤추천</Option>
                  <Option value="like">좋아요</Option>
                  <Option value="Yiminghe">거리</Option>
                </Select>
              </GridContainer>
            </MarginDiv>
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
          </TabPane>
        </Tabs>

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
