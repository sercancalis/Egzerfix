import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const Logo = ({ isLogoWhite }: { isLogoWhite?: boolean }) => {
    return (
        <Link href={"/"} className='flex items-center gap-x-3'>
            <Image src={"/logo.png"} alt='' width={54} height={54} priority />
            <span className={cn('text-2xl font-semibold uppercase tracking-[3px]', isLogoWhite ? "text-white" : "text-primary")}>EgzerFix</span>
        </Link>
    )
}

export default Logo