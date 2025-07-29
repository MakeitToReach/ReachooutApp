import {
    IconSettings,
    IconCloud,
    IconShield,
    IconUsers,
    IconChartBar,
    IconMessageCircle,
    IconBell,
    IconHome,
    IconDatabase,
    IconFileText,
    IconLock,
    IconCalendar,
    IconCreditCard,
    IconMapPin,
    IconPlug,
    IconCode,
    IconDeviceLaptop,
    IconMicrophone,
    IconCamera,
    IconRobot,
    IconBuildingSkyscraper,
    IconMail,
    IconSearch,
    IconHelp,
    IconBrandYoutube,
    IconBrandX,
    IconBrandFacebook,
    IconBrandGithub,
    IconBrandInstagram,
    IconBrandLinkedin,
    IconBrandDribbble,
} from "@tabler/icons-react";

import {
    Server,
    Globe,
    LifeBuoy,
    Rocket,
    Building2,
    Wallet,
    ShoppingCart,
    Clock,
    Eye,
    Lightbulb,
    Zap,
    Layers,
    UploadCloud,
    Archive,
} from "lucide-react";

type IconOption = {
    label: string;
    //eslint-disable-next-line
    icon: (props?: React.ComponentProps<any>) => React.ReactNode;
};

export const ICONS_REGISTRY: IconOption[] = [
    { label: "Cloud", icon: (props) => <IconCloud size={20} {...props} /> },
    { label: "Security", icon: (props) => <IconShield size={20} {...props} /> },
    {
        label: "Analytics",
        icon: (props) => <IconChartBar size={20} {...props} />,
    },
    {
        label: "Support",
        icon: (props) => <LifeBuoy className="w-5 h-5" {...props} />,
    },
    { label: "Settings", icon: (props) => <IconSettings size={20} {...props} /> },
    { label: "Users", icon: (props) => <IconUsers size={20} {...props} /> },
    {
        label: "Server",
        icon: (props) => <Server className="w-5 h-5" {...props} />,
    },
    {
        label: "Global",
        icon: (props) => <Globe className="w-5 h-5" {...props} />,
    },
    {
        label: "Chat",
        icon: (props) => <IconMessageCircle size={20} {...props} />,
    },
    {
        label: "Notifications",
        icon: (props) => <IconBell size={20} {...props} />,
    },
    {
        label: "Launch",
        icon: (props) => <Rocket className="w-5 h-5" {...props} />,
    },
    {
        label: "Enterprise",
        icon: (props) => <IconBuildingSkyscraper size={20} {...props} />,
    },
    {
        label: "Documents",
        icon: (props) => <IconFileText size={20} {...props} />,
    },
    { label: "Database", icon: (props) => <IconDatabase size={20} {...props} /> },
    {
        label: "Payments",
        icon: (props) => <IconCreditCard size={20} {...props} />,
    },
    {
        label: "Wallet",
        icon: (props) => <Wallet className="w-5 h-5" {...props} />,
    },
    {
        label: "E-Commerce",
        icon: (props) => <ShoppingCart className="w-5 h-5" {...props} />,
    },
    { label: "Map", icon: (props) => <IconMapPin size={20} {...props} /> },
    { label: "Calendar", icon: (props) => <IconCalendar size={20} {...props} /> },
    { label: "Integration", icon: (props) => <IconPlug size={20} {...props} /> },
    { label: "Code", icon: (props) => <IconCode size={20} {...props} /> },
    {
        label: "Devices",
        icon: (props) => <IconDeviceLaptop size={20} {...props} />,
    },
    {
        label: "Microphone",
        icon: (props) => <IconMicrophone size={20} {...props} />,
    },
    { label: "Camera", icon: (props) => <IconCamera size={20} {...props} /> },
    { label: "AI", icon: (props) => <IconRobot size={20} {...props} /> },
    { label: "Email", icon: (props) => <IconMail size={20} {...props} /> },
    { label: "Home", icon: (props) => <IconHome size={20} {...props} /> },
    { label: "Search", icon: (props) => <IconSearch size={20} {...props} /> },
    { label: "Help", icon: (props) => <IconHelp size={20} {...props} /> },
    { label: "Privacy", icon: (props) => <IconLock size={20} {...props} /> },
    { label: "Time", icon: (props) => <Clock className="w-5 h-5" {...props} /> },
    { label: "Vision", icon: (props) => <Eye className="w-5 h-5" {...props} /> },
    {
        label: "Ideas",
        icon: (props) => <Lightbulb className="w-5 h-5" {...props} />,
    },
    {
        label: "Automation",
        icon: (props) => <Zap className="w-5 h-5" {...props} />,
    },
    {
        label: "Layers",
        icon: (props) => <Layers className="w-5 h-5" {...props} />,
    },
    {
        label: "Upload",
        icon: (props) => <UploadCloud className="w-5 h-5" {...props} />,
    },
    {
        label: "Archive",
        icon: (props) => <Archive className="w-5 h-5" {...props} />,
    },
    {
        label: "Organization",
        icon: (props) => <Building2 className="w-5 h-5" {...props} />,
    },
];

export const SOCIAL_ICONS_REGISTRY: IconOption[] = [
    {
        label: "Facebook",
        icon: (props) => <IconBrandFacebook size={20} {...props} />,
    },

    {
        label: "Github",
        icon: (props) => <IconBrandGithub size={20} {...props} />,
    },
    {
        label: "Instagram",
        icon: (props) => <IconBrandInstagram size={20} {...props} />,
    },
    {
        label: "Linkedin",
        icon: (props) => <IconBrandLinkedin size={20} {...props} />,
    },
    {
        label: "X",
        icon: (props) => <IconBrandX size={20} {...props} />,
    },
    {
        label: "Youtube",
        icon: (props) => <IconBrandYoutube size={20} {...props} />,
    },
    {
        label: "Dribble",
        icon: (props) => <IconBrandDribbble size={20} {...props} />,
    },
    {
        label: "Website",
        icon: (props) => <Globe size={20} {...props} />,
    },
];
