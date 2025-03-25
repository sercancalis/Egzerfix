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
import { SettingSchema } from '@/schema';
import { useRouter } from 'next/navigation';
const SettingsPage = () => {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof SettingSchema>>({
    resolver: zodResolver(SettingSchema),
    defaultValues: {
      phone: "",
      mail: "",
      address: "",
      workingHours: "",
      logoDescription: "",
      homePageDescription: ""
    },
  })

  useEffect(() => {
    var getSettings = async () => {
      var res = await axios.get("/api/settings");
      if (res.status === 200) {
        res.data.data.forEach((item: any) => {
          form.setValue(item.name, item.value ?? "-");
        });
      }
    }

    getSettings();
  }, [])

  const onSubmit = async (values: z.infer<typeof SettingSchema>) => {
    var model = {
      phone: values.phone,
      mail: values.mail,
      address: values.address,
      workingHours: values.workingHours,
      logoDescription: values.logoDescription,
      homePageDescription: values.homePageDescription,
      whatsapp: values.whatsapp,
      instagram: values.instagram,
      facebook: values.facebook,
      youtube: values.youtube,
    }
    var res = await axios.post("/api/settings", model);
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
          <div className='grid grid-cols-2 gap-3'>
            <AppFormInput
              form={form}
              name={"phone"}
              label='Telefon'
            />
            <AppFormInput
              form={form}
              name={"mail"}
              label='Mail'
            />
            <AppFormInput
              form={form}
              name={"workingHours"}
              label='Çalışma Saatleri'
            />
          </div>

          <AppFormInput
            form={form}
            name={"address"}
            label='Adres'
            isTextarea
          />
          <AppFormTiptap
            form={form}
            name={"logoDescription"}
            label='Logo Açıklaması'
          />
          <AppFormTiptap
            form={form}
            name={"homePageDescription"}
            label='Anasayfa Açıklaması'
          />
          <AppFormInput
            form={form}
            name={"whatsapp"}
            label='Whatsapp'
          />
          <AppFormInput
            form={form}
            name={"instagram"}
            label='Instagram'
          />
          <AppFormInput
            form={form}
            name={"facebook"}
            label='Facebook'
          />
          <AppFormInput
            form={form}
            name={"youtube"}
            label='YouTube'
          />

          <Button type='submit'>Kaydet</Button>
        </form>
      </Form>
    </div>
  )
}

export default SettingsPage