'use client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Doctors } from '@prisma/client';
import axios from 'axios';
import { EditIcon, TrashIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const DoctorsPage = () => {
    const { toast } = useToast();
    const [data, setData] = useState<Doctors[]>([]);

    useEffect(() => {
        const getData = async () => {
            const res = await axios.get("/api/doctors");
            if (res && res.status == 200) {
                setData(res.data.data);
            }
        };
        getData();
    }, []);

    const deleteAction = async (id: number) => {
        try {
            const res = await axios.delete(`/api/doctors?id=${id}`);
            if (res && res.status == 200) {
                setData((prevData) => prevData.filter((item) => item.id !== id));
                toast({
                    description: "Yorum başarıyla silindi.",
                });
            } else {
                toast({
                    description: 'Yorum Silinemedi.',
                    variant: "destructive"
                });
            }
        } catch (error) {
            console.error('Error deleting experience:', error);
            toast({
                description: 'Yorum Silinemedi.',
                variant: "destructive"
            });
        }
    };

    return (
        <section className="min-h-screen pt-12">
            <div className="container mx-auto">
                <div className="flex flex-col">
                    {data && data.length < 7 && (
                        <div className="flex justify-end items-center mb-4">
                            <Link href={'/panel/doctors/save'}>
                                <Button>Yeni +</Button>
                            </Link>
                        </div>
                    )}
                    {data?.map((item, index) => (
                        <div className='mb-4 flex gap-4' key={index}>
                            <div className='w-full flex gap-4'>
                                <Image src={item.image} alt="Yüklenen Resim" className="w-32 h-32 rounded" width={150} height={150} />
                                <div className='flex flex-col justify-center items-center'>
                                    <p className='font-bold'>{item.name}</p>
                                    <p className='text-gray-500'>{item.title}</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-x-3'>
                                <Link href={`/panel/doctors/save?id=${item.id}`}>
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

export default DoctorsPage