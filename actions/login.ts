'use server'

import * as z from 'zod';
import { LoginSchema } from '@/schema'
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export const loginAction = async (values: z.infer<typeof LoginSchema>) => {
    const validateField = LoginSchema.safeParse(values);
    if (!validateField.success) {
        return { error: "Invalid fields !" }
    }

    const { username, password } = validateField.data;

    try {
        await signIn("credentials", {
            username,
            password,
            redirectTo: "/panel"
        })

        return { success: "Başarılı" };
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials!" }
                default:
                    return { error: "Something went wrong!" }
            }
        }

        throw error;
    }
}