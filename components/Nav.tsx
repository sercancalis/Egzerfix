"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { motion } from "framer-motion"

const links = [
    { path: "/", name: "Anasayfa" },
    { path: "/about", name: "Hakkımızda" },
    { path: "/services", name: "Hizmetlerimiz" },
    { path: "/blogs", name: "Blog" },
    { path: "/contact", name: "İletişim" },

]

const Nav = ({ containerStyles, linkStyles, underlineStyles }: { containerStyles: string, linkStyles: string, underlineStyles: string }) => {
    const pathName = usePathname();
    return (
        <nav className={`${containerStyles}`}>
            {links.map((link, index) => {
                return (
                    <Link
                        key={index}
                        href={link.path}
                        className={`capitalize ${linkStyles}`}
                    >
                        {link.path === pathName && (
                            <motion.span
                                initial={{ y: "-100%" }}
                                animate={{ y: 0 }}
                                transition={{ type: "tween" }}
                                layoutId='underline'
                                className={underlineStyles}
                            />
                        )}
                        {link.name}
                    </Link>
                )
            })}
        </nav>
    )
}

export default Nav