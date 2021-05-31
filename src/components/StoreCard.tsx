import FaceIcon from '@material-ui/icons/Face'
import RefreshIcon from '@material-ui/icons/Refresh'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { StoreCardFragment } from 'src/graphql/generated/types-and-hooks'
import styled from 'styled-components'
import { FlexContainerAlignCenter, FlexContainerBetween } from '../styles/FlexContainer'
import styles from '../styles/NextImage.module.css'
import { NormalA } from './MenuCard'
import { Button, Layout } from 'antd'
import { Fragment } from 'react'

const { Header, Footer, Sider, Content } = Layout

const Li = styled.li`
  background: #ffffff;
  box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.15), 0 0 0 rgba(16, 22, 26, 0), 0 0 0 rgba(16, 22, 26, 0);
  border-radius: min(20px, 2vw);
  overflow: hidden;
  margin: 0.8rem 0.5rem;
`
const GridCard = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
`

const GridText = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 3fr;
  margin: 9px 10px;
  grid-gap: 3px;
`

const StoreName = styled.h3`
  margin: 0;
`
const Hashtag = styled.h4`
  margin: 0;
`
const NoMarginText = styled.div`
  margin: 0;
  color: #a8a8a8;
`
export const StoreImage = styled.img`
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: #ffffff;
`
export const AbsolutePositionImage = styled.img`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: #ffffff;
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

  function goToStoreMenuPage() {
    router.push(`/stores/${store.name}-${store.id}`)
  }

  return (
    <Li onClick={goToStoreMenuPage}>
      <GridCard>
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
      </GridCard>
    </Li>
  )
}

export default StoreCard
