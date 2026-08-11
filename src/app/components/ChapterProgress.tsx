'use client';
import React from 'react';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

const chapters = [
    { id: 'ch-1', name: 'HTML Fundamentals', lessons: 6, completed: 6, status: 'done' },
    { id: 'ch-2', name: 'Document Structure', lessons: 4, completed: 4, status: 'done' },
    { id: 'ch-3', name: 'Text & Formatting', lessons: 5, completed: 4, status: 'active' },
    { id: 'ch-4', name: 'Links', lessons: 3, completed: 2, status: 'active' },
    { id: 'ch-5', name: 'Images & Media', lessons: 4, completed: 2, status: 'active' },
    { id: 'ch-6', name: 'Lists', lessons: 2, completed: 0, status: 'locked' },
    { id: 'ch-7', name: 'Tables', lessons: 3, completed: 0, status: 'locked' },
    { id: 'ch-8', name: 'Forms', lessons: 5, completed: 0, status: 'locked' },
    { id: 'ch-9', name: 'Semantic HTML', lessons: 4, completed: 0, status: 'locked' },
    { id: 'ch-10', name: 'HTML5 Features', lessons: 5, completed: 0, status: 'locked' },
];

export default function ChapterProgress() {
    return (
        <div className="glass-card p-5 h-full">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-base font-semibold text-foreground">Chapter Progress</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">4 of 10 chapters complete</p>
                </div>
                <a href="/code-book" className="text-xs text-primary hover:text-accent transition-colors">View all →</a>
            </div>
            <div className="space-y-2.5 overflow-y-auto max-h-[280px] pr-1">
                {chapters?.map((ch) => {
                    const pct = ch?.lessons > 0 ? Math.round((ch?.completed / ch?.lessons) * 100) : 0;
                    return (
                        <div key={ch?.id} className="group">
                            <div className="flex items-center gap-2 mb-1">
                                {ch?.status === 'done' ? (
                                    <CheckCircle2 size={13} className="text-success shrink-0" />
                                ) : ch?.status === 'active' ? (
                                    <Clock size={13} className="text-primary shrink-0" />
                                ) : (
                                    <Circle size={13} className="text-muted-foreground shrink-0" />
                                )}
                                <span className={`text-xs font-medium flex-1 truncate ${ch?.status === 'locked' ? 'text-muted-foreground' : 'text-foreground'}`}>
                                    {ch?.name}
                                </span>
                                <span className="text-2xs text-muted-foreground tabular-nums shrink-0">
                                    {ch?.completed}/{ch?.lessons}
                                </span>
                            </div>
                            <div className="ml-5 progress-bar-track h-1.5">
                                <div
                                    className={`h-1.5 rounded-full transition-all duration-500 ${ch?.status === 'done' ? 'bg-success' : ch?.status === 'active' ? 'bg-primary' : 'bg-muted-foreground/30'}`}
                                    style={{ width: `${pct}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}