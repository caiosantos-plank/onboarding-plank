'use client';

import { FormEvent, ReactNode, useEffect } from "react";
import useAuth from "../lib/hooks/useAuth";
import { useSearchParams } from "next/navigation";
import BasePage from "../shared/components/basePage";
import useChatWrapper from "../lib/hooks/useChatWrapper";


export default function ChatPage() {
    const { validateAuthSession } = useAuth();
    const { currentChatMessage, setCurrentChatMessage, handleChatMessageSubmit } = useChatWrapper({ endpoint: "/api/chat/agents" });

    useEffect(() => {
        validateAuthSession();
    }, []);

    function chatInput(props: {
      onSubmit: (e: FormEvent<HTMLFormElement>) => void;
      onStop?: () => void;
      value: string;
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
      loading?: boolean;
      placeholder?: string;
      children?: ReactNode;
      className?: string;
      actions?: ReactNode;
    }) {
      const disabled = props.loading && props.onStop == null;
      return (
        <form
          className={"flex w-full flex-col"}
          onSubmit={props.onSubmit}
        >
          <div className="border border-input bg-secondary rounded-lg flex flex-col gap-2 max-w-[768px] w-full mx-auto">
            <input
              id="message"
              name="message"
              value={props.value}
              placeholder={props.placeholder}
              onChange={props.onChange}
              className="border-none outline-none bg-transparent p-4"
            />
    
            <div className="flex justify-between ml-4 mr-2 mb-2">
              <div className="flex gap-3">{props.children}</div>
    
              <div className="flex gap-2 self-end">
                {props.actions}
                <button type="submit" className="self-end" disabled={disabled}>
                  {props.loading ? (
                    <span role="status" className="flex justify-center">
                      {/* <LoaderCircle className="animate-spin" /> */}
                      <span className="sr-only">Loading...</span>
                    </span>
                  ) : (
                    <span>Send</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      );
    }
  
    return (
        <BasePage>
            <div>
                <h1>Chat</h1>
              {chatInput({
                onSubmit: handleChatMessageSubmit,
                onChange: setCurrentChatMessage,
                value: currentChatMessage ?? "",
              })}
            </div>
        </BasePage>
    );
}