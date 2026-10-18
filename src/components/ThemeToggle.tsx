'use client'

import { Monitor, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  return <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="icon" aria-label="Choose color theme" className="rounded-full">
        <Sun className="size-[18px] dark:hidden" /><Moon className="hidden size-[18px] dark:block" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
        <DropdownMenuRadioItem value="light"><Sun className="mr-2 size-4" />Light</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="dark"><Moon className="mr-2 size-4" />Dark</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="system"><Monitor className="mr-2 size-4" />System</DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>
}
