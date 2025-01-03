// import React, { useEffect } from "react";
// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Link from "@tiptap/extension-link";
// import Heading from "@tiptap/extension-heading";
// import CharacterCount from "@tiptap/extension-character-count";
// import Placeholder from "@tiptap/extension-placeholder";

// import Toolbar from "./Toolbar";

// function TipTapEditor({ content, onSave, readOnly = false }) {
//   const editor = useEditor({
//     extensions: [
//       StarterKit.configure({
//         heading: false,
//       }),
//       Placeholder.configure({
//         placeholder: "Write something …",
//         showOnlyWhenEditable: true,
//         showOnlyCurrent: false,
//         includeChildren: false,
//         shouldShow: ({ editor }) => {
//           return editor.isEmpty;
//         },
//       }),
//       Heading.configure({
//         levels: [1, 2, 3],
//       }),
//       Link.configure({
//         openOnClick: true,
//       }),
//       CharacterCount,
//     ],
//     content,
//     editable: !readOnly,
//     editorProps: {
//       attributes: {
//         class:
//           "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none h-full",
//         style: "font-size: 16px; height: 300px",
//       },
//     },
//     onCreate({ editor }) {
//       if (editor.isEmpty) {
//         editor.commands.setContent("<p></p>");
//       }
//     },
//   });

//   useEffect(() => {
//     if (editor && !readOnly) {
//       editor.on("update", () => {
//         const currentContent = editor.getJSON();
//         onSave(currentContent);
//       });
//     }

//     return () => {
//       if (editor) editor.destroy();
//     };
//   }, [editor, onSave, readOnly]);

//   if (!editor) {
//     return <p>Loading editor...</p>;
//   }

//   return (
//     <div className="flex h-3/5 flex-col items-center justify-center p-4">
//       {!readOnly && <Toolbar editor={editor} />}

//       <div className="relative h-2/5 w-4/5 overflow-auto rounded-md border border-gray-200 bg-white">
//         {editor?.storage?.characterCount && (
//           <div className="relative z-10">
//             <div className="z-2 group absolute right-0 top-0 mr-2 mt-2 w-12 rounded-2xl bg-slate-100 p-1 text-center text-xs drop-shadow-sm hover:drop-shadow-none">
//               {editor.storage.characterCount.characters()} /{" "}
//               {editor.storage.characterCount.words()}
//             </div>
//           </div>
//         )}
//         <EditorContent editor={editor} />
//       </div>
//     </div>
//   );
// }

// export default TipTapEditor;

import React, { useEffect } from "react";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Heading from "@tiptap/extension-heading";
import CharacterCount from "@tiptap/extension-character-count";

// 1) import your icons if you haven't already
import { FaBold, FaItalic, FaStrikethrough } from "react-icons/fa";
import { GiBulletBill } from "react-icons/gi";
import { GoListOrdered, GoHorizontalRule } from "react-icons/go";
import { TbBlockquote, TbH1, TbH2, TbH3 } from "react-icons/tb";
import { IoMdReturnLeft } from "react-icons/io";

function TipTapEditor({ content, onSave, readOnly = false }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: false }),
      Placeholder.configure({
        placeholder: "Write something …",
        showOnlyWhenEditable: true,
        shouldShow: ({ editor }) => editor.isEmpty,
      }),
      Heading.configure({ levels: [1, 2, 3] }),
      Link.configure({ openOnClick: true }),
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
      if (editor.isEmpty) editor.commands.setContent("<p></p>");
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
      {/* 
        2) The BubbleMenu will appear wherever you select text in the editor.
           Only rendered when not read-only.
      */}
      {!readOnly && editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="mb-2 flex flex-wrap gap-2 rounded bg-slate-50 p-2 shadow-sm">
            {/* 
              3) These are the same buttons from your old Toolbar.jsx.
                 Just copy them here so they appear in the bubble.
            */}
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
              <GiBulletBill className="h-6 w-6" />
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
              <GoListOrdered className="h-6 w-6" />
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
              <TbBlockquote className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className={`rounded px-2 py-1 hover:bg-gray-200 ${
                editor.isActive("heading", { level: 1 }) ? "bg-gray-400" : ""
              }`}
              aria-label="Heading 1"
              title="Heading 1"
            >
              <TbH1 className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={`rounded px-2 py-1 hover:bg-gray-200 ${
                editor.isActive("heading", { level: 2 }) ? "bg-gray-400" : ""
              }`}
              aria-label="Heading 2"
              title="Heading 2"
            >
              <TbH2 className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              className={`rounded px-2 py-1 hover:bg-gray-200 ${
                editor.isActive("heading", { level: 3 }) ? "bg-gray-400" : ""
              }`}
              aria-label="Heading 3"
              title="Heading 3"
            >
              <TbH3 className="h-6 w-6" />
            </button>
            <button
              type="button"
              className="rounded px-2 py-1 hover:bg-gray-200"
              onClick={() => editor.chain().focus().setHardBreak().run()}
              aria-label="Line Break"
              title="Line Break"
            >
              <IoMdReturnLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="rounded px-2 py-1 hover:bg-gray-200"
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
              aria-label="Horizontal Rule"
              title="Horizontal Rule"
            >
              <GoHorizontalRule className="h-5 w-6" />
            </button>
          </div>
        </BubbleMenu>
      )}

      {/* The EditorContent below */}
      <div className="relative h-2/5 w-4/5 overflow-auto rounded-md bg-white drop-shadow-sm">
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
