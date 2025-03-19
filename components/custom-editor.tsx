// components/custom-editor.js
'use client' // Required only in App Router.

import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
    ClassicEditor,
    Essentials, Paragraph, Bold, Italic, Clipboard, Alignment, Heading, Link, AutoLink, Strikethrough, Underline, Code, Subscript, Superscript, Table, TableToolbar, List, TodoList, Font, BlockQuote, Highlight, HorizontalLine, Image, ImageInsert, ImageCaption,
    ImageResize,
    ImageStyle,
    ImageToolbar,
    LinkImage,
    ImageUpload,
    SimpleUploadAdapter
} from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';
import "ckbox/dist/styles/themes/lark.css";
function CustomEditor() {

    class UploadAdapter {
        private loader: any;

        constructor(loader: any) {
            // The file loader instance to use during the upload.
            this.loader = loader;
        }

        async upload() {
            const file = await this.loader.file;
            const formData = new FormData();
            formData.append("file", file);

            // Next.js API Route'a resmi gönder
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData
            });

            if (!response.ok) {
                throw new Error("Dosya yükleme başarısız!");
            }

            const data = await response.json();
            return { default: data.url };
        }
    }


    return (
        <CKEditor
            editor={ClassicEditor}
            onChange={(event, editor) => {
                const data = editor.getData()
                console.log(data)
            }}
            config={{
                licenseKey: 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NDM1NTE5OTksImp0aSI6ImMzZGFjZmYyLWNmZWEtNDg4OC04NzYwLWM3ZmQyNGM3NTg0MiIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6IjE2YjAxZTQ0In0.ipuCJXjt0bgdEnFFTQ2Pnp8iuWeAkKeY30UXI-WsCGbXV7AYoL_YsC4tgk177VX7kHTqE4dp1AJ7Vv7eLqVq_w', // Or 'GPL'.
                plugins: [Essentials, SimpleUploadAdapter, ImageUpload, UploadAdapter, Paragraph, Bold, Italic, Clipboard, Alignment, Heading, Link, Strikethrough, Underline, Code, Subscript, Superscript, Font, Table, TableToolbar, AutoLink, List, TodoList, BlockQuote, Highlight, HorizontalLine, Image, ImageInsert, ImageToolbar, ImageCaption, ImageStyle, ImageResize, LinkImage,],
                toolbar: ['undo', 'redo', '|', "heading", "|", 'bold', 'italic', "underline", "strikethrough", "|", 'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', '|', "link", "alignment", "code", "subscript", "superscript", "insertTable", "highlight", "horizontalLine", "|", "bulletedList", "numberedList", "todoList", "blockQuote", "insertImage", "ckbox"],

                // table: {
                //     contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
                // },
                heading: {
                    options: [
                        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                        { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                        { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                        { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                        { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' }
                    ]
                },
                // extraPlugins: [(editor: any) => {
                //     editor.plugins.get("FileRepository").createUploadAdapter = (loader: any) => {
                //         return new UploadAdapter(loader);
                //     };
                // }],
                image: {
                    toolbar: ["imageTextAlternative", "imageStyle:full", "imageStyle:side"],
                }
            }}
        />
    );
}

export default CustomEditor;
