'use server';

import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server";
import PostHogService from "./posthogService";

const posthogService = await PostHogService();

const login = async (formData: FormData) => {
        const loginData = {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
        }

        const supabase = await createClient();
        const {error } = await supabase.auth.signInWithPassword(loginData);

        if (error) {
            redirect('/login?error=Invalid credentials');
        }

        posthogService.capture({
            event: "login_button_clicked",
            distinctId: "anonymous",
            properties: {
                $process_person_profile: false,
            }
        })

        redirect('/home');
}

const signup = async (formData: FormData) => {
    try {
        const supabase = await createClient();

        const { data, error } = await supabase.auth.signUp({
            email: formData.get('email') as string,
            password: formData.get('password') as string,
        });

        if (error) {
            throw new Error(error.message);
        }

    } catch (error) {
        console.log("error", error);
        redirect('/signup?error=sww');
    }

    redirect('/confirm');
}

const signInWithGoogle = async () => {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: process.env.REDIRECT_OAUTH_URI,
          },
    });
    
    if (error) {
        redirect('/signup?error=sww');
    }
    redirect(data.url);
}

export { login, signup, signInWithGoogle };