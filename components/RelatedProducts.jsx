'use client'
import React, { useEffect, useState } from 'react'
import Title from './Title'
import { Item } from './Item'
import { useAppContext } from '@/context/AppContext'

function RelatedProducts({product}) {
  const { products } = useAppContext()
  const [related, setRelated] = useState([])

  useEffect(() => {
    const data = products.filter((item) => item.category === product.category)
    setRelated(data)
  }, [products])
  return (
    <section className='max-padd-container py-16 xl:py-28'>
      <Title title1={"Related"} title2={"Products"} titleStyles={"pb-10"} />
      
      {/* 1. Changed gap-8 to gap-4 (or gap-2 for even tighter fit) */}
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4'>
        {related.slice(0, 5).map((product, index) => (
          /* 2. Removed w-56 and mx-5 to allow the grid to control the spacing */
          <div key={index} className='relative'>
            <Item product={product} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default RelatedProducts
