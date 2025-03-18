import Cta from '@/components/Cta'
import Doctors from '@/components/Doctors'
import FAQ from '@/components/FAQ'
import React from 'react'

const AboutPage = () => {
    return (
        <section className='pt-12 pb-0.5'>
            <div className='container mx-auto'>
                <div className='flex flex-col'>
                    <h2 className='text-blue-700 text-3xl font-extrabold'>Hakkımızda</h2>
                    <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi nemo distinctio quidem sed sapiente accusamus fugit, blanditiis aliquam, repudiandae laudantium animi natus veritatis temporibus nulla reiciendis cupiditate nobis quod molestiae.</p>
                </div>
            </div>
            <Cta />
            <Doctors />
            <FAQ />
        </section>
    )
}

export default AboutPage