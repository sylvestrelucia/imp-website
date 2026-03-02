import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import type { AnimatedIconName } from './AnimatedIcon'
import { AnimatedIcon } from './AnimatedIcon'

interface ActionLinkButtonProps {
  href: string
  label: string
  icon: AnimatedIconName
  className?: string
  external?: boolean
}

export function ActionLinkButton({
  href,
  label,
  icon,
  className,
  external = false,
}: ActionLinkButtonProps) {
  return (
    <Button
      asChild
      variant="outlineBrand"
      size="clear"
      className={cn('px-5 py-2.5 rounded-none font-display hover:bg-transparent', className)}
    >
      {external ? (
        <a href={href} target="_blank" rel="noreferrer" className="group">
          {label}
          <AnimatedIcon name={icon} size={12} animateOnHover className="shrink-0 text-current" />
        </a>
      ) : (
        <Link href={href} className="group">
          {label}
          <AnimatedIcon name={icon} size={12} animateOnHover className="shrink-0 text-current" />
        </Link>
      )}
    </Button>
  )
}
