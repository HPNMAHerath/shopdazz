'use client'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { usePathname } from 'next/navigation'
import React from 'react'

function Provider({children}) {
     const pathname = usePathname()
     const isSellerPage = pathname.includes('/seller')

  return (
    <>
      {!isSellerPage && <Header />}
      {children}
      {!isSellerPage && <Footer />}
      
    </>
  )
}

export default Provider
