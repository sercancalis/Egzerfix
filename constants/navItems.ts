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
        title: "Kategoriler",
        href: "/panel/categories",
        icon: "settings",
    },
    {
        title: "Bloglar",
        href: "/panel/blogs",
        icon: "settings",
    },
    {
        title: "Hakkımızda",
        href: "/panel/about",
        icon: "laptop",
    },
    {
        title: "Hizmetlerimiz",
        href: "/panel/services",
        icon: "laptop",
    },
    {
        title: "Sıkça Sorulan Sorular",
        href: "/panel/faqs",
        icon: "laptop",
    },
    {
        title: "Yorumlar",
        href: "/panel/comments",
        icon: "laptop",
    },
    {
        title: "Doktorlar",
        href: "/panel/doctors",
        icon: "laptop",
    },
    {
        title: "Ayarlar",
        href: "/panel/settings",
        icon: "settings",
    },
    {
        title: "Siteye Dön",
        href: "/",
        icon: "homeIcon",
    },
];