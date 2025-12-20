"use client"
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

function Header() {
    const [open, setOpen] = useState(false)
    const navLinks = [
        {name: "Home", href:"/"},
        {name: "Collection", href:"/collection"},
        {name: "Contact", href:"/contact"},
    ]
    const pathname = usePathname()

    const isHomePage = pathname === "/"

    return (
        <nav className={`${!isHomePage && 'bg-white'} max-padd-container absolute top-0 left-0 right-0 w-full  flex items-center justify-between 
        py-4 transition-all`}>

            {/* Logo */}
            <Link href={'/'} className='flex gap-1'>
                <Image src={'/logo.png'} height={33} width={33} alt='LogoIcon' />
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
             </div>

             <div className='flex items-center gap-3 lg:gap-8'>
                {/*Menu */}
                <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="sm:hidden">
                <Image src={'/menu.svg'} height={25} width={25} alt='menuIcon' />
                </button>
                {/*Search */}
                <Image src={'/search.svg'} height={21} width={21} alt='searchIcon' className='hidden sm:block' />
                {/* Cart */}
                <Link href={'/cart'} className="relative cursor-pointer">
                <Image src={'/basket.svg'} height={25} width={25} alt='cartIcon' />
                    <button className="absolute -top-3 -right-2 text-xs text-white bg-destructive w-[18px] h-[18px] rounded-full">0</button>
                </Link>
                {/* User/Auth */}
                <button className="btn-destructive flexCenter gap-1 px-4 ">
                <Image src={'/user.svg'} height={19} width={19} alt='userIcon' className='invert-100' />
                    Login
                </button>
            
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
            </div>

        </nav>
    )
}

export default Header
