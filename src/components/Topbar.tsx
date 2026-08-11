'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Menu, Search, Bell, X, BookOpen, Code2, Puzzle, Tag } from 'lucide-react';

interface TopbarProps {
    onMenuClick: () => void;
    onToggleSidebar: () => void;
    sidebarCollapsed: boolean;
    currentPath: string;
}

const pageTitles: Record<string, string> = {
    '/': 'Dashboard',
    '/code-book': 'Code Book',
    '/html-playground': 'HTML Playground',
};

const searchResults = [
    { id: 'sr-1', type: 'lesson', label: 'HTML Document Structure', href: '/code-book', icon: <BookOpen size={14} /> },
    { id: 'sr-2', type: 'tag', label: '<div> — Block Container', href: '/code-book', icon: <Tag size={14} /> },
    { id: 'sr-3', type: 'lesson', label: 'HTML Forms — Input Types', href: '/code-book', icon: <BookOpen size={14} /> },
    { id: 'sr-4', type: 'playground', label: 'Open HTML Playground', href: '/html-playground', icon: <Code2 size={14} /> },
    { id: 'sr-5', type: 'practice', label: 'Practice: Build a Table', href: '/code-book', icon: <Puzzle size={14} /> },
    { id: 'sr-6', type: 'tag', label: '<table> — Table Element', href: '/code-book', icon: <Tag size={14} /> },
];

export default function Topbar({ onMenuClick, onToggleSidebar, sidebarCollapsed, currentPath }: TopbarProps) {
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const searchRef = useRef<HTMLInputElement>(null);

    const title = pageTitles[currentPath] ?? 'HTML Code Book';

    const filtered = searchQuery.trim()
        ? searchResults.filter((r) => r.label.toLowerCase().includes(searchQuery.toLowerCase()))
        : searchResults.slice(0, 4);

    useEffect(() => {
        if (searchOpen) searchRef.current?.focus();
    }, [searchOpen]);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setSearchOpen(true);
            }
            if (e.key === 'Escape') setSearchOpen(false);
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, []);

    return (
        <>
            <header className="h-[60px] border-b border-border bg-card/80 backdrop-blur-sm flex items-center px-4 gap-3 shrink-0 z-30 sticky top-0">
                {/* Mobile menu */}
                <button onClick={onMenuClick} className="btn-icon lg:hidden" aria-label="Open menu">
                    <Menu size={18} />
                </button>

                {/* Desktop sidebar toggle */}
                <button onClick={onToggleSidebar} className="btn-icon hidden lg:flex" aria-label="Toggle sidebar">
                    <Menu size={18} />
                </button>

                {/* Page title */}
                <div className="flex items-center gap-2 min-w-0">
                    <h1 className="text-base font-semibold text-foreground truncate">{title}</h1>
                </div>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Search trigger */}
                <button
                    onClick={() => setSearchOpen(true)}
                    className="hidden sm:flex items-center gap-2 bg-input border border-border rounded-lg px-3 py-1.5 text-sm text-muted-foreground hover:border-primary/50 transition-colors duration-150 min-w-[200px]"
                >
                    <Search size={14} />
                    <span className="flex-1 text-left">Search lessons, tags…</span>
                    <kbd className="text-2xs bg-muted px-1.5 py-0.5 rounded font-mono border border-border">⌘K</kbd>
                </button>

                <button onClick={() => setSearchOpen(true)} className="btn-icon sm:hidden" aria-label="Search">
                    <Search size={18} />
                </button>

                {/* Notifications */}
                <button className="btn-icon relative" aria-label="Notifications">
                    <Bell size={18} />
                    <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full" />
                </button>
            </header>

            {/* Search modal */}
            {searchOpen && (
                <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setSearchOpen(false)} />
                    <div className="relative bg-card border border-border rounded-xl shadow-2xl w-full max-w-xl overflow-hidden fade-in">
                        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
                            <Search size={16} className="text-muted-foreground shrink-0" />
                            <input
                                ref={searchRef}
                                type="text"
                                placeholder="Search lessons, tags, examples…"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="flex-1 bg-transparent text-sm text-foreground placeholder-muted-foreground outline-none"
                            />
                            <button onClick={() => setSearchOpen(false)} className="btn-icon p-1">
                                <X size={16} />
                            </button>
                        </div>
                        <div className="py-2 max-h-80 overflow-y-auto">
                            {filtered.length === 0 ? (
                                <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                                    No results for &ldquo;{searchQuery}&rdquo;
                                </div>
                            ) : (
                                filtered.map((result) => (
                                    <a
                                        key={result.id}
                                        href={result.href}
                                        onClick={() => setSearchOpen(false)}
                                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-muted transition-colors duration-100 cursor-pointer"
                                    >
                                        <span className="text-muted-foreground shrink-0">{result.icon}</span>
                                        <span className="text-sm text-foreground flex-1">{result.label}</span>
                                        <span className="text-2xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded capitalize">{result.type}</span>
                                    </a>
                                ))
                            )}
                        </div>
                        <div className="px-4 py-2 border-t border-border flex items-center gap-4 text-2xs text-muted-foreground">
                            <span className="flex items-center gap-1"><kbd className="bg-muted px-1 py-0.5 rounded border border-border font-mono">↵</kbd> Select</span>
                            <span className="flex items-center gap-1"><kbd className="bg-muted px-1 py-0.5 rounded border border-border font-mono">Esc</kbd> Close</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}