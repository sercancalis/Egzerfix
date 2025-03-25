import { ServiceCard } from '@/components/ServiceCard'
import Testimonial from '@/components/Testimonial'
import prisma from '@/lib/prisma'
import React from 'react'

const ServicesPage = async () => {
    const services = await prisma.services.findMany();

    return (
        <section className='py-12'>
            <div className='container mx-auto'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {services.map((service, index) => (
                        <ServiceCard key={index} data={service} />
                    ))}
                </div>
            </div>
            <Testimonial />
        </section>
    )
}

export default ServicesPage