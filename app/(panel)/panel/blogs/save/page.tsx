"use client"
import { AppFormCombobox } from '@/components/AppFormCombobox';
import { AppFormInput } from '@/components/AppFormInput';
import { AppFormTiptap } from '@/components/AppFormTiptap';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { BlogSchema } from '@/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Categories } from '@prisma/client';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const SaveBlog = () => {
    const router = useRouter();
    const { toast } = useToast();
    const searchParams = useSearchParams()
    const id = searchParams.get('id');
    const [categories, setCategories] = useState<Categories[]>([]);

    const form = useForm<z.infer<typeof BlogSchema>>({
        resolver: zodResolver(BlogSchema),
        defaultValues: {
            id: 0,
            categoryId: 0,
            title: "",
            shortContent: "",
            content: "",
            isActive: true
        },
    })

    useEffect(() => {
        const getData = async (id: string) => {
            const res = await axios.get(`/api/blogs?id=${id}`)
            if (res && res.status == 200) {
                form.setValue("id", res.data.data.id);
                form.setValue("categoryId", res.data.data.categoryId);
                form.setValue("title", res.data.data.title);
                form.setValue("shortContent", res.data.data.shortContent);
                form.setValue("content", res.data.data.content);
                form.setValue("isActive", res.data.data.isActive);
            }
        }
        if (id) {
            getData(id);
        }
        getCategories();
    }, [id, form]);

    const getCategories = async () => {
        const res = await axios.get("/api/categories");
        if (res && res.status == 200) {
            setCategories(res.data.data);
        }
    }

    const onSubmit = async (values: z.infer<typeof BlogSchema>) => {
        const res = await axios.post("/api/blogs", values);
        if (res) {
            toast({
                description: "İşleminiz başarıyla kaydedilmiştir",
            });
            router.push("/panel/blogs")
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
                    <AppFormCombobox
                        form={form}
                        name='categoryId'
                        data={categories.map((category) => ({ value: category.id, label: category.name }))}
                        label='Kategori'
                        isClickedClose
                    />
                    <AppFormInput
                        form={form}
                        name={"title"}
                        label='Blog Adı'
                    />
                    <AppFormTiptap
                        form={form}
                        name={"shortContent"}
                        label='Kısa Blog Tanımı'
                        maxlength={1000}
                    />
                    <AppFormTiptap
                        form={form}
                        name={"content"}
                        label='Blog Tanımı'
                    />
                    <Button type='submit'>Kaydet</Button>
                </form>
            </Form>
        </div>

    );
}

export default SaveBlog