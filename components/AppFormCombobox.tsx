
"use client"

import * as React from "react"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { ChevronDown } from "lucide-react"

interface AppFormComboboxType {
    form: any;
    name: string;
    data: { value: number, label: string }[],
    label: string;
    placeholder?: string;
    searchPlaceholder?: string;
    description?: string;
    isClickedClose?: boolean;
    isRemoveSelectedValue?: boolean;
}

export const AppFormCombobox: React.FC<AppFormComboboxType> = (props) => {
    const [open, setOpen] = React.useState(false)
    return (
        <FormField
            control={props.form.control}
            name={props.name}
            render={({ field }) => (
                <FormItem className="flex flex-col">
                    <div className='flex items-center justify-between'>
                        <FormLabel>{props.label}</FormLabel>
                        <FormMessage />
                    </div>
                    <Popover open={open} onOpenChange={setOpen}>
                        <div className={cn("flex items-center justify-center")}>
                            <PopoverTrigger asChild >
                                <FormControl>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        className={cn(
                                            "w-full justify-between",
                                            !field.value && "text-muted-foreground",

                                        )}

                                    >
                                        {field.value
                                            ? props.data.find(
                                                (x) => x.value === field.value
                                            )?.label
                                            : props.placeholder ?? "Seçiniz..."}
                                        <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </FormControl>
                            </PopoverTrigger>
                        </div>
                        <PopoverContent className="p-0">
                            <Command>
                                <CommandInput placeholder={props.searchPlaceholder ?? "Ara.."} />
                                <CommandList>
                                    <CommandEmpty>Data Not Found</CommandEmpty>
                                    <CommandGroup>
                                        {props.data.map((x) => (
                                            <CommandItem
                                                value={x.label}
                                                key={x.value}
                                                onSelect={() => {
                                                    if (props.isRemoveSelectedValue && x.value === field.value) {
                                                        props.form.setValue(props.name, null);
                                                        if (props.isClickedClose) setOpen(false)
                                                        return;
                                                    }
                                                    props.form.setValue(props.name, x.value);
                                                    field.onChange(x.value)
                                                    if (props.isClickedClose) setOpen(false)
                                                }}
                                            >
                                                {x.label}
                                                <CheckIcon
                                                    className={cn(
                                                        "ml-auto h-4 w-4",
                                                        x.value === field.value
                                                            ? "opacity-100"
                                                            : "opacity-0"
                                                    )}
                                                />
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    {props.description &&
                        <FormDescription>
                            {props.description}
                        </FormDescription>
                    }
                </FormItem>
            )}
        />
    );
}
