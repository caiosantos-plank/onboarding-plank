import { Chat } from "@/app/lib/utils/types/chat";
import Link from "next/link";
import React from "react";

interface ChatSidebarProps {
  chats: Chat[];
}

export default function ChatSidebar({ chats }: ChatSidebarProps) {
  return (
    <aside className="flex flex-col w-64 h-full bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 p-4 shadow-sm">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">AI Chat</h1>
      </div>
      <nav className="flex-1">
        <ul className="space-y-2">
          {chats.map((chat) => (
            <Link key={chat.id} href={`/chat/${chat.id}`}>
              <li className="text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 p-2 rounded-md">
                {chat.title}
              </li>
            </Link>
          ))}
        </ul>
      </nav>
    </aside>
  );
} 