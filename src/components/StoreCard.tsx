import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  StoreCardFragment,
  usePickStoreMutation,
  useStoreLazyQuery,
} from 'src/graphql/generated/types-and-hooks'
import styled from 'styled-components'
import { FlexContainerAlignCenter, FlexContainerBetween } from '../styles/FlexContainer'
import { NormalA } from './MenuCard'
import { Button, Layout } from 'antd'
import { Fragment } from 'react'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded'
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded'
import { handleApolloError } from 'src/apollo/error'
import { toast } from 'react-toastify'

const StyledFavoriteRoundedIcon = styled(FavoriteRoundedIcon)`
  font-size: 1.8rem !important;
  color: #ff8e77;
  margin: 0.2em;
`
const StyledFavoriteBorderRoundedIcon = styled(FavoriteBorderRoundedIcon)`
  font-size: 1.8rem !important;
  color: #ff8e77;
  margin: 0.2em;
`
const Li = styled.li`
  box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.15), 0 0 0 rgba(16, 22, 26, 0), 0 0 0 rgba(16, 22, 26, 0);
  border-radius: min(20px, 2vw);
  overflow: hidden;
  display: grid;
  grid-template-columns: 1.2fr 2fr;
  position: relative;
`

const GridText = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 2fr;
  margin: 9px 10px;
  grid-gap: 0.1rem;
`

const StoreName = styled.h3`
  margin: 0;
`
const Hashtag = styled.h4`
  margin: 0;
  //height: 1rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: #ff9a87;
`
const NoMarginText = styled.div`
  margin: 0;
  color: #a8a8a8;
`
export const StoreImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const AbsoluteButton = styled(Button)`
  display: absolute;
  bottom: 0.1rem;
  right: 0.1rem;
`
export const AbsolutePositionImage = styled.img`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: #ffffff;
`
const AbsoluteTopPosition = styled.div`
  position: absolute;
  top: 0.1rem;
  right: 0.1rem;
`
const AbsoluteBottomPosition = styled.div`
  position: absolute;
  bottom: 0.3rem;
  right: 0.3rem;
`

const FlexContainerBetweenCenter = styled(FlexContainerBetween)`
  align-items: center;
  padding: 0.5rem;
`

const RelativePosition = styled.div`
  position: relative;
  width: 1rem;
  height: 1rem;
`

type Props = {
  store: StoreCardFragment
}

function StoreCard({ store }: Props) {
  const router = useRouter()

  const [fetchStore, { loading: isStoreLoading }] = useStoreLazyQuery({
    fetchPolicy: 'network-only',
    onError: handleApolloError,
  })

  const [pickStore, { loading: isPickingStoreLoading }] = usePickStoreMutation({
    onCompleted: (data) => {
      if (data.pickStore) {
        toast.success(
          <div>
            매장을 찜했어요{' '}
            <span onClick={() => pickStore({ variables: { id: store.id } })} role="alert">
              찜 해제하기
            </span>
          </div>
        )
      } else {
        toast.success(
          <div>
            매장 찜을 해제했어요{' '}
            <span onClick={() => pickStore({ variables: { id: store.id } })} role="alert">
              다시 찜하기
            </span>
          </div>
        )
      }
      fetchStore({ variables: { id: store.id } }) // storeId는 button disabled 로 항상 not null
    },
    onError: handleApolloError,
  })

  function goToStoreMenuPage() {
    router.push(`/stores/${store.name}-${store.id}`)
  }

  function pickStoreStopPropagation(e: MouseEvent) {
    e.stopPropagation()
    if (!isPickingStoreLoading) {
      pickStore({ variables: { id: store.id } })
    }
  }

  return (
    <Li onClick={goToStoreMenuPage}>
      {/* <AbsoluteTopPosition>
        {store.favorite ? (
          <StyledFavoriteRoundedIcon onClick={pickStoreStopPropagation as any} />
        ) : (
          <StyledFavoriteBorderRoundedIcon onClick={pickStoreStopPropagation as any} />
        )}
      </AbsoluteTopPosition> */}
      <AbsoluteBottomPosition>
        <Button>단골혜택</Button>
      </AbsoluteBottomPosition>
      <StoreImage src={store.imageUrls ? store.imageUrls[0] : ''} alt="StoreImage" />
      <GridText>
        <StoreName>{store.name}</StoreName>
        <Hashtag>
          {store.hashtags?.map((hashtag) => (
            <Fragment key={hashtag}>
              <Link href={`/search/${hashtag.slice(1)}`}>
                <NormalA
                  href={`/search/${hashtag.slice(1)}`}
                  onClick={(e) => e.stopPropagation()}
                >{`${hashtag}`}</NormalA>
              </Link>
            </Fragment>
          ))}
        </Hashtag>
        <div>
          <NoMarginText>
            배달팁 &nbsp;
            {store.deliveryCharge}원
          </NoMarginText>
          <NoMarginText>
            최소주문금액 &nbsp;
            {store.minimumDeliveryAmount}원
          </NoMarginText>
          <NoMarginText>
            예상시간 &nbsp;
            {store.minimumDeliveryTime}-{store.maximumDeliveryTime}분
          </NoMarginText>
        </div>
      </GridText>
    </Li>
  )
}

export default StoreCard
