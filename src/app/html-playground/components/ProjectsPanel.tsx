'use client';
import React, { useState } from 'react';
import { X, FolderOpen, Trash2, Copy, Download, Clock, Search } from 'lucide-react';
import type { SavedProject } from './PlaygroundContent';

interface ProjectsPanelProps {
    projects: SavedProject[];
    currentProjectId: string | null;
    onLoad: (project: SavedProject) => void;
    onDelete: (id: string) => void;
    onDuplicate: (project: SavedProject) => void;
    onClose: () => void;
}

function formatDate(iso: string): string {
    const d = new Date(iso);
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
}

export default function ProjectsPanel({
    projects, currentProjectId, onLoad, onDelete, onDuplicate, onClose,
}: ProjectsPanelProps) {
    const [search, setSearch] = useState('');
    const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

    const filtered = projects.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = (id: string) => {
        if (confirmDelete === id) {
            onDelete(id);
            setConfirmDelete(null);
        } else {
            setConfirmDelete(id);
            setTimeout(() => setConfirmDelete(null), 3000);
        }
    };

    const handleDownload = (project: SavedProject) => {
        const blob = new Blob([project.code], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${project.name.replace(/\s+/g, '-').toLowerCase()}.html`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
                <div className="flex items-center gap-2">
                    <FolderOpen size={15} className="text-primary" />
                    <span className="text-sm font-semibold text-foreground">My Projects</span>
                    <span className="text-2xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">{projects.length}</span>
                </div>
                <button onClick={onClose} className="btn-icon p-1" aria-label="Close projects panel">
                    <X size={15} />
                </button>
            </div>

            {/* Search */}
            <div className="px-3 py-2.5 border-b border-border shrink-0">
                <div className="relative">
                    <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search projects…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="input-base pl-7 text-xs py-1.5"
                    />
                </div>
            </div>

            {/* Project list */}
            <div className="flex-1 overflow-y-auto py-2 px-2 space-y-1">
                {filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center px-4">
                        <FolderOpen size={28} className="text-muted-foreground mb-3" />
                        <p className="text-sm font-medium text-foreground mb-1">
                            {search ? 'No matching projects' : 'No saved projects yet'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            {search ? 'Try a different search term.' : 'Click Save in the toolbar to save your current code as a project.'}
                        </p>
                    </div>
                ) : (
                    filtered.map((project) => {
                        const isActive = project.id === currentProjectId;
                        const isConfirm = confirmDelete === project.id;

                        return (
                            <div
                                key={project.id}
                                className={`rounded-lg border transition-all duration-150 ${isActive
                                        ? 'border-primary/40 bg-primary/5' : 'border-border hover:border-border/80 hover:bg-muted/30'
                                    }`}
                            >
                                <div className="p-3">
                                    <div className="flex items-start justify-between gap-2">
                                        <button
                                            onClick={() => onLoad(project)}
                                            className="flex-1 text-left min-w-0"
                                        >
                                            <div className="flex items-center gap-1.5 mb-0.5">
                                                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />}
                                                <span className="text-sm font-medium text-foreground truncate">{project.name}</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-2xs text-muted-foreground">
                                                <Clock size={10} />
                                                <span>Updated {formatDate(project.updatedAt)}</span>
                                            </div>
                                            <div className="text-2xs text-muted-foreground mt-0.5 tabular-nums">
                                                {project.code.split('\n').length} lines
                                            </div>
                                        </button>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-1 mt-2">
                                        <button
                                            onClick={() => onLoad(project)}
                                            className="btn-ghost text-2xs px-2 py-1 flex-1 justify-center"
                                        >
                                            Open
                                        </button>
                                        <button
                                            onClick={() => onDuplicate(project)}
                                            className="btn-icon p-1.5"
                                            title="Duplicate project"
                                        >
                                            <Copy size={12} />
                                        </button>
                                        <button
                                            onClick={() => handleDownload(project)}
                                            className="btn-icon p-1.5"
                                            title="Download as .html"
                                        >
                                            <Download size={12} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(project.id)}
                                            className={`btn-icon p-1.5 transition-colors ${isConfirm ? 'text-danger bg-danger/10' : 'hover:text-danger hover:bg-danger/10'}`}
                                            title={isConfirm ? 'Click again to confirm delete' : 'Delete project'}
                                        >
                                            <Trash2 size={12} />
                                        </button>
                                    </div>
                                    {isConfirm && (
                                        <p className="text-2xs text-danger mt-1.5 text-center">Click delete again to confirm</p>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Footer */}
            <div className="border-t border-border px-4 py-3 shrink-0">
                <p className="text-2xs text-muted-foreground text-center">
                    Projects saved in browser storage
                </p>
            </div>
        </div>
    );
}