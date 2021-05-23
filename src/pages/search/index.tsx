import PageHead from 'src/components/layouts/PageHead'
import styled from 'styled-components'
import { Button } from 'antd'
import TopHeader from 'src/components/TopHeader'
import { FlexContainerAlignCenter } from 'src/styles/FlexContainer'
import NotificationsRoundedIcon from '@material-ui/icons/NotificationsRounded'
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded'
import grey from '@material-ui/core/colors/grey'
import useGoToPage from 'src/hooks/useGoToPage'
import SearchRoundedIcon from '@material-ui/icons/SearchRounded'

const description = ''

const FlexContainerCenterCenter = styled(FlexContainerAlignCenter)`
  justify-content: center;
  height: 100%;
`

const NoMarginH3 = styled.h3`
  margin: 0;
`
const StyledSearchRoundedIcon = { fontSize: 30, color: grey[800] }

const StyledArrowBackIosRoundedIcon = { fontSize: 20, color: grey[800] }

function SearchPage() {
  const goMainPage = useGoToPage('/')

  return (
    <PageHead title="디저트핏 - 검색" description={description}>
      <TopHeader>
        <FlexContainerCenterCenter>
          <FlexContainerAlignCenter>
            <ArrowBackIosRoundedIcon style={StyledArrowBackIosRoundedIcon} onClick={goMainPage} />
          </FlexContainerAlignCenter>
          <SearchRoundedIcon style={StyledSearchRoundedIcon} />
          <NoMarginH3>검색</NoMarginH3>
        </FlexContainerCenterCenter>
      </TopHeader>
    </PageHead>
  )
}

export default SearchPage
