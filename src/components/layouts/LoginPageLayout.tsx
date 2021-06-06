import { ReactNode } from 'react'
import { Padding } from './NavigationLayout'

type Props = {
  children: ReactNode
}

function LoginPageLayout({ children }: Props) {
  return (
    <>
      {children}
      <Padding />
    </>
  )
}

export default LoginPageLayout
