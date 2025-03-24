"use client"

import { useCurrentEditor } from "@tiptap/react"
import {
    Bold,
    Strikethrough,
    Italic,
    List,
    ListOrdered,
    Heading1,
    Heading2,
    Heading3,
    Heading4,
    Underline,
    Quote,
    Undo,
    Redo,
    Code,
    Link,
    Unlink,
    Image
} from "lucide-react"
import { Toggle } from "@/components/ui/toggle"
import { cn } from "@/lib/utils"
import { useCallback, useEffect, useRef } from "react"
import axios from "axios"

interface ToolbarType {
    form: any;
    name: string;
    disabled?: boolean;
    isClickTemplate?: boolean;
}

export function Toolbar({ disabled, form, name, isClickTemplate }: ToolbarType) {
    const { editor } = useCurrentEditor()

    if (!editor) {
        return null
    }

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        editor?.setOptions({
            editable: !disabled,
            editorProps: {
                attributes: {
                    class: cn("object-contain", disabled && "cursor-not-allowed")
                }
            }
        })
    }, [disabled])

    const getValues = form.getValues(name);
    useEffect(() => {
        if (isClickTemplate)
            editor.commands.setContent(getValues, false, { preserveWhitespace: "full" })
    }, [isClickTemplate])

    const setLink = useCallback(() => {
        const previousUrl = editor.getAttributes('link').href
        const url = window.prompt('URL', previousUrl)

        if (url === null) {
            return
        }

        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink()
                .run()

            return
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url })
            .run()
    }, [editor])

    const uploadImage = (file: any) => {
        const formData = new FormData();
        formData.append("file", file);
        return axios.post('/api/upload', formData)
            .then((response) => {
                return response.data.url;
            })
            .catch((e) => {
                //Optionaly you can send only throw
                throw (e.response.data.error);
            });
    }

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = await uploadImage(file);
            if (imageUrl) {
                editor.chain().focus().setImage({ src: imageUrl }).run();
            }
        }
    };

    // Dosya seçme işlemini başlatır
    const handleFileSelect = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className={cn("flex gap-1 border-b border-primary/40 pb-1", disabled && "cursor-not-allowed")}>
            <Toggle
                variant={"outline"}
                size={"sm"}
                pressed={editor.isActive("bold")}
                onPressedChange={() =>
                    editor.chain().focus().toggleBold().run()
                }
                disabled={disabled}
            >
                <Bold className="h-3 w-3" />
            </Toggle>
            <Toggle
                variant={"outline"}
                size={"sm"}
                pressed={editor.isActive("italic")}
                onPressedChange={() =>
                    editor.chain().focus().toggleItalic().run()
                }
                disabled={disabled}
            >
                <Italic className="h-3 w-3" />
            </Toggle>
            <Toggle
                variant={"outline"}
                size={"sm"}
                pressed={editor.isActive("underline")}
                onPressedChange={() =>
                    editor.chain().focus().toggleUnderline().run()
                }
                disabled={disabled}
            >
                <Underline className="h-3 w-3" />
            </Toggle>
            <Toggle
                variant={"outline"}
                size={"sm"}
                pressed={editor.isActive("strike")}
                onPressedChange={() =>
                    editor.chain().focus().toggleStrike().run()
                }
                disabled={disabled}
            >
                <Strikethrough className="h-3 w-3" />
            </Toggle>
            <Toggle
                variant={"outline"}
                size={"sm"}
                pressed={editor.isActive('heading', { level: 1 })}
                onPressedChange={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                disabled={disabled}
            >
                <Heading1 className="h-3 w-3" />
            </Toggle>
            <Toggle
                variant={"outline"}
                size={"sm"}
                pressed={editor.isActive('heading', { level: 2 })}
                onPressedChange={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                disabled={disabled}
            >
                <Heading2 className="h-3 w-3" />
            </Toggle>
            <Toggle
                variant={"outline"}
                size={"sm"}
                pressed={editor.isActive('heading', { level: 3 })}
                onPressedChange={() =>
                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
                disabled={disabled}
            >
                <Heading3 className="h-3 w-3" />
            </Toggle>
            <Toggle
                variant={"outline"}
                size={"sm"}
                pressed={editor.isActive('heading', { level: 4 })}
                onPressedChange={() =>
                    editor.chain().focus().toggleHeading({ level: 4 }).run()
                }
                disabled={disabled}
            >
                <Heading4 className="h-3 w-3" />
            </Toggle>
            <Toggle
                variant={"outline"}
                size={"sm"}
                pressed={editor.isActive("bulletList")}
                onPressedChange={() =>
                    editor.chain().focus().toggleBulletList().run()
                }
                disabled={disabled}
            >
                <List className="h-3 w-3" />
            </Toggle>
            <Toggle
                variant={"outline"}
                size={"sm"}
                pressed={editor.isActive("orderedList")}
                onPressedChange={() =>
                    editor.chain().focus().toggleOrderedList().run()
                }
                disabled={disabled}
            >
                <ListOrdered className="h-3 w-3" />
            </Toggle>
            <Toggle
                variant={"outline"}
                size={"sm"}
                pressed={editor.isActive("blockquote")}
                onPressedChange={() =>
                    editor.chain().focus().toggleBlockquote().run()
                }
                disabled={disabled}
            >
                <Quote className="h-3 w-3" />
            </Toggle>
            <Toggle
                variant={"outline"}
                size={"sm"}
                pressed={editor.isActive("codeBlock")}
                onPressedChange={() =>
                    editor.chain().focus().toggleCodeBlock().run()
                }
                disabled={disabled}
            >
                <Code className="h-3 w-3" />
            </Toggle>
            <Toggle
                variant={"outline"}
                size={"sm"}
                pressed={editor.isActive("undo")}
                onPressedChange={() =>
                    editor.chain().focus().undo().run()
                }
                disabled={disabled}
            >
                <Undo className="h-3 w-3" />
            </Toggle>
            <Toggle
                variant={"outline"}
                size={"sm"}
                pressed={editor.isActive("redo")}
                onPressedChange={() =>
                    editor.chain().focus().redo().run()
                }
                disabled={disabled}
            >
                <Redo className="h-3 w-3" />
            </Toggle>
            <Toggle
                variant={"outline"}
                size={"sm"}
                pressed={editor.isActive("link")}
                onPressedChange={setLink}
                disabled={disabled}
            >
                <Link className="h-3 w-3" />
            </Toggle>
            <Toggle
                variant={"outline"}
                size={"sm"}
                pressed={false}
                onPressedChange={() =>
                    editor.chain().focus().unsetLink().run()
                }
                disabled={disabled}
            >
                <Unlink className="h-3 w-3" />
            </Toggle>
            <Toggle
                variant={"outline"}
                size={"sm"}
                pressed={false}
                onPressedChange={handleFileSelect}
                disabled={disabled}
            >
                <Image className="h-3 w-3" />
            </Toggle>

            <div className="p-1 border rounded-md items-center">
                <input
                    type="color"
                    //@ts-ignore
                    onInput={event => editor.chain().focus().setColor(event.target.value).run()}
                    value={editor.getAttributes('textStyle').color}
                    data-testid="setColor"
                    className="w-8 h-6"
                    disabled={disabled}
                />
            </div>

            {/* Dosya Seçme Input (Gizli) */}
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
        </div>
    )
}
