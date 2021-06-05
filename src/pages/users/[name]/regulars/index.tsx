import { useContext } from 'react'
import { handleApolloError } from 'src/apollo/error'
import PageHead from 'src/components/layouts/PageHead'
import PageLayout from 'src/components/layouts/PageLayout'
import StoreCard, { StoreLoadingCard } from 'src/components/StoreCard'
import { useRegularStoresQuery } from 'src/graphql/generated/types-and-hooks'
import { GlobalContext } from 'src/pages/_app'
import styled from 'styled-components'
import TopHeader from 'src/components/TopHeader'
import { FlexContainerBetween, FlexContainerAlignCenter } from 'src/styles/FlexContainer'
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded'
import grey from '@material-ui/core/colors/grey'
import LocalActivityRoundedIcon from '@material-ui/icons/LocalActivityRounded'
import useGoBack from 'src/hooks/useGoBack'

const GridContainerUl = styled.ul`
  display: grid;
  gap: 0.5rem;
  margin: 0.5rem;

  background: #eee;
  border: 1px solid #eee;
`

const description = '자기가 찜한 메뉴를 확인해보세요'

const FlexContainerBetween1 = styled(FlexContainerBetween)`
  height: 100%;
`

const WhiteText = styled.h5`
  color: #ffffff;
`

const NoMarginH3 = styled.h3`
  margin: 0;
`
const StyledArrowBackIosRoundedIcon = { fontSize: 20, color: grey[800] }

const StyledLocalActivityRoundedIcon = { fontSize: 30, color: grey[800] }

function UserRegularStoresPage() {
  const { user } = useContext(GlobalContext)

  const { data, networkStatus, refetch } = useRegularStoresQuery({
    onError: handleApolloError,
    skip: !user,
  })

  const regularStores = data?.me.regularStores
  const isRegularStoresLoading = networkStatus < 7

  function refetchRegularStores() {
    refetch()
  }

  const goBack = useGoBack()

  return (
    <PageHead title="디저트핏 - 단골 매장" description={description}>
      <PageLayout>
        <TopHeader>
          <FlexContainerBetween1>
            <FlexContainerAlignCenter>
              <ArrowBackIosRoundedIcon style={StyledArrowBackIosRoundedIcon} onClick={goBack} />
            </FlexContainerAlignCenter>
            <FlexContainerAlignCenter>
              단골
            </FlexContainerAlignCenter>
            <WhiteText>ㅇ</WhiteText>
          </FlexContainerBetween1>
        </TopHeader>

        <GridContainerUl>
          {regularStores?.map((regularStore) => (
            <StoreCard
              key={regularStore.id}
              afterPickingStore={refetchRegularStores}
              store={regularStore}
            />
          ))}
          {isRegularStoresLoading ? (
            <StoreLoadingCard />
          ) : (
            !regularStores?.length && <h4>텅! 단골 매장이 없어요..</h4>
          )}
        </GridContainerUl>
      </PageLayout>
    </PageHead>
  )
}

export default UserRegularStoresPage
