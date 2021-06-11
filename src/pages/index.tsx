import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded'
import IconButton from '@material-ui/core/IconButton'
import LocalGroceryStoreRoundedIcon from '@material-ui/icons/LocalGroceryStoreRounded'
import grey from '@material-ui/core/colors/grey'
import styled from 'styled-components'
import NavigationLayout from '../components/layouts/NavigationLayout'
import PageHead from '../components/layouts/PageHead'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import MenuCard, { MenuLoadingCard } from 'src/components/MenuCard'
import TopHeader from 'src/components/TopHeader'
import useBoolean from 'src/hooks/useBoolean'
import Image from 'next/image'
import { useState, useContext } from 'react'
import { FlexContainerBetween, FlexContainerAlignCenter } from 'src/styles/FlexContainer'
import { HEADER_HEIGHT, TABLET_MIN_WIDTH } from 'src/models/constants'
import { sleep } from 'src/utils/commons'
import { useMenusQuery, useUserPreferencesQuery } from 'src/graphql/generated/types-and-hooks'
import { handleApolloError } from 'src/apollo/error'
import ClientSideLink from 'src/components/atoms/ClientSideLink'
import { GlobalContext } from './_app'
import { Tabs, Carousel, Divider, Tag, Checkbox } from 'antd'
import { SelectedPreferenceButton } from 'src/pages/users/[name]/preferences/index'
import { useRouter } from 'next/router'

const { TabPane } = Tabs

const FlexContainerBetweenCenter = styled(FlexContainerBetween)`
  align-items: center;
  height: 100%;
`

const StyledExpandMoreRoundedIcon = { fontSize: 23, color: grey[800] }

const StyledLocalGroceryStoreRoundedIcon = styled(LocalGroceryStoreRoundedIcon)`
  font-size: 50px !important;
  background-color: #f57961;
  border-radius: 50%;
  padding: 10px;
  color: white !important;
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.08) !important;
`
const LocationText = styled.h3`
  margin: 16px 2px 16px 16px;
  font-size: 18px;
  font-weight: bold;
  line-height: 1;
`

export const IconGridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 0 16px 16px 16px;
  top: 0;
  align-items: center;
  height: 100%;
`
const PreferenceText = styled.div`
  text-align: center;
  border-radius: 1rem;
`

export const GridContainerUl = styled.ul<{ onlyImage: boolean }>`
  display: grid;
  grid-template-columns: ${(p) => (p.onlyImage ? '1fr 1fr 1fr' : '1fr')};
  gap: ${(p) => (p.onlyImage ? 'min(1vw, 0.5rem)' : 'min(2vw, 1rem)')};
  padding: ${(p) => (p.onlyImage ? 'min(1vw, 0.5rem)' : 'min(2vw, 1rem)')};

  background: #fcfcfc;
`

const FlexContainerOverflowScroll = styled.div`
  display: flex;
  align-items: center;
  overflow: scroll hidden;
  margin: 0 1rem 0 0;
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

const BannerFrame = styled.div`
  padding-top: 30%;
  position: relative;
  background: #fcfcfc;
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

const MiddleGrid = styled.div`
  display: grid;
  align-items: center;
  text-align: center;
  gap: 0.5rem;

  background-color: white;
  padding: 1rem;
  border: solid 1px #e8e8e8;
`

const MiddleFlexContainer = styled.div`
  display: flex;
  align-content: center;
`

const MiddleText = styled.span`
  font-weight: 500;
`

const MiddleBoldText = styled.b`
  font-size: 1.1rem;
`

export const IconImg = styled.img`
  width: 20px;
  height: 20px;
  margin: 0;
`

export const TopIconImg = styled.img`
  width: 22px;
  height: 22px;
  margin: 0 8px 0 8px;
`
const ColoredLogo = styled.img`
  width: 2rem;
  height: 2rem;
  margin: 0;
  border-radius: 50%;
`

function HomePage() {
  console.log(process.env.NODE_ENV)

  const { user, loading } = useContext(GlobalContext)
  const router = useRouter()

  const [hasMoreMenus, setHasMoreMenus] = useState(true)
  const [onlyImage, toggleOnlyImage] = useBoolean(false)
  const [doesFranchiseIncluded, toggleWhetherIncludeFranchise] = useBoolean(false)

  const menusQueryResult = useMenusQuery({
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
    onError: handleApolloError,
  })

  const menus = menusQueryResult.data?.menus
  const isMenusLoading = menusQueryResult.networkStatus < 7

  const userPreferencesQueryResult = useUserPreferencesQuery({
    notifyOnNetworkStatusChange: true,
    skip: !user,
  })

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
      <NavigationLayout>
        <TopHeader>
          <FlexContainerBetweenCenter>
            <FlexContainerAlignCenter>
              <LocationText>흑석동</LocationText>
              <ClientSideLink href="/location">
                <ExpandMoreRoundedIcon style={StyledExpandMoreRoundedIcon} />
              </ClientSideLink>
            </FlexContainerAlignCenter>
            <FlexContainerAlignCenter>
              <ClientSideLink href="/users/username/regulars">
                <TopIconImg src="/442@3x.png" alt="regular stores" />
              </ClientSideLink>
              <ClientSideLink href="/users/username/notifications">
                <TopIconImg src="/441@3x.png" alt="notifications" />
              </ClientSideLink>
              <ClientSideLink href="/search">
                <TopIconImg src="/440@3x.png" alt="search" />
              </ClientSideLink>
            </FlexContainerAlignCenter>
          </FlexContainerBetweenCenter>
        </TopHeader>

        <Tabs
          defaultActiveKey="1"
          size="large"
          tabBarStyle={{ color: '#929393', paddingLeft: '1.5rem' }}
        >
          <TabPane tab="디저트핏" key="1">
            <Carousel autoplay>
              <BannerFrame>
                <Image src="/bannerad.png" alt="banner_ad" layout="fill" objectFit="cover" />
              </BannerFrame>
              <BannerFrame>
                <Image src="/banner.png" alt="banner_ad" layout="fill" objectFit="cover" />
              </BannerFrame>
              <BannerFrame>
                <Image src="/bannerad.png" alt="banner_ad" layout="fill" objectFit="cover" />
              </BannerFrame>
              <BannerFrame>
                <Image src="/banner.png" alt="banner_ad" layout="fill" objectFit="cover" />
              </BannerFrame>
            </Carousel>

            <MiddleGrid
              onClick={() => !user && router.push('/login')}
              style={!user ? { cursor: 'pointer' } : undefined}
            >
              {loading ? (
                ''
              ) : !user ? (
                ''
              ) : isUserPreferencesLoading || !preferences ? (
                ''
              ) : (
                <FlexContainerBetween>
                  <MiddleFlexContainer>
                    <ColoredLogo src="/dessert-fit-logo-color.webp" />
                    &nbsp;
                    <MiddleText>
                      <MiddleBoldText>
                        {userPreferencesQueryResult.data?.me.name ?? '김빵순'}&nbsp;
                      </MiddleBoldText>
                      님이 설정한 디저트핏은?
                    </MiddleText>
                  </MiddleFlexContainer>
                  <ClientSideLink href="/users/username/preferences">
                    <IconImg src="/preference.png" />
                  </ClientSideLink>
                </FlexContainerBetween>
              )}

              <PreferenceText>
                {loading ? (
                  '사용자 인증 중'
                ) : !user ? (
                  <div>
                    <ClientSideLink href="/login">로그인</ClientSideLink> 후 나만의 디저트핏을
                    설정해보세요!
                  </div>
                ) : isUserPreferencesLoading || !preferences ? (
                  '디저트핏 로딩 중...'
                ) : preferences.length ? (
                  preferences.map((hashtag) => (
                    <ClientSideLink key={hashtag} href={`/search/${encodeURIComponent(hashtag)}`}>
                      <Tag color="#F57961">{hashtag}</Tag>
                    </ClientSideLink>
                  ))
                ) : (
                  <ClientSideLink href="/users/username/preferences">
                    <SelectedPreferenceButton shape="round">#딸기</SelectedPreferenceButton>
                    <SelectedPreferenceButton shape="round">#초코</SelectedPreferenceButton>
                    <SelectedPreferenceButton shape="round">#저탄수</SelectedPreferenceButton>
                    <SelectedPreferenceButton shape="round">#비건</SelectedPreferenceButton>
                  </ClientSideLink>
                )}
              </PreferenceText>
            </MiddleGrid>

            <Divider orientation="left">
              <Checkbox checked={doesFranchiseIncluded} onChange={toggleWhetherIncludeFranchise}>
                프랜차이즈 포함
              </Checkbox>
              <Checkbox checked={onlyImage} onChange={toggleOnlyImage}>
                사진만 보기
              </Checkbox>
            </Divider>

            <GridContainerUl onlyImage={onlyImage}>
              {menus
                ?.filter((menu) => doesFranchiseIncluded || !menu.store.isFranchise)
                .map((menu) => (
                  <MenuCard key={menu.id} menu={menu} onlyImage={onlyImage} />
                ))}
              {(isMenusLoading || hasMoreMenus) && (
                <div ref={sentryRef}>
                  <MenuLoadingCard onlyImage={onlyImage} />
                </div>
              )}
            </GridContainerUl>
          </TabPane>

          <TabPane tab="카테고리" key="2">
            카테고리 선택
          </TabPane>

          <TabPane tab="트렌드" key="3">
            트렌드 디저트
          </TabPane>

          <TabPane tab="베스트" key="4">
            <FlexContainerOverflowScroll>
              <StyledTag
                color="rgb(190, 235, 253)"
                onClick={(e: any) => console.log(e.target.textContent)}
              >
                좋아요비율 높은 순
              </StyledTag>
              <StyledTag
                color="rgb(230, 230, 230)"
                onClick={(e: any) => console.log(e.target.textContent)}
              >
                재주문율 높은 순
              </StyledTag>

              <StyledTag
                color="rgb(230, 230, 230)"
                onClick={(e: any) => console.log(e.target.textContent)}
              >
                주문 많은 순
              </StyledTag>
              <StyledTag
                color="rgb(230, 230, 230)"
                onClick={(e: any) => console.log(e.target.textContent)}
              >
                배달팁 적은 순
              </StyledTag>
              <StyledTag
                color="rgb(230, 230, 230)"
                onClick={(e: any) => console.log(e.target.textContent)}
              >
                리뷰 많은 순
              </StyledTag>
              <StyledTag
                color="rgb(230, 230, 230)"
                onClick={(e: any) => console.log(e.target.textContent)}
              >
                가까운 거리 순
              </StyledTag>
              <StyledTag
                color="rgb(230, 230, 230)"
                onClick={(e: any) => console.log(e.target.textContent)}
              >
                단골 많은 순
              </StyledTag>
            </FlexContainerOverflowScroll>

            <Divider orientation="right">
              <Checkbox checked={doesFranchiseIncluded} onChange={toggleWhetherIncludeFranchise}>
                프렌차이즈 포함
              </Checkbox>
              <Checkbox checked={onlyImage} onChange={toggleOnlyImage}>
                사진만 보기
              </Checkbox>
            </Divider>

            <GridContainerUl onlyImage={onlyImage}>
              {menus
                ?.filter((menu) => doesFranchiseIncluded || !menu.store.isFranchise)
                .map((menu) => (
                  <MenuCard key={menu.id} menu={menu} onlyImage={onlyImage} />
                ))}
              {(isMenusLoading || hasMoreMenus) && (
                <div ref={sentryRef}>
                  <MenuLoadingCard onlyImage={onlyImage} />
                </div>
              )}
            </GridContainerUl>
          </TabPane>
        </Tabs>

        <FixedPosition>
          <ClientSideLink href="/cart">
            <IconButton aria-label="shopping cart" color="default" component="div">
              <StyledLocalGroceryStoreRoundedIcon />
            </IconButton>
          </ClientSideLink>
        </FixedPosition>
      </NavigationLayout>
    </PageHead>
  )
}

export default HomePage
