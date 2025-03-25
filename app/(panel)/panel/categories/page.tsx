'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Categories } from '@prisma/client';
import axios from 'axios';
import { EditIcon, EyeIcon, EyeOffIcon, TrashIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const CategoriesPage = () => {
    const { toast } = useToast();
    const [data, setData] = useState<Categories[]>([]);

    useEffect(() => {
        const getData = async () => {
            const res = await axios.get("/api/categories");
            if (res && res.status == 200) {
                setData(res.data.data);
            }
        };
        getData();
    }, []);

    const deleteAction = async (id: number) => {
        const isConfirmed = window.confirm("Bu kategoriyi silmek istediğine emin misin? Varsa kategoriye bağlı bloglarda silinecektir");

        if (!isConfirmed) {
            return;
        }

        try {
            const res = await axios.delete(`/api/categories?id=${id}`);
            if (res && res.status === 200) {
                setData((prevData) => prevData.filter((item) => item.id !== id));
                toast({
                    description: "Kategori başarıyla silindi.",
                });
            } else {
                toast({
                    description: 'Kategori Silinemedi.',
                    variant: "destructive"
                });
            }
        } catch (error) {
            console.error('Error deleting category:', error);
            toast({
                description: 'Kategori Silinemedi.',
                variant: "destructive"
            });
        }
    };

    const updateAction = async (id: number, isActive: boolean) => {
        const isConfirmed = window.confirm(`Bu kategoriyi ${isActive ? "aktif" : "pasif"} yapmak istediğine emin misin? ${isActive ? "" : "Kategoriye bağlı bloglarda pasife alınacaktır."}`);

        if (!isConfirmed) {
            return;
        }

        var findCat = data.find(x => x.id == id);
        findCat!.isActive = isActive;

        try {
            const res = await axios.post(`/api/categories`, findCat);
            if (res && res.status === 200) {
                setData((prevData) => prevData.map((item) => {
                    if (item.id !== res.data.data.id) {
                        return prevData;
                    }
                    return res.data.data;
                }));
                toast({
                    description: "Kategori başarıyla güncellendi.",
                });
            } else {
                toast({
                    description: 'Kategori Güncellenemedi.',
                    variant: "destructive"
                });
            }
        } catch (error) {
            console.error('Error deleting category:', error);
            toast({
                description: 'Kategori Güncellenemedi.',
                variant: "destructive"
            });
        }
    };

    return (
        <section className="min-h-screen pt-12">
            <div className="container mx-auto">
                <div className="flex flex-col">
                    <div className="flex justify-end items-center mb-4">
                        <Link href={'/panel/categories/save'}>
                            <Button>Yeni +</Button>
                        </Link>
                    </div>
                    {data?.map((item, index) => (
                        <div className='mb-4 flex gap-4' key={index}>
                            <Card className='w-full p-4'>
                                <CardContent className='flex items-center gap-x-3'>
                                    <span className='font-bold'>{item.name}</span>
                                    <span className={cn(item.isActive ? "text-green-500" : 'text-rose-500')}>{item.isActive ? "Aktif" : "Pasif"}</span>
                                </CardContent>
                            </Card>
                            <div className='flex items-center gap-x-3'>
                                <Link href={`/panel/categories/save?id=${item.id}`}>
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

export default CategoriesPage