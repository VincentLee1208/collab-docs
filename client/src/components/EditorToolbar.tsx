import React, { useEffect, useState } from 'react';
import type { Editor } from '@tiptap/react';
import { Bold, Italic, Underline, List, ListOrdered, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import '../styles/EditorToolbar.css';

interface EditorToolbarProps {
  editor: Editor;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({ editor }) => {
    const [, setUpdate] = useState(0);
    const [fontSize, setFontSize] = useState('16px');

    useEffect(() => {
        if (!editor) return;

        const handler = () => {
            setUpdate((x) => x + 1);

            const attrs = editor.getAttributes('textStyle');
            if(attrs.fontSize) {
            setFontSize(attrs.fontSize);
            } else {
            setFontSize('16px');
            }
        };

        editor.on('update', handler);
        editor.on('selectionUpdate', handler);
        editor.on('transaction', handler);

        return () => {
            editor.off('update', handler);
            editor.off('selectionUpdate', handler);
            editor.off('transaction', handler);
        };
    }, [editor]);

    const applyFormatting = (action: string) => {
        switch (action) {
        case 'bold':
            editor.chain().focus().toggleBold().run();
            break;
        case 'italic':
            editor.chain().focus().toggleItalic().run();
            break;
        case 'underline':
            editor.chain().focus().toggleUnderline().run();
            break;
        case 'bulletList':
            editor.chain().focus().toggleBulletList().run();
            break;
        case 'orderedList':
            editor.chain().focus().toggleOrderedList().run();
            break;
        case 'alignLeft':
            editor.chain().focus().setTextAlign('left').run();
            break;
        case 'alignCenter':
            editor.chain().focus().setTextAlign('center').run();
            break;
        case 'alignRight':
            editor.chain().focus().setTextAlign('right').run();
            break;
        default:
            break;
        }
    };

    const changeFontSize = (delta: number) => {
        let current = parseInt(fontSize.replace('px', ''), 10);
        let next = Math.min(72, Math.max(8, current + delta));
        const nextStr = `${next}px`;

        setFontSize(nextStr);
        editor.chain().focus().setFontSize(nextStr).run();
    };

    const handleFontSizeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const num = parseInt(value, 10);

        if(!isNaN(num)) {
            const clamped = Math.min(72, Math.max(8, num));
            const sizeStr = `${clamped}px`;

            setFontSize(sizeStr);
            editor.chain().focus().setFontSize(sizeStr).run();
        }
    };

    return (
        <div className="editor-toolbar">
            
            <div className="font-size-group">
                <button
                    type="button"
                    className="font-size-btn"
                    onClick={() => changeFontSize(-2)}
                >
                    -    
                </button> 

                <input
                    type="text"
                    className="font-size-input"
                    value={parseInt(fontSize, 10)}
                    onChange={handleFontSizeInput}
                />

                <button
                    type="button"
                    className="font-size-btn"
                    onClick={() => changeFontSize(2)}
                >
                    +
                </button>
            </div>

            {/* Bold */}
            <button
                type="button"
                onClick={() => applyFormatting('bold')}
                className={`toolbar-button ${editor.isActive('bold') ? 'is-active' : ''}`}
                title="Bold"
            >
                <Bold className="toolbar-icon" />
            </button>

            {/* Italic */}
            <button
                type="button"
                onClick={() => applyFormatting('italic')}
                className={`toolbar-button ${editor.isActive('italic') ? 'is-active' : ''}`}
                title="Italic"
            >
                <Italic className="toolbar-icon" />
            </button>

            {/* Underline */}
            <button
                type="button"
                onClick={() => applyFormatting('underline')}
                className={`toolbar-button ${editor.isActive('underline') ? 'is-active' : ''}`}
                title="Underline"
            >
                <Underline className="toolbar-icon" />
            </button>

            <div className="toolbar-divider" />

            {/* Bullet list */}
            <button
                type="button"
                onClick={() => applyFormatting('bulletList')}
                className={`toolbar-button ${editor.isActive('bulletList') ? 'is-active' : ''}`}
                title="Bullet list"
            >
                <List className="toolbar-icon" />
            </button>

            {/* Ordered list */}
            <button
                type="button"
                onClick={() => applyFormatting('orderedList')}
                className={`toolbar-button ${editor.isActive('orderedList') ? 'is-active' : ''}`}
                title="Numbered list"
            >
                <ListOrdered className="toolbar-icon" />
            </button>

            <div className="toolbar-divider" />

            {/* Align left */}
            <button
                type="button"
                onClick={() => applyFormatting('alignLeft')}
                className={`toolbar-button ${editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}`}
                title="Align left"
            >
                <AlignLeft className="toolbar-icon" />
            </button>

            {/* Align center */}
            <button
                type="button"
                onClick={() => applyFormatting('alignCenter')}
                className={`toolbar-button ${editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}`}
                title="Align center"
            >
                <AlignCenter className="toolbar-icon" />
            </button>

            {/* Align right */}
            <button
                type="button"
                onClick={() => applyFormatting('alignRight')}
                className={`toolbar-button ${editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}`}
                title="Align right"
            >
                <AlignRight className="toolbar-icon" />
            </button>
        </div>
    );
};

export default EditorToolbar;