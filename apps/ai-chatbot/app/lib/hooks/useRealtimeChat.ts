import { useRef } from "react";
import { createClient } from "../utils/supabase/client";
import useAuth from "./useAuth";
import { RealtimeChannel } from "@supabase/supabase-js";

interface UseRealtimeChatProps {
    channelName: string;
    onChatContentChange: (content: string) => void;
}

const useRealtimeChat = ({ channelName, onChatContentChange }: UseRealtimeChatProps) => {

    const {user} = useAuth();
    const presenceChannel = useRef<RealtimeChannel | null>(null);

    const debounce = (
        func: (content: string) => Promise<void>,
        wait: number
      ): ((content: string) => void) => {
        let timeout: NodeJS.Timeout;
        return (content: string) => {
          clearTimeout(timeout);
          timeout = setTimeout(() => func(content), wait);
        };
      };

    const setupPresence = async () => {
        const supabase = createClient();
        const channel = supabase.channel(channelName, {
            config: {
                presence: {
                    key: user?.id,
                }
            }
        });

        channel.on('presence', {
            event: "sync",
        }, () => {
            const state = channel.presenceState();
        });

        channel.on("broadcast", { event: "content_change" }, ({ payload }) => {
            if (payload.userId !== user?.id) {
                onChatContentChange(payload.content);
            }
        });

        channel.on("broadcast", { event: "presence" }, ({ payload }) => {

        });

        channel.subscribe(async (status) => {
            if (status === "SUBSCRIBED") {
                await channel.track({
                    user: {
                        id: user?.id,
                        name: user?.name,
                    }, cursor: null, lastSeen: new Date().getTime()
                });
            }
        })

        presenceChannel.current = channel;
    }

    const broadcastContentChange = debounce(async (content: string) => {
        if(!presenceChannel.current) {
            return;
        }

        await presenceChannel.current.send({
            type: "broadcast",
            event: "content_change",
            payload: {
                userId: user?.id,
                content: content,
            },
        });
    }, 100);

    setupPresence();

    return {
        presenceChannel,
        broadcastContentChange
    }

}

export default useRealtimeChat;