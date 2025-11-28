import React, { useEffect, useState } from 'react';
import type { Editor } from '@tiptap/react';
import { Bold, Italic, Underline, List, ListOrdered, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import '../styles/EditorToolbar.css';

interface EditorToolbarProps {
  editor: Editor;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({ editor }) => {
  const [, setUpdate] = useState(0); // dummy state to re-render

  // 🔥 Force re-render on every editor update
  useEffect(() => {
    if (!editor) return;

    const handler = () => {
      setUpdate((x) => x + 1);
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

  return (
    <div className="editor-toolbar">
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