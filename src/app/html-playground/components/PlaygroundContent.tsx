'use client';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import PlaygroundToolbar from './PlaygroundToolbar';
import PlaygroundEditor from './PlaygroundEditor';
import PlaygroundPreview from './PlaygroundPreview';
import ProjectsPanel from './ProjectsPanel';
import { toast } from 'sonner';

export type PreviewMode = 'desktop' | 'tablet' | 'mobile';

const DEFAULT_CODE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My HTML Playground</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 24px;
      background: #f9fafb;
      color: #111827;
    }
    h1 { color: #f97316; }
    .card {
      background: white;
      border-radius: 8px;
      padding: 20px;
      margin: 16px 0;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    a { color: #3b82f6; }
    button {
      background: #f97316;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
    }
    button:hover { background: #ea580c; }
  </style>
</head>
<body>
  <h1>🚀 HTML Playground</h1>
  <p>Welcome! Edit this code and click <strong>Run</strong> to see your changes.</p>

  <div class="card">
    <h2>Try These HTML Tags</h2>
    <ul>
      <li><strong>Headings:</strong> h1 to h6</li>
      <li><strong>Text:</strong> p, strong, em, mark</li>
      <li><strong>Links:</strong> a href="..."</li>
      <li><strong>Images:</strong> img src="..."</li>
      <li><strong>Lists:</strong> ul, ol, li</li>
    </ul>
  </div>

  <div class="card">
    <h2>Quick Example</h2>
    <p>Here is a <mark>highlighted</mark> word, some <strong>bold text</strong>, and some <em>italic text</em>.</p>
    <p>Visit <a href="https://www.wikipedia.org" target="_blank">Wikipedia</a> for reference.</p>
    <button onClick="alert('Hello from HTML!')">Click Me!</button>
  </div>

</body>
</html>`;

export interface SavedProject {
    id: string;
    name: string;
    code: string;
    createdAt: string;
    updatedAt: string;
}

function loadProjects(): SavedProject[] {
    try {
        return JSON.parse(localStorage.getItem('playground-projects') ?? '[]');
    } catch {
        return [];
    }
}

function saveProjects(projects: SavedProject[]) {
    // IndexedDB integration point — persist projects
    localStorage.setItem('playground-projects', JSON.stringify(projects));
}

export default function PlaygroundContent() {
    const [code, setCode] = useState(DEFAULT_CODE);
    const [previewCode, setPreviewCode] = useState(DEFAULT_CODE);
    const [previewMode, setPreviewMode] = useState<PreviewMode>('desktop');
    const [projectsPanelOpen, setProjectsPanelOpen] = useState(false);
    const [projects, setProjects] = useState<SavedProject[]>([]);
    const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);
    const [fullscreenPreview, setFullscreenPreview] = useState(false);
    const [splitRatio, setSplitRatio] = useState(50);
    const isDragging = useRef(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setProjects(loadProjects());
    }, []);

    const handleRun = useCallback(() => {
        setPreviewCode(code);
        toast.success('Code executed — preview updated');
    }, [code]);

    const handleReset = () => {
        setCode(DEFAULT_CODE);
        setPreviewCode(DEFAULT_CODE);
        setCurrentProjectId(null);
        toast('Editor reset to default template');
    };

    const handleClear = () => {
        setCode('');
    };

    const handleFormat = () => {
        // Basic HTML formatting — indent nested tags
        const formatted = code
            .replace(/>\s*</g, '>\n<')
            .split('\n')
            .reduce((acc: string[], line: string, _i: number) => {
                const trimmed = line.trim();
                if (!trimmed) return acc;
                acc.push(trimmed);
                return acc;
            }, [])
            .join('\n');
        setCode(formatted);
        toast.success('Code formatted');
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(code).then(() => toast.success('Code copied to clipboard'));
    };

    const handleDownload = () => {
        const blob = new Blob([code], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'playground.html';
        a.click();
        URL.revokeObjectURL(url);
        toast.success('HTML file downloaded');
    };

    const handleSaveProject = () => {
        const name = prompt('Project name:', currentProjectId
            ? projects.find((p) => p.id === currentProjectId)?.name ?? 'My Project' : 'My Project'
        );
        if (!name) return;

        const now = new Date().toISOString();
        if (currentProjectId) {
            const updated = projects.map((p) =>
                p.id === currentProjectId ? { ...p, name, code, updatedAt: now } : p
            );
            setProjects(updated);
            saveProjects(updated);
            toast.success(`Project "${name}" saved`);
        } else {
            const newProject: SavedProject = {
                id: `proj-${Date.now()}`,
                name,
                code,
                createdAt: now,
                updatedAt: now,
            };
            const updated = [newProject, ...projects];
            setProjects(updated);
            saveProjects(updated);
            setCurrentProjectId(newProject.id);
            toast.success(`Project "${name}" created`);
        }
    };

    const handleImport = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.html,.htm';
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (ev) => {
                const text = ev.target?.result as string;
                setCode(text);
                setPreviewCode(text);
                toast.success(`Imported: ${file.name}`);
            };
            reader.readAsText(file);
        };
        input.click();
    };

    const handleLoadProject = (project: SavedProject) => {
        setCode(project.code);
        setPreviewCode(project.code);
        setCurrentProjectId(project.id);
        setProjectsPanelOpen(false);
        toast.success(`Loaded: ${project.name}`);
    };

    const handleDeleteProject = (id: string) => {
        const updated = projects.filter((p) => p.id !== id);
        setProjects(updated);
        saveProjects(updated);
        if (currentProjectId === id) setCurrentProjectId(null);
        toast('Project deleted');
    };

    const handleDuplicateProject = (project: SavedProject) => {
        const now = new Date().toISOString();
        const dup: SavedProject = {
            ...project,
            id: `proj-${Date.now()}`,
            name: `${project.name} (copy)`,
            createdAt: now,
            updatedAt: now,
        };
        const updated = [dup, ...projects];
        setProjects(updated);
        saveProjects(updated);
        toast.success(`Duplicated: ${dup.name}`);
    };

    // Divider drag
    const handleDividerMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        isDragging.current = true;
        const onMove = (ev: MouseEvent) => {
            if (!isDragging.current || !containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const ratio = ((ev.clientX - rect.left) / rect.width) * 100;
            setSplitRatio(Math.min(80, Math.max(20, ratio)));
        };
        const onUp = () => {
            isDragging.current = false;
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onUp);
        };
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onUp);
    };

    const currentProject = projects.find((p) => p.id === currentProjectId);

    return (
        <div className="flex flex-col h-[calc(100vh-60px)] overflow-hidden">
            {/* Toolbar */}
            <PlaygroundToolbar
                onRun={handleRun}
                onReset={handleReset}
                onClear={handleClear}
                onFormat={handleFormat}
                onCopy={handleCopy}
                onDownload={handleDownload}
                onSave={handleSaveProject}
                onImport={handleImport}
                onToggleProjects={() => setProjectsPanelOpen((p) => !p)}
                onFullscreenPreview={() => setFullscreenPreview(true)}
                previewMode={previewMode}
                onPreviewModeChange={setPreviewMode}
                projectsPanelOpen={projectsPanelOpen}
                currentProjectName={currentProject?.name}
            />

            {/* Main split pane */}
            <div ref={containerRef} className="flex flex-1 overflow-hidden relative">
                {/* Editor pane */}
                <div
                    className="flex flex-col overflow-hidden border-r border-border"
                    style={{ width: `${splitRatio}%` }}
                >
                    <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card shrink-0">
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">HTML Editor</span>
                        <span className="text-2xs text-muted-foreground tabular-nums">{code.split('\n').length} lines</span>
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <PlaygroundEditor code={code} onChange={setCode} onRun={handleRun} />
                    </div>
                </div>

                {/* Drag divider */}
                <div
                    onMouseDown={handleDividerMouseDown}
                    className="w-1 bg-border hover:bg-primary/50 cursor-col-resize transition-colors duration-150 shrink-0 relative z-10"
                    title="Drag to resize"
                />

                {/* Preview pane */}
                <div
                    className="flex flex-col overflow-hidden"
                    style={{ width: `${100 - splitRatio}%` }}
                >
                    <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card shrink-0">
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Live Preview</span>
                        <PreviewModeIndicator mode={previewMode} />
                    </div>
                    <div className="flex-1 overflow-hidden bg-[#f8f9fa]">
                        <PlaygroundPreview code={previewCode} mode={previewMode} />
                    </div>
                </div>

                {/* Projects panel overlay */}
                {projectsPanelOpen && (
                    <div className="absolute right-0 top-0 h-full w-80 bg-card border-l border-border z-20 shadow-2xl slide-up overflow-hidden flex flex-col">
                        <ProjectsPanel
                            projects={projects}
                            currentProjectId={currentProjectId}
                            onLoad={handleLoadProject}
                            onDelete={handleDeleteProject}
                            onDuplicate={handleDuplicateProject}
                            onClose={() => setProjectsPanelOpen(false)}
                        />
                    </div>
                )}
            </div>

            {/* Fullscreen preview modal */}
            {fullscreenPreview && (
                <div className="fixed inset-0 z-50 bg-background flex flex-col fade-in">
                    <div className="flex items-center justify-between px-6 py-3 border-b border-border bg-card shrink-0">
                        <span className="text-sm font-semibold text-foreground">Fullscreen Preview</span>
                        <div className="flex items-center gap-3">
                            <PreviewModeSwitcher mode={previewMode} onChange={setPreviewMode} />
                            <button
                                onClick={() => setFullscreenPreview(false)}
                                className="btn-secondary text-xs px-3 py-1.5"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 overflow-hidden bg-[#f8f9fa]">
                        <PlaygroundPreview code={previewCode} mode={previewMode} />
                    </div>
                </div>
            )}
        </div>
    );
}

function PreviewModeIndicator({ mode }: { mode: PreviewMode }) {
    const labels: Record<PreviewMode, string> = {
        desktop: 'Desktop',
        tablet: 'Tablet (768px)',
        mobile: 'Mobile (375px)',
    };
    return <span className="text-2xs text-muted-foreground">{labels[mode]}</span>;
}

function PreviewModeSwitcher({ mode, onChange }: { mode: PreviewMode; onChange: (m: PreviewMode) => void }) {
    const modes: { id: PreviewMode; label: string }[] = [
        { id: 'desktop', label: 'Desktop' },
        { id: 'tablet', label: 'Tablet' },
        { id: 'mobile', label: 'Mobile' },
    ];
    return (
        <div className="flex items-center gap-1 bg-muted rounded-lg p-0.5">
            {modes.map((m) => (
                <button
                    key={`pms-${m.id}`}
                    onClick={() => onChange(m.id)}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-150 ${mode === m.id ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                        }`}
                >
                    {m.label}
                </button>
            ))}
        </div>
    );
}
