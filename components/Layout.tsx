import React, { ReactNode} from 'react'
import Link from 'next/link'
import Head from 'next/head'
// import Sidebar from './sidebar'
import TopNav from './TopNav'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title }: Props) => {

  return (
    <div>
      <Head>
        <title>{`Studentify`}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>


      <div className='w-full h-full bg-white pb-4'>
        <TopNav />
        <div  className=''>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout
