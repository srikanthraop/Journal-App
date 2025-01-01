import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Heading from "@tiptap/extension-heading";
import CharacterCount from "@tiptap/extension-character-count";

import Toolbar from "./Toolbar";

function TipTapEditor({ content, onSave, readOnly = false }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
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
      {editor?.storage?.characterCount && (
        <div className="text-sm text-gray-500">
          Character Count: {editor.storage.characterCount.characters()}
          <br />
          Word Count: {editor.storage.characterCount.words()}
        </div>
      )}

      <div className="h-2/5 w-4/5 overflow-auto rounded-md border border-gray-300 bg-white">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

export default TipTapEditor;
