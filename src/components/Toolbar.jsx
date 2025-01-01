import React from "react";
import { FaBold, FaItalic, FaStrikethrough } from "react-icons/fa";
import { GiBulletBill } from "react-icons/gi";
import { GoListOrdered, GoHorizontalRule } from "react-icons/go";
import { TbBlockquote, TbH1, TbH2, TbH3 } from "react-icons/tb";
import { IoMdReturnLeft } from "react-icons/io";

const Toolbar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="mb-4 flex flex-wrap gap-2 rounded bg-slate-50 p-2 shadow-sm">
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
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
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
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
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
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
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
        className={`rounded px-2 py-1 hover:bg-gray-200`}
        onClick={() => editor.chain().focus().setHardBreak().run()}
        aria-label="Line Break"
        title="Line Break"
      >
        <IoMdReturnLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        className={`rounded px-2 py-1 hover:bg-gray-200`}
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        aria-label="Horizontal Rule"
        title="Horizontal Rule"
      >
        <GoHorizontalRule className="h-5 w-6" />
      </button>
    </div>
  );
};

export default Toolbar;
