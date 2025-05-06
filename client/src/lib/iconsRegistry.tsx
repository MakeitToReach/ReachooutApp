import { IconBell, IconHome, IconUser } from "@tabler/icons-react";
import { Heart, Music, Smile, Star, Sun } from "lucide-react";

type IconOption = {
    label: string;
    icon: React.ReactNode;
};

export const ICONS_REGISTRY: IconOption[] = [
    { label: "Star", icon: <Star className="w-5 h-5" /> },
    { label: "Heart", icon: <Heart className="w-5 h-5" /> },
    { label: "Music", icon: <Music className="w-5 h-5" /> },
    { label: "Smile", icon: <Smile className="w-5 h-5" /> },
    { label: "Sun", icon: <Sun className="w-5 h-5" /> },
    { label: "Home", icon: <IconHome size={20} /> },
    { label: "User", icon: <IconUser size={20} /> },
    { label: "Bell", icon: <IconBell size={20} /> },
];
