'use client';
import React from 'react';
import { BookOpen, Clock, CheckCircle2, Lock } from 'lucide-react';
import type { Chapter, LessonMeta } from '@/lib/lessonData';

interface LessonListProps {
    chapter: Chapter;
    lessons: LessonMeta[];
    onLessonSelect: (id: string) => void;
}

const diffMap = {
    easy: 'badge-easy',
    medium: 'badge-medium',
    hard: 'badge-hard',
};

const statusMap = {
    completed: { label: 'Completed', cls: 'badge-completed', icon: <CheckCircle2 size={11} /> },
    'in-progress': { label: 'In Progress', cls: 'badge-in-progress', icon: <Clock size={11} /> },
    'not-started': { label: 'Not Started', cls: 'badge-not-started', icon: <BookOpen size={11} /> },
    locked: { label: 'Locked', cls: 'badge-not-started', icon: <Lock size={11} /> },
};

export default function LessonList({ chapter, lessons, onLessonSelect }: LessonListProps) {
    return (
        <div className="px-6 lg:px-8 py-6 max-w-screen-2xl mx-auto">
            {/* Chapter header */}
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-primary uppercase tracking-widest">Chapter {chapter.number}</span>
                </div>
                <h2 className="text-2xl font-semibold text-foreground">{chapter.title}</h2>
                <p className="text-sm text-muted-foreground mt-1.5 max-w-2xl">{chapter.description}</p>

                <div className="mt-4 flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{chapter.completedLessons}/{chapter.totalLessons} lessons complete</span>
                    </div>
                    <div className="flex-1 max-w-xs progress-bar-track h-2">
                        <div
                            className="progress-bar-fill h-2"
                            style={{ width: `${chapter.totalLessons > 0 ? Math.round((chapter.completedLessons / chapter.totalLessons) * 100) : 0}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Tags covered */}
            <div className="mb-6 flex flex-wrap gap-1.5">
                {chapter.tagsCovered.map((tag) => (
                    <span key={`tag-${chapter.id}-${tag}`} className="tag-chip">{tag}</span>
                ))}
            </div>

            {/* Lesson grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-4">
                {lessons.map((lesson) => {
                    const status = statusMap[lesson.status as keyof typeof statusMap] ?? statusMap['not-started'];
                    const isLocked = lesson.status === 'locked';

                    return (
                        <button
                            key={lesson.id}
                            onClick={() => !isLocked && onLessonSelect(lesson.id)}
                            disabled={isLocked}
                            className={`text-left glass-card p-4 lesson-card-hover ${isLocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                            <div className="flex items-start justify-between gap-2 mb-3">
                                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                                    {isLocked ? <Lock size={14} className="text-muted-foreground" /> : <BookOpen size={14} className="text-primary" />}
                                </div>
                                <div className="flex items-center gap-1.5 flex-wrap justify-end">
                                    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-2xs font-medium ${diffMap[lesson.difficulty as keyof typeof diffMap]}`}>
                                        {lesson.difficulty}
                                    </span>
                                    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-2xs font-medium ${status.cls}`}>
                                        {status.icon} {status.label}
                                    </span>
                                </div>
                            </div>

                            <h3 className="text-sm font-semibold text-foreground mb-1 leading-snug">{lesson.title}</h3>
                            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{lesson.description}</p>

                            <div className="mt-3 flex items-center justify-between">
                                <div className="flex items-center gap-1 text-2xs text-muted-foreground">
                                    <Clock size={10} /> {lesson.duration}
                                </div>
                                <div className="flex gap-1 flex-wrap">
                                    {lesson.tags.slice(0, 2).map((tag) => (
                                        <span key={`${lesson.id}-lt-${tag}`} className="tag-chip text-2xs">{tag}</span>
                                    ))}
                                </div>
                            </div>

                            {lesson.progress > 0 && lesson.progress < 100 && (
                                <div className="mt-2 progress-bar-track h-1">
                                    <div className="progress-bar-fill h-1" style={{ width: `${lesson.progress}%` }} />
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}