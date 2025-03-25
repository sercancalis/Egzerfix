import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import Underline from "@tiptap/extension-underline"
import Link from '@tiptap/extension-link'
import { EditorProvider } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
import { cn } from '@/lib/utils'
import CharacterCount from "@tiptap/extension-character-count"
import Image from "@tiptap/extension-image"
import { Toolbar } from './Toolbar'
import { ResizableImage } from '@/helper/ResizableImage'

interface TiptapType {
    form: any;
    name: string;
    content: string;
    onChange: (richText: string) => void;
    disabled?: boolean;
    maxLength?: number;
    isClickTemplate?: boolean;
}
const Tiptap: React.FC<TiptapType> = (props) => {
    const limit = props.maxLength;
    const extensions = [
        Color,
        TextStyle,
        Underline,
        StarterKit.configure({
            bulletList: {
                keepMarks: true,
                keepAttributes: false,
            },
            orderedList: {
                keepMarks: true,
                keepAttributes: false,
            },
        }),
        CharacterCount.configure({
            limit
        }),
        Image.configure({
            inline: true
        }).extend({
            addAttributes() {
                return {
                    ...this.parent?.(),
                    float: {
                        default: 'none',
                        renderHTML: () => ({
                            style: 'float: left;',
                        }),
                        parseHTML: (element) => element.style.float || 'none',
                    },
                };
            },
        }),
        Link,
        ResizableImage.configure({
            inline: true
        }),
    ]

    return (
        <div className={cn('border border-primary/40 p-1 rounded', props.disabled && "cursor-not-allowed")}>
            <EditorProvider
                slotBefore={<Toolbar disabled={props.disabled} name={props.name} form={props.form} isClickTemplate={props.isClickTemplate} />}
                extensions={extensions}
                content={props.content}
                onUpdate={({ editor }) => {
                    props.onChange(editor.getHTML())
                }}
                parseOptions={{
                    preserveWhitespace: "full"
                }}
            >
                {""}
            </EditorProvider>
        </div >
    )
}

export default Tiptap
