"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { ChevronDown, ChevronLeft } from 'lucide-react'

const faqList = [
    {
        question: "Vivamus rhoncus ante a ipsum imperdiet ?",
        answer: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip"
    },
    {
        question: "Vivamus rhoncus ante a ipsum imperdiet ?",
        answer: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip"
    },
    {
        question: "Vivamus rhoncus ante a ipsum imperdiet ?",
        answer: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip"
    },
    {
        question: "Vivamus rhoncus ante a ipsum imperdiet ?",
        answer: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip"
    }
]
const FAQ = () => {
    const [openIndex, setOpenedIndex] = useState<number | null>(0);
    return (
        <section className='py-12 bg-primary relative min-h-[80vh]'>
            <div className='container mx-auto'>
                <div className='flex flex-col items-center xl:flex-row'>
                    <div className='flex flex-col gap-6 xl:w-1/2'>
                        <p className='text-blue-500 font-extrabold text-center xl:text-start'>FAQ</p>
                        <p className='text-white text-6xl xl:text-8xl font-extrabold text-center xl:text-start'>Frequently Asked Question</p>
                        <div className='flex flex-col gap-4 p-4 xl:mr-10'>
                            {faqList.map((faq, index) => {
                                return (
                                    <div key={index} className='flex flex-col cursor-pointer' onClick={() => setOpenedIndex(index == openIndex ? null : index)}>
                                        <div className='flex bg-gray-100 items-center'>
                                            <p className='text-primary font-bold w-full p-2'>{faq.question}</p>
                                            <span className='p-4 bg-gradient-to-br from-[#0C96E6] to-[#3069DB]' >
                                                {index == openIndex ? <ChevronDown color='white' size={30} strokeWidth={4} /> : <ChevronLeft color='white' size={30} strokeWidth={4} />}
                                            </span>
                                        </div>
                                        <div
                                            className={`transition-all duration-1000 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-[200px]' : 'max-h-0'
                                                }`}
                                        >
                                            {openIndex === index && (
                                                <div className="bg-white p-4">
                                                    <span className="text-gray-700">{faq.answer}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <Image src={"https://htmldemo.zcubethemes.com/decare/img/bg/faq-img.png"} alt='Image' className='xl:w-1/2 xl:h-full right-0 xl:absolute xl:-top-0' width={500} height={500} />
                </div>
            </div>
        </section>
    )
}

export default FAQ