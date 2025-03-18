"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { NavItem } from "@/constants/navItems";
import AppCollapsible from "../AppCollapsible";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { ChevronDown } from "lucide-react"

interface DashboardNavProps {
    items: NavItem[];
    setOpen?: Dispatch<SetStateAction<boolean>>;
}

interface CollapseType {
    href: string,
    isOpen: boolean,
}

export function DashboardNav({ items, setOpen }: DashboardNavProps) {
    const basedPath = usePathname();
    const [collapses, setCollapses] = useState<CollapseType[]>([]);

    useEffect(() => {
        const updatedCollapses: CollapseType[] = items.map((item, index) => ({
            isOpen: item.subNavItem?.some(x => x.href === basedPath) ?? false,
            href: item.href,
        }));
        setCollapses(updatedCollapses);
    }, []);

    const toggleCollapse = (href: string) => {
        setCollapses((prevCollapses: CollapseType[]) =>
            prevCollapses.map((collapse) =>
                collapse.href === href ? { ...collapse, isOpen: !collapse.isOpen } : { ...collapse, isOpen: false }
            )
        );
    };

    return (
        <nav className="grid items-start gap-1">
            {items.map((item, index) => {
                var isActive = basedPath === item.href || (collapses.find(a => a.href === item.href)?.isOpen ?? false)
                const Icon = Icons[item.icon];
                return (
                    <div key={index}>
                        {item.subNavItem ?
                            <Collapsible className="z-0" open={collapses.find(a => a.href === item.href)?.isOpen ?? false}>
                                <CollapsibleTrigger onClick={() => toggleCollapse(item.href)} className={cn(
                                    "w-full flex rounded-md my-1",
                                    isActive ? "bg-primary text-rose-500" : "transparent hover:bg-accent hover:text-accent-foreground",
                                )}>
                                    <div className="px-3 flex w-full items-center justify-between">
                                        <span
                                            className={cn(
                                                "group flex items-center rounded-md py-2 text-sm font-medium",
                                                item.disabled && "cursor-not-allowed opacity-80",
                                            )}
                                        >
                                            <Icon className="mr-2 h-4 w-4" />
                                            <span>{item.title}</span>
                                        </span>
                                        {collapses.find(a => a.href === item.href)?.isOpen ? <ChevronDown className={"h-4 w-4 rotate-180"} /> : <ChevronDown className={"h-4 w-4"} />}
                                    </div>
                                </CollapsibleTrigger>
                                <CollapsibleContent className="flex flex-col gap-1 z-0">
                                    {item.subNavItem.map((navItem, ind) => {
                                        var isSubItemActive = basedPath === navItem.href;
                                        const SubIcon = Icons[navItem.icon];
                                        return (
                                            <Link
                                                href={navItem.href}
                                                key={ind}
                                            >
                                                <span
                                                    className={cn(
                                                        "group flex items-center rounded-md px-6 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                                                        isSubItemActive ? "bg-primary text-rose-500" : "transparent",
                                                    )}
                                                >
                                                    <SubIcon className="mr-1 h-4 w-4" />
                                                    <span className=" text-sm">{navItem.title}</span>
                                                </span>
                                            </Link>
                                        )
                                    })}
                                </CollapsibleContent>
                            </Collapsible>
                            :
                            <Link
                                href={item.href}
                                onClick={() => {
                                    if (setOpen) setOpen(false);
                                    toggleCollapse(item.href)
                                }}
                                className="z-10"
                            >
                                <span
                                    className={cn(
                                        "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                                        isActive ? "bg-primary text-rose-500" : "transparent",
                                    )}
                                >
                                    <Icon className="mr-1 h-4 w-4" />
                                    <span>{item.title}</span>
                                </span>
                            </Link>
                        }
                    </div>
                );
            })}
        </nav>
    );
} 