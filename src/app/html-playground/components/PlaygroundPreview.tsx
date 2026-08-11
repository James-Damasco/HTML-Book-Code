'use client';
import React from 'react';
import type { PreviewMode } from './PlaygroundContent';

interface PlaygroundPreviewProps {
    code: string;
    mode: PreviewMode;
}

const modeWidths: Record<PreviewMode, string> = {
    desktop: '100%',
    tablet: '768px',
    mobile: '375px',
};

export default function PlaygroundPreview({ code, mode }: PlaygroundPreviewProps) {
    const maxWidth = modeWidths[mode];
    const isConstrained = mode !== 'desktop';

    return (
        <div className="w-full h-full overflow-auto bg-[#e5e7eb] flex justify-center">
            <div
                className="preview-container bg-white shadow-lg transition-all duration-300 h-full"
                style={{ width: maxWidth, maxWidth, minHeight: '100%' }}
            >
                {isConstrained && (
                    <div className="flex items-center justify-center py-1.5 bg-[#374151] text-white text-2xs font-mono shrink-0">
                        {mode === 'tablet' ? '768px — Tablet View' : '375px — Mobile View'}
                    </div>
                )}
                <iframe
                    key={`${code.length}-${mode}`}
                    srcDoc={code}
                    className="w-full"
                    style={{ height: isConstrained ? 'calc(100% - 28px)' : '100%', minHeight: '400px', border: 'none' }}
                    title="HTML Preview"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
            </div>
        </div>
    );
}