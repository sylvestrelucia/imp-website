import { cn } from '@/utilities/ui'

interface TickerBadgeProps {
  ticker: string
  company: string
  className?: string
}

export function TickerBadge({ ticker, company, className }: TickerBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full bg-[#e8edff] px-4 py-2 text-[13px] uppercase tracking-[0.06em] font-display font-medium text-[#0b1035]',
        className,
      )}
    >
      <span className="text-[#0040ff] font-semibold">{ticker}</span>
      {company}
    </span>
  )
}
