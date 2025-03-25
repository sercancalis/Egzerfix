"use client"
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Contacts } from '@prisma/client';
import axios from 'axios';
import { TrashIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'

const PanelPage = () => {
    const { toast } = useToast();
    const [data, setData] = useState<Contacts[]>([]);

    const deleteAction = async (id: number) => {
        try {
            const response = await fetch(`/api/contacts?id=${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete contact');
            }

            const result = await response.json();
            toast({
                description: result.message || 'Contact deleted successfully!',
            });

            setData((prevData) => prevData.filter((item) => item.id !== id));
        } catch (error) {
            console.error('Error deleting experience:', error);
            toast({
                description: 'Failed to delete project. Please try again.',
                variant: "destructive"
            });
        }
    };

    useEffect(() => {
        const getData = async () => {
            const response = await axios.get('/api/contacts');
            if (response && response.status === 200) {
                setData(response.data.data);
            }
        };
        getData();
    }, []);

    return (
        <section className="min-h-screen pt-12">
            <div className="container mx-auto">
                <div className="flex flex-col">
                    {data?.map((item, index) => (
                        <Card key={index} className="mb-4">
                            <CardContent className="p-4 grid grid-cols-5 items-center">
                                <span>{item.name}</span>
                                <span>{item.mail}</span>
                                <span>{item.phone}</span>
                                <span>{item.message}</span>
                                <TrashIcon
                                    className="cursor-pointer"
                                    color='red'
                                    onClick={() => deleteAction(item.id)}
                                />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PanelPage;