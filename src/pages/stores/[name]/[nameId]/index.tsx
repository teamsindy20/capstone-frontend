import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { setCartMenus, cartMenusVar } from 'src/apollo/cache'
import { handleApolloError } from 'src/apollo/error'
import PageHead from 'src/components/layouts/PageHead'
import { useMenuDetailQuery } from 'src/graphql/generated/types-and-hooks'
import { HEADER_HEIGHT, TABLET_MIN_WIDTH } from 'src/models/constants'
import styled from 'styled-components'
import { Button } from 'antd'
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded'
import grey from '@material-ui/core/colors/grey'
import TopHeader from 'src/components/TopHeader'
import { FlexContainerBetween, FlexContainerAlignCenter } from 'src/styles/FlexContainer'

const description = '메뉴 세부 정보를 확인해보세요'

const FixedButton = styled(Button)`
  position: fixed;
  left: 50%;
  bottom: 0;
  z-index: 1;
  transform: translateX(-50%);
  width: 100%;
  max-width: ${TABLET_MIN_WIDTH};
  height: 50px;
  background-color: #fdfdfc;
`
const StyledArrowBackIosRoundedIcon = { fontSize: 20, color: grey[800] }

const FlexContainerBetween1 = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
`
function StoreMenuPage() {
  const router = useRouter()
  const menuNameId = (router.query.nameId as string | undefined) ?? ''
  const menuName = menuNameId.substring(0, menuNameId.lastIndexOf('-'))
  const menuId = menuNameId.substring(menuNameId.lastIndexOf('-') + 1)

  const { data, loading, error } = useMenuDetailQuery({
    onError: handleApolloError,
    variables: { id: menuId },
  })

  const menu = data?.menu

  return (
    <PageHead title="디저트핏 - 메뉴 상세" description={description}>
      {}
      <TopHeader>
        <FlexContainerBetween1>
          <FlexContainerAlignCenter>
            <ArrowBackIosRoundedIcon style={StyledArrowBackIosRoundedIcon} />
            <h4>메뉴옵션</h4>
          </FlexContainerAlignCenter>
        </FlexContainerBetween1>
      </TopHeader>
      <FixedButton
        onClick={() => {
          setCartMenus([...cartMenusVar(), { id: menuId, name: menuName, price: menu?.price }])
          toast.success(`${menuName} 장바구니 추가 완료!`)
          router.back()
        }}
      >
        장바구니 추가
      </FixedButton>
    </PageHead>
  )
}

export default StoreMenuPage
