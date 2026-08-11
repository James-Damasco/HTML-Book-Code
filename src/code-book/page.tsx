import React from 'react';
import AppLayout from '@/components/AppLayout';
import CodeBookContent from './components/CodeBookContent';

export default function CodeBookPage() {
    return (
        <AppLayout currentPath="/code-book">
            <CodeBookContent />
        </AppLayout>
    );
}
