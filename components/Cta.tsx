import React from 'react'
import Image from 'next/image'
import { Button } from './ui/button'
import Link from 'next/link'
const Cta = () => {
    return (
        <section className='mt-12 pt-12 bg-primary border-b border-white'>
            <div className='container mx-auto'>
                <div className='flex flex-col justify-center xl:flex-row gap-24'>
                    <Image src={"https://htmldemo.zcubethemes.com/decare/img/bg/call-man.png"} alt='Image' width={400} height={400} />
                    <div className='flex flex-col gap-6'>
                        <p className='uppercase text-blue-700 font-extrabold text-2xl'>Randevu Al</p>
                        <p className='text-white font-extrabold text-4xl xl:text-7xl mb-4 text-center xl:text-start'>Açığız ve <br />Hastaları Karşılıyoruz</p>
                        <Link href={"/contact"} className='bg-gradient-to-br from-[#0997E6] to-[#3561D9] w-40 flex items-center p-4 justify-center rounded-lg'>
                            <p className='text-white'>Randevu Al</p>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Cta