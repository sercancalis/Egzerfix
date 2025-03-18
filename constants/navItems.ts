import { Icons } from "@/components/icons";

export interface NavItem {
    title: string;
    href: string;
    disabled?: boolean;
    icon: keyof typeof Icons;
    subNavItem?: NavItem[]
}

export const navItems: NavItem[] = [
    {
        title: "Anasayfa",
        href: "/panel",
        icon: "dashboard",
    },
    {
        title: "Hakkımızda",
        href: "/panel/about",
        icon: "laptop",
    },

    {
        title: "Siteye Dön",
        href: "/",
        icon: "homeIcon",
    },
];