'use client';
import React from 'react';
import Link from 'next/link';
import AppLogo from './ui/AppLogo';
import {
    LayoutDashboard,
    BookOpen,
    Code2,
    Tag,
    Puzzle,
    HelpCircle,
    StickyNote,
    Bookmark,
    FolderOpen,
    Trophy,
    BarChart2,
    Settings,
    ChevronRight,
} from 'lucide-react';

interface NavItem {
    id: string;
    label: string;
    href: string;
    icon: React.ReactNode;
    badge?: number;
}

const navItems: NavItem[] = [
    { id: 'nav-dashboard', label: 'Dashboard', href: '/', icon: <LayoutDashboard size={18} /> },
    { id: 'nav-codebook', label: 'Code Book', href: '/code-book', icon: <BookOpen size={18} /> },
    { id: 'nav-playground', label: 'Playground', href: '/html-playground', icon: <Code2 size={18} /> },
    { id: 'nav-tags', label: 'Tag Explorer', href: '/tag-explorer', icon: <Tag size={18} /> },
    { id: 'nav-practice', label: 'Practice', href: '/practice', icon: <Puzzle size={18} />, badge: 3 },
    { id: 'nav-quizzes', label: 'Quizzes', href: '/quizzes', icon: <HelpCircle size={18} /> },
    { id: 'nav-notes', label: 'Notes', href: '/notes', icon: <StickyNote size={18} /> },
    { id: 'nav-bookmarks', label: 'Bookmarks', href: '/bookmarks', icon: <Bookmark size={18} /> },
    { id: 'nav-projects', label: 'My Projects', href: '/projects', icon: <FolderOpen size={18} /> },
    { id: 'nav-achievements', label: 'Achievements', href: '/achievements', icon: <Trophy size={18} /> },
    { id: 'nav-progress', label: 'Progress', href: '/progress', icon: <BarChart2 size={18} /> },
    { id: 'nav-settings', label: 'Settings', href: '/settings', icon: <Settings size={18} /> },
];

const activeRoutes: Record<string, string> = {
    '/': 'nav-dashboard',
    '/code-book': 'nav-codebook',
    '/html-playground': 'nav-playground',
};

interface SidebarProps {
    collapsed: boolean;
    mobileOpen: boolean;
    currentPath: string;
    onMobileClose: () => void;
}

export default function Sidebar({ collapsed, mobileOpen, currentPath, onMobileClose }: SidebarProps) {
    const activeId = activeRoutes[currentPath] ?? 'nav-dashboard';

    return (
        <aside
            className={`
        fixed top-0 left-0 h-full z-50 flex flex-col bg-card border-r border-border sidebar-transition
        ${collapsed ? 'w-16' : 'w-60'}
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}
        >
            {/* Logo */}
            <div className={`flex items-center h-[60px] border-b border-border px-3 shrink-0 ${collapsed ? 'justify-center' : 'gap-3'}`}>
                <div className="flex items-center gap-2 shrink-0">
                    <AppLogo size={32} />
                    {!collapsed && (
                        <div className="min-w-0">
                            <div className="text-sm font-semibold text-foreground leading-tight truncate">HTML Code Book</div>
                            <div className="text-2xs text-muted-foreground leading-tight truncate">Learn • Practice • Build</div>
                        </div>
                    )}
                </div>
            </div>

            {/* Nav items */}
            <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
                {navItems.map((item) => {
                    const isActive = item.id === activeId;
                    return (
                        <Link
                            key={item.id}
                            href={item.href}
                            onClick={onMobileClose}
                            title={collapsed ? item.label : undefined}
                            className={`
                group relative flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm font-medium transition-all duration-150
                ${isActive
                                    ? 'nav-item-active text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                }
              `}
                        >
                            <span className="shrink-0">{item.icon}</span>
                            {!collapsed && (
                                <>
                                    <span className="flex-1 truncate">{item.label}</span>
                                    {item.badge && (
                                        <span className="ml-auto bg-primary text-primary-foreground text-2xs font-semibold px-1.5 py-0.5 rounded-full min-w-[1.25rem] text-center">
                                            {item.badge}
                                        </span>
                                    )}
                                    {isActive && <ChevronRight size={14} className="text-primary shrink-0" />}
                                </>
                            )}
                            {/* Tooltip for collapsed */}
                            {collapsed && (
                                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-secondary border border-border text-foreground text-xs font-medium px-2.5 py-1.5 rounded-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 z-50 shadow-lg">
                                    {item.label}
                                    {item.badge && (
                                        <span className="ml-2 bg-primary text-primary-foreground text-2xs px-1 py-0.5 rounded-full">{item.badge}</span>
                                    )}
                                </div>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom user area */}
            <div className={`border-t border-border p-3 shrink-0 ${collapsed ? 'flex justify-center' : ''}`}>
                {collapsed ? (
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-semibold">
                        S
                    </div>
                ) : (
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-semibold shrink-0">
                            S
                        </div>
                        <div className="min-w-0">
                            <div className="text-sm font-medium text-foreground truncate">Student</div>
                            <div className="text-2xs text-muted-foreground truncate">HTML Learner</div>
                        </div>
                    </div>
                )}
            </div>
        </aside>
    );
}