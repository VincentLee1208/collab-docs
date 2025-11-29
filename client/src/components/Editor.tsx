import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { FontSize, TextStyle } from '@tiptap/extension-text-style';

import EditorToolbar from './EditorToolbar';
import type { Doc } from '../types/Document';
import '../styles/Editor.css';

export default function Editor({ document }: { document: Doc }) {
    const editor = useEditor({
        extensions: [StarterKit, Underline, TextAlign.configure({ types: ['heading', 'paragraph'] }), TextStyle, FontSize],
        content: document.content,
    });

    if (!editor) return null;

    return (
        <div className="editor-root">
            <div className="editor-title">{document.title}</div>
            <EditorToolbar editor={editor} />
            <div className="editor-content-wrapper">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
};