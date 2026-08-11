'use client';
import React, { useState } from 'react';
import ChapterNav from './ChapterNav';
import LessonList from './LessonList';
import LessonDetail from './LessonDetail';
import { chapters, getLessonsForChapter, getLessonById } from '@/lib/lessonData';

export type ViewState = 'list' | 'detail';

export default function CodeBookContent() {
    const [activeChapter, setActiveChapter] = useState('ch-1');
    const [activeLesson, setActiveLesson] = useState<string | null>(null);
    const [view, setView] = useState<ViewState>('list');

    const currentChapter = chapters.find((c) => c.id === activeChapter);
    const lessons = getLessonsForChapter(activeChapter);
    const lesson = activeLesson ? getLessonById(activeLesson) : null;

    const handleLessonSelect = (lessonId: string) => {
        setActiveLesson(lessonId);
        setView('detail');
    };

    const handleBack = () => {
        setView('list');
        setActiveLesson(null);
    };

    return (
        <div className="flex h-[calc(100vh-60px)] overflow-hidden">
            {/* Chapter sidebar */}
            <ChapterNav
                chapters={chapters}
                activeChapter={activeChapter}
                onChapterSelect={(id) => {
                    setActiveChapter(id);
                    setView('list');
                    setActiveLesson(null);
                }}
            />

            {/* Main content */}
            <div className="flex-1 overflow-y-auto">
                {view === 'list' ? (
                    <LessonList
                        chapter={currentChapter!}
                        lessons={lessons}
                        onLessonSelect={handleLessonSelect}
                    />
                ) : lesson ? (
                    <LessonDetail lesson={lesson} onBack={handleBack} />
                ) : null}
            </div>
        </div>
    );
}