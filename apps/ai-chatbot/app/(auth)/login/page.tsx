

import React from "react";
import { login, signInWithGoogle } from "@/app/lib/services/supabaseService";
import Link from "next/link";

export default function LoginPage() {

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black">
            <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-neutral-900 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-foreground mb-6">Sign in to your account</h2>
                <form className="space-y-6"  autoComplete="off">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                            Email address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 placeholder-gray-400 dark:placeholder-neutral-500 bg-transparent text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="you@example.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 placeholder-gray-400 dark:placeholder-neutral-500 bg-transparent text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="••••••••"
                        />
                    </div>
                    <div>
                        <button
                            formAction={login}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md bg-foreground text-background font-semibold hover:bg-gray-900 dark:hover:bg-white dark:hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                        >
                            Sign in
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={signInWithGoogle}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md bg-foreground text-background font-semibold hover:bg-gray-900 dark:hover:bg-white dark:hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                        >
                            Sign in with Google
                        </button>
                    </div>
                    <div>
                        <Link href="/signup">
                            <p className="text-sm text-center text-foreground hover:text-blue-500 transition-colors cursor-pointer">
                                Don't have an account? Sign up
                            </p>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
