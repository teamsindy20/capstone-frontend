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
import useGoToPage from 'src/hooks/useGoToPage'
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles'
import ButtonBase from '@material-ui/core/ButtonBase'
import Typography from '@material-ui/core/Typography'

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

const ClickableDiv = styled.div`
  cursor: pointer;
`
const images = [
  {
    url: 'https://cdn.pixabay.com/photo/2017/05/04/21/23/cupcakes-2285209_1280.jpg',
    title: '카테고리별 보기',
    width: '50%',
  },
  {
    url:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fimage.nmv.naver.net%2Fblog_2020_08_25_2801%2Ff114664d-e68b-11ea-a019-246e963a49a8_01.jpg&type=sc960_832',
    title: '테마별 보기',
    width: '50%',
  },
]

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      minWidth: 300,
      width: '100%',
    },
    image: {
      position: 'relative',
      height: 200,
      [theme.breakpoints.down('xs')]: {
        width: '100% !important', // Overrides inline-style
        height: 100,
      },
      '&:hover, &$focusVisible': {
        zIndex: 1,
        '& $imageBackdrop': {
          opacity: 0.15,
        },
        '& $imageMarked': {
          opacity: 0,
        },
        '& $imageTitle': {
          border: '4px solid currentColor',
        },
      },
    },
    focusVisible: {},
    imageButton: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.palette.common.white,
    },
    imageSrc: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundSize: 'cover',
      backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: theme.palette.common.black,
      opacity: 0.4,
      transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
      position: 'relative',
      padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
    },
    imageMarked: {
      height: 3,
      width: 18,
      backgroundColor: theme.palette.common.white,
      position: 'absolute',
      bottom: -2,
      left: 'calc(50% - 9px)',
      transition: theme.transitions.create('opacity'),
    },
  })
)

function HomePage() {
  const [isLoadingMenus, setIsLoadingMenus] = useState(false)
  const [hasMoreMenus, setHasMoreMenus] = useState(true)
  const [onlyImage, toggleOnlyImage] = useBoolean(false)

  const goToSearchPage = useGoToPage('/search')

  const classes = useStyles()

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
        <div className={classes.root}>
          {images.map((image) => (
            <ButtonBase
              focusRipple
              key={image.title}
              className={classes.image}
              focusVisibleClassName={classes.focusVisible}
              style={{
                width: image.width,
              }}
            >
              <span
                className={classes.imageSrc}
                style={{
                  backgroundImage: `url(${image.url})`,
                }}
              />
              <span className={classes.imageBackdrop} />
              <span className={classes.imageButton}>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  className={classes.imageTitle}
                >
                  {image.title}
                  <span className={classes.imageMarked} />
                </Typography>
              </span>
            </ButtonBase>
          ))}
        </div>

        <div>정렬 기준</div>
        <button onClick={toggleOnlyImage}>사진만 보기</button>

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
