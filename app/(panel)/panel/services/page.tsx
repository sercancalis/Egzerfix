'use client';
import { ServiceCard } from '@/components/ServiceCard';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Services } from '@prisma/client';
import axios from 'axios';
import { EditIcon, TrashIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const ServicesPage = () => {
    const { toast } = useToast();
    const [data, setData] = useState<Services[]>([]);

    useEffect(() => {
        const getData = async () => {
            const res = await axios.get("/api/services");
            if (res && res.status == 200) {
                setData(res.data.data);
            }
        };
        getData();
    }, []);

    const deleteAction = async (id: number) => {
        try {
            const res = await axios.delete(`/api/services?id=${id}`);
            if (res && res.status == 200) {
                setData((prevData) => prevData.filter((item) => item.id !== id));
                toast({
                    description: "Hizmet başarıyla silindi.",
                });
            } else {
                toast({
                    description: 'Hizmet Silinemedi.',
                    variant: "destructive"
                });
            }
        } catch (error) {
            console.error('Error deleting experience:', error);
            toast({
                description: 'Hizmet Silinemedi.',
                variant: "destructive"
            });
        }
    };


    return (
        <section className="min-h-screen pt-12">
            <div className="container mx-auto">
                <div className="flex flex-col">
                    {data && data.length < 6 && (
                        <div className="flex justify-end items-center mb-4">
                            <Link href={'/panel/services/save'}>
                                <Button>Yeni +</Button>
                            </Link>
                        </div>
                    )}
                    {data?.map((item, index) => (
                        <div className='mb-4 flex gap-4' key={index}>
                            <div className='w-full'>
                                <ServiceCard data={item} />
                            </div>
                            <div className='flex items-center gap-x-3'>
                                <Link href={`/panel/services/save?id=${item.id}`}>
                                    <EditIcon
                                        className='cursor-pointer'
                                        color='green'
                                    />
                                </Link>
                                <TrashIcon
                                    className="cursor-pointer"
                                    color='red'
                                    onClick={() => deleteAction(item.id)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ServicesPage