import { FileText } from 'lucide-react';
import type { Doc } from '../types/Document';
import '../styles/EditorSideBar.css';

interface EditorSideBarProps {
    documents: Doc[];
    selectedDocId: string;
    onSelectDoc: (id: string) => void;
}

export default function EditorSideBar({ documents, selectedDocId, onSelectDoc }: EditorSideBarProps) {
    if(documents.length === 0) {
        return (
            <div className="editor-sidebar">
                <div className="editor-sidebar-empty">No documents yet</div>
            </div>
        );
    }

    return (
        <div className="editor-sidebar">
            {documents.map((doc) => {
                const isSelected = selectedDocId === doc.id;

                return (
                    <div
                        key={doc.id}
                        className={`editor-sidebar-item ${isSelected ? 'is-selected' : ''}`}
                        onClick={() => onSelectDoc(doc.id)}
                    >
                    <FileText className="editor-sidebar-icon" />

                        <div className="editor-sidebar-text">
                            <p className="editor-sidebar-title">{doc.title}</p>
                            <p className="editor-sidebar-meta">
                                {doc.lastModifiedAt.toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                );
                })}
        </div>
    );
}