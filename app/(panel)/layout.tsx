import "@/app/globals.css"
import { auth } from "@/auth";
import PanelHeader from "@/components/panel/PanelHeader";
import Sidebar from "@/components/panel/Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"] });
export default async function ProtectedLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();
    return (
        <html lang="tr" suppressHydrationWarning>
            <body className={`${outfit.className} antialiased`}>
                <SessionProvider session={session}>
                    <PanelHeader />
                    <div className="flex h-screen overflow-hidden">
                        <Sidebar />

                        <main className="w-full pt-16">
                            <ScrollArea className="h-full flex p-6">
                                {children}
                            </ScrollArea>
                            <Toaster />
                        </main>
                    </div>
                </SessionProvider>
            </body>
        </html>
    );
}