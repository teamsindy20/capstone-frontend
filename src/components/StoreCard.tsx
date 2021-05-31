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
import { Button } from 'antd'

const Li = styled.li`
  background: #ffffff;
  box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.15), 0 0 0 rgba(16, 22, 26, 0), 0 0 0 rgba(16, 22, 26, 0);
  border-radius: min(20px, 2vw);
  overflow: hidden;
  padding: 0.8rem;
  margin: 0.8rem 0.5rem;
`

const FlexContainerBetweenCenter = styled(FlexContainerBetween)`
  align-items: center;
  padding: 0.5rem;
`

const RelativePosition = styled.div`
  position: relative;
  width: 4rem;
  height: 4rem;
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
      <FlexContainerBetweenCenter>
        <RelativePosition>
          <Image
            src={store.imageUrls ? store.imageUrls[0] : ''}
            alt="store"
            layout="fill"
            objectFit="cover"
            className={styles.storeCard}
          />
        </RelativePosition>
        <h3>{store.name}</h3>
        <ul>
          {store.hashtags?.map((hashtag) => (
            <li key={hashtag}>
              <Link href={`/search/${hashtag.slice(1)}`}>
                <NormalA
                  href={`/search/${hashtag.slice(1)}`}
                  onClick={(e) => e.stopPropagation()}
                >{`${hashtag}`}</NormalA>
              </Link>
            </li>
          ))}
        </ul>
        <ul>
          <FlexContainerAlignCenter>
            <FaceIcon />
            <div>{store.regularCustomerCount}명</div>
          </FlexContainerAlignCenter>
          <FlexContainerAlignCenter>
            <RefreshIcon />
            <div>{store.reorderRatio}%</div>
          </FlexContainerAlignCenter>
        </ul>
      </FlexContainerBetweenCenter>
    </Li>
  )
}

export default StoreCard
