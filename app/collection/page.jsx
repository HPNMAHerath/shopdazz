'use client'
import { Item } from '@/components/Item'
import Title from '@/components/Title'
import { useAppContext } from '@/context/AppContext'
import React from 'react'

function collection() {
    const {products} = useAppContext()

  return (
    <div className='max-padd-container py-28'>
        <Title title1={"All"} title2={"Product"} titleStyles={"pb-10"}/>
        <div className='bg-primary p-4 rounded-1-xl'>
            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4'>
            {products.length > 0 ? (
                products.map((product)=>(
                  <Item key={product._id} product={product}/>
                ))
                ):(
                    <p className='capitalize'>No Product found</p>
            )}
            </div>
        </div>
      
    </div>
  )
}

export default collection
