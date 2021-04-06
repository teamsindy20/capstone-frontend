import Link from 'next/link'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  href: string
}

function ClientSideLink({ children, href }: Props) {
  return (
    <Link href={href}>
      <a href={href}>{children}</a>
    </Link>
  )
}

export default ClientSideLink
