import { useRouter } from 'next/router'
import { StoreCardFragment, usePickStoreMutation } from 'src/graphql/generated/types-and-hooks'
import styled from 'styled-components'
import { FlexContainerBetween } from '../styles/FlexContainer'
import { Button } from 'antd'
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded'
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded'
import { handleApolloError } from 'src/apollo/error'
import { toast } from 'react-toastify'
import ClientSideLink from './atoms/ClientSideLink'
import { Hashtag, Hashtags, SquareFrame } from './MenuCard'
import { useRef, ReactText } from 'react'
import Image from 'next/image'

const GridContainerLi = styled.li`
  display: grid;
  grid-template-columns: 1fr 2fr;
  position: relative;
  overflow: hidden;

  cursor: pointer;
  box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.15), 0 0 0 rgba(16, 22, 26, 0), 0 0 0 rgba(16, 22, 26, 0);
  border-radius: max(10px, 1vw);
`

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

const FlexContainerBetweenColumn = styled(FlexContainerBetween)`
  flex-flow: column nowrap;
  position: relative;
  padding: 0.5rem 1rem;
  outline: 1px solid #dbdcdd;
`

const StoreName = styled.h3`
  font-size: 1.1rem;
`

const AbsolutePositionTopRight = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`

const NoMarginText = styled.h5`
  font-size: 0.9rem;
  color: #a8a8a8;
`

const AbsolutePositionBottomRight = styled.div`
  position: absolute;
  bottom: 0.3rem;
  right: 0.3rem;
`

type Props = {
  afterPickingStore: () => void
  store: StoreCardFragment
}

function StoreCard({ afterPickingStore, store }: Props) {
  const toastId = useRef<ReactText>('')
  const router = useRouter()

  const [pickStore, { loading: isPickingStoreLoading }] = usePickStoreMutation({
    onCompleted: (data) => {
      function restorePicking() {
        pickStore({ variables: { id: store.id } })
      }

      if (data.pickStore) {
        if (toastId.current) toast.dismiss(toastId.current)
        toastId.current = toast(
          <div>
            <b>{store.name}</b>을 찜했어요
            <button onClick={restorePicking}>되돌리기</button>
          </div>
        )
      } else {
        if (toastId.current) toast.dismiss(toastId.current)
        toastId.current = toast(
          <div>
            <b>{store.name}</b>의 찜을 해제했어요
            <button onClick={restorePicking}>되돌리기</button>
          </div>
        )
      }

      afterPickingStore()
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
    <GridContainerLi onClick={goToStoreMenuPage}>
      <SquareFrame>
        <ClientSideLink href={`/stores/${store.name}-${store.id}`}>
          <Image
            src={store.imageUrls ? store.imageUrls[0] : ''}
            alt="store"
            layout="fill"
            objectFit="cover"
          />
        </ClientSideLink>
      </SquareFrame>

      <FlexContainerBetweenColumn>
        <div>
          <StoreName>{store.name}</StoreName>
          <AbsolutePositionTopRight>
            {store.favorite ? (
              <StyledFavoriteRoundedIcon onClick={pickStoreStopPropagation as any} />
            ) : (
              <StyledFavoriteBorderRoundedIcon onClick={pickStoreStopPropagation as any} />
            )}
          </AbsolutePositionTopRight>
          <Hashtags>
            {store.hashtags?.map((hashtag) => (
              <ClientSideLink key={hashtag} href={`/search/${hashtag.slice(1)}`}>
                <Hashtag key={hashtag}>{hashtag}&nbsp;</Hashtag>
              </ClientSideLink>
            ))}
          </Hashtags>
          <br />
        </div>

        <div>
          <NoMarginText>배달팁 {store.deliveryCharge}원</NoMarginText>
          <NoMarginText>최소주문금액 {store.minimumDeliveryAmount}원</NoMarginText>
          <NoMarginText>
            예상시간 {store.minimumDeliveryTime}-{store.maximumDeliveryTime}분
          </NoMarginText>
        </div>

        <AbsolutePositionBottomRight>
          <Button onClick={(e) => e.stopPropagation()}>혜택</Button>
        </AbsolutePositionBottomRight>
      </FlexContainerBetweenColumn>
    </GridContainerLi>
  )
}

export default StoreCard
