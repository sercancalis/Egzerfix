import Testimonial from '@/components/Testimonial'
import React, { lazy, Suspense } from 'react'

const services = [
    { title: "Root Canal", desc: "Aenean eleifend turpis tellus, nec laoreet metus elementum ac.", icon: "Mail" },
    { title: "Alignment Teeth", desc: "Aenean eleifend turpis tellus, nec laoreet metus elementum ac.", icon: "Mail" },
    { title: "Cosmetic Teeth", desc: "Aenean eleifend turpis tellus, nec laoreet metus elementum ac.", icon: "Mail" },
    { title: "Oral Hygiene", desc: "Aenean eleifend turpis tellus, nec laoreet metus elementum ac.", icon: "Mail" },
    { title: "Live Advisory", desc: "Aenean eleifend turpis tellus, nec laoreet metus elementum ac.", icon: "Mail" },
    { title: "Cavity Inspection", desc: "Aenean eleifend turpis tellus, nec laoreet metus elementum ac.", icon: "Mail" },
];

const ServicesPage = () => {

    const ServiceCard = ({ service }: any) => {
        const IconComponent = lazy(() =>
            //@ts-ignore
            import("lucide-react").then((mod) => ({ default: mod[service.icon] }))
        );

        return (
            <div className="flex items-center py-4 px-8 border rounded-lg shadow-md bg-white min-h-40">
                <Suspense fallback={<div className="w-16 h-16 bg-gray-200 rounded-full"></div>}>
                    <IconComponent className="w-12 h-12 text-blue-500 mr-4" />
                </Suspense>
                <div>
                    <h3 className="text-2xl font-extrabold">{service.title}</h3>
                    <p className="text-sm text-gray-500">{service.desc}</p>
                </div>
            </div>
        );
    }

    return (
        <section className='py-12'>
            <div className='container mx-auto'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {services.map((service, index) => (
                        <ServiceCard key={index} service={service} />
                    ))}
                </div>
            </div>
            <Testimonial />
        </section>
    )
}

export default ServicesPage