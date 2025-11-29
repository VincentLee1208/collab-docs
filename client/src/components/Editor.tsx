import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { FontSize, TextStyle } from '@tiptap/extension-text-style';

import EditorToolbar from './EditorToolbar';
import '../styles/Editor.css';

const Editor: React.FC = () => {
    const editor = useEditor({
        extensions: [StarterKit, Underline, TextAlign.configure({ types: ['heading', 'paragraph'] }), TextStyle, FontSize],
        content: `
        <h2>Welcome to collab-docs</h2>
        <p>This is your local editor. We&apos;ll add real-time collaboration with Yjs soon.</p>
        `,
    });

    if (!editor) return null;

    return (
        <div className="editor-root">
        <EditorToolbar editor={editor} />
        <div className="editor-content-wrapper">
            <EditorContent editor={editor} />
        </div>
        </div>
    );
};
export default Editor;