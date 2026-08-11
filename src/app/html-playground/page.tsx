import React from 'react';
import AppLayout from '@/components/AppLayout';
import PlaygroundContent from './components/PlaygroundContent';

export default function PlaygroundPage() {
    return (
        <AppLayout currentPath="/html-playground">
            <PlaygroundContent />
        </AppLayout>
    );
}
