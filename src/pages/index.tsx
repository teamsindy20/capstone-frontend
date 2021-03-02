import styled from 'styled-components'
import PageLayout from '../components/layouts/PageLayout'
import PageHead from '../components/layouts/PageHead'

const Title = styled.h2`
  margin: 1rem 0;
`

const FlexContainer = styled.div`
  padding: 0 1rem;

  display: flex;
  flex-flow: column nowrap;
  gap: 10rem;
`

function HomePage() {
  return (
    <PageHead title="캡스톤디자인 - Home">
      <PageLayout>
        <Title>Title</Title>
        <FlexContainer>
          <div>
            <div>"Lorem ipsum dolor sit amet,</div>
            <div>
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
              magna aliqua.
            </div>
            <div>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
            </div>
            <div>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </div>
            <div>Excepteur sint occaecat cupidatat non proident,</div>
            <div>sunt in culpa qui officia deserunt mollit anim id est laborum."</div>
          </div>
          <div>
            <div>"Lorem ipsum dolor sit amet,</div>
            <div>
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
              magna aliqua.
            </div>
            <div>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
            </div>
            <div>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </div>
            <div>Excepteur sint occaecat cupidatat non proident,</div>
            <div>sunt in culpa qui officia deserunt mollit anim id est laborum."</div>
          </div>
        </FlexContainer>
      </PageLayout>
    </PageHead>
  )
}

export default HomePage
