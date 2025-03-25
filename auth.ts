import NextAuth, { User } from "next-auth"
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "@/auth.config";
const adminUserName = process.env.Admin_UserName;
const adminPassword = process.env.Admin_Password;
export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            name: 'credentials',
            credentials: {
                username: { label: 'username', type: 'text' },
                password: { label: 'password', type: 'password' },
            },
            async authorize(credentials) {
                if (typeof credentials !== "undefined") {
                    try {
                        if (credentials.username === adminUserName && credentials.password === adminPassword) {
                            const newModel: User = {
                                id: "1",
                                name: adminUserName,
                            }
                            return newModel;
                        }
                        return null;
                    } catch (error) {
                        return null
                    }
                } else {
                    return null
                }
            },
        }),
    ],
    callbacks: {
        async session({ session, token, user }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            return session;
        },
        async jwt({ token, user, trigger, session, account }) {
            if (user) {
                token.user = user;
            }

            return token;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
});