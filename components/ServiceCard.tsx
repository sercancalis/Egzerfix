"use client"
import { Services } from "@prisma/client";
import { lazy, Suspense } from "react";

export const ServiceCard = ({ data }: { data: Services }) => {
    const IconComponent = lazy(() =>
        //@ts-ignore
        import("lucide-react").then((mod) => ({ default: mod[data.icon] }))
    );

    return (
        <div className="flex items-center py-4 px-8 border rounded-lg shadow-md bg-white min-h-40">
            <Suspense fallback={<div className="w-16 h-16 bg-gray-200 rounded-full"></div>}>
                <IconComponent className="w-12 h-12 text-blue-500 mr-4" />
            </Suspense>
            <div>
                <h3 className="text-2xl font-extrabold">{data.title}</h3>
                <p className="text-sm text-gray-500">{data.description}</p>
            </div>
        </div>
    );
}