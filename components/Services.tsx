import React, { lazy, Suspense } from "react";

const services = [
    { title: "Root Canal", desc: "Aenean eleifend turpis tellus, nec laoreet metus elementum ac.", icon: "Mail" },
    { title: "Alignment Teeth", desc: "Aenean eleifend turpis tellus, nec laoreet metus elementum ac.", icon: "Mail" },
    { title: "Cosmetic Teeth", desc: "Aenean eleifend turpis tellus, nec laoreet metus elementum ac.", icon: "Mail" },
    { title: "Oral Hygiene", desc: "Aenean eleifend turpis tellus, nec laoreet metus elementum ac.", icon: "Mail" },
    { title: "Live Advisory", desc: "Aenean eleifend turpis tellus, nec laoreet metus elementum ac.", icon: "Mail" },
    { title: "Cavity Inspection", desc: "Aenean eleifend turpis tellus, nec laoreet metus elementum ac.", icon: "Mail" },
];

const Services = () => {

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
        <section className='py-24'>
            <div className='container mx-auto'>
                <div className='flex flex-col gap-4 items-center justify-center'>
                    <p className='uppercase text-blue-700 font-extrabold text-2xl'>Hizmetlerimiz</p>
                    <p className='text-primary font-extrabold text-6xl text-center'>What We Provide</p>

                    <div className="flex flex-col lg:flex-row items-center justify-center gap-4 xl:gap-10 p-6 xl:p-10">
                        {/* Sol hizmet listesi */}
                        <div className="flex flex-col gap-4">
                            {services.slice(0, 3).map((service, index) => (
                                <ServiceCard key={index} service={service} />
                            ))}
                        </div>

                        {/* XL ekranlarda gösterilecek diş görseli */}
                        <img
                            src="https://htmldemo.zcubethemes.com/decare/img/features/services-img-details2.png"
                            alt="Dental"
                            className="w-80 md:w-96 hidden xl:block"
                        />

                        {/* Sağ hizmet listesi */}
                        <div className="flex flex-col gap-4">
                            {services.slice(3, 6).map((service, index) => (
                                <ServiceCard key={index} service={service} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Services