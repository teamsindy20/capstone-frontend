import FaceIcon from '@material-ui/icons/Face'
import RefreshIcon from '@material-ui/icons/Refresh'
import TStore from 'src/types/Store'
import styled from 'styled-components'
import { FlexContainerAlignCenter, FlexContainerBetween } from './styles/FlexContainer'

const NoStyleLi = styled.li`
  background: #fff;
`

const FlexContainerBetweenPadding = styled(FlexContainerBetween)`
  padding: 1rem;
`

const StyledImg = styled.img`
  width: 20%;
  height: 20%;
  border-radius: 5px;
  object-fit: cover;
`

type Props = {
  store: TStore
}

function StoreCard({ store }: Props) {
  return (
    <NoStyleLi>
      <FlexContainerBetweenPadding>
        <StyledImg src={store.imageUrl} alt="store" />
        <h3>{store.name}</h3>
        <ul>
          <li>#인기인기</li>
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
      </FlexContainerBetweenPadding>
    </NoStyleLi>
  )
}

export default StoreCard
