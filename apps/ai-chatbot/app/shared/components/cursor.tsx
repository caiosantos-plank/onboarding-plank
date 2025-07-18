import { cn } from '@/app/lib/utils/cn'
import { MousePointer2 } from 'lucide-react'

export const Cursor = ({
  className,
  style,
  color,
  name,
}: {
  className?: string
  style?: React.CSSProperties
  color: string
  name: string
}) => {
  return (
    <div className={cn('pointer-events-none', className)} style={style}>
      <MousePointer2 color={color} fill={color} size={30} />

      <div
        className="mt-1 px-2 py-1 rounded text-xs font-bold text-white text-center"
        style={{ backgroundColor:  "#ADD8E6"}}
      >
        {name}
      </div>
    </div>
  )
}