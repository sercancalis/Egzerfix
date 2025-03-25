"use client";
import React from "react";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";

interface StarRatingType {
    form: any;
    name: string;
    label: string;
    placeholder?: string;
    description?: string;
}

const AppFormStarRating: React.FC<StarRatingType> = (props) => {
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
                        <div className="flex items-center gap-2">
                            {[...Array(5)].map((_, index) => {
                                const currentRating = index + 1;
                                return (
                                    <label key={index}>
                                        <input
                                            type="radio"
                                            name={props.name}
                                            value={currentRating}
                                            style={{ display: "none" }}
                                            checked={field.value === currentRating}
                                            onChange={() => field.onChange(currentRating)}
                                        />
                                        <span
                                            className="star cursor-pointer"
                                            style={{
                                                color: currentRating <= field.value ? "#3CFF06" : "#87A37F",
                                            }}
                                        >
                                            &#9733;
                                        </span>
                                    </label>
                                );
                            })}
                        </div>
                    </FormControl>
                    {props.description && (
                        <FormDescription className='flex justify-end items-center'>
                            {props.description}
                        </FormDescription>
                    )}
                </FormItem>
            )}
        />
    );
};

export default AppFormStarRating;