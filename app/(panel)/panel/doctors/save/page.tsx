"use client"
import AppFormFileInput from '@/components/AppFormFileInput';
import { AppFormInput } from '@/components/AppFormInput';
import AppFormStarRating from '@/components/AppFormStarRating';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { DoctorSchema, } from '@/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';

const SaveDoctors = () => {
    const router = useRouter();
    const { toast } = useToast();
    const searchParams = useSearchParams()
    const id = searchParams.get('id')

    const form = useForm<z.infer<typeof DoctorSchema>>({
        resolver: zodResolver(DoctorSchema),
        defaultValues: {
            id: 0,
            name: "",
            title: "",
            image: ""
        },
    })

    useEffect(() => {
        const getData = async (id: string) => {
            var res = await axios.get(`/api/doctors?id=${id}`)
            if (res && res.status == 200) {
                form.setValue("id", res.data.data.id);
                form.setValue("name", res.data.data.name);
                form.setValue("title", res.data.data.title);
                form.setValue("image", res.data.data.image);
            }
        }
        if (id) {
            getData(id);
        }
    }, [id]);

    const onSubmit = async (values: z.infer<typeof DoctorSchema>) => {
        var res = await axios.post("/api/doctors", values);
        if (res) {
            toast({
                description: "İşleminiz başarıyla kaydedilmiştir",
            });
            router.push("/panel/doctors")
        }
        else {
            toast({
                description: "İşleminiz gerçekleştirilemedi",
                variant: "destructive"
            })
        }

    }

    const imageUrl = useWatch({ control: form.control, name: "image" });

    return (
        <div className='container mx-auto'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="border p-2 space-y-6">
                    <AppFormInput
                        form={form}
                        name={"name"}
                        label='İsim Soyisim'
                    />
                    <AppFormInput
                        form={form}
                        name={"title"}
                        label='Ünvan'
                    />

                    <AppFormFileInput
                        form={form}
                        name="image"
                        label="Profil Resmi"
                    />

                    <Button type='submit'>Kaydet</Button>
                </form>
            </Form>
        </div>

    );
}

export default SaveDoctors