import TopHeader from 'src/components/TopHeader'
import { FlexContainerBetween, FlexContainerAlignCenter } from 'src/styles/FlexContainer'
import { Tabs, Divider, Button, Tooltip } from 'antd'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { handleApolloError } from 'src/apollo/error'
import PageHead from 'src/components/layouts/PageHead'
import PageLayout from 'src/components/layouts/PageLayout'
import MenuCard from 'src/components/MenuCard'
import {
  useMenuLazyQuery,
  usePickStoreMutation,
  useStoreLazyQuery,
  useStoreMenusQuery,
} from 'src/graphql/generated/types-and-hooks'
import useBoolean from 'src/hooks/useBoolean'
import { GridContainerUl } from 'src/pages'
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded'
import grey from '@material-ui/core/colors/grey'
import useGoToPage from 'src/hooks/useGoToPage'
import { store } from 'src/models/mock-data'
import { HeartOutlined, BellOutlined, ReloadOutlined, StarOutlined } from '@ant-design/icons'

const description = '매장에서 판매하는 메뉴를 볼 수 있어요.'

const StyledArrowBackIosRoundedIcon = { fontSize: 20, color: grey[800] }

const FlexContainerBetween1 = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
`
const FlexContainerSpaceEvenly = styled.div`
  display: flex;
  justify-content: space-evenly;
`

function StoreMenusPage() {
  const router = useRouter()
  const storeNameWithId = (router.query.name ?? '') as string
  const storeName = storeNameWithId?.substring(0, storeNameWithId.lastIndexOf('-'))
  const storeId = storeNameWithId?.substring(storeNameWithId.lastIndexOf('-') + 1)
  const goToHomePage = useGoToPage('/')

  function goToPage(activeKey: string) {
    switch (activeKey) {
      case 'menus':
        return `/stores/${router.query.name}`
      case 'feed':
      case 'reviews':
        return `/stores/${router.query.name}/${activeKey}`
      default:
        return ''
    }
  }

  const [onlyImage, toggleOnlyImage] = useBoolean(false)

  const [fetchStore, { loading: isStoreLoading }] = useStoreLazyQuery({
    fetchPolicy: 'network-only',
    onError: handleApolloError,
  })

  const [fetchMenu, { loading: isMenuLoading }] = useMenuLazyQuery({
    fetchPolicy: 'network-only',
    onError: handleApolloError,
  })

  const a = useStoreMenusQuery({ onError: handleApolloError, variables: { id: storeId } })

  const menus = a.data?.store?.menus

  const [pickStore, { loading }] = usePickStoreMutation({
    onCompleted: (data) => {
      if (data.pickStore) {
        toast.success(
          <div>
            매장을 찜했어요{' '}
            <span onClick={() => pickStore({ variables: { id: storeId } })} role="alert">
              찜 해제하기
            </span>
          </div>
        )
      } else {
        toast.success(
          <div>
            매장 찜을 해제했어요{' '}
            <span onClick={() => pickStore({ variables: { id: storeId } })} role="alert">
              다시 찜하기
            </span>
          </div>
        )
      }
      fetchStore({ variables: { id: storeId } }) // storeId는 button disabled 로 항상 not null
    },
    onError: handleApolloError,
  })

  return (
    <PageHead title="디저트핏 - 매장 메뉴" description={`${storeName} ${description}`}>
      <PageLayout>
        <TopHeader>
          <FlexContainerBetween1>
            <FlexContainerAlignCenter>
              <ArrowBackIosRoundedIcon
                style={StyledArrowBackIosRoundedIcon}
                onClick={goToHomePage}
              />
            </FlexContainerAlignCenter>
            <FlexContainerAlignCenter>{store.name}</FlexContainerAlignCenter>
            <FlexContainerAlignCenter>
              <Tooltip title="매장 찜하기">
                <Button
                  shape="circle"
                  icon={<HeartOutlined />}
                  disabled={loading || !storeId}
                  onClick={() => {
                    pickStore({ variables: { id: storeId ?? '' } })
                  }}
                />
              </Tooltip>
              <Tooltip title="알림설정">
                <Button shape="circle" icon={<BellOutlined />} />
              </Tooltip>
            </FlexContainerAlignCenter>
          </FlexContainerBetween1>
        </TopHeader>
        <Divider />
        <FlexContainerSpaceEvenly>
          <FlexContainerAlignCenter>
            <ReloadOutlined />
            재주문율 70%
          </FlexContainerAlignCenter>
          <Divider type="vertical" />
          <FlexContainerAlignCenter>
            <HeartOutlined />찜 34
          </FlexContainerAlignCenter>
          <Divider type="vertical" />
          <FlexContainerAlignCenter>
            <StarOutlined />
            단골 10
          </FlexContainerAlignCenter>
        </FlexContainerSpaceEvenly>
        <Divider />
        <Divider />
        <Tabs
          defaultActiveKey="feed"
          centered
          onTabClick={(activeKey) => router.push(goToPage(activeKey))}
        >
          <Tabs.TabPane tab="매장소식" key="feed" />
          <Tabs.TabPane tab="메뉴" key="menus" />
          <GridContainerUl onlyImage={onlyImage}>
            {menus?.map((menu) => (
              <MenuCard
                key={menu.id}
                afterPickingMenu={() => fetchMenu({ variables: { id: menu.id } })}
                menu={menu as any}
                onlyImage={onlyImage}
              />
            ))}
          </GridContainerUl>
          <Tabs.TabPane tab="리뷰" key="reviews" />
        </Tabs>
      </PageLayout>
    </PageHead>
  )
}

export default StoreMenusPage
