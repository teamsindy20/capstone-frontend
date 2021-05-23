import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import PageHead from 'src/components/layouts/PageHead'
import { GlobalContext } from '../_app'

const description = ''

function SocialLoginPage() {
  const { refetchUser } = useContext(GlobalContext)

  const router = useRouter()

  useEffect(() => {
    sessionStorage.setItem('token', router.query.token as string)
    refetchUser()
    router.replace('/')
  }, [refetchUser, router])

  return (
    <PageHead title="디저트핏 - 소셜 로그인" description={description}>
      소셜 로그인 인증 중...
    </PageHead>
  )
}

export default SocialLoginPage
