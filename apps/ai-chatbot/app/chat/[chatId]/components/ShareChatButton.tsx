import React, { useState, useEffect, useRef } from "react";

interface ShareChatButtonProps {
  onShare: (email: string) => void;
}

export default function ShareChatButton({ onShare }: ShareChatButtonProps) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") handleCancel();
      if (e.key === "Tab" && modalRef.current) {
        // Simple focus trap
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'input,button,[tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!first || !last) return;
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function handleConfirm() {
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    onShare(email);
  }

  function handleCancel() {
    setOpen(false);
    setEmail("");
    setError("");
  }

  return (
    <>
      <button
        className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium shadow transition"
        onClick={() => setOpen(true)}
        type="button"
      >
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 8a3 3 0 11-6 0 3 3 0 016 0zM19.5 21a8.38 8.38 0 01-15 0M12 3v5m0 0l-2-2m2 2l2-2" />
        </svg>
        Share
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div ref={modalRef} className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 w-full max-w-sm relative">
            <h2 className="text-lg font-semibold mb-4 text-zinc-900 dark:text-zinc-100">Share Chat</h2>
            <label htmlFor="share-email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Recipient Email</label>
            <input
              id="share-email"
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setError(""); }}
              className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-green-500 mb-2"
              placeholder="name@example.com"
              autoFocus
            />
            {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-4 py-2 rounded-lg bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition"
                onClick={handleCancel}
                type="button"
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold transition"
                onClick={handleConfirm}
                type="button"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 