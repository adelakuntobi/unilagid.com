import React, { ReactNode, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Sidebar from './sidebar'
import TopNav from './TopNav'
import AdminTopNav from './adminTopNav'

type Props = {
  children?: ReactNode
  title?: string
}

const AdminLayout = ({ children, title }: Props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const handleToggleSidebar = (value) => {
    setToggled(value);
  };
  return (
    <div>
      <Head>
        <title>{`Superadmin - ${title}`}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className='p-2 flex bg-green-50 min-h-screen'>
        <Sidebar
          collapsed={collapsed}
          toggled={toggled}
          handleToggleSidebar={handleToggleSidebar}
        />
        <div className='w-full h-full bg-white pb-8'>
          <AdminTopNav heading={title} />
          <div className='px-8 py-8 bg-[#fefefe] max-w-[1520px] mx-auto'>

            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
