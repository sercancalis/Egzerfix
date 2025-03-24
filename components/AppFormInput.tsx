"use client"

import * as React from "react"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea";

interface AppFormInputType {
    form: any;
    name: string;
    label: string;
    placeholder?: string;
    description?: string;
    isTextarea?: boolean;
    maxlength?: number;
    disabled?: boolean;
    type?: string;
}

export const AppFormInput: React.FC<AppFormInputType> = (props) => {
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
                    <FormControl>
                        {props.isTextarea ?
                            <Textarea
                                {...field}
                                placeholder={props.placeholder}
                                className="resize-none"
                                disabled={props.disabled}
                                maxLength={props.maxlength ?? 5000}
                            />
                            :
                            <Input
                                {...field}
                                type={props.type ?? "text"}
                                placeholder={props.placeholder}
                                disabled={props.disabled}
                                maxLength={props.maxlength ?? 5000}
                            />
                        }

                    </FormControl>
                    {props.description &&
                        <FormDescription className='flex justify-end items-center'>
                            {props.description}
                        </FormDescription>
                    }
                </FormItem>
            )}
        />
    );
}