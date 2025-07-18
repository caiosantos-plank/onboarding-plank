"use client";

import { useState } from "react";
import { Chat } from "@/app/lib/utils/types/chat";
import Link from "next/link";

interface ChatNavMenuProps {
    chats: Chat[];
}

export default function ChatNavMenu({ chats }: ChatNavMenuProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Burger Icon */}
            <button
                className=""
                onClick={() => setIsOpen(true)}
                aria-label="Open chat menu"
            >
                <span className="block w-6 h-0.5 bg-white mb-1" />
                <span className="block w-6 h-0.5 bg-white mb-1" />
                <span className="block w-6 h-0.5 bg-white" />
            </button>

            {/* Sidebar Overlay */}
            <div
                className={`fixed inset-0 z-40 bg-black bg-opacity-30 transition-opacity duration-300 ${isOpen ? 'opacity-20 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsOpen(false)}
                aria-hidden="true"
            />

            {/* Sidebar */}
            <aside
                className={`fixed opacity-100 top-0 left-0 h-full w-64 bg-sky-500/30 shadow-lg z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-semibold">Chats</h2>
                    <button
                        className="text-gray-600 hover:text-gray-900"
                        onClick={() => setIsOpen(false)}
                        aria-label="Close chat menu"
                    >
                        &times;
                    </button>
                </div>
                <nav className="p-4">
                    <ul>
                        {chats.length === 0 ? (
                            <li className="text-white-500">No chats</li>
                        ) : (
                            chats.map((chat) => (
                                <li key={chat.id} className="mb-2">
                                    <Link href={`/chat/${chat.id}`} className="w-full text-left px-2 py-1 rounded hover:bg-gray-900">
                                        {chat.title || `Chat ${chat.id}`}
                                    </Link>
                                </li>
                            ))
                        )}
                    </ul>
                </nav>
            </aside>
        </>
    );
}