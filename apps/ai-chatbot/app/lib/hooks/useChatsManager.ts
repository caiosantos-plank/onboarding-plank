'use client';

import { redirect } from "next/navigation";
import { Chat } from "../utils/types/chat";
import { useCallback, useMemo } from "react";
import posthog from "posthog-js";
import useAuth from "./useAuth";

const useAIChatManager = () => {
    const { isAuthenticated } = useAuth();

    const createChat = async () => {
        const response = await fetch('/api/chat', {
            method: 'POST',
            body: JSON.stringify({
                title: "New Chat",
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to create chat");
        }

        const {data} = await response.json();
        return data;
    }

    const getChats = useCallback(async () => {
        const response = await fetch('/api/chat');

        if (!response.ok) {
            throw new Error("Failed to fetch chats");
        }

        const { data } = await response.json();        
        return data as Chat[];
    }, []);

    const handleCreateChat = async () => {
        if (!isAuthenticated) {
            redirect("/login");
        }

        const chat = await createChat();
        
        posthog.capture("chat_created", {
            chat_id: chat.id,
            chat_title: chat.title,
        });

        redirect(`/chat/${chat.id}`);
    }

    return {
        handleCreateChat,
        getChats
    }
}

export default useAIChatManager;