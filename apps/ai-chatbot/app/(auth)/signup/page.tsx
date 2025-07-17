import React from "react";
import { signup } from "@/app/lib/services/supabaseService";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-neutral-900 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-foreground mb-6">Create your account</h2>
        <form className="space-y-6" autoComplete="off">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 placeholder-gray-400 dark:placeholder-neutral-500 bg-transparent text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Your name"
            />
          </div>
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
              autoComplete="new-password"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-neutral-700 placeholder-gray-400 dark:placeholder-neutral-500 bg-transparent text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="••••••••"
            />
          </div>
          <div>
            <button
              formAction={signup}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md bg-foreground text-background font-semibold hover:bg-gray-900 dark:hover:bg-white dark:hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
