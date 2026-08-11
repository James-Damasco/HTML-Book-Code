'use client';
import React from 'react';
import { CheckCircle2, Circle, Lock, ChevronRight } from 'lucide-react';
import type { Chapter } from '@/lib/lessonData';

interface ChapterNavProps {
    chapters: Chapter[];
    activeChapter: string;
    onChapterSelect: (id: string) => void;
}

export default function ChapterNav({ chapters, activeChapter, onChapterSelect }: ChapterNavProps) {
    return (
        <aside className="w-64 shrink-0 border-r border-border bg-card overflow-y-auto hidden md:block">
            <div className="p-4 border-b border-border">
                <h2 className="text-sm font-semibold text-foreground">Chapters</h2>
                <p className="text-xs text-muted-foreground mt-0.5">4 of 10 complete</p>
            </div>
            <nav className="p-2 space-y-0.5">
                {chapters.map((ch) => {
                    const isActive = ch.id === activeChapter;
                    return (
                        <button
                            key={ch.id}
                            onClick={() => onChapterSelect(ch.id)}
                            className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 group ${isActive
                                    ? 'chapter-active' : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            <span className="shrink-0">
                                {ch.status === 'completed' ? (
                                    <CheckCircle2 size={14} className="text-success" />
                                ) : ch.status === 'locked' ? (
                                    <Lock size={14} className="text-muted-foreground" />
                                ) : (
                                    <Circle size={14} className={isActive ? 'text-primary' : 'text-muted-foreground'} />
                                )}
                            </span>
                            <div className="flex-1 min-w-0">
                                <div className="text-xs font-medium truncate">{ch.number}. {ch.title}</div>
                                <div className="text-2xs text-muted-foreground mt-0.5">{ch.completedLessons}/{ch.totalLessons} lessons</div>
                            </div>
                            {isActive && <ChevronRight size={12} className="text-primary shrink-0" />}
                        </button>
                    );
                })}
            </nav>
        </aside>
    );
}
