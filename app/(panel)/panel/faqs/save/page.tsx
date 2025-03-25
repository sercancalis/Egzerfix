"use client"
import { AppFormInput } from '@/components/AppFormInput';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { FaqSchema } from '@/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const SaveFaq = () => {
    const router = useRouter();
    const { toast } = useToast();
    const searchParams = useSearchParams()
    const id = searchParams.get('id')

    const form = useForm<z.infer<typeof FaqSchema>>({
        resolver: zodResolver(FaqSchema),
        defaultValues: {
            id: 0,
            question: "",
            answer: "",
        },
    })

    useEffect(() => {
        const getData = async (id: string) => {
            const res = await axios.get(`/api/faqs?id=${id}`)
            if (res && res.status == 200) {
                form.setValue("id", res.data.data.id);
                form.setValue("question", res.data.data.question);
                form.setValue("answer", res.data.data.answer);
            }
        }
        if (id) {
            getData(id);
        }
    }, [id, form]);

    const onSubmit = async (values: z.infer<typeof FaqSchema>) => {
        const res = await axios.post("/api/faqs", values);
        if (res) {
            toast({
                description: "İşleminiz başarıyla kaydedilmiştir",
            });
            router.push("/panel/faqs")
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
                        name={"question"}
                        label='Soru'
                    />
                    <AppFormInput
                        form={form}
                        name={"answer"}
                        label='Cevabı'
                        isTextarea
                    />
                    <Button type='submit'>Kaydet</Button>
                </form>
            </Form>
        </div>

    );
}

export default SaveFaq