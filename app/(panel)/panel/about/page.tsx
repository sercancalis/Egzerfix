"use client"
import { AppFormTiptap } from '@/components/AppFormTiptap'
import { LoginSchema } from '@/schema'
import React from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form';

const page = () => {

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            username: "",
            password: ""
        },
    })

    function onSubmit(values: z.infer<typeof LoginSchema>) {

    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="border p-2 space-y-6">
                    <AppFormTiptap
                        form={form}
                        name={"username"}
                        label='Hakkımızda'
                    />

                    <Button type='submit'>Kaydet</Button>
                </form>
            </Form>
        </div>
    )
}

export default page