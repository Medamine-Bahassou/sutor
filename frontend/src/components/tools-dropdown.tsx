import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Globe, ToolCase } from "lucide-react"

export function ToolsDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline"><ToolCase /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
          <DropdownMenuItem>
            <Globe />
            Search
          </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
