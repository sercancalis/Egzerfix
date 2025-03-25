import React from 'react'
import Logo from './Logo'
import { ClockIcon, MailIcon, MapPinCheckInside, PhoneIcon } from 'lucide-react'
import Nav from './Nav'
import Link from 'next/link';
import prisma from '@/lib/prisma';

const Footer = async () => {
    const services = await prisma.services.findMany();
    const settings = await prisma.settings.findMany();
    return (
        <footer className='bg-primary pt-12'>
            <div className='container mx-auto'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                    <div className='flex flex-col gap-6'>
                        <Logo isLogoWhite />
                        <p className='text-white font-light'>{settings.find(x => x.name == "logoDescription")?.value ?? ""}</p>
                        <div className='flex items-center gap-6'>
                            <div className='bg-gradient-to-br from-[#0997E6] to-[#3561D9] p-4 rounded-full'>
                                <ClockIcon color='white' />
                            </div>
                            <div className='flex flex-col'>
                                <p className='text-white font-light' dangerouslySetInnerHTML={{ __html: settings.find(x => x.name == "workingHours")?.value ?? "" }} />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <p className='text-white text-2xl font-extrabold'>Diğer Linkler</p>
                        <Nav
                            containerStyles='flex flex-col gap-y-2 my-6'
                            linkStyles='text-xl text-[#B2C0D8] hover:text-white'
                            underlineStyles=''
                        />
                    </div>
                    <div className='flex flex-col'>
                        <p className='text-white text-2xl font-extrabold'>Hizmetlerimiz</p>
                        <div className='flex flex-col gap-y-2 my-6'>
                            {services.map((service, index) => (
                                <div key={index}>
                                    <span className='capitalize text-xl text-[#B2C0D8] hover:text-white'>{service.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='flex flex-col gap-6'>
                        <p className='text-white text-2xl font-extrabold'>Bize Ulaşın</p>
                        <div className='flex items-center gap-6'>
                            <div className='bg-gradient-to-br from-[#0997E6] to-[#3561D9] p-4 rounded-full'>
                                <MapPinCheckInside color='white' />
                            </div>
                            <p className='text-white font-light'>{settings.find(x => x.name == "address")?.value ?? ""}</p>
                        </div>
                        <div className='flex items-center gap-6'>
                            <div className='bg-gradient-to-br from-[#0997E6] to-[#3561D9] p-4 rounded-full'>
                                <PhoneIcon color='white' />
                            </div>
                            <p className='text-white font-light'>{settings.find(x => x.name == "phone")?.value ?? ""}</p>
                        </div>
                        <div className='flex items-center gap-6'>
                            <div className='bg-gradient-to-br from-[#0997E6] to-[#3561D9] p-4 rounded-full'>
                                <MailIcon color='white' />
                            </div>
                            <p className='text-white font-light'>{settings.find(x => x.name == "mail")?.value ?? ""}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-center border-t border-white py-2'>
                <p className='text-white'>
                    © {new Date().getFullYear()} Tüm Hakları Saklıdır. Bu site
                    {" "}<Link href={"http://sercancalis.com/"} target="_blank" className='cursor-pointer text-rose-500'>
                        Sercan ÇALIŞ
                    </Link>{" "}
                    tarafından yapılmıştır.
                </p>
            </div>
        </footer>
    )
}

export default Footer