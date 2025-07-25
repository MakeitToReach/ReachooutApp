import { useId } from "react";
import { MailIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
// import { Label } from "@/components/ui/label"

export default function EmailInput({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  const id = useId();
  return (
    <div className="*:not-first:mt-2">
      {/* <Label htmlFor={id}>Input with end icon</Label> */}
      <div className="relative">
        <Input
          id={id}
          className={cn("peer pe-9", className)}
          placeholder="Email"
          type="email"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50">
          <MailIcon size={16} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
