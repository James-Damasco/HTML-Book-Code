'use client';
import React, { useState, useRef, useCallback } from 'react';
import { Play, RotateCcw, Copy, Trash2, Maximize2 } from 'lucide-react';
import { toast } from 'sonner';

interface LiveCodeEditorProps {
    initialCode: string;
    lessonId: string;
}

export default function LiveCodeEditor({ initialCode, lessonId }: LiveCodeEditorProps) {
    const [code, setCode] = useState(initialCode);
    const [previewCode, setPreviewCode] = useState(initialCode);
    const [fullscreen, setFullscreen] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleRun = useCallback(() => {
        setPreviewCode(code);
        toast.success('Code executed!');
    }, [code]);

    const handleReset = () => {
        setCode(initialCode);
        setPreviewCode(initialCode);
        toast('Code reset to original');
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(code).then(() => toast.success('Code copied!'));
    };

    const handleClear = () => {
        setCode('');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = e.currentTarget.selectionStart;
            const end = e.currentTarget.selectionEnd;
            const newCode = code.substring(0, start) + '  ' + code.substring(end);
            setCode(newCode);
            requestAnimationFrame(() => {
                if (textareaRef.current) {
                    textareaRef.current.selectionStart = start + 2;
                    textareaRef.current.selectionEnd = start + 2;
                }
            });
        }
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            handleRun();
        }
    };

    const lines = code.split('\n');

    const editorContent = (
        <div className={`flex flex-col ${fullscreen ? 'fixed inset-0 z-50 bg-background p-4' : ''}`}>
            {fullscreen && (
                <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-foreground">Try It Yourself — Lesson {lessonId}</span>
                    <button onClick={() => setFullscreen(false)} className="btn-ghost text-xs">Close Fullscreen</button>
                </div>
            )}

            {/* Toolbar */}
            <div className="flex items-center gap-2 mb-3 flex-wrap">
                <button onClick={handleRun} className="btn-primary text-xs px-3 py-1.5">
                    <Play size={12} /> Run (Ctrl+↵)
                </button>
                <button onClick={handleReset} className="btn-secondary text-xs px-2.5 py-1.5">
                    <RotateCcw size={12} /> Reset
                </button>
                <button onClick={handleCopy} className="btn-secondary text-xs px-2.5 py-1.5">
                    <Copy size={12} /> Copy
                </button>
                <button onClick={handleClear} className="btn-ghost text-xs px-2.5 py-1.5 text-danger hover:bg-danger/10">
                    <Trash2 size={12} /> Clear
                </button>
                <div className="flex-1" />
                <button onClick={() => setFullscreen((p) => !p)} className="btn-icon p-1.5" aria-label="Fullscreen">
                    <Maximize2 size={14} />
                </button>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${fullscreen ? 'flex-1' : ''}`}>
                {/* Editor */}
                <div className="flex flex-col">
                    <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">HTML Editor</span>
                        <span className="text-2xs text-muted-foreground">{lines.length} lines</span>
                    </div>
                    <div className="relative flex bg-[#0d1117] rounded-lg border border-border overflow-hidden" style={{ minHeight: '200px' }}>
                        {/* Line numbers */}
                        <div className="py-4 pl-3 pr-2 select-none bg-[#0d1117] border-r border-border shrink-0">
                            {lines.map((_, i) => (
                                <div key={`ln-${lessonId}-${i + 1}`} className="line-number leading-[1.6] text-[0.8125rem]">
                                    {i + 1}
                                </div>
                            ))}
                        </div>
                        {/* Textarea */}
                        <textarea
                            ref={textareaRef}
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            onKeyDown={handleKeyDown}
                            spellCheck={false}
                            className="flex-1 bg-transparent text-foreground font-mono text-[0.8125rem] leading-[1.6] p-4 pl-3 resize-none outline-none border-none"
                            style={{ caretColor: 'var(--primary)', minHeight: '200px' }}
                            aria-label="HTML code editor"
                        />
                    </div>
                </div>

                {/* Preview */}
                <div className="flex flex-col">
                    <div className="mb-1.5">
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Live Preview</span>
                    </div>
                    <div className="flex-1 border border-border rounded-lg overflow-hidden bg-white" style={{ minHeight: '200px' }}>
                        <iframe
                            key={previewCode}
                            srcDoc={`<!DOCTYPE html><html><head><style>body{font-family:sans-serif;padding:16px;margin:0;background:#fff;color:#111;line-height:1.5;}*{box-sizing:border-box;}</style></head><body>${previewCode}</body></html>`}
                            className="w-full h-full"
                            style={{ minHeight: '200px' }}
                            title="Live preview"
                            sandbox="allow-same-origin"
                        />
                    </div>
                </div>
            </div>
        </div>
    );

    return editorContent;
}