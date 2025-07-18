import React, { FormEvent, ReactNode } from "react";

interface ChatInputProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onStop?: () => void;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loading?: boolean;
  placeholder?: string;
  children?: ReactNode;
  className?: string;
  actions?: ReactNode;
}

export default function ChatInput(props: ChatInputProps) {
  const disabled = props.loading && props.onStop == null;
  return (
    <form
      className={`flex w-full flex-col sticky bottom-0 z-10 px-2 md:px-8 py-4 bg-gradient-to-t from-zinc-100/90 dark:from-zinc-900/90 to-transparent ${props.className ?? ""}`}
      onSubmit={props.onSubmit}
      style={{ boxShadow: "0 -2px 16px 0 rgba(0,0,0,0.04)" }}
    >
      <div className="flex items-end max-w-2xl w-full mx-auto bg-white dark:bg-zinc-800 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-700 px-4 py-3 gap-3">
        <input
          id="message"
          name="message"
          value={props.value}
          placeholder={props.placeholder}
          onChange={props.onChange}
          className="flex-1 bg-transparent outline-none border-none text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 text-lg px-2 py-2 rounded-md focus:ring-2 focus:ring-blue-400 transition"
          autoComplete="off"
          disabled={props.loading}
          aria-label="Type your message"
        />
        <div className="flex gap-2 items-center">
          {props.actions}
          <button
            type="submit"
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-xl font-semibold shadow transition focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            disabled={disabled || !props.value.trim()}
            aria-label="Send message"
          >
            {props.loading ? (
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
            ) : (
              <>
                <span className="hidden sm:inline">Send</span>
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
} 