import Link from 'next/link'
import React from 'react'

function Hero() {
  return (
    <section>
        <div className="max-padd-container bg-[url('/bg.png')] bg-cover bg-no-repeat h-screen w-full">
            <div className='flex items-center h-full'>
                <div>
                    <h4 className='uppercase medium-18 tracking-wider'>TRENDY TREASURES</h4>
                    <h1 className='capitalize max-w-160'>Elevate Your Look <span className='text-destructive'>With Every Click.</span> Shop Today!</h1>
                    <p className='my-5 max-w-132'>Discover the latest trends in fashion, curated to match your unique style. 
                        From everyday essentials to standout outfits, shop high-quality clothing designed 
                        to keep you confident, comfortable, and effortlessly stylish—anytime, anywhere.</p>
                    {/* Button */}
                    <div className='inline-flex items-center justify-center gap-4 bg-white rounded-xl'>
                        <div className='text-center regular-14 leading-tight pl-5'>
                            <h5 className='uppercase font-bold'>30% OFF</h5>
                            <p className='regular-14'>On ALl Items</p>
                        </div>
                        <Link href={'/collection'} className='btn-destructive rounded-xl flexCenter py-6!'>Shop Now</Link>
                    </div>    
                </div>
            </div>
        </div>
      
    </section>
  )
}

export default Hero

