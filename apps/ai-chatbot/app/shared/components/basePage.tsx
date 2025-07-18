'use client';

import useAuth from "@/app/lib/hooks/useAuth";
import Header from "./header";
import { useEffect } from "react";


export default function BasePage({ children }: { children: React.ReactNode }) {
    const { validateAuthSession } = useAuth();

    useEffect(() => {
        validateAuthSession();
    }, []);
    
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
        </div>
    );
}