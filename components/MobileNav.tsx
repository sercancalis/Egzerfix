import React, { useState } from 'react'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from './ui/sheet'
import { AlignJustify } from 'lucide-react'
import Logo from './Logo'
import Nav from './Nav'

const MobileNav = () => {
    const [open, setOpen] = useState(false);
    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <AlignJustify className='cursor-pointer' />
            </SheetTrigger>
            <SheetContent>
                <SheetTitle className="hidden">
                </SheetTitle>
                <div className='flex flex-col items-center justify-between h-full py-8'>
                    <div className='flex flex-col items-center gap-y-12'>
                        <Logo />
                        <div onClick={() => setOpen(false)}>
                            <Nav
                                containerStyles='flex flex-col items-center gap-y-3'
                                linkStyles='text-2xl'
                                underlineStyles=''
                            />
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default MobileNav