'use client';
import React from 'react';
import { BookOpen, Tag, Puzzle, HelpCircle, Trophy, Flame, TrendingUp, AlertTriangle } from 'lucide-react';

const stats = [
    {
        id: 'stat-lessons',
        label: 'Lessons Completed',
        value: '18',
        sub: 'of 24 lessons',
        icon: <BookOpen size={20} />,
        trend: '+2 this week',
        trendUp: true,
        color: 'text-info',
        bg: 'bg-info/10',
        hero: true,
    },
    {
        id: 'stat-tags',
        label: 'HTML Tags Learned',
        value: '42',
        sub: 'of 60 tags',
        icon: <Tag size={20} />,
        trend: '+6 this week',
        trendUp: true,
        color: 'text-success',
        bg: 'bg-success/10',
        hero: false,
    },
    {
        id: 'stat-practice',
        label: 'Practice Score',
        value: '87%',
        sub: '15 of 20 done',
        icon: <Puzzle size={20} />,
        trend: '+5 exercises',
        trendUp: true,
        color: 'text-primary',
        bg: 'bg-primary/10',
        hero: false,
    },
    {
        id: 'stat-quiz',
        label: 'Quiz Average',
        value: '74%',
        sub: '8 quizzes taken',
        icon: <HelpCircle size={20} />,
        trend: '−3% vs last week',
        trendUp: false,
        color: 'text-warning',
        bg: 'bg-warning/10',
        alert: true,
        hero: false,
    },
    {
        id: 'stat-streak',
        label: 'Learning Streak',
        value: '7',
        sub: 'days in a row',
        icon: <Flame size={20} />,
        trend: 'Personal best!',
        trendUp: true,
        color: 'text-primary',
        bg: 'bg-primary/10',
        hero: false,
    },
    {
        id: 'stat-achievements',
        label: 'Achievements',
        value: '6',
        sub: 'of 9 unlocked',
        icon: <Trophy size={20} />,
        trend: '3 remaining',
        trendUp: null,
        color: 'text-warning',
        bg: 'bg-warning/10',
        hero: false,
    },
    {
        id: 'stat-progress',
        label: 'Overall Progress',
        value: '75%',
        sub: 'chapters 1–7 done',
        icon: <TrendingUp size={20} />,
        trend: '+8% this month',
        trendUp: true,
        color: 'text-success',
        bg: 'bg-success/10',
        hero: false,
    },
];

export default function StatsGrid() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
            {/* Hero card — spans 2 cols */}
            {stats?.filter((s) => s?.hero)?.map((stat) => (
                <div
                    key={stat?.id}
                    className="col-span-1 sm:col-span-2 lg:col-span-2 glass-card p-5 glow-primary-sm"
                >
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-1">{stat?.label}</p>
                            <div className="flex items-end gap-2">
                                <span className="text-5xl font-bold tabular-nums text-foreground">{stat?.value}</span>
                                <span className="text-sm text-muted-foreground mb-1">{stat?.sub}</span>
                            </div>
                        </div>
                        <div className={`${stat?.bg} ${stat?.color} p-3 rounded-xl`}>
                            {stat?.icon}
                        </div>
                    </div>
                    {/* Progress bar */}
                    <div className="space-y-1">
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>18 completed</span>
                            <span>6 remaining</span>
                        </div>
                        <div className="progress-bar-track h-2">
                            <div className="progress-bar-fill h-2" style={{ width: '75%' }} />
                        </div>
                    </div>
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-success">
                        <TrendingUp size={12} />
                        <span>{stat?.trend}</span>
                    </div>
                </div>
            ))}
            {/* Regular cards */}
            {stats?.filter((s) => !s?.hero)?.map((stat) => (
                <div
                    key={stat?.id}
                    className={`glass-card p-4 ${stat?.alert ? 'border-warning/40 bg-warning/5' : ''}`}
                >
                    <div className="flex items-start justify-between mb-3">
                        <div className={`${stat?.bg} ${stat?.color} p-2 rounded-lg`}>
                            {stat?.icon}
                        </div>
                        {stat?.alert && <AlertTriangle size={14} className="text-warning" />}
                    </div>
                    <div className="tabular-nums">
                        <div className="text-2xl font-bold text-foreground">{stat?.value}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{stat?.sub}</div>
                    </div>
                    <div className="mt-2 text-xs font-medium text-muted-foreground truncate">{stat?.label}</div>
                    <div className={`mt-2 text-xs flex items-center gap-1 ${stat?.trendUp === true ? 'text-success' : stat?.trendUp === false ? 'text-danger' : 'text-muted-foreground'}`}>
                        {stat?.trendUp === true && <TrendingUp size={10} />}
                        {stat?.trendUp === false && <TrendingUp size={10} className="rotate-180" />}
                        <span>{stat?.trend}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}