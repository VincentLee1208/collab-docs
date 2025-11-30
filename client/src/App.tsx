import { useState } from 'react';
import Editor from './components/Editor';
import EditorSideBar from './components/EditorSideBar';
import type { Doc } from './types/Document';

import './styles/App.css';

// Hardcoded for now; will be fetched from backend later
const initialDocs: Doc[] = [
  { 
    id: '1', 
    title: 'Untitled Document', 
    content: 'This is the content of the document.',
    createdAt: new Date(),
    lastModifiedAt: new Date(),
  },
  {
    id: '2',
    title: 'Meeting Notes',
    content: 'These are the notes from the meeting.',
    createdAt: new Date(),
    lastModifiedAt: new Date(),
  },
  {
    id: '3',
    title: 'Project Plan',
    content: 'This is the project plan document.',
    createdAt: new Date(),
    lastModifiedAt: new Date(),
  },
];

export default function App() {
  const [docs, setDocs] = useState<Doc[]>(initialDocs);
  const [activeDocId, setActiveDocId] = useState<string>('3');

  const activeDoc = docs.find(doc => doc.id === activeDocId)!;

  return (
    <div className="App">
      <div className="app-container">
        {/* Sidebar */}
        <div className="app-sidebar">
          <EditorSideBar
            documents={docs}
            selectedDocId={activeDocId}
            onSelectDoc={setActiveDocId}
          />
        </div>

        {/* Editor */}
        <div className="app-editor">
          <Editor
            document={activeDoc}
          />
        </div>
      </div>
    </div>
  );
}