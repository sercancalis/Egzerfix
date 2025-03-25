"use client"
import { AppFormInput } from '@/components/AppFormInput';
import { AppFormTiptap } from '@/components/AppFormTiptap';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { ServiceSchema } from '@/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';



const SaveServices = () => {
    const router = useRouter();
    const { toast } = useToast();
    const searchParams = useSearchParams()
    const id = searchParams.get('id')

    const form = useForm<z.infer<typeof ServiceSchema>>({
        resolver: zodResolver(ServiceSchema),
        defaultValues: {
            id: 0,
            description: "",
            title: "",
            icon: ""
        },
    })

    useEffect(() => {
        const getData = async (id: string) => {
            var res = await axios.get(`/api/services?id=${id}`)
            if (res && res.status == 200) {
                form.setValue("id", res.data.data.id);
                form.setValue("icon", res.data.data.icon);
                form.setValue("title", res.data.data.title);
                form.setValue("description", res.data.data.description);
            }
        }
        if (id) {
            getData(id);
        }
    }, [id]);

    const onSubmit = async (values: z.infer<typeof ServiceSchema>) => {
        var res = await axios.post("/api/services", values);
        if (res) {
            toast({
                description: "İşleminiz başarıyla kaydedilmiştir",
            });
            router.push("/panel/services")
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
                        name={"icon"}
                        label='İkon'
                    />
                    <AppFormInput
                        form={form}
                        name={"title"}
                        label='Başlık'
                    />
                    <AppFormInput
                        form={form}
                        name={"description"}
                        label='Açıklama'
                        isTextarea
                    />
                    <Button type='submit'>Kaydet</Button>
                </form>
            </Form>
        </div>

    );
}

export default SaveServices