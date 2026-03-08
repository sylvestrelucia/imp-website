'use client'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export function RegulatoryFlagTooltips() {
  return (
    <TooltipProvider delayDuration={120}>
      <span className="inline-flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <img src="/images/flags/ch.svg" alt="Swiss flag" className="h-4 w-auto shrink-0" loading="lazy" />
          </TooltipTrigger>
          <TooltipContent>Switzerland</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <img src="/images/flags/li.svg" alt="Liechtenstein flag" className="h-4 w-auto shrink-0" loading="lazy" />
          </TooltipTrigger>
          <TooltipContent>Liechtenstein</TooltipContent>
        </Tooltip>
      </span>
    </TooltipProvider>
  )
}
