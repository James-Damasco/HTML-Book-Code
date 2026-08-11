'use client';
import React from 'react';
import {
    Play,
    RotateCcw,
    Trash2,
    AlignLeft,
    Copy,
    Download,
    Save,
    Upload,
    FolderOpen,
    Maximize2,
    Monitor,
    Tablet,
    Smartphone,
} from 'lucide-react';
import type { PreviewMode } from './PlaygroundContent';

interface PlaygroundToolbarProps {
    onRun: () => void;
    onReset: () => void;
    onClear: () => void;
    onFormat: () => void;
    onCopy: () => void;
    onDownload: () => void;
    onSave: () => void;
    onImport: () => void;
    onToggleProjects: () => void;
    onFullscreenPreview: () => void;
    previewMode: PreviewMode;
    onPreviewModeChange: (mode: PreviewMode) => void;
    projectsPanelOpen: boolean;
    currentProjectName?: string;
}

export default function PlaygroundToolbar({
    onRun, onReset, onClear, onFormat, onCopy, onDownload,
    onSave, onImport, onToggleProjects, onFullscreenPreview,
    previewMode, onPreviewModeChange, projectsPanelOpen, currentProjectName,
}: PlaygroundToolbarProps) {

    const previewModes: { id: PreviewMode; icon: React.ReactNode; label: string }[] = [
        { id: 'desktop', icon: <Monitor size={15} />, label: 'Desktop' },
        { id: 'tablet', icon: <Tablet size={15} />, label: 'Tablet' },
        { id: 'mobile', icon: <Smartphone size={15} />, label: 'Mobile' },
    ];

    return (
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-card shrink-0 flex-wrap">
            {/* Project name */}
            <div className="flex items-center gap-2 mr-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-sm font-medium text-foreground truncate max-w-[160px]">
                    {currentProjectName ?? 'Untitled Project'}
                </span>
            </div>

            <div className="w-px h-5 bg-border mx-1 shrink-0" />

            {/* Primary actions */}
            <button onClick={onRun} className="btn-primary text-xs px-3 py-1.5" title="Run code (Ctrl+Enter)">
                <Play size={13} /> Run
            </button>

            <div className="w-px h-5 bg-border mx-0.5 shrink-0" />

            {/* Secondary actions */}
            <ToolbarButton onClick={onReset} icon={<RotateCcw size={14} />} label="Reset" />
            <ToolbarButton onClick={onClear} icon={<Trash2 size={14} />} label="Clear" danger />
            <ToolbarButton onClick={onFormat} icon={<AlignLeft size={14} />} label="Format" />
            <ToolbarButton onClick={onCopy} icon={<Copy size={14} />} label="Copy" />

            <div className="w-px h-5 bg-border mx-0.5 shrink-0" />

            {/* File actions */}
            <ToolbarButton onClick={onSave} icon={<Save size={14} />} label="Save" />
            <ToolbarButton onClick={onDownload} icon={<Download size={14} />} label="Download .html" />
            <ToolbarButton onClick={onImport} icon={<Upload size={14} />} label="Import .html" />

            <div className="w-px h-5 bg-border mx-0.5 shrink-0" />

            {/* Projects panel */}
            <button
                onClick={onToggleProjects}
                className={`btn-ghost text-xs px-2.5 py-1.5 ${projectsPanelOpen ? 'bg-muted text-foreground' : ''}`}
                title="My Projects"
            >
                <FolderOpen size={14} /> Projects
            </button>

            <div className="flex-1" />

            {/* Preview mode switcher */}
            <div className="flex items-center gap-0.5 bg-muted rounded-lg p-0.5">
                {previewModes.map((m) => (
                    <button
                        key={`tb-pm-${m.id}`}
                        onClick={() => onPreviewModeChange(m.id)}
                        title={m.label}
                        className={`p-1.5 rounded-md transition-all duration-150 ${previewMode === m.id
                                ? 'bg-card text-foreground shadow-sm'
                                : 'text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        {m.icon}
                    </button>
                ))}
            </div>

            <button onClick={onFullscreenPreview} className="btn-icon p-1.5" title="Fullscreen preview">
                <Maximize2 size={15} />
            </button>
        </div>
    );
}

function ToolbarButton({
    onClick, icon, label, danger,
}: {
    onClick: () => void;
    icon: React.ReactNode;
    label: string;
    danger?: boolean;
}) {
    return (
        <button
            onClick={onClick}
            title={label}
            className={`btn-icon p-1.5 text-xs gap-1 flex items-center ${danger ? 'hover:text-danger hover:bg-danger/10' : ''}`}
        >
            {icon}
            <span className="hidden xl:inline text-xs">{label}</span>
        </button>
    );
}