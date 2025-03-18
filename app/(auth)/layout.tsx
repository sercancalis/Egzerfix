import "@/app/globals.css"
import { Outfit } from "next/font/google";
const outfit = Outfit({ subsets: ["latin"] });
export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${outfit.className} antialiased`}>
                <div className="flex flex-col items-center justify-center min-h-screen">
                    {children}
                </div>
            </body>
        </html>
    );
}