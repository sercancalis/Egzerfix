'use client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Faqs } from '@prisma/client';
import axios from 'axios';
import { EditIcon, TrashIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const FaqsPage = () => {
    const { toast } = useToast();
    const [data, setData] = useState<Faqs[]>([]);

    useEffect(() => {
        const getData = async () => {
            var res = await axios.get("/api/faqs");
            if (res && res.status == 200) {
                setData(res.data.data);
            }
        };
        getData();
    }, []);

    const deleteAction = async (id: number) => {
        try {

            var res = await axios.delete(`/api/faqs?id=${id}`);
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
                    {data && data.length < 7 && (
                        <div className="flex justify-end items-center mb-4">
                            <Link href={'/panel/faqs/save'}>
                                <Button>Yeni +</Button>
                            </Link>
                        </div>
                    )}
                    {data?.map((item, index) => (
                        <div className='mb-4 flex gap-4' key={index}>
                            <Card className='w-full p-4 flex flex-col'>
                                <p className='font-bold'>{item.question}</p>
                                <p className='text-gray-500'>{item.answer}</p>
                            </Card>
                            <div className='flex items-center gap-x-3'>
                                <Link href={`/panel/faqs/save?id=${item.id}`}>
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

export default FaqsPage