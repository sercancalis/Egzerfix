"use client";
import React, { useRef } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import axios from "axios";

interface FileInputProps {
    form: any;
    name: string;
    label: string;
}

const AppFormFileInput: React.FC<FileInputProps> = ({ form, name, label }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("/api/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            const imageUrl = response.data.url;
            form.setValue(name, imageUrl); // Form içinde URL'yi sakla
        } catch (error) {
            console.error("Dosya yükleme hatası:", error);
        }
    };

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex flex-col">
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <div className="flex items-center gap-2">
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="px-4 py-2 bg-blue-500 text-white rounded"
                            >
                                Resim Seç
                            </button>
                            {field.value && (
                                <img src={field.value} alt="Yüklenen Resim" className="w-16 h-16 rounded" />
                            )}
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default AppFormFileInput;
