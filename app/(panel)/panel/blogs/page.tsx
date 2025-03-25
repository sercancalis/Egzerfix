'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Blogs } from '@prisma/client';
import axios from 'axios';
import { EditIcon, EyeIcon, EyeOffIcon, TrashIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const BlogsPage = () => {
    const { toast } = useToast();
    const [data, setData] = useState<Blogs[]>([]);

    useEffect(() => {
        const getData = async () => {
            const res = await axios.get("/api/blogs");
            if (res && res.status == 200) {
                setData(res.data.data);
            }
        };
        getData();
    }, []);

    const deleteAction = async (id: number) => {
        const isConfirmed = window.confirm("Bu bloğu silmek istediğine emin misin?");

        if (!isConfirmed) {
            return;
        }

        try {
            const res = await axios.delete(`/api/blogs?id=${id}`);
            if (res && res.status === 200) {
                setData((prevData) => prevData.filter((item) => item.id !== id));
                toast({
                    description: "Blog başarıyla silindi.",
                });
            } else {
                toast({
                    description: 'Blog Silinemedi.',
                    variant: "destructive"
                });
            }
        } catch (error) {
            console.error('Error deleting category:', error);
            toast({
                description: 'Blog Silinemedi.',
                variant: "destructive"
            });
        }
    };

    const updateAction = async (id: number, isActive: boolean) => {
        const isConfirmed = window.confirm(`Bu bloğu ${isActive ? "aktif" : "pasif"} yapmak istediğine emin misin?`);

        if (!isConfirmed) {
            return;
        }

        var findCat = data.find(x => x.id == id);
        findCat!.isActive = isActive;

        try {
            const res = await axios.post(`/api/blogs`, findCat);
            if (res && res.status === 200) {
                setData((prevData) => prevData.map((item) => {
                    if (item.id !== res.data.data.id) {
                        return prevData;
                    }
                    return res.data.data;
                }));
                toast({
                    description: "Blog başarıyla güncellendi.",
                });
            } else {
                toast({
                    description: 'Blog Güncellenemedi.',
                    variant: "destructive"
                });
            }
        } catch (error) {
            console.error('Error deleting category:', error);
            toast({
                description: 'Blog Güncellenemedi.',
                variant: "destructive"
            });
        }
    };

    return (
        <section className="min-h-screen pt-12">
            <div className="container mx-auto">
                <div className="flex flex-col">
                    <div className="flex justify-end items-center mb-4">
                        <Link href={'/panel/blogs/save'}>
                            <Button>Yeni +</Button>
                        </Link>
                    </div>
                    {data?.map((item, index) => (
                        <div className='mb-4 flex gap-4' key={index}>
                            <Card className='w-full p-4'>
                                <CardContent className='flex items-center gap-x-3'>
                                    <span className='font-bold'>{item.title}</span>
                                    <span className={cn(item.isActive ? "text-green-500" : 'text-rose-500')}>{item.isActive ? "Aktif" : "Pasif"}</span>
                                </CardContent>
                                <CardFooter>
                                    <span dangerouslySetInnerHTML={{ __html: item.shortContent }} />
                                </CardFooter>
                            </Card>
                            <div className='flex items-center gap-x-3'>
                                <Link href={`/panel/blogs/save?id=${item.id}`}>
                                    <EditIcon
                                        className='cursor-pointer'
                                        color='green'
                                    />
                                </Link>

                                {item.isActive ?
                                    <EyeIcon className="cursor-pointer" onClick={() => updateAction(item.id, false)} /> :
                                    <EyeOffIcon className="cursor-pointer" onClick={() => updateAction(item.id, true)} />
                                }

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

export default BlogsPage