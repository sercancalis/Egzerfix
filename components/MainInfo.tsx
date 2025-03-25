import prisma from '@/lib/prisma'
import { FacebookIcon, InstagramIcon, MailIcon, PhoneIcon, YoutubeIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const MainInfo = async () => {
    const settings = await prisma.settings.findMany();
    return (
        <section className='py-4 px-2 bg-primary'>
            <div className='container mx-auto'>
                <div className='flex items-center  justify-between'>
                    <div className='flex items-center gap-x-3'>
                        <div className='flex items-center gap-x-2'>
                            <MailIcon color='blue' size={16} />
                            <span className='text-white text-xs'>{settings.find(x => x.name === "mail")?.value ?? ""}</span>
                        </div>
                        <div className='flex items-center gap-x-2'>
                            <PhoneIcon color='blue' size={16} />
                            <span className='text-white text-xs'>{settings.find(x => x.name === "phone")?.value ?? ""}</span>
                        </div>
                    </div>
                    <div className='flex items-center gap-x-3'>
                        <Link href={settings.find(x => x.name === "whatsapp")?.value ?? "#"} target="_blank">
                            <Image src={"/whatsapp.png"} alt='whatsapp' width={16} height={16} />
                        </Link>
                        <Link href={settings.find(x => x.name === "facebook")?.value ?? "#"} target="_blank">
                            <FacebookIcon color='white' size={16} />
                        </Link>
                        <Link href={settings.find(x => x.name === "instagram")?.value ?? "#"} target="_blank">
                            <InstagramIcon color='white' size={16} />
                        </Link>
                        <Link href={settings.find(x => x.name === "youtube")?.value ?? "#"} target="_blank">
                            <YoutubeIcon color='white' size={16} />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MainInfo