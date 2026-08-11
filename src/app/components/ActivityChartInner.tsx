'use client';
import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts';

const data = [
    { day: 'Mon', lessons: 2, practice: 1, tags: 4 },
    { day: 'Tue', lessons: 1, practice: 3, tags: 2 },
    { day: 'Wed', lessons: 3, practice: 2, tags: 6 },
    { day: 'Thu', lessons: 0, practice: 1, tags: 1 },
    { day: 'Fri', lessons: 2, practice: 4, tags: 5 },
    { day: 'Sat', lessons: 4, practice: 2, tags: 8 },
    { day: 'Sun', lessons: 1, practice: 3, tags: 3 },
];

interface TooltipPayloadItem {
    name: string;
    value: number;
    color: string;
}

interface CustomTooltipProps {
    active?: boolean;
    payload?: TooltipPayloadItem[];
    label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-xl text-xs space-y-1.5 min-w-[140px]">
            <div className="font-semibold text-foreground mb-2">{label}</div>
            {payload.map((entry) => (
                <div key={`tip-${entry.name}`} className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                        <span className="w-2 h-2 rounded-full inline-block" style={{ background: entry.color }} />
                        {entry.name}
                    </span>
                    <span className="font-semibold text-foreground tabular-nums">{entry.value}</span>
                </div>
            ))}
        </div>
    );
}

export default function ActivityChartInner() {
    return (
        <div className="glass-card p-5 h-full">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-base font-semibold text-foreground">7-Day Study Activity</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">Lessons, practice, and tags per day</p>
                </div>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-lg">This Week</span>
            </div>
            <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                    <defs>
                        <linearGradient id="grad-lessons" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--info)" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="var(--info)" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="grad-practice" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="grad-tags" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--success)" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="var(--success)" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="day" tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                        wrapperStyle={{ fontSize: '11px', color: 'var(--muted-foreground)', paddingTop: '8px' }}
                    />
                    <Area type="monotone" dataKey="lessons" name="Lessons" stroke="var(--info)" fill="url(#grad-lessons)" strokeWidth={2} dot={false} />
                    <Area type="monotone" dataKey="practice" name="Practice" stroke="var(--primary)" fill="url(#grad-practice)" strokeWidth={2} dot={false} />
                    <Area type="monotone" dataKey="tags" name="Tags" stroke="var(--success)" fill="url(#grad-tags)" strokeWidth={2} dot={false} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}