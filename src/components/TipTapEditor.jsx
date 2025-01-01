import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Heading from "@tiptap/extension-heading";
import CharacterCount from "@tiptap/extension-character-count";
import Placeholder from "@tiptap/extension-placeholder";

import Toolbar from "./Toolbar";

function TipTapEditor({ content, onSave, readOnly = false }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
      }),
      Placeholder.configure({
        placeholder: "Write something …",
        showOnlyWhenEditable: true,
        showOnlyCurrent: false,
        includeChildren: false,
        shouldShow: ({ editor }) => {
          return editor.isEmpty;
        },
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Link.configure({
        openOnClick: true,
      }),
      CharacterCount,
    ],
    content,
    editable: !readOnly,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none h-full",
        style: "font-size: 16px; height: 300px",
      },
    },
    onCreate({ editor }) {
      if (editor.isEmpty) {
        editor.commands.setContent("<p></p>");
      }
    },
  });

  useEffect(() => {
    if (editor && !readOnly) {
      editor.on("update", () => {
        const currentContent = editor.getJSON();
        onSave(currentContent);
      });
    }

    return () => {
      if (editor) editor.destroy();
    };
  }, [editor, onSave, readOnly]);

  if (!editor) {
    return <p>Loading editor...</p>;
  }

  return (
    <div className="flex h-3/5 flex-col items-center justify-center p-4">
      {!readOnly && <Toolbar editor={editor} />}

      <div className="relative h-2/5 w-4/5 overflow-auto rounded-md border border-gray-200 bg-white">
        {editor?.storage?.characterCount && (
          <div className="relative z-10">
            <div className="z-2 group absolute right-0 top-0 mr-2 mt-2 w-12 rounded-2xl bg-slate-100 p-1 text-center text-xs drop-shadow-sm hover:drop-shadow-none">
              {editor.storage.characterCount.characters()} /{" "}
              {editor.storage.characterCount.words()}
            </div>
          </div>
        )}
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

export default TipTapEditor;
