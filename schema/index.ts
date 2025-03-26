import { z } from "zod"

export const LoginSchema = z.object({
    username: z.string().min(1, {
        message: "*Lütfen kullanıcı adı giriniz",
    }),
    password: z.string().min(1, {
        message: "*Lütfen şifre giriniz",
    }),
})

export const ServiceSchema = z.object({
    id: z.number(),
    title: z.string().min(1, {
        message: "*Lütfen başlık giriniz",
    }),
    description: z.string().min(1, {
        message: "*Lütfen açıklama giriniz"
    }),
    icon: z.string().min(1, {
        message: "*Lütfen ikon bilgisi giriniz"
    })
})

export const FaqSchema = z.object({
    id: z.number(),
    question: z.string().min(1, {
        message: "*Lütfen soruyu giriniz",
    }),
    answer: z.string().min(1, {
        message: "*Lütfen cevabı giriniz"
    }),
})

export const CommentSchema = z.object({
    id: z.number(),
    name: z.string().min(1, {
        message: "*Lütfen isim giriniz",
    }),
    comment: z.string().min(1, {
        message: "*Lütfen yorum giriniz"
    }),
    star: z.number()
})

export const DoctorSchema = z.object({
    id: z.number(),
    name: z.string().min(1, {
        message: "*Lütfen isim giriniz",
    }),
    title: z.string().min(1, {
        message: "*Lütfen ünvan giriniz"
    }),
    image: z.string().min(1, {
        message: "*Lütfen resim seçiniz"
    }),
})

export const SettingSchema = z.object({
    phone: z.string().min(1, {
        message: "*Lütfen telefon giriniz",
    }),
    mail: z.string().min(1, {
        message: "*Lütfen mail giriniz",
    }),
    whatsapp: z.union([z.string(), z.null(), z.undefined()]),
    instagram: z.union([z.string(), z.null(), z.undefined()]),
    facebook: z.union([z.string(), z.null(), z.undefined()]),
    youtube: z.union([z.string(), z.null(), z.undefined()]),
    address: z.string().min(1, {
        message: "*Lütfen adres giriniz",
    }),
    workingHours: z.string().min(1, {
        message: "*Lütfen çalışma saatlerini giriniz",
    }),
    logoDescription: z.string().min(1, {
        message: "*Lütfen logo açıklaması giriniz",
    }),
    homePageDescription: z.string().min(1, {
        message: "*Lütfen anasayfa açıklaması giriniz",
    }),
})

export const CategorySchema = z.object({
    id: z.number(),
    name: z.string().min(1, {
        message: "Lütfen kategori ismi giriniz"
    }),
    isActive: z.boolean()
})

export const BlogSchema = z.object({
    id: z.number(),
    categoryId: z.number().min(1, {
        message: "Lütfen kategori seçiniz",
    }),
    title: z.string().min(1, {
        message: "Lütfen blog başlığı giriniz"
    }),
    shortContent: z.string().min(1, {
        message: "Lütfen blog başlığı giriniz"
    }),
    content: z.string().min(1, {
        message: "Lütfen blog başlığı giriniz"
    }),
    isActive: z.boolean()
})

export const AboutSchema = z.object({
    title: z.string().min(1, {
        message: "*Lütfen başlık giriniz",
    }),
    shortAbout: z.string().min(1, {
        message: "*Lütfen kısa hakkımızda giriniz",
    }),
    about: z.string().min(1, {
        message: "*Lütfen hakkımızda giriniz",
    }),
})