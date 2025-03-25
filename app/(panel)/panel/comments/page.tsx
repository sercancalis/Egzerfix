'use client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Comments } from '@prisma/client';
import axios from 'axios';
import { EditIcon, StarIcon, TrashIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const CommentsPage = () => {
    const { toast } = useToast();
    const [data, setData] = useState<Comments[]>([]);

    useEffect(() => {
        const getData = async () => {
            const res = await axios.get("/api/comments");
            if (res && res.status == 200) {
                setData(res.data.data);
            }
        };
        getData();
    }, []);

    const deleteAction = async (id: number) => {
        try {
            const res = await axios.delete(`/api/comments?id=${id}`);
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
                            <Link href={'/panel/comments/save'}>
                                <Button>Yeni +</Button>
                            </Link>
                        </div>
                    )}
                    {data?.map((item, index) => (
                        <div className='mb-4 flex gap-4' key={index}>
                            <Card className='w-full p-4 flex flex-col'>
                                <div className='flex items-center gap-2'>
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <StarIcon
                                            key={i}
                                            size={18}
                                            color={i < item.star ? 'gold' : 'gray'}
                                            fill={i < item.star ? 'gold' : 'none'}
                                            strokeWidth={4}
                                        />
                                    ))}
                                    <p className='font-bold ml-4'>{item.name}</p>
                                </div>
                                <p className='text-gray-500'>{item.comment}</p>
                            </Card>
                            <div className='flex items-center gap-x-3'>
                                <Link href={`/panel/comments/save?id=${item.id}`}>
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

export default CommentsPage