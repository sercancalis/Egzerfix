import { FacebookIcon, InstagramIcon, MailIcon, PhoneIcon, TwitterIcon, YoutubeIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const MainInfo = () => {
    return (
        <section className='py-4 px-2 bg-primary'>
            <div className='container mx-auto'>
                <div className='flex items-center  justify-between'>
                    <div className='flex items-center gap-x-3'>
                        <div className='flex items-center gap-x-2'>
                            <MailIcon color='blue' size={16} />
                            <span className='text-white text-xs'>info@example.com</span>
                        </div>
                        <div className='flex items-center gap-x-2'>
                            <PhoneIcon color='blue' size={16} />
                            <span className='text-white text-xs'>+91-7052-101-786</span>
                        </div>
                    </div>
                    <div className='flex items-center gap-x-3'>
                        <Link href={"#"}>
                            <FacebookIcon color='white' size={16} />
                        </Link>
                        <Link href={"#"}>
                            <InstagramIcon color='white' size={16} />
                        </Link>
                        <Link href={"#"}>
                            <TwitterIcon color='white' size={16} />
                        </Link>
                        <Link href={"#"}>
                            <YoutubeIcon color='white' size={16} />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MainInfo