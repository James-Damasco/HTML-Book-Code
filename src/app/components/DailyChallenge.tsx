'use client';
import React, { useState } from 'react';
import { Zap, CheckCircle2, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

export default function DailyChallenge() {
    const [completed, setCompleted] = useState(false);

    const handleStart = () => {
        if (!completed) {
            toast?.success('Daily challenge started! Opening Code Book…');
            setCompleted(true);
        }
    };

    return (
        <div className={`glass-card p-4 border ${completed ? 'border-success/40 bg-success/5' : 'border-primary/30 bg-primary/5'} transition-all duration-300`}>
            <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg shrink-0 ${completed ? 'bg-success/20' : 'bg-primary/20'}`}>
                    {completed ? <CheckCircle2 size={18} className="text-success" /> : <Zap size={18} className="text-primary" />}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Daily Challenge</span>
                        {!completed && (
                            <span className="text-2xs bg-primary/20 text-primary px-1.5 py-0.5 rounded font-medium">Today</span>
                        )}
                    </div>
                    <p className="text-sm font-medium text-foreground mt-1 leading-snug">
                        Build a webpage with a heading, paragraph, and a working link
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                        {completed ? 'Challenge completed! +25 XP earned.' : 'Complete before midnight · +25 XP'}
                    </p>
                </div>
            </div>

            <button
                onClick={handleStart}
                className={`mt-3 w-full flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all duration-150 active:scale-95 ${completed
                        ? 'bg-success/20 text-success cursor-default' : 'bg-primary text-primary-foreground hover:bg-accent'
                    }`}
            >
                {completed ? (
                    <><CheckCircle2 size={14} /> Completed</>
                ) : (
                    <>Start Challenge <ChevronRight size={14} /></>
                )}
            </button>
        </div>
    );
}