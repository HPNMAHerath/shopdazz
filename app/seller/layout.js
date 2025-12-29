import React from 'react'
import Sidebar from '@/components/seller/Sidebar'

function Layout({children}) {
  return (
    <div className='flex w-full bg-white'>
      <Sidebar />
      {children}
    </div>
  )
}

export default Layout
