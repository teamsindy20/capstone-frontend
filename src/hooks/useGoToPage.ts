import { useRouter } from 'next/router'
import { MouseEvent as ReactMouseEvent, useCallback } from 'react'

function useGoToPage(url: string) {
  const router = useRouter()

  const goToPage = useCallback(
    (e: ReactMouseEvent<HTMLElement, MouseEvent>) => {
      e.stopPropagation()
      router.push(url)
    },
    [router, url]
  )

  return goToPage
}

export default useGoToPage
