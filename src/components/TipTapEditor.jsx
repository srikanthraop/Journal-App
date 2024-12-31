import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";

import { FaBold, FaItalic, FaStrikethrough } from "react-icons/fa";
import { GiBulletBill } from "react-icons/gi";
import { GoListOrdered } from "react-icons/go";
import { TbBlockquote } from "react-icons/tb";

function TipTapEditor({ content, onSave, readOnly = false }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: true,
      }),
    ],
    content,
    editable: !readOnly,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none h-full",
      },
    },
  });

  useEffect(() => {
    function handleEditorUpdate() {
      if (editor && !readOnly) {
        const currentContent = editor.getJSON();
        onSave(currentContent);
      }
    }

    if (editor) {
      editor.on("update", handleEditorUpdate);

      return () => {
        editor.off("update", handleEditorUpdate);
      };
    }
  }, [editor, onSave, readOnly]);

  useEffect(() => {
    return () => {
      if (editor) editor.destroy();
    };
  }, [editor]);

  if (!editor) {
    return <p>Loading editor...</p>;
  }

  return (
    <div className="flex h-3/5 flex-col items-center justify-center p-4">
      {!readOnly && (
        <div className="mb-4 flex space-x-2 rounded bg-white p-2 shadow">
          <button
            type="button"
            className={`rounded px-2 py-1 hover:bg-green-200 ${
              editor.isActive("bold") ? "bg-green-400 font-bold" : ""
            }`}
            onClick={() => editor.chain().focus().toggleBold().run()}
            aria-label="Bold"
            title="Bold"
          >
            <FaBold className="h-5 w-5" />
          </button>
          <button
            type="button"
            className={`rounded px-2 py-1 hover:bg-gray-200 ${
              editor.isActive("italic") ? "bg-gray-400 italic" : ""
            }`}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            aria-label="Italic"
            title="Italic"
          >
            <FaItalic className="h-5 w-5" />
          </button>
          <button
            type="button"
            className={`rounded px-2 py-1 hover:bg-gray-200 ${
              editor.isActive("strike") ? "bg-gray-400 line-through" : ""
            }`}
            onClick={() => editor.chain().focus().toggleStrike().run()}
            aria-label="Strikethrough"
            title="Strikethrough"
          >
            <FaStrikethrough className="h-5 w-5" />
          </button>
          <button
            type="button"
            className={`rounded px-2 py-1 hover:bg-gray-200 ${
              editor.isActive("bulletList") ? "bg-gray-400" : ""
            }`}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            aria-label="Bullet List"
            title="Bullet List"
          >
            <GiBulletBill className="h-5 w-5" />
          </button>
          <button
            type="button"
            className={`rounded px-2 py-1 hover:bg-gray-200 ${
              editor.isActive("orderedList") ? "bg-gray-400" : ""
            }`}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            aria-label="Ordered List"
            title="Ordered List"
          >
            <GoListOrdered className="h-5 w-5" />
          </button>
          <button
            type="button"
            className={`rounded px-2 py-1 hover:bg-gray-200 ${
              editor.isActive("blockquote") ? "bg-gray-400" : ""
            }`}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            aria-label="Blockquote"
            title="Blockquote"
          >
            <TbBlockquote className="h-5 w-5" />
          </button>
        </div>
      )}

      <div className="h-2/5 w-4/5 overflow-auto rounded-md border border-gray-300 bg-white shadow-sm">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

export default TipTapEditor;
