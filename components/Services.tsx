import React from "react";
import prisma from "@/lib/prisma";
import { ServiceCard } from "./ServiceCard";
import Image from "next/image";

const ServicesComp = async () => {
    const services = await prisma.services.findMany();

    return (
        <section className='py-24'>
            <div className='container mx-auto'>
                <div className='flex flex-col gap-4 items-center justify-center'>
                    <p className='uppercase text-blue-700 font-extrabold text-2xl'>Hizmetlerimiz</p>
                    <p className='text-primary font-extrabold text-6xl text-center'>What We Provide</p>

                    <div className="flex flex-col lg:flex-row items-center justify-center gap-4 xl:gap-10 p-6 xl:p-10">
                        {/* Sol hizmet listesi */}
                        <div className="flex flex-col gap-4">
                            {services.slice(0, 3).map((service, index) => (
                                <ServiceCard key={index} data={service} />
                            ))}
                        </div>

                        {/* XL ekranlarda gösterilecek diş görseli */}
                        <Image
                            src="https://htmldemo.zcubethemes.com/decare/img/features/services-img-details2.png"
                            alt="Dental"
                            width={500}
                            height={400}
                            className="w-80 md:w-96 hidden xl:block"
                            priority
                        />

                        {/* Sağ hizmet listesi */}
                        <div className="flex flex-col gap-4">
                            {services.slice(3, 6).map((service, index) => (
                                <ServiceCard key={index} data={service} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ServicesComp