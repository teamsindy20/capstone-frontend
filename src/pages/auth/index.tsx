import { useRouter } from 'next/router'
import { useContext, useEffect, useRef } from 'react'
import { toast } from 'react-toastify'
import PageHead from 'src/components/layouts/PageHead'
import { GlobalContext } from '../_app'

const description = '주의! 이 페이지 URL을 다른 사람과 공유하지 마세요.'

function SocialLoginPage() {
  const { loading, refetchUser } = useContext(GlobalContext)

  useEffect(() => {
    sessionStorage.setItem('token', window.location.search.slice(7))

    return () => {
      toast.success('소셜 로그인에 성공했어요')
    }
  }, [])

  const isExecuted = useRef(false)

  const router = useRouter()

  useEffect(() => {
    if (!isExecuted.current) {
      if (!loading) {
        if (sessionStorage.getItem('token')) {
          refetchUser()
          router.replace(sessionStorage.getItem('redirectUrlAfterLogin') ?? '/')
          sessionStorage.removeItem('redirectUrlAfterLogin')
        }
        isExecuted.current = true
      }
    }
  }, [loading, refetchUser, router])

  return (
    <PageHead title="디저트핏 - 소셜 로그인" description={description}>
      소셜 로그인 인증 중...
    </PageHead>
  )
}

export default SocialLoginPage
