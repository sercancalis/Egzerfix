"use client"
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Nav from './Nav'
import Logo from './Logo'
import MobileNav from './MobileNav'

const Header = () => {
    const [header, setHeader] = useState(false);
    const pathName = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setHeader(true);
            } else {
                setHeader(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className={`${header ? "bg-white shadow-lg dark:bg-accent" : "dark:bg-transparent"} p-4 bg-gradient-to-br from-[#F7FAFD] to-[#DAE3F8]  sticky top-0 z-30 transition-all ${pathName === "/" && "bg-tertiary"}`}>
            <div className='container mx-auto'>
                <div className='flex items-center justify-between'>
                    <Logo />
                    <div className='flex items-center gap-x-6'>
                        <Nav
                            containerStyles='hidden xl:flex gap-x-8 items-center'
                            linkStyles='relative hover:text-primary transition-all text-xl font-bold'
                            underlineStyles='absolute left-0 top-full h-[2px] bg-primary w-full'
                        />

                        <div className='xl:hidden'>
                            <MobileNav />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header