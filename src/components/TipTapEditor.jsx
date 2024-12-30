import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";

function TipTapEditor({ content, onSave, readOnly = false }) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Link.configure({
                openOnClick: true,
            }),
        ],
        content,
        editable: !readOnly, // Disable editing in read-only mode
    });

    useEffect(() => {
        function handleEditorUpdate() {
            if (editor && !readOnly) {
                const currentContent = editor.getJSON(); // Get the editor's current content
                onSave(currentContent); // Sync it with the parent
            }
        }

        if (editor) {
            editor.on("update", handleEditorUpdate); // Attach the event listener

            return function cleanupEditorUpdate() {
                editor.off("update", handleEditorUpdate); // Cleanup listener on unmount
            };
        }
    }, [editor, onSave, readOnly]);

    useEffect(() => {
        return () => {
            if (editor) editor.destroy(); // Clean up editor instance on unmount
        };
    }, [editor]);

    if (!editor) {
        return <p>Loading editor...</p>;
    }

    return (
        <div>
            {!readOnly && ( // Only show formatting buttons in edit mode
                <div style={{ marginBottom: "10px" }}>
                    <button
                        onClick={() =>
                            editor.chain().focus().toggleBold().run()
                        }
                    >
                        Bold
                    </button>
                    <button
                        onClick={() =>
                            editor.chain().focus().toggleItalic().run()
                        }
                    >
                        Italic
                    </button>
                    <button
                        onClick={() =>
                            editor.chain().focus().toggleStrike().run()
                        }
                    >
                        Strikethrough
                    </button>
                    <button
                        onClick={() =>
                            editor.chain().focus().toggleBulletList().run()
                        }
                    >
                        Bullet List
                    </button>
                    <button
                        onClick={() =>
                            editor.chain().focus().toggleOrderedList().run()
                        }
                    >
                        Ordered List
                    </button>
                    <button
                        onClick={() =>
                            editor.chain().focus().toggleBlockquote().run()
                        }
                    >
                        Blockquote
                    </button>
                    <button
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .setLink({ href: "https://example.com" })
                                .run()
                        }
                    >
                        Add Link
                    </button>
                    <button
                        onClick={() => editor.chain().focus().unsetLink().run()}
                    >
                        Remove Link
                    </button>
                </div>
            )}
            <EditorContent
                editor={editor}
                style={{
                    border: readOnly ? "none" : "1px solid #ccc",
                    padding: "10px",
                    backgroundColor: readOnly ? "transparent" : "#fff",
                }}
            />
        </div>
    );
}

export default TipTapEditor;
