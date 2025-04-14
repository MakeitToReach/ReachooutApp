import * as React from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Check, ChevronDown } from "lucide-react"

// Lucide Icons
import { Star, Heart, Music, Smile, Sun } from "lucide-react"
// Tabler Icons
import { IconHome, IconUser, IconBell } from "@tabler/icons-react"

type IconOption = {
  label: string
  icon: React.ReactNode
}

const ICONS: IconOption[] = [
  { label: "Star", icon: <Star className="w-5 h-5" /> },
  { label: "Heart", icon: <Heart className="w-5 h-5" /> },
  { label: "Music", icon: <Music className="w-5 h-5" /> },
  { label: "Smile", icon: <Smile className="w-5 h-5" /> },
  { label: "Sun", icon: <Sun className="w-5 h-5" /> },
  { label: "Home", icon: <IconHome size={20} /> },
  { label: "User", icon: <IconUser size={20} /> },
  { label: "Bell", icon: <IconBell size={20} /> },
]

type IconPickerProps = {
  value?: React.ReactNode
  onChange: (icon: React.ReactNode) => void
}

export const IconPicker: React.FC<IconPickerProps> = ({ value, onChange }) => {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          {value ?? "Select an icon"}
          <ChevronDown className="w-4 h-4 ml-2 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2">
        <ScrollArea className="h-48">
          <div className="grid grid-cols-4 gap-2">
            {ICONS.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  onChange(item.icon)
                  setOpen(false)
                }}
                className={cn(
                  "flex flex-col items-center justify-center p-2 rounded-md border border-transparent hover:border-muted transition",
                  value?.valueOf === item.icon?.valueOf ? "bg-muted border-primary" : ""
                )}
              >
                {item.icon}
                <span className="text-xs mt-1">{item.label}</span>
                {value?.valueOf === item.icon?.valueOf && (
                  <Check className="absolute top-1 right-1 w-4 h-4 text-primary" />
                )}
              </button>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}
