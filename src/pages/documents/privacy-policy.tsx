import PageHead from 'src/components/layouts/PageHead'
import styled from 'styled-components'

const GridContainerGap = styled.div`
  display: grid;
  gap: 1rem;

  padding: 1rem;
`

const description =
  '사생활을 보장받을 권리는 모두가 누려야 할 기본적 인권이고 디저트핏의 핵심 가치 중 하나입니다.'

function PrivacyPolicyPage() {
  return (
    <PageHead title="디저트핏 - 개인정보보호정책" description={description}>
      <GridContainerGap>
        <h1>우리는 개인 정보를 보호하기 위해 최선을 다합니다.</h1>
        <div>
          사생활을 보장받을 권리는 모두가 누려야 할 기본적 인권입니다. 동시에 디저트핏의 핵심적인
          가치 중 하나죠. 당신이 사용하는 기기는 당신의 일상 다방면에 걸쳐 중요한 부분을 차지합니다.
          따라서 일상 경험 중에 무엇을, 누구와 공유할지에 대한 결정은 오직 당신만이 내릴 수 있어야
          합니다. 디저트핏은 당신의 개인 정보를 보호하고, 사용자가 자신의 정보를 직접 관리할 수
          있도록 설계됩니다. 결코 쉽지만은 않은 작업이죠. 하지만 우리가 믿는 혁신을 위해서는 마땅히
          걸어야 할 길이라 생각합니다.
        </div>
        <h3>당신의 지난 배달 위치 기록은 그저 지나간 이야기일 뿐.</h3>
        <div>
          디저트핏 앱은 당신의 데이터를 당신의 디저트핏 ID와 연관 짓지 않으며, 당신의 지난 배달 위치
          기록을 보관하지 않습니다.
        </div>
      </GridContainerGap>
    </PageHead>
  )
}

export default PrivacyPolicyPage
