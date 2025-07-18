import { createClient } from '../utils/supabase/client'
import { RealtimeChannel } from '@supabase/supabase-js'
import { useCallback, useEffect, useRef, useState } from 'react'
import useAuth from './useAuth'

const useThrottleCallback = <Params extends unknown[], Return>(
  callback: (...args: Params) => Return,
  delay: number
) => {
  const lastCall = useRef(0)
  const timeout = useRef<NodeJS.Timeout | null>(null)

  return useCallback(
    (...args: Params) => {
      const now = Date.now()
      const remainingTime = delay - (now - lastCall.current)

      if (remainingTime <= 0) {
        if (timeout.current) {
          clearTimeout(timeout.current)
          timeout.current = null
        }
        lastCall.current = now
        callback(...args)
      } else if (!timeout.current) {
        timeout.current = setTimeout(() => {
          lastCall.current = Date.now()
          timeout.current = null
          callback(...args)
        }, remainingTime)
      }
    },
    [callback, delay]
  )
}

const supabase = createClient();
const generateRandomColor = () => `hsl(${Math.floor(Math.random() * 360)}, 100%, 70%)`;

const EVENT_NAME = 'realtime-cursor-move';

type CursorEventPayload = {
  position: {
    x: number
    y: number
  },
  user: {
    id: string
    name: string
  },
  color: string,
  timestamp: number
}

export const useRealtimeCursors = ({
  roomName,
  throttleMs=50,
}: {
  roomName: string,
  throttleMs: number,
}) => {
  const [color] = useState(generateRandomColor());
  const [cursors, setCursors] = useState<Record<string, CursorEventPayload>>({});
  
  const {user} = useAuth();

  const channelRef = useRef<RealtimeChannel | null>(null)

  const callback = useCallback(
    (event: MouseEvent) => {
      const { clientX, clientY } = event

      const payload: CursorEventPayload = {
        position: {
          x: clientX,
          y: clientY,
        },
        user: {
          id: user?.id ?? "",
          name: user?.name ?? "",
        },
        color: color,
        timestamp: new Date().getTime(),
      }

      channelRef.current?.send({
        type: 'broadcast',
        event: EVENT_NAME,
        payload: payload,
      })
    },
    [color, user]
  )

  const handleMouseMove = useThrottleCallback(callback, throttleMs)

  useEffect(() => {
    const channel = supabase.channel(roomName)
    channelRef.current = channel

    channel
      .on('broadcast', { event: EVENT_NAME }, (data: { payload: CursorEventPayload }) => {
        const { user: cursorUser } = data.payload;
        // Don't render your own cursor
        if (cursorUser.id === user?.id) return

        setCursors((prev) => {
          if (!!user?.id && prev[user.id]) {
            delete prev[user.id]
          }

          return {
            ...prev,
            [cursorUser.id]: data.payload,
          }
        })
      })
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }, [])

  useEffect(() => {
    // Add event listener for mousemove
    window.addEventListener('mousemove', handleMouseMove)

    // Cleanup on unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [handleMouseMove])

  return { cursors }
}