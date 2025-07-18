'use client';

import { Card } from "@repo/ui/card";
import BasePage from "../shared/components/basePage";
import useAIChatManager from "../lib/hooks/useChatsManager";

export default function Home() {
    const { handleCreateChat } = useAIChatManager();

    return (
        <BasePage>
            <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
                <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                    <h1 className="text-3xl font-bold mb-8">Welcome to AI Chatbot</h1>
                    <div className="flex gap-4 items-center flex-col sm:flex-row">
                        <a onClick={handleCreateChat}>
                        <Card
                            className="rounded-xl border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex flex-col items-start justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-base p-6 w-72 cursor-pointer"
                            title="Go to Chat" 
                        >
                            <span className="text-gray-600 dark:text-gray-300">Start chatting with your AI assistant.</span>
                        </Card>
                        </a>
                    </div>
                </main>
            </div>
        </BasePage>
    );
}