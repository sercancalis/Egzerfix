import Cta from '@/components/Cta'
import DoctorsComp from '@/components/Doctors'
import FAQ from '@/components/FAQ'
import prisma from '@/lib/prisma'
import React from 'react'

const AboutPage = async () => {
    const about = await prisma.abouts.findMany();
    return (
        <section className='pt-12 pb-0.5'>
            <div className='container mx-auto'>
                <div className='flex flex-col'>
                    <h2 className='text-blue-700 text-3xl font-extrabold'>Hakkımızda</h2>
                    <p className="text-gray-500" dangerouslySetInnerHTML={{ __html: about.find(x => x.name == "about")?.value ?? "" }} />
                </div>
            </div>
            <Cta />
            <DoctorsComp />
            <FAQ />
        </section>
    )
}

export default AboutPage