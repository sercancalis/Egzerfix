import React from 'react'
import Image from 'next/image'
import prisma from '@/lib/prisma'
const MainAbout = async () => {
    const about = await prisma.abouts.findMany();
    return (
        <section className='py-12'>
            <div className='container mx-auto'>
                <div className='flex flex-col xl:flex-row items-center xl:justify-between p-4 gap-20'>
                    <Image src={"https://htmldemo.zcubethemes.com/decare/img/features/about_img.png"} alt='Image' width={470} height={538} />
                    <div className='flex flex-col gap-4'>
                        <p className='uppercase text-blue-700 font-extrabold text-2xl text-center'>Hakkımızda</p>
                        <p className='text-primary font-extrabold text-6xl xl:text-8xl mb-4 text-center'>{about.find(x => x.name == "title")?.value ?? ""}</p>
                        <p dangerouslySetInnerHTML={{ __html: about.find(x => x.name == "shortAbout")?.value ?? "" }} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MainAbout