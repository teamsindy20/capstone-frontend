import Image from 'next/image'
import Link from 'next/link'

function Logo() {
  return (
    <Link href="/">
      <a href="/">
        <Image src="/logo.png" alt="Logo" width="625" height="283" />
      </a>
    </Link>
  )
}

export default Logo
