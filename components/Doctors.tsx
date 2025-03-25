"use client"
import React from 'react'
import Image from "next/image"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import prisma from '@/lib/prisma';
const Doctors = async () => {
    const doctors = await prisma.doctors.findMany();
    return (
        <section className='pb-12 pt-24'>
            <div className='container mx-auto'>
                <div className='flex flex-col items-center justify-center gap-4'>
                    <p className='uppercase text-blue-700 font-extrabold text-2xl'>Our Doctor</p>
                    <p className='text-primary font-extrabold text-6xl xl:text-8xl mb-4 text-center'>Best Expert Dentist</p>
                    <Swiper
                        className="w-full h-1/2"
                        modules={[Pagination]}
                        spaceBetween={30}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        loop
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                            1280: {
                                slidesPerView: 4,
                                spaceBetween: 40,
                            },
                        }}
                    >
                        {doctors.map((doctor, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <div className='flex flex-col items-center justify-center border rounded-lg shadow p-6'>
                                        <Image src={doctor.image} alt='Image' height={300} width={400} />
                                        <p className='text-center font-extrabold text-3xl my-3'>{doctor.name}</p>
                                        <p className='text-blue-500 font-bold text-center'>{doctor.title}</p>
                                    </div>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>
            </div>
        </section>
    )
}

export default Doctors