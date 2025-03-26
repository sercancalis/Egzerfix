"use client"
import { AppFormInput } from '@/components/AppFormInput';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import z from 'zod';
import { AppFormTiptap } from '@/components/AppFormTiptap';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { AboutSchema } from '@/schema';
import { useRouter } from 'next/navigation';
import { Abouts } from '@prisma/client';

const PanelAboutPage = () => {
    const { toast } = useToast();
    const router = useRouter();
    const form = useForm<z.infer<typeof AboutSchema>>({
        resolver: zodResolver(AboutSchema),
        defaultValues: {
            about: "",
            shortAbout: "",
        },
    })

    type AllowedNames = "title" | "about" | "shortAbout";

    useEffect(() => {
        const getAbouts = async () => {
            const res = await axios.get("/api/abouts");
            if (res.status === 200) {
                const settings: Abouts[] = res.data.data;
                settings.forEach((item) => {
                    form.setValue(item.name as AllowedNames, item.value);
                });
            }
        }

        getAbouts();
    }, [form])

    const onSubmit = async (values: z.infer<typeof AboutSchema>) => {
        const model = {
            title: values.title,
            about: values.about,
            shortAbout: values.shortAbout,
        }
        const res = await axios.post("/api/abouts", model);
        if (res && res.status == 200) {
            toast({
                description: "İşleminiz başarıyla kaydedilmiştir",
            });
            router.push("/panel")
        } else {
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
                        name={"title"}
                        label='Başlık'
                    />
                    <AppFormTiptap
                        form={form}
                        name={"shortAbout"}
                        label='Kısa Hakkımızda'
                    />
                    <AppFormTiptap
                        form={form}
                        name={"about"}
                        label='Hakkımızda'
                    />
                    <Button type='submit'>Kaydet</Button>
                </form>
            </Form>
        </div>
    )
}

export default PanelAboutPage