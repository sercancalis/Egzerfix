import ContactForm from '@/components/ContactForm'
import React from 'react'

const ContactPage = () => {
    return (
        <section className='py-15'>
            <div className='container mx-auto'>
                <div className='flex flex-col lg:flex-row gap-4'>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3794.488838956646!2d29.18833997675321!3d41.014238271349726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cacf08bff0e7e1%3A0x2f5ef033f3c970d7!2sEgzerfix%20Fizyoterapi%20ve%20Klinik%20Pilates!5e1!3m2!1str!2str!4v1741695343139!5m2!1str!2str" width="100%" height="450" loading="lazy" className='w-full lg:w-1/2'></iframe>
                    <div className='w-full lg:w-1/2'>
                        <ContactForm />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactPage