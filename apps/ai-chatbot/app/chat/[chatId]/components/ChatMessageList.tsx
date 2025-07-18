import React from "react";

const mockMessages = [
  { id: 1, sender: "user", text: "Hello!" },
  { id: 2, sender: "ai", text: "Hi there! How can I help you today?" },
  { id: 3, sender: "user", text: "Tell me a joke." },
  { id: 4, sender: "ai", text: "Why did the scarecrow win an award? Because he was outstanding in his field!" },
];

export default function ChatMessageList() {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
      {mockMessages.map((msg) => (
        <div
          key={msg.id}
          className={`max-w-[70%] px-4 py-2 rounded-lg shadow-sm text-base whitespace-pre-line ${
            msg.sender === "user"
              ? "ml-auto bg-blue-500 text-white"
              : "mr-auto bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700"
          }`}
        >
          {msg.text}
        </div>
      ))}
    </div>
  );
} 