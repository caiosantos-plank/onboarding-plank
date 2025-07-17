'use client'

import useAuth from "@/app/lib/hooks/useAuth";
import Link from "next/link";
import React from "react";

export default function Header() {
    const { user, isAuthenticated, clearUserSession } = useAuth();

    const userName = isAuthenticated ? user?.name : 'Guest';

  return (
    <header className="w-full flex items-center justify-between py-4 px-6 bg-white dark:bg-neutral-900 shadow-sm relative">
      <div className="flex-1 flex justify-center">
        <h1 className="text-lg font-bold text-foreground">AI Chatbot</h1>
      </div>
      <div className="absolute right-6">
        {
          isAuthenticated ? ( <div className="flex items-center gap-2">
            <span className="text-foreground">Welcome, {userName}</span>
            <button onClick={clearUserSession} className="bg-foreground text-background px-4 py-2 rounded-md font-medium hover:bg-gray-900 dark:hover:bg-white dark:hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
              Sign Out
            </button>
          </div>
          ) : (
            <Link href={"/login"} className="bg-foreground text-background px-4 py-2 rounded-md font-medium hover:bg-gray-900 dark:hover:bg-white dark:hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
              Login
            </Link>
          )
        }
      </div>
    </header>
  );
}