import { UIMessage, type Message } from "ai";
import { useChat } from "@ai-sdk/react";
import { FormEvent, useState } from "react";

interface UseChatWrapperProps {
    endpoint: string;
}

const useChatWrapper = ({ endpoint }: UseChatWrapperProps) => {
    const [currentChatMessage, setCurrentChatMessage] = useState<string>();
    const [showIntermediateSteps, setShowIntermediateSteps] = useState(
      true,
    );
    const [intermediateStepsLoading, setIntermediateStepsLoading] =
      useState(false);
  
    const [sourcesForMessages, setSourcesForMessages] = useState<
      Record<string, any>
    >({});

    const chat = useChat({
      api: endpoint,
      onResponse(response) {
        const sourcesHeader = response.headers.get("x-sources");
        const sources = sourcesHeader
          ? JSON.parse(Buffer.from(sourcesHeader, "base64").toString("utf8"))
          : [];
  
        const messageIndexHeader = response.headers.get("x-message-index");
        if (sources.length && messageIndexHeader !== null) {
          setSourcesForMessages({
            ...sourcesForMessages,
            [messageIndexHeader]: sources,
          });
        }
      },
      onError: (e) =>
        console.error(`Error while processing your request`, {
          description: e.message,
        }),
    });

    async function sendMessage(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (chat.isLoading || intermediateStepsLoading) return;
    
        if (!showIntermediateSteps) {
          chat.handleSubmit(e);
          return;
        }
    
        // Some extra work to show intermediate steps properly
        setIntermediateStepsLoading(true);
    
        chat.setInput("");
        const messagesWithUserReply = chat.messages.concat({
          id: chat.messages.length.toString(),
          content: chat.input,
          role: "user",
          parts: [],
        });
        chat.setMessages(messagesWithUserReply);
    
        const response = await fetch(endpoint, {
          method: "POST",
          body: JSON.stringify({
            messages: messagesWithUserReply,
            show_intermediate_steps: true,
          }),
        });
        const json = await response.json();
        setIntermediateStepsLoading(false);
    
        if (!response.ok) {
          console.error(`Error while processing your request`, {
            description: json.error,
          });
          return;
        }
    
        const responseMessages: Message[] = json.messages;
    
        // Represent intermediate steps as system messages for display purposes
        // TODO: Add proper support for tool messages
        const toolCallMessages = responseMessages.filter(
          (responseMessage: Message) => {
            return (
              (responseMessage.role === "assistant" &&
                !!responseMessage.parts?.length) ||
              responseMessage.role === "system"
            );
          },
        );
    
        const intermediateStepMessages = [];
        for (let i = 0; i < toolCallMessages.length; i += 2) {
          const aiMessage = toolCallMessages[i];
          const toolMessage = toolCallMessages[i + 1];

          if(!aiMessage) continue;

          intermediateStepMessages.push({
            id: (messagesWithUserReply.length + i / 2).toString(),
            role: "system" as const,
            content: JSON.stringify({
              action: aiMessage.parts?.[0],
              observation: toolMessage?.content,
            }),
            parts: [],
          });
        }

        const newMessages = messagesWithUserReply;

        for (const message of intermediateStepMessages) {
          newMessages.push(message);
          chat.setMessages([...newMessages]);
          await new Promise((resolve) =>
            setTimeout(resolve, 1000 + Math.random() * 1000),
          );
        }
    
        chat.setMessages([
          ...newMessages,
          {
            id: newMessages.length.toString(),
            content: responseMessages[responseMessages.length - 1]?.content ?? '',
            role: "assistant",
          },
        ]);
      }
    
    // const handleChatMessageSubmit = async (formData: FormData) => {
    //     try {
    //         const message = formData.get("message") as string;
    //         const response = await fetch("/api/chat/agents", {
    //             method: "POST",
    //             body: JSON.stringify({ message }),
    //         });
    
    //         const data = await response.json();
    //         console.log("data", data);
    //     } catch (error) {
    //         console.log("error", error);
    //     }
    // }

    return {
        currentChatMessage: chat.input,
        setCurrentChatMessage: chat.handleInputChange,
        handleChatMessageSubmit: sendMessage,
    }
}

export default useChatWrapper;