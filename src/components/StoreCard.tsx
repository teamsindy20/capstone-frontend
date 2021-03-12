import FaceIcon from '@material-ui/icons/Face'
import RefreshIcon from '@material-ui/icons/Refresh'
import Image from 'next/image'
import { useRouter } from 'next/router'
import TStore from 'src/types/Store'
import styled from 'styled-components'
import { FlexContainerAlignCenter, FlexContainerBetween } from '../styles/FlexContainer'
import styles from '../styles/NextImage.module.css'

const BackgroundColorLi = styled.li`
  background: #fff;
`

const FlexContainerBetweenCenter = styled(FlexContainerBetween)`
  align-items: center;
  padding: 1rem;
`

const RelativePosition = styled.div`
  position: relative;
  width: 4rem;
  height: 4rem;
`

type Props = {
  store: TStore
}

function StoreCard({ store }: Props) {
  const router = useRouter()

  function goToStoreMenuPage() {
    router.push(`/stores/${store.name}`)
  }

  return (
    <BackgroundColorLi onClick={goToStoreMenuPage}>
      <FlexContainerBetweenCenter>
        <RelativePosition>
          <Image
            src={store.imageUrl}
            alt="store"
            layout="fill"
            objectFit="cover"
            className={styles.storeCard}
          />
        </RelativePosition>
        <h3>{store.name}</h3>
        <ul>
          <li>
            <a href="인기인기">#인기인기</a>
          </li>
        </ul>
        <ul>
          <FlexContainerAlignCenter>
            <FaceIcon />
            <div>{store.reorderRatio}명</div>
          </FlexContainerAlignCenter>
          <FlexContainerAlignCenter>
            <RefreshIcon />
            <div>{store.reorderRatio}%</div>
          </FlexContainerAlignCenter>
        </ul>
      </FlexContainerBetweenCenter>
    </BackgroundColorLi>
  )
}

export default StoreCard
