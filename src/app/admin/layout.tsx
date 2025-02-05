"use client";
import AdminHeader from "@/components/admin/header";
import { AuthContextProvider, useAuthContext } from '@/context/AuthContext';
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
            <AdminHeader />
            {children}
        </AuthContextProvider>
    );
}
