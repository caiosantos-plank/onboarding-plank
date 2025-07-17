'use server';

import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server";

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

        redirect('/chat');
}

const signup = async (formData: FormData) => {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signUp({
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    });

    if (error) {
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
    console.log('data', data);
    redirect(data.url);
}

export { login, signup, signInWithGoogle };