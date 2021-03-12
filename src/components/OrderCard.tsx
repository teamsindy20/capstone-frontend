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
  order: any
  store: TStore
}

function OrderCard({ order, store }: Props) {
  const router = useRouter()

  const { name } = router.query

  function goToUserOrderPage() {
    router.push(`/users/${name}/orders/${order.id}`)
  }

  return (
    <BackgroundColorLi onClick={goToUserOrderPage}>
      <FlexContainerBetweenCenter>
        <RelativePosition>
          <Image
            src={order.imageUrl}
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
            {/* <FaceIcon /> */}
            <div>{order.reorderRatio}명</div>
          </FlexContainerAlignCenter>
          <FlexContainerAlignCenter>
            {/* <RefreshIcon /> */}
            <div>{order.reorderRatio}%</div>
          </FlexContainerAlignCenter>
        </ul>
      </FlexContainerBetweenCenter>
    </BackgroundColorLi>
  )
}

export default OrderCard
