import PageHead from 'src/components/layouts/PageHead'

const description = '본 이용 약관에 따라 귀하와 디저트핏 간의 계약이 체결됩니다'

function TermsOfServicePage() {
  return (
    <PageHead title="디저트핏 - 이용약관" description={description}>
      <div>본 서비스를 이용하는 모든 고객에게 본 이용약관이 적용됩니다.</div>
    </PageHead>
  )
}

export default TermsOfServicePage
