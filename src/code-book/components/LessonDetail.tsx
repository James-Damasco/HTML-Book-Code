'use client';
import React, { useState } from 'react';
import { ArrowLeft, Bookmark, CheckCircle2, ChevronDown, ChevronUp, Copy, Play, Lightbulb, AlertTriangle, Tag, BookOpen, } from 'lucide-react';
import { toast } from 'sonner';
import type { Lesson } from '@/lib/lessonData';
import LiveCodeEditor from './LiveCodeEditor';

interface LessonDetailProps {
    lesson: Lesson;
    onBack: () => void;
}

export default function LessonDetail({ lesson, onBack }: LessonDetailProps) {
    const [howItWorksOpen, setHowItWorksOpen] = useState(false);
    const [mistakesOpen, setMistakesOpen] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
    const [completed, setCompleted] = useState(lesson.status === 'completed');

    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code).then(() => toast.success('Code copied to clipboard'));
    };

    const handleBookmark = () => {
        setBookmarked((prev) => !prev);
        // LocalStorage integration point — save/remove bookmark
        const bookmarks: string[] = JSON.parse(localStorage.getItem('bookmarks') ?? '[]');
        if (!bookmarked) {
            localStorage.setItem('bookmarks', JSON.stringify([...bookmarks, lesson.id]));
            toast.success('Lesson bookmarked');
        } else {
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks.filter((b) => b !== lesson.id)));
            toast('Bookmark removed');
        }
    };

    const handleMarkComplete = () => {
        setCompleted(true);
        // LocalStorage integration point — update progress
        const progress: string[] = JSON.parse(localStorage.getItem('completed-lessons') ?? '[]');
        if (!progress.includes(lesson.id)) {
            localStorage.setItem('completed-lessons', JSON.stringify([...progress, lesson.id]));
        }
        toast.success('Lesson marked as complete! 🎉');
    };

    return (
        <div className="px-6 lg:px-8 py-6 max-w-4xl mx-auto space-y-6">
            {/* Back + actions */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
                <button onClick={onBack} className="btn-ghost text-sm">
                    <ArrowLeft size={16} /> Back to lessons
                </button>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleBookmark}
                        className={`btn-icon ${bookmarked ? 'text-warning' : ''}`}
                        aria-label="Bookmark lesson"
                    >
                        <Bookmark size={16} className={bookmarked ? 'fill-warning' : ''} />
                    </button>
                    {!completed && (
                        <button onClick={handleMarkComplete} className="btn-primary text-xs px-3 py-1.5">
                            <CheckCircle2 size={14} /> Mark Complete
                        </button>
                    )}
                    {completed && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-success bg-success/10 border border-success/20 px-3 py-1.5 rounded-lg">
                            <CheckCircle2 size={13} /> Completed
                        </span>
                    )}
                </div>
            </div>

            {/* Header */}
            <div>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-xs font-medium text-primary uppercase tracking-widest">{lesson.chapter}</span>
                    <span className="text-muted-foreground text-xs">·</span>
                    <span className={`text-xs px-2 py-0.5 rounded font-medium ${lesson.difficulty === 'easy' ? 'badge-easy' : lesson.difficulty === 'medium' ? 'badge-medium' : 'badge-hard'}`}>
                        {lesson.difficulty}
                    </span>
                </div>
                <h1 className="text-2xl font-semibold text-foreground">{lesson.title}</h1>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed max-w-2xl">{lesson.description}</p>
            </div>

            {/* Explanation */}
            <div className="glass-card p-5">
                <div className="flex items-center gap-2 mb-3">
                    <BookOpen size={16} className="text-primary" />
                    <h2 className="text-base font-semibold text-foreground">Explanation</h2>
                </div>
                <div className="text-sm text-foreground leading-relaxed space-y-3">
                    {lesson.explanation.split('\n').map((para, i) => (
                        <p key={`exp-${lesson.id}-${i}`}>{para}</p>
                    ))}
                </div>
            </div>

            {/* Syntax */}
            <div className="glass-card p-5">
                <h2 className="text-base font-semibold text-foreground mb-3">Syntax</h2>
                <div className="code-block p-4 relative group">
                    <button
                        onClick={() => handleCopy(lesson.syntax)}
                        className="absolute top-2 right-2 btn-icon opacity-0 group-hover:opacity-100 transition-opacity p-1.5"
                        aria-label="Copy syntax"
                    >
                        <Copy size={13} />
                    </button>
                    <SyntaxHighlight code={lesson.syntax} />
                </div>
            </div>

            {/* Code example */}
            <div className="glass-card p-5">
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                    <h2 className="text-base font-semibold text-foreground">Code Example</h2>
                    <button
                        onClick={() => handleCopy(lesson.example)}
                        className="btn-secondary text-xs px-2.5 py-1.5"
                    >
                        <Copy size={12} /> Copy
                    </button>
                </div>
                <div className="code-block p-4">
                    <SyntaxHighlight code={lesson.example} />
                </div>

                {/* Live output */}
                <div className="mt-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Play size={13} className="text-success" />
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Live Output</span>
                    </div>
                    <div className="border border-border rounded-lg overflow-hidden bg-white">
                        <iframe
                            srcDoc={`<!DOCTYPE html><html><head><style>body{font-family:sans-serif;padding:16px;margin:0;background:#fff;color:#111;}</style></head><body>${lesson.example}</body></html>`}
                            className="w-full"
                            style={{ height: '120px' }}
                            title={`Live preview: ${lesson.title}`}
                            sandbox="allow-same-origin"
                        />
                    </div>
                </div>
            </div>

            {/* How It Works */}
            <div className="glass-card overflow-hidden">
                <button
                    onClick={() => setHowItWorksOpen((p) => !p)}
                    className="w-full flex items-center justify-between p-5 hover:bg-muted/30 transition-colors"
                >
                    <div className="flex items-center gap-2">
                        <Lightbulb size={16} className="text-warning" />
                        <span className="text-base font-semibold text-foreground">How It Works</span>
                        <span className="text-xs text-muted-foreground">(line-by-line explanation)</span>
                    </div>
                    {howItWorksOpen ? <ChevronUp size={16} className="text-muted-foreground" /> : <ChevronDown size={16} className="text-muted-foreground" />}
                </button>
                {howItWorksOpen && (
                    <div className="px-5 pb-5 border-t border-border space-y-3 pt-4 fade-in">
                        {lesson.howItWorks.map((item) => (
                            <div key={`hiw-${lesson.id}-${item.line}`} className="flex gap-3">
                                <div className="shrink-0 mt-0.5">
                                    <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono text-primary border border-border">
                                        {item.line}
                                    </code>
                                </div>
                                <div>
                                    <code className="text-xs font-mono text-accent">{item.code}</code>
                                    <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">{item.explanation}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Common Mistakes */}
            <div className="glass-card overflow-hidden">
                <button
                    onClick={() => setMistakesOpen((p) => !p)}
                    className="w-full flex items-center justify-between p-5 hover:bg-muted/30 transition-colors"
                >
                    <div className="flex items-center gap-2">
                        <AlertTriangle size={16} className="text-danger" />
                        <span className="text-base font-semibold text-foreground">Common Mistakes</span>
                    </div>
                    {mistakesOpen ? <ChevronUp size={16} className="text-muted-foreground" /> : <ChevronDown size={16} className="text-muted-foreground" />}
                </button>
                {mistakesOpen && (
                    <div className="px-5 pb-5 border-t border-border space-y-3 pt-4 fade-in">
                        {lesson.commonMistakes.map((mistake) => (
                            <div key={`mistake-${lesson.id}-${mistake.id}`} className="flex gap-3 p-3 bg-danger/5 border border-danger/20 rounded-lg">
                                <AlertTriangle size={14} className="text-danger shrink-0 mt-0.5" />
                                <div>
                                    <div className="text-sm font-medium text-foreground">{mistake.title}</div>
                                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{mistake.description}</p>
                                    {mistake.fix && (
                                        <code className="text-xs font-mono text-success mt-1 block">✓ {mistake.fix}</code>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Related Tags */}
            <div className="glass-card p-5">
                <div className="flex items-center gap-2 mb-3">
                    <Tag size={15} className="text-muted-foreground" />
                    <h2 className="text-sm font-semibold text-foreground">Related Tags</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                    {lesson.relatedTags.map((tag) => (
                        <span key={`rt-${lesson.id}-${tag}`} className="tag-chip text-xs">{tag}</span>
                    ))}
                </div>
            </div>

            {/* Try It Yourself */}
            <div className="glass-card p-5">
                <div className="flex items-center gap-2 mb-4">
                    <Play size={16} className="text-primary" />
                    <h2 className="text-base font-semibold text-foreground">Try It Yourself</h2>
                    <span className="text-xs text-muted-foreground">Edit the code and click Run</span>
                </div>
                <LiveCodeEditor
                    initialCode={lesson.tryItYourself}
                    lessonId={lesson.id}
                />
            </div>
        </div>
    );
}

// Inline syntax highlighter for read-only display
function SyntaxHighlight({ code }: { code: string }) {
    const highlighted = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/(&lt;\/?[a-zA-Z][a-zA-Z0-9]*)/g, '<span class="syntax-tag">$1</span>')
        .replace(/(&gt;)/g, '<span class="syntax-tag">$1</span>')
        .replace(/(\s[a-zA-Z-]+=)/g, '<span class="syntax-attr">$1</span>')
        .replace(/"([^"]*)"/g, '"<span class="syntax-value">$1</span>"')
        .replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="syntax-comment">$1</span>')
        .replace(/(&lt;!DOCTYPE[^&]*&gt;)/gi, '<span class="syntax-doctype">$1</span>');

    return (
        <pre
            className="text-foreground text-xs leading-relaxed overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: highlighted }}
        />
    );
}