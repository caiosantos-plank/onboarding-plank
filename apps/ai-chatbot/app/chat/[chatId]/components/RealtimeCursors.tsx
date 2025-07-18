'use client'

import { Cursor } from "@/app/shared/components/cursor";
import { useRealtimeCursors } from "@/app/lib/hooks/useRealtimeCursor";
import { useEffect } from "react";


const THROTTLE_MS = 50

export const RealtimeCursors = ({ roomName }: { roomName: string; }) => {
  const { cursors } = useRealtimeCursors({ roomName, throttleMs: THROTTLE_MS });
  
  useEffect(() => {
    console.log("cursors", cursors);
  }, [cursors]);

  return (
    <div>
      {Object.keys(cursors).map((id) => (
        <Cursor
          key={id}
          className="fixed transition-transform ease-in-out z-50"
          style={{
            transitionDuration: '20ms',
            top: 0,
            left: 0,
            transform: `translate(${cursors[id]?.position.x}px, ${cursors[id]?.position.y}px)`,
          }}
          color={cursors[id]?.color ?? "red"}
          name={cursors[id]?.user.name ?? "user"}
        />
      ))}
    </div>
  )
}