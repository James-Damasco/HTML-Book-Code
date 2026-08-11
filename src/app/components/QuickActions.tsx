'use client';
import React from 'react';
import { BookOpen, Code2, Puzzle } from 'lucide-react';

export default function QuickActions() {
    return (
        <div className="flex items-center gap-2 flex-wrap">
            <a
                href="/code-book"
                className="btn-primary text-xs px-3 py-1.5"
            >
                <BookOpen size={14} />
                Continue Learning
            </a>
            <a
                href="/code-book"
                className="btn-secondary text-xs px-3 py-1.5"
            >
                <Puzzle size={14} />
                Start Practice
            </a>
            <a
                href="/html-playground"
                className="btn-secondary text-xs px-3 py-1.5"
            >
                <Code2 size={14} />
                Playground
            </a>
        </div>
    );
}