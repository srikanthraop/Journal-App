// import React, { useEffect } from "react";
// import { useEditor, EditorContent } from "@tiptap/react";
// import { Node } from "@tiptap/core";
// import StarterKit from "@tiptap/starter-kit";
// import Placeholder from "@tiptap/extension-placeholder";

// // Custom Node to enforce single-line behavior
// const OneLiner = Node.create({
//   name: "oneLiner",
//   topNode: true,
//   content: "inline*", // Allows only inline content
// });

// function MinimalTipTapEditor({
//   content,
//   onSave,
//   readOnly = false,
//   placeholder = "Click to add a phrase",
// }) {
//   const editor = useEditor({
//     extensions: [
//       OneLiner, // Custom single-line node
//       StarterKit.configure({
//         useBuiltInExtensions: false, // Disable default Doc, Paragraph, and Text nodes
//       }),
//       Placeholder.configure({
//         placeholder: "Enter Title",
//       }),
//     ],
//     content,
//     editable: !readOnly,
//     editorProps: {
//       attributes: {
//         class: "focus:outline-none text-5xl italic font-extrabold",
//       },
//     },
//     onCreate({ editor }) {
//       if (editor.isEmpty) {
//         editor.commands.setContent("<p></p>");
//       }
//     },
//   });

//   useEffect(() => {
//     function handleEditorUpdate() {
//       if (editor && !readOnly) {
//         const currentContent = editor.getHTML(); // Sync content as HTML
//         onSave(currentContent);
//       }
//     }

//     if (editor) {
//       editor.on("update", handleEditorUpdate);
//       return () => editor.off("update", handleEditorUpdate);
//     }
//   }, [editor, onSave, readOnly]);

//   useEffect(() => {
//     return () => {
//       if (editor) editor.destroy();
//     };
//   }, [editor]);

//   if (!editor) {
//     return <p>Loading editor...</p>;
//   }

//   return (
//     <EditorContent
//       editor={editor}
//       style={{
//         outline: "none", // Remove borders
//         cursor: "text", // Indicate editable area
//         backgroundColor: "transparent", // No background
//         color: "#000", // Black text
//         minHeight: "1.5em", // Enough height for a single line
//         fontSize: "1rem", // Match text size to the rest of your app
//       }}
//     />
//   );
// }

// export default MinimalTipTapEditor;
import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { Node } from "@tiptap/core";
import Text from "@tiptap/extension-text";
import Paragraph from "@tiptap/extension-paragraph"; // Import the Paragraph node
import Placeholder from "@tiptap/extension-placeholder";

// Custom Node to enforce single-line behavior
const OneLiner = Node.create({
  name: "oneLiner",
  topNode: true,
  content: "block", // Allow block-level content
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
});

function MinimalTipTapEditor({
  content,
  onSave,
  readOnly = false,
  placeholder = "Enter Title",
}) {
  const editor = useEditor({
    extensions: [
      OneLiner, // Custom single-line node
      Text, // Support inline text content
      Paragraph, // Define block-level behavior
      Placeholder.configure({
        placeholder,
        showOnlyWhenEditable: true,
      }),
    ],
    content: content ? `<p>${content}</p>` : null, // Wrap content in <p> for block compliance
    editable: !readOnly,
    editorProps: {
      attributes: {
        class: "focus:outline-none text-5xl italic font-extrabold",
      },
    },
    addKeyboardShortcuts: () => ({
      Enter: () => {
        return true; // Prevent default Enter behavior
      },
    }),
  });

  useEffect(() => {
    function handleEditorUpdate() {
      if (editor && !readOnly) {
        // Extract text from JSON to avoid block-level wrapping issues
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
        outline: "none", // Remove borders
        cursor: "text", // Indicate editable area
        backgroundColor: "transparent", // No background
        color: "#000", // Black text
        minHeight: "1.5em", // Enough height for a single line
        fontSize: "1rem", // Match text size to the rest of your app
      }}
    />
  );
}

export default MinimalTipTapEditor;
