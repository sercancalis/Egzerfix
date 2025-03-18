import React from 'react'
import Image from 'next/image'
const MainAbout = () => {
    return (
        <section className='py-12'>
            <div className='container mx-auto'>
                <div className='flex flex-col xl:flex-row items-center xl:justify-between p-4 gap-20'>
                    <Image src={"https://htmldemo.zcubethemes.com/decare/img/features/about_img.png"} alt='Image' width={470} height={538} />
                    <div className='flex flex-col gap-4'>
                        <p className='uppercase text-blue-700 font-extrabold text-2xl text-center'>Hakkımızda</p>
                        <p className='text-primary font-extrabold text-6xl xl:text-8xl mb-4 text-center'>We Care For Your Dental Healt</p>
                        <p>
                            Aliquam ac sem et diam iaculis efficitur. Morbi in enim odio. Nullam quis volutpat est, sed dapibus sapien. Cras condimentum eu velit id tempor. Curabitur purus sapien, cursus sed nisl tristique, commodo vehicula arcu.
                        </p>
                        <p>
                            Aliquam erat volutpat. Aliquam enim massa, sagittis blandit ex mattis, ultricies posuere sapien. Morbi a dignissim enim. Fusce elementum, augue in elementum porta, sapien nunc volutpat ex, a accumsan nunc lectus eu lectus.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MainAbout