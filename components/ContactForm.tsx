"use client"
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Input } from './ui/input'
import { ArrowRightIcon, MailIcon, MessageSquare, PhoneIcon, User } from 'lucide-react'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { useToast } from '@/hooks/use-toast'

interface FormData {
    name: string;
    phone: string;
    email: string;
    message: string;
}

const ContactForm = () => {
    const { toast } = useToast();
    const [formData, setFormData] = useState<FormData>({ name: '', email: '', phone: "", message: '' });
    const [lastSubmitTime, setLastSubmitTime] = useState<number | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.name || !formData.message || !formData.email) {
            toast({
                description: 'Lütfen formu eksiksiz doldurunuz',
                variant: 'destructive',
            });
            return;
        }
        const now = Date.now(); // Şu anki zaman
        if (lastSubmitTime && now - lastSubmitTime < 60 * 3000) {
            toast({
                description: 'Lütfen 3 dk sonra tekrar deneyiniz',
                variant: 'destructive',
            });
            return;
        }

        setLastSubmitTime(now);
        const response = await fetch(`/api/contacts`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        const result = await response.json();
        if (response.ok) {
            toast({
                description: 'Mesajınız gönderildi. En kısa sürede dönüş sağlanacaktır.'
            })
            setFormData({ name: "", email: "", phone: "", message: "" });
        } else {
            toast({
                description: 'Error: ' + result.error,
                variant: "destructive"
            })
        }
    };
    return (
        <form className='flex flex-col gap-y-5 border rounded-lg p-4 h-full justify-center' onSubmit={handleSubmit}>
            <div className='relative flex items-center'>
                <Input type="text" name='name' placeholder='İsim Soyisim' onChange={handleChange} value={formData.name} />
                <User className='absolute right-6' size={20} />
            </div>
            <div className='relative flex items-center'>
                <Input type="email" name='email' placeholder='Mail' onChange={handleChange} value={formData.email} />
                <MailIcon className='absolute right-6' size={20} />
            </div>
            <div className='relative flex items-center'>
                <Input type="text" name='phone' placeholder='Telefon' onChange={handleChange} value={formData.email} />
                <PhoneIcon className='absolute right-6' size={20} />
            </div>
            <div className='relative flex items-center'>
                <Textarea name='message' placeholder='Mesajınızı yazınız' onChange={handleChange} value={formData.message} />
                <MessageSquare className='absolute top-4 right-6' size={20} />
            </div>
            <Button className='flex items-center gap-x-1 max-w-[166px]'>
                Mesajı Gönder
                <ArrowRightIcon size={20} />
            </Button>
        </form>
    )
}

export default ContactForm