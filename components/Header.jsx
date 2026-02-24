"use client"
import { useAppContext } from '@/context/AppContext'
import { assets } from '@/public/data'
import { useClerk, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

function Header() {
    const {getCartCount, isSeller, router, user} = useAppContext()
    const [open, setOpen] = useState(false)
    const pathname = usePathname()
    const {openSignIn} = useClerk()

    const isHomePage = pathname === "/"
    const navLinks = [
        {name: "Home", href:"/"},
        {name: "Collection", href:"/collection"},
        {name: "Contact", href:"/contact"},
    ]

    const BasketIcon = ()=> {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                <path d="M11.5 22H10C6.70017 22 5.05025 22 4.02513 20.9749C3 19.9497 3 18.2998 3 15V11C3 9.11438 3 8.17157 3.58579 7.58579C4.17157 7 5.11438 7 7 7H15C16.8856 7 17.8284 7 18.4142 7.58579C19 8.17157 19 9.11438 19 11V13.5" stroke="#141B34" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M15 9.5C15 5.63401 13.2091 2 11 2C8.79086 2 7 5.63401 7 9.5" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M14 20C14 20 15 20 16 22C16 22 18.1765 17 21 16" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        )
    }
    

    return (
        <nav className={`${!isHomePage && 'bg-white'} max-padd-container absolute top-0 left-0 right-0 w-full  flex items-center justify-between 
        py-4 transition-all`}>

            {/* Logo */}
            <Link href={'/'} className='flex gap-1'>
                <Image src={assets.logo} height={33} width={33} alt='LogoIcon' />
                <h3 className='text-2xl hidden sm:block'>Shopda<span className='text-destructive font-bold'>zz</span></h3>
            </Link>
        

            {/* Desktop Menu */}
            <div className="hidden sm:flex ">
                <div className='hidden sm:flex gap-8 mr-4'>
                    {navLinks.map((link)=> (
                        <Link key={link.href} href={link.href} className={`relative pb-1 font-medium ${pathname === link.href && "border-b border-destructive text-destructive"}`}>
                            {link.name}
                        </Link>
                    ))}
                    </div>
                    {isSeller && <button onClick={()=> router.push('/seller')} className='h-5 text-sm bg-transparent ring-1 ring-destructive text-black rounded-full lg:ml-4 mt-0.5 cursor-pointer'>Seller</button>}
             </div>

             <div className='flex items-center gap-3 lg:gap-8'>
                {/*Menu */}
                <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="sm:hidden">
                <Image src={assets.menu} height={25} width={25} alt='menuIcon' />
                </button>
                {/*Search */}
                <Image src={'/search.svg'} height={21} width={21} alt='searchIcon' className='hidden sm:block' />
                {/* Cart */}
                <Link href={'/cart'} className="relative cursor-pointer">
                <Image src={assets.basket} height={25} width={25} alt='cartIcon' />
                    <button className="absolute -top-3 -right-2 text-xs text-white bg-destructive w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
                </Link>
                {/* User/Auth */}
                {user ? 
                <UserButton>
                    <UserButton.MenuItems>
                        <UserButton.Action label='MyOrders' labelIcon={<BasketIcon/>} onClick={()=>router.push("/my-orders")} />
                    </UserButton.MenuItems>
                    
                </UserButton> 
                   : 
                   <button onClick={openSignIn} className="btn-destructive flexCenter gap-1 px-4 ">
                      <Image src={assets.user} height={19} width={19} alt='userIcon' className='invert-100' />
                      Login
                   </button>}
            
             </div>

            {/* Mobile Menu */}
            <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
            <div className= "flex flex-col gap-4 mb-4">
                    {navLinks.map((link)=> (
                        <Link key={link.href} href={link.href} className={`relative pb-1 font-medium ${pathname === link.href && "border-b border-destructive text-destructive"}`}>
                            {link.name}
                        </Link>
                    ))}
                    </div>
                    {isSeller && <button onClick={()=> router.push('/seller')} className='h-5 text-sm bg-transparent ring-1 ring-destructive text-black rounded-full lg:ml-4 mt-0.5 cursor-pointer'>Seller</button>}
            </div>

        </nav>
    )
}

export default Header
