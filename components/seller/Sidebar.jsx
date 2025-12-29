'use client'
import { assets } from '@/public/data';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

function Sidebar() {
    const pathname = usePathname()
    const sidebarLinks = [
        {name: "Add Product", path: "/seller", icon: assets.dashboardicon },
        {name: "Product List", path: "/seller/product-list", icon: assets.overviewicon },
        {name: "Order List", path: "/seller/order-list", icon: assets.chaticon },
    ];

  return (
            <div className="md:w-64 w-16 border-r h-screen text-base border-gray-300 pt-4 flex flex-col transition-all duration-300">
                 {/* Logo */}
            <Link href={'/'} className='flex gap-1 pl-4 pb-12'>
                <Image src={assets.logo} height={33} width={33} alt='LogoIcon' />
                <h3 className='text-2xl hidden sm:block'>Shopda<span className='text-destructive font-bold'>zz</span></h3>
            </Link>
                {sidebarLinks.map((item, index) => (
                    <a href={item.path} key={index}
                        className={`flex items-center py-3 px-4 gap-3 
                            ${item.path === pathname ? "border-r-4 md:border-r-[6px] bg-destructive/10 border-destructive text-destructive"
                                : "hover:bg-gray-100/90 border-white text-gray-700"
                            }`
                        }
                    >
                        {item.icon}
                        <p className="md:block hidden text-center">{item.name}</p>
                    </a>
                ))}
            </div>

  )
}

export default Sidebar
