import { FlexContainerBetween, FlexContainerAlignCenter } from 'src/components/atoms/FlexContainer'
import styled from 'styled-components'
import { ShopOutlined } from '@ant-design/icons'

const StyledShopOutlined = { fontSize: '27px', color: '#FF9A87' }

const Li = styled.li`
  background: #ffffff;
  box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.15), 0 0 0 rgba(16, 22, 26, 0), 0 0 0 rgba(16, 22, 26, 0);
  border-radius: min(20px, 2vw);
  overflow: hidden;
  padding: 0.8rem;
  margin: 0.8rem 0.5rem;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.8fr 8fr 1.3fr;
  align-items: center;
`

const Icon = styled.div`
  align-items: center;
  text-align: center;
  border-radius: 50%;
  padding: auto;
  margin: auto;
  width: 46px;
  height: 46px;
  object-fit: contain;
  background-color: #ffdbd5;
`

export const IconImg = styled.img`
  width: 20px;
  height: 20px;
  margin: 30% 0;
`

const Text = styled.h4`
  padding: 0 10px;
`

const TimeText = styled.h4`
  top: 0.2rem;
  right: 0.2rem;
  color: #6c6c6c;
  font-weight: normal;
`

function NotificationCard() {
  return (
    <Li>
      <Grid>
        <Icon>
          <IconImg src="/549@3x.png" />
        </Icon>
        <Text>
          내가 찜한 매장 "핏마카롱"의 <br /> 오늘의 라인업 소식이 올라왔어요!
        </Text>
        <TimeText>10분전</TimeText>
      </Grid>
    </Li>
  )
}

export default NotificationCard
