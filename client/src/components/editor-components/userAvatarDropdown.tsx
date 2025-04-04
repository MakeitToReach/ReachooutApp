import {
    BoltIcon,
    // BookOpenIcon,
    ChevronDownIcon,
    // Layers2Icon,
    LogOutIcon,
    // PinIcon,
    // UserPenIcon,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface AvatarDropdownProps {
    name: string;
    email: string;
    handleLogout: () => void;
}
export default function AvatarDropdown({
    name,
    email,
    handleLogout,
}: AvatarDropdownProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-auto p-0 hover:bg-transparent dark">
                    <ChevronDownIcon
                        size={16}
                        className="opacity-100"
                        aria-hidden="true"
                    />
                    <Avatar>
                        <AvatarImage
                            src="https://github.com/shadcn.png"
                            alt="Profile image"
                        />
                        <AvatarFallback className="text-black">
                            {name.slice(0, 1)}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-w-64">
                <DropdownMenuLabel className="flex min-w-0 flex-col">
                    <span className="text-foreground truncate text-sm font-medium">
                        {name}
                    </span>
                    <span className="text-muted-foreground truncate text-xs font-normal">
                        {email}
                    </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Link href={"/user"} className="flex items-center gap-2 w-full h-full">
                            <BoltIcon size={16} className="opacity-60" aria-hidden="true" />
                            <span>Dashboard</span>
                        </Link>
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem> */}
                    {/*     <Layers2Icon size={16} className="opacity-60" aria-hidden="true" /> */}
                    {/*     <span>Option 2</span> */}
                    {/* </DropdownMenuItem> */}
                    {/* <DropdownMenuItem> */}
                    {/*     <BookOpenIcon size={16} className="opacity-60" aria-hidden="true" /> */}
                    {/*     <span>Option 3</span> */}
                    {/* </DropdownMenuItem> */}
                </DropdownMenuGroup>
                {/* <DropdownMenuGroup> */}
                {/*     <DropdownMenuItem> */}
                {/*         <PinIcon size={16} className="opacity-60" aria-hidden="true" /> */}
                {/*         <span>Option 4</span> */}
                {/*     </DropdownMenuItem> */}
                {/*     <DropdownMenuItem> */}
                {/*         <UserPenIcon size={16} className="opacity-60" aria-hidden="true" /> */}
                {/*         <span>Option 5</span> */}
                {/*     </DropdownMenuItem> */}
                {/* </DropdownMenuGroup> */}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                    <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
                    <span>Logout</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
