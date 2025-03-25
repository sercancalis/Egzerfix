"use client"
import { AppFormInput } from '@/components/AppFormInput';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { CategorySchema } from '@/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const SaveCategories = () => {
    const router = useRouter();
    const { toast } = useToast();
    const searchParams = useSearchParams()
    const id = searchParams.get('id')

    const form = useForm<z.infer<typeof CategorySchema>>({
        resolver: zodResolver(CategorySchema),
        defaultValues: {
            id: 0,
            name: "",
            isActive: true
        },
    })

    useEffect(() => {
        const getData = async (id: string) => {
            const res = await axios.get(`/api/categories?id=${id}`)
            if (res && res.status == 200) {
                form.setValue("id", res.data.data.id);
                form.setValue("name", res.data.data.name);
                form.setValue("isActive", res.data.data.isActive);
            }
        }
        if (id) {
            getData(id);
        }
    }, [id, form]);

    const onSubmit = async (values: z.infer<typeof CategorySchema>) => {
        const res = await axios.post("/api/categories", values);
        if (res) {
            toast({
                description: "İşleminiz başarıyla kaydedilmiştir",
            });
            router.push("/panel/categories")
        }
        else {
            toast({
                description: "İşleminiz gerçekleştirilemedi",
                variant: "destructive"
            })
        }

    }

    return (
        <div className='container mx-auto'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="border p-2 space-y-6">
                    <AppFormInput
                        form={form}
                        name={"name"}
                        label='Kategori Adı'
                    />
                    <Button type='submit'>Kaydet</Button>
                </form>
            </Form>
        </div>

    );
}

export default SaveCategories