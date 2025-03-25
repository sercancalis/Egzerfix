"use client"
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { StarIcon } from 'lucide-react';
import { Comments } from '@prisma/client';
import axios from 'axios';
const Testimonial = () => {
    const [dataList, setDataList] = useState<Comments[]>([]);
    useEffect(() => {
        const getDataList = async () => {
            const res = await axios.get("/api/comments");
            if (res && res.status == 200) {
                setDataList(res.data.data);
            }
        }

        getDataList();
    }, [])

    return (
        <section className='py-12'>
            <div className='container mx-auto'>
                <div className='flex flex-col gap-4 items-center justify-center'>
                    <p className='uppercase text-blue-700 font-extrabold text-2xl'>Yorumlar</p>
                    <p className='text-primary font-extrabold text-6xl xl:text-8xl mb-4 text-center'>Ne Sağlıyoruz</p>
                    <Swiper
                        className="w-full h-1/2"
                        modules={[Pagination]}
                        spaceBetween={30}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        loop
                        breakpoints={{
                            640: {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 2,
                                spaceBetween: 30,
                            },
                            1280: {
                                slidesPerView: 3,
                                spaceBetween: 40,
                            },
                        }}
                    >
                        {dataList.map((data, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <div className='flex flex-col border rounded-lg shadow p-4 gap-2'>
                                        <div className='flex items-center gap-x-2'>
                                            <span className='w-20 h-20 flex items-center justify-center border text-4xl text-white bg-rose-500 rounded-lg'>{data.name[0]}</span>
                                            <div className='flex flex-col'>
                                                <p className='font-extrabold text-3xl'>{data.name}</p>
                                                <div className='flex'>
                                                    {Array.from({ length: 5 }).map((_, i) => (
                                                        <StarIcon
                                                            key={i}
                                                            size={24}
                                                            color={i < data.star ? 'gold' : 'gray'}
                                                            fill={i < data.star ? 'gold' : 'none'}
                                                            strokeWidth={2}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <p className='font-extrabold text-base text-gray-500 min-h-32'>{data.comment}</p>

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

export default Testimonial