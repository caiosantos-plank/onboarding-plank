'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BasePage from "../../shared/components/basePage";
import useChatDetails from "../../lib/hooks/useChatDetails";
import { Chat } from "@/app/lib/utils/types/chat";
import ChatSidebar from "./components/ChatSidebar";
import ChatMessageList from "./components/ChatMessageList";
import ChatInput from "./components/ChatInput";
import ShareChatButton from "./components/ShareChatButton";
import useChatsManager from "@/app/lib/hooks/useChatsManager";
import { RealtimeCursors } from "./components/RealtimeCursors";

export default function ChatDetailsPage() {
  const { chatId } = useParams();
  const [chatDetails, setChatDetails] = useState<Chat>();
  const [chats, setChats] = useState<Chat[]>([]);

  const { getChats } = useChatsManager();
  const {
    currentChatMessage,
    loading,
    handleCurrentChatMessageChange,
    handleChatMessageSubmit,
    getChatDetails,
    shareChat,
  } = useChatDetails({
    endpoint: "/api/chat/agents",
    chatId: chatId as string,
  });

  useEffect(() => {
    const fetchChatDetails = async () => {
      const data = await getChatDetails();
      console.log("data", data);
      setChatDetails(data);
    };
    fetchChatDetails();
  }, [chatId]);

  useEffect(() => {
    const fetchChats = async () => {  
      const chats = await getChats();
      setChats(chats);
    };
      fetchChats();
    
  }, [getChats]);

  return (
    <BasePage>
      <div className="flex h-[calc(100vh-32px)] bg-zinc-100 dark:bg-zinc-900 rounded-lg overflow-hidden shadow-lg">
        <ChatSidebar chats={chats} />
        <main className="flex flex-col flex-1 h-full relative">
          <RealtimeCursors roomName={`cursor-${chatId}` as string} />
          {/* Header with share button */}
          <div className="flex items-center justify-between px-8 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 sticky top-0 z-20">
            <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              {chatDetails?.title || "Chat"}
            </div>
            <ShareChatButton onShare={shareChat} />
          </div>
          {/* Chat messages */}
          <div className="flex-1 flex flex-col justify-end overflow-y-auto px-2 md:px-8 pb-2">
            <ChatMessageList />
          </div>
          {/* Chat input sticky at bottom */}
          <ChatInput
            onSubmit={handleChatMessageSubmit}
            onChange={handleCurrentChatMessageChange}
            value={currentChatMessage ?? ""}
            loading={loading}
            placeholder="Type your message..."
          />
        </main>
      </div>
    </BasePage>
  );
}