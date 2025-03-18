import React from 'react'
import Image from 'next/image'
const Hero = () => {
    return (
        <section className='py-12 bg-gradient-to-br from-[#F7FAFD] to-[#DAE3F8]'>
            <div className='container mx-auto'>
                <div className='flex flex-col xl:flex-row items-center justify-between'>
                    <div className='flex flex-col gap-y-4 xl:max-w-1/2'>
                        <p className='uppercase text-blue-700 font-extrabold text-2xl text-center xl:text-start'>welcome To Decare</p>
                        <p className='text-primary font-extrabold text-8xl text-center xl:text-start'>We Are Best Dental Service</p>
                        <p className='text-base text-gray-400 font-bold p-4 xl:p-0'>Donec vitae libero non enim placerat eleifend aliquam erat volutpat. Curabitur diam ex, dapibus purus sapien, cursus sed nisl tristique, commodo gravida lectus non.</p>
                    </div>
                    <Image src={"https://htmldemo.zcubethemes.com/decare/img/slider/slider-img.png"} alt='Image' width={450} height={900} />
                </div>
            </div>
        </section>
    )
}

export default Hero