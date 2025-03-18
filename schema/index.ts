import { z } from "zod"

export const LoginSchema = z.object({
    username: z.string().min(1, {
        message: "*Lütfen kullanıcı adı giriniz",
    }),
    password: z.string().min(1, {
        message: "*Lütfen şifre giriniz",
    }),
})