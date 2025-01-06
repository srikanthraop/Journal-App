import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { Node } from "@tiptap/core";
import Text from "@tiptap/extension-text";
import Paragraph from "@tiptap/extension-paragraph";
import Placeholder from "@tiptap/extension-placeholder";

const OneLiner = Node.create({
  name: "oneLiner",
  topNode: true,
  content: "block",
  parseHTML() {
    return [
      {
        tag: "p",
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["p", HTMLAttributes, 0];
  },
  editorProps: {
    attributes: {},
  },
});

function MinimalTipTapEditor({
  content,
  onSave,
  readOnly = false,
  placeholder = "Enter Title",
}) {
  const editor = useEditor({
    extensions: [
      OneLiner,
      Text,
      Paragraph,
      Placeholder.configure({
        placeholder,
        showOnlyWhenEditable: true,
      }),
    ],
    content: content ? `<p>${content}</p>` : null,
    editable: !readOnly,
    editorProps: {
      attributes: {
        class:
          "focus:outline-none text-5xl font-normal font-spectral font-semibold ",
      },
    },
    addKeyboardShortcuts: () => ({
      Enter: () => {
        return true;
      },
    }),
  });

  useEffect(() => {
    function handleEditorUpdate() {
      if (editor && !readOnly) {
        const currentContent =
          editor.getJSON()?.content?.[0]?.content?.[0]?.text || "";
        onSave(currentContent);
      }
    }

    if (editor) {
      editor.on("update", handleEditorUpdate);
      return () => editor.off("update", handleEditorUpdate);
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
    <EditorContent
      editor={editor}
      style={{
        outline: "none",
        cursor: "text",
        backgroundColor: "transparent",
        color: "#000",
        minHeight: "1.5em",
        fontSize: "1rem",
        marginLeft: "10%",
      }}
    />
  );
}

export default MinimalTipTapEditor;
