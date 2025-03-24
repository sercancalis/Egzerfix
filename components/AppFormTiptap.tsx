"use client"

import * as React from "react"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import Tiptap from "./Tiptap";

interface AppFormTiptapType {
    form: any;
    name: string;
    label: string;
    placeholder?: string;
    description?: string;
    maxlength?: number;
    disabled?: boolean;
    isClickTemplate?: boolean;
}

export const AppFormTiptap: React.FC<AppFormTiptapType> = (props) => {
    return (
        <div className={"grid gap-1"}>
            <FormField
                control={props.form.control}
                name={props.name}
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                        <FormLabel>{props.label}</FormLabel>
                        <FormControl>
                            <Tiptap
                                form={props.form}
                                name={props.name}
                                disabled={props.disabled}
                                content={field.value}
                                onChange={field.onChange}
                                maxLength={props.maxlength}
                                isClickTemplate={props.isClickTemplate}
                            />
                        </FormControl>
                        {props.description &&
                            <FormDescription>
                                {props.description}
                            </FormDescription>
                        }
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}
