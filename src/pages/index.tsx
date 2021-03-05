import LocationOnTwoToneIcon from '@material-ui/icons/LocationOnTwoTone'
import SearchIcon from '@material-ui/icons/Search'
import styled from 'styled-components'
import PageLayout from '../components/layouts/PageLayout'
import PageHead from '../components/layouts/PageHead'
import { TABLET_MIN_WIDTH } from 'src/models/constants'

const MaxWidth = styled.div`
  max-width: ${TABLET_MIN_WIDTH};

  margin: 0 auto;
`

const FlexContainerBetween = styled.div`
  display: flex;
  justify-content: space-between;
`

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
`

const ImageWrapper = styled.div<{ paddingTop: string }>`
  position: relative;
  height: 0;
  padding-top: ${(p) => p.paddingTop};
`

const StyledImg = styled.img`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const StyledUl = styled.ul`
  list-style: none;
  padding-left: 0px;
`

const StyledLi = styled.li``

function HomePage() {
  return (
    <PageHead title="캡스톤디자인 - Home">
      <PageLayout>
        <MaxWidth>
          <FlexContainerBetween>
            <div />
            <FlexContainer>
              <LocationOnTwoToneIcon />
              주소
            </FlexContainer>
            <SearchIcon fontSize="large" />
          </FlexContainerBetween>

          <ImageWrapper paddingTop="56.25%">
            <StyledImg
              src="https://cdn.pixabay.com/photo/2015/09/26/11/21/banner-958962_960_720.jpg"
              alt="banner advertisement"
            />
          </ImageWrapper>

          <div>카테고리</div>
          <div>정렬 기준</div>
          <button>사진만 보기</button>
          <StyledUl>
            <li>
              <ImageWrapper paddingTop="100%">
                <StyledImg
                  src="https://cdn.crowdpic.net/list-thumb/thumb_l_F22044335599802DDF4A7ABF5778ACE5.jpg"
                  alt="banner advertisement"
                />
              </ImageWrapper>
              <div>메뉴 이름</div>
              <div>가격</div>
              <div>좋아요</div>
              <div>매장 이름</div>
              <div>재주문율</div>
              <div>배달팁</div>
              <div>최소주문 금액</div>
              <ul>
                <li>#달달</li>
                <li>#비건</li>
                <li>#저칼로리</li>
              </ul>
            </li>
            <li>
              <img src="" alt="menu" />
              <div>메뉴 이름2</div>
              <div>가격2</div>
              <div>좋아요2</div>
              <div>매장 이름2</div>
              <div>재주문율2</div>
              <div>배달팁2</div>
              <div>최소주문 금액2</div>
              <ul>
                <li>#달달</li>
                <li>#비건</li>
                <li>#저칼로리</li>
              </ul>
            </li>
          </StyledUl>
        </MaxWidth>
      </PageLayout>
    </PageHead>
  )
}

export default HomePage
