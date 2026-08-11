'use client';
import React from 'react';
import { BookOpen, Clock, CheckCircle2, ChevronRight } from 'lucide-react';

const recentLessons = [
    {
        id: 'rl-1',
        title: 'HTML Document Structure',
        chapter: 'Chapter 1',
        duration: '8 min',
        status: 'completed',
        difficulty: 'easy',
        tags: ['<html>', '<head>', '<body>'],
        progress: 100,
    },
    {
        id: 'rl-2',
        title: 'HTML Attributes',
        chapter: 'Chapter 1',
        duration: '6 min',
        status: 'completed',
        difficulty: 'easy',
        tags: ['attributes', 'class', 'id'],
        progress: 100,
    },
    {
        id: 'rl-3',
        title: 'Text Formatting Tags',
        chapter: 'Chapter 3',
        duration: '10 min',
        status: 'in-progress',
        difficulty: 'easy',
        tags: ['<strong>', '<em>', '<mark>'],
        progress: 65,
    },
    {
        id: 'rl-4',
        title: 'Creating Links with <a>',
        chapter: 'Chapter 4',
        duration: '7 min',
        status: 'in-progress',
        difficulty: 'medium',
        tags: ['<a>', 'href', 'target'],
        progress: 30,
    },
    {
        id: 'rl-5',
        title: 'Adding Images',
        chapter: 'Chapter 5',
        duration: '9 min',
        status: 'not-started',
        difficulty: 'medium',
        tags: ['<img>', 'src', 'alt'],
        progress: 0,
    },
    {
        id: 'rl-6',
        title: 'HTML Comments',
        chapter: 'Chapter 1',
        duration: '4 min',
        status: 'completed',
        difficulty: 'easy',
        tags: ['<!-- -->'],
        progress: 100,
    },
];

const statusMap = {
    completed: { label: 'Completed', className: 'badge-completed', icon: <CheckCircle2 size={11} /> },
    'in-progress': { label: 'In Progress', className: 'badge-in-progress', icon: <Clock size={11} /> },
    'not-started': { label: 'Not Started', className: 'badge-not-started', icon: <BookOpen size={11} /> },
};

const diffMap = {
    easy: 'badge-easy',
    medium: 'badge-medium',
    hard: 'badge-hard',
};

export default function RecentLessons() {
    return (
        <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-base font-semibold text-foreground">Recent Lessons</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">Pick up where you left off</p>
                </div>
                <a href="/code-book" className="text-xs text-primary hover:text-accent transition-colors flex items-center gap-1">
                    View all <ChevronRight size={12} />
                </a>
            </div>

            <div className="space-y-2">
                {recentLessons.map((lesson) => {
                    const status = statusMap[lesson.status as keyof typeof statusMap];
                    return (
                        <a
                            key={lesson.id}
                            href="/code-book"
                            className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/40 hover:bg-primary/5 transition-all duration-150 group cursor-pointer"
                        >
                            {/* Icon */}
                            <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                                <BookOpen size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-sm font-medium text-foreground truncate">{lesson.title}</span>
                                    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-2xs font-medium ${diffMap[lesson.difficulty as keyof typeof diffMap]}`}>
                                        {lesson.difficulty}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                                    <span className="text-2xs text-muted-foreground">{lesson.chapter}</span>
                                    <span className="text-2xs text-muted-foreground">·</span>
                                    <span className="flex items-center gap-1 text-2xs text-muted-foreground">
                                        <Clock size={10} /> {lesson.duration}
                                    </span>
                                    <span className="text-2xs text-muted-foreground">·</span>
                                    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-2xs font-medium ${status.className}`}>
                                        {status.icon} {status.label}
                                    </span>
                                </div>
                                {lesson.progress > 0 && lesson.progress < 100 && (
                                    <div className="mt-1.5 progress-bar-track h-1">
                                        <div className="progress-bar-fill h-1" style={{ width: `${lesson.progress}%` }} />
                                    </div>
                                )}
                            </div>

                            {/* Tags + arrow */}
                            <div className="hidden md:flex items-center gap-1.5 shrink-0">
                                {lesson.tags.slice(0, 2).map((tag) => (
                                    <span key={`${lesson.id}-tag-${tag}`} className="tag-chip">{tag}</span>
                                ))}
                            </div>
                            <ChevronRight size={14} className="text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                        </a>
                    );
                })}
            </div>
        </div>
    );
}