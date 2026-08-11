import React from 'react';
import StatsGrid from './StatsGrid';
import ActivityChart from './ActivityChart';
import ChapterProgress from './ChapterProgress';
import RecentLessons from './RecentLessons';
import DailyChallenge from './DailyChallenge';
import QuickActions from './QuickActions';
import AchievementBadges from './AchievementBadges';

export default function DashboardContent() {
    return (
        <div className="px-6 lg:px-8 xl:px-10 2xl:px-16 py-6 max-w-screen-2xl mx-auto space-y-6">
            {/* Welcome header */}
            <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                    <h2 className="text-2xl font-semibold text-foreground">Welcome back, Student 👋</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        You&apos;re on a <span className="text-primary font-semibold">7-day streak</span>. Keep it up — Chapter 3 is waiting.
                    </p>
                </div>
                <QuickActions />
            </div>

            {/* KPI Bento Grid — 7 cards → grid-cols-4 → row1: hero(2col)+2 cards, row2: 3 cards */}
            <StatsGrid />

            {/* Middle row: Activity chart + Chapter progress */}
            <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <ActivityChart />
                </div>
                <div className="lg:col-span-1">
                    <ChapterProgress />
                </div>
            </div>

            {/* Bottom row: Recent lessons + Daily challenge + Achievements */}
            <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <RecentLessons />
                </div>
                <div className="space-y-4">
                    <DailyChallenge />
                    <AchievementBadges />
                </div>
            </div>
        </div>
    );
}