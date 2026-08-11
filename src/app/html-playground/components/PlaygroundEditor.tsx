'use client';
import React, { useRef, useCallback } from 'react';

interface PlaygroundEditorProps {
    code: string;
    onChange: (code: string) => void;
    onRun: () => void;
}

function highlightHTML(raw: string): string {
    const escaped = raw
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    return escaped
        // DOCTYPE
        .replace(/(&lt;!DOCTYPE[^&]*&gt;)/gi, '<span class="syntax-doctype">$1</span>')
        // Comments
        .replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="syntax-comment">$1</span>')
        // Closing tags
        .replace(/(&lt;\/[a-zA-Z][a-zA-Z0-9]*&gt;)/g, '<span class="syntax-tag">$1</span>')
        // Opening/self-closing tags with attributes
        .replace(/(&lt;[a-zA-Z][a-zA-Z0-9]*)((?:\s+[^&])*?)(\s*\/?)(&gt;)/g, (_, open, attrs, selfClose, close) => {
            const highlightedAttrs = attrs
                .replace(/(\s+[a-zA-Z-:]+)(=)/g, '<span class="syntax-attr">$1</span>$2')
                .replace(/="([^"]*)"/g, '="<span class="syntax-value">$1</span>"')
                .replace(/='([^']*)'/g, "='<span class=\"syntax-value\">$1</span>'");
            return `<span class="syntax-tag">${open}</span>${highlightedAttrs}${selfClose}<span class="syntax-tag">${close}</span>`;
        });
}

export default function PlaygroundEditor({ code, onChange, onRun }: PlaygroundEditorProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const highlightRef = useRef<HTMLDivElement>(null);

    const syncScroll = useCallback(() => {
        if (textareaRef.current && highlightRef.current) {
            highlightRef.current.scrollTop = textareaRef.current.scrollTop;
            highlightRef.current.scrollLeft = textareaRef.current.scrollLeft;
        }
    }, []);

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        const ta = e.currentTarget;

        // Tab → 2 spaces
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = ta.selectionStart;
            const end = ta.selectionEnd;
            const newVal = code.substring(0, start) + '  ' + code.substring(end);
            onChange(newVal);
            requestAnimationFrame(() => {
                if (textareaRef.current) {
                    textareaRef.current.selectionStart = start + 2;
                    textareaRef.current.selectionEnd = start + 2;
                }
            });
            return;
        }

        // Ctrl/Cmd + Enter → Run
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            onRun();
            return;
        }

        // Auto-close HTML tags: type > after tag name
        if (e.key === '>') {
            const start = ta.selectionStart;
            const before = code.substring(0, start);
            const tagMatch = before.match(/<([a-zA-Z][a-zA-Z0-9]*)([^>]*)$/);
            const voidTags = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'];
            if (tagMatch && !voidTags.includes(tagMatch[1].toLowerCase()) && !tagMatch[2].includes('/')) {
                e.preventDefault();
                const tagName = tagMatch[1];
                const closing = `></${tagName}>`;
                const newVal = code.substring(0, start) + closing + code.substring(start);
                onChange(newVal);
                requestAnimationFrame(() => {
                    if (textareaRef.current) {
                        textareaRef.current.selectionStart = start + 1;
                        textareaRef.current.selectionEnd = start + 1;
                    }
                });
                return;
            }
        }
    }, [code, onChange, onRun]);

    const lines = code.split('\n');
    const highlighted = highlightHTML(code);

    return (
        <div className="relative flex h-full bg-[#0d1117] overflow-hidden">
            {/* Line numbers */}
            <div
                className="py-4 px-3 select-none bg-[#0d1117] border-r border-border shrink-0 overflow-hidden"
                style={{ minWidth: '3rem' }}
            >
                {lines.map((_, i) => (
                    <div
                        key={`pg-ln-${i + 1}`}
                        className="line-number leading-[1.6] text-[0.8125rem] text-right pr-2"
                    >
                        {i + 1}
                    </div>
                ))}
            </div>

            {/* Editor area */}
            <div className="relative flex-1 overflow-auto">
                {/* Syntax highlighted display */}
                <div
                    ref={highlightRef}
                    className="editor-highlight text-foreground pointer-events-none"
                    dangerouslySetInnerHTML={{ __html: highlighted + '\n' }}
                    aria-hidden="true"
                />

                {/* Actual textarea (transparent, on top) */}
                <textarea
                    ref={textareaRef}
                    value={code}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onScroll={syncScroll}
                    spellCheck={false}
                    autoCapitalize="none"
                    autoCorrect="off"
                    className="editor-textarea"
                    style={{ caretColor: 'var(--primary)' }}
                    aria-label="HTML code editor"
                    aria-multiline="true"
                />
            </div>
        </div>
    );
}