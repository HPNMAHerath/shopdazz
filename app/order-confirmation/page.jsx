"use client"
import Spinner from '@/components/Spinner'
import { useAppContext } from '@/context/AppContext'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

function OrderConfirmation() {
    const {router} = useAppContext()
    const pathname = usePathname()
    const isOrderPage = pathname.includes('/order-confirmation')

    useEffect(()=>{
        setTimeout(() => {
            router.replace('/my-orders')
        }, 5000);
    }, [])

  return (
    <div className='flex justify-center my-20'>
      <div className='flex flex-col justify-center p-20 rounded-md items-center gap-3 px-32'>
        <Spinner isOrderPage={isOrderPage}/>
        <h2>Order Successful</h2>
        <h2>Thank you so much for order</h2>
        <button onClick={()=>router.replace('/my-orders')} className='btn-destructive'>Thank your order</button>
      </div>
    </div>
  )
}

export default OrderConfirmation
