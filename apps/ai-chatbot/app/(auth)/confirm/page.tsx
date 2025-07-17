import React from "react";

export default function SignupConfirmation() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-neutral-900 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold text-foreground mb-4">Check your email</h2>
        <p className="text-foreground text-base mb-6">
          We have sent a confirmation link to your email address. Please check your inbox and follow the instructions to complete your registration.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          If you don&apos;t see the email, please check your spam or junk folder.
        </p>
      </div>
    </div>
  );
} 