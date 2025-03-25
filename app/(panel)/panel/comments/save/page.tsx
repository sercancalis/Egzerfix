"use client"
import { AppFormInput } from '@/components/AppFormInput';
import AppFormStarRating from '@/components/AppFormStarRating';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { CommentSchema, } from '@/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const SaveComment = () => {
    const router = useRouter();
    const { toast } = useToast();
    const searchParams = useSearchParams()
    const id = searchParams.get('id')

    const form = useForm<z.infer<typeof CommentSchema>>({
        resolver: zodResolver(CommentSchema),
        defaultValues: {
            id: 0,
            name: "",
            comment: "",
            star: 0
        },
    })

    useEffect(() => {
        const getData = async (id: string) => {
            const res = await axios.get(`/api/comments?id=${id}`)
            if (res && res.status == 200) {
                form.setValue("id", res.data.data.id);
                form.setValue("name", res.data.data.name);
                form.setValue("comment", res.data.data.comment);
                form.setValue("star", res.data.data.star);
            }
        }
        if (id) {
            getData(id);
        }
    }, [id, form]);

    const onSubmit = async (values: z.infer<typeof CommentSchema>) => {
        const res = await axios.post("/api/comments", values);
        if (res) {
            toast({
                description: "İşleminiz başarıyla kaydedilmiştir",
            });
            router.push("/panel/comments")
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
                        label='İsim Soyisim'
                    />
                    <AppFormStarRating
                        form={form}
                        name={"star"}
                        label='Yıldız'
                    />
                    <AppFormInput
                        form={form}
                        name={"comment"}
                        label='Yorum'
                        isTextarea
                    />
                    <Button type='submit'>Kaydet</Button>
                </form>
            </Form>
        </div>

    );
}

export default SaveComment