"use client";
import AdminHeader from "@/components/admin/header";
import { AuthContextProvider, useAuthContext } from '@/context/AuthContext';
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { GoogleAnalytics } from '@next/third-parties/google'


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { user } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        if (user == null) router.push("/");
    }, [user]);

    return (
        <AuthContextProvider>
            <GoogleAnalytics gaId="G-Q3S9RY3QL6" />
            <AdminHeader />
            {children}
        </AuthContextProvider>
    );
}
