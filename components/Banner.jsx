import React from 'react'

function Banner() {
  return (
    <section className='max-padd-container '>
        <div className="flex flex-col rounded-2xl px-10 py-20 md:py-30 bg-[url('/banner.png')] bg-center bg-no-repeat" >
            <h1 className='text-2xl md:text-3xl font-semibold max-w-2xl'>Elevate Your Style with Premium Fashion Collection</h1>
            <div className='h-[3px] w-32 my-1 bg-linear-to-1 from-transparent to-destructive'/>
            <p className='text-sm md:text-base max-w-xl'>Find clothing that blends comfort with modern trends, giving you a smart, stylish edge in every outfit daily.</p>
            <button className='btn-destructive w-3xs bg-destructive hover:scale-105 transition duration-300 mt-5'>Check Offers</button>
        </div>
      
    </section>
  )
}

export default Banner
