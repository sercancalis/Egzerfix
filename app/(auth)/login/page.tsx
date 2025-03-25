"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTransition } from "react";
import { LoginSchema } from "@/schema";
import { loginAction } from "@/actions/login";
import Logo from "@/components/Logo";

export default function LoginPage() {
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            username: "",
            password: "",
        }
    });

    type LoginResponse = {
        error?: string;
        success?: string;
    };

    const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
        startTransition(() => {
            loginAction(values)
                .then((data: LoginResponse) => {
                    if (data?.error) {
                        form.reset();
                    }
                    if (data?.success) {
                        form.reset();
                    }
                })
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/2 items-center justify-center">
                <Card>
                    <CardHeader className="flex items-center justify-center">
                        <Logo />
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex items-center justify-between">
                                            <FormLabel>Kullanıcı Adı</FormLabel>
                                            <FormMessage />
                                        </div>
                                        <FormControl>
                                            <Input {...field} disabled={isPending} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid gap-2">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex items-center justify-between">
                                            <FormLabel>Şifre</FormLabel>
                                            <FormMessage />
                                        </div>
                                        <FormControl>
                                            <Input {...field} type="password" disabled={isPending} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col">
                        <Button className="w-full" disabled={isPending}>Giriş Yap</Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    )
}