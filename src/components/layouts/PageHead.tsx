import Head from 'next/head'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  title: string
  description?: string
}

function PageHead({ children, title, description }: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
        {description && <meta name="description" content={description} />}
      </Head>
      {children}
    </>
  )
}

export default PageHead
