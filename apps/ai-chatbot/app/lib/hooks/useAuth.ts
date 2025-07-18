'use client'

import posthog from "posthog-js";
import { useAuthStore } from "../stores/useAuthStore";
import { createClient } from "../utils/supabase/client";
import { User } from "../utils/types/user";
import { redirect } from "next/navigation";

const useAuth = () => {
    const { setUser, setIsAuthenticated, user, isAuthenticated } = useAuthStore();

    const logAnalyticsSession = (user: User) => {
        posthog.identify(user.id, {
            email: user.email,
            name: user.name
        });
    }

    const clearAnalyticsSession = () => {
        posthog.reset();
    }
    
    const storeUserSession = (user: User) => {
        setUser(user);
        setIsAuthenticated(true);
        logAnalyticsSession(user);
    }

    const clearUserSession = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();

        setIsAuthenticated(false);
        setUser(null);
        clearAnalyticsSession();

        redirect("/home");
    }

    const validateAuthSession = async () => {
        const supabase = createClient();
        const { data, error } = await supabase.auth.getSession();
        const session = data?.session;

        if (!session || error) {
            clearUserSession();
            return;
        }

        const user = {
            id: session.user.id ?? '',
            name: session.user.email?.split('@')[0] ?? '',
            email: session.user.email ?? ''
        };
        storeUserSession(user);
    }


    return { 
        validateAuthSession,
        clearUserSession,
        user,
        isAuthenticated,
     };
}

export default useAuth;