'use client';
import React from 'react';
import { Trophy } from 'lucide-react';

const achievements = [
    { id: 'ach-1', emoji: '🏅', label: 'First Code', unlocked: true },
    { id: 'ach-2', emoji: '📖', label: 'First Lesson', unlocked: true },
    { id: 'ach-3', emoji: '❓', label: 'First Quiz', unlocked: true },
    { id: 'ach-4', emoji: '🏷️', label: '10 Tags', unlocked: true },
    { id: 'ach-5', emoji: '📚', label: '10 Lessons', unlocked: true },
    { id: 'ach-6', emoji: '🔥', label: '7-Day Streak', unlocked: true },
    { id: 'ach-7', emoji: '🌱', label: 'HTML Beginner', unlocked: false },
    { id: 'ach-8', emoji: '🔭', label: 'HTML Explorer', unlocked: false },
    { id: 'ach-9', emoji: '🏆', label: 'HTML Master', unlocked: false },
];

export default function AchievementBadges() {
    return (
        <div className="glass-card p-4">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <Trophy size={15} className="text-warning" />
                    <span className="text-sm font-semibold text-foreground">Achievements</span>
                </div>
                <span className="text-xs text-muted-foreground">6/9</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
                {achievements?.map((ach) => (
                    <div
                        key={ach?.id}
                        title={ach?.label}
                        className={`flex flex-col items-center gap-1 p-2 rounded-lg border transition-all duration-150 ${ach?.unlocked
                                ? 'border-warning/30 bg-warning/5 hover:bg-warning/10' : 'border-border bg-muted/30 opacity-40'
                            }`}
                    >
                        <span className={`text-xl ${!ach?.unlocked ? 'grayscale' : ''}`}>{ach?.emoji}</span>
                        <span className="text-2xs text-center text-muted-foreground leading-tight">{ach?.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
