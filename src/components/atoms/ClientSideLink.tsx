import Link from 'next/link'
import { ReactNode } from 'react'
import { stopPropagation } from 'src/utils/commons'

type Props = {
  children: ReactNode
  href: string
}

function ClientSideLink({ children, href }: Props) {
  return (
    <Link href={href}>
      <a href={href} onClick={stopPropagation}>
        {children}
      </a>
    </Link>
  )
}

export default ClientSideLink
