import Link from 'next/link'
import { assets } from '@/public/data'
import Image from 'next/image'
import React from 'react'

function Footer() {

  return (
    <div>
      <footer className="px-6 md:px-16 lg:px-24 xl:px-32 w-full text-sm pt-10  bg-white border-slate-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14">
                    <div className="sm:col-span-2 lg:col-span-1">
                      {/* Logo */}
                    <Link href={'/'} className='flex gap-1'>
                       <Image src={assets.logo} height={33} width={33} alt='LogoIcon' />
                      <h3 className='text-2xl'>Shopda<span className='text-destructive font-bold'>zz</span></h3>
                    </Link>
                        <p className="text-sm/7 mt-6">Discover the best deals on top-quality products, Crafted to elevate your  everyday experience. Discover the best deals on top-quality products.</p>
                    </div>
                    <div className="flex flex-col lg:items-center lg:justify-center">
                        <div className="flex flex-col text-sm space-y-2.5">
                            <h4 className="font-semibold mb-5 text-gray-800">Company</h4>
                            <a className="hover:text-slate-600 transition" href="#">About us</a>
                            <a className="hover:text-slate-600 transition" href="#">Careers<span className="text-xs text-white bg-destructive rounded-md ml-2 px-2 py-1">We’re hiring!</span></a>
                            <a className="hover:text-slate-600 transition" href="#">Contact us</a>
                            <a className="hover:text-slate-600 transition" href="#">Privacy policy</a>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-800 mb-5">Subscribe to our newsletter</h4>
                        <div className="text-sm space-y-6 max-w-sm">
                            <p>The latest news, articles, and resources, sent to your inbox weekly.</p>
                            <div className="flex items-center justify-center gap-2 p-2 rounded-md bg-white">
                                <input className="focus:ring-2  ring-destructive outline-none w-full max-w-64 py-2 rounded px-2" type="email" placeholder="Enter your email" />
                                <button className="bg-destructive px-4 py-2 text-white rounded">Subscribe</button>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="py-4 text-center border-t mt-6 border-slate-200">
                    Copyright {new Date().getFullYear()} © <a href="https://prebuiltui.com">Shopdazz</a> All Right Reserved.
                </p>
            </footer>
    </div>
  )
}

export default Footer
