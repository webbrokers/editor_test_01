'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Zap, Settings, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
    { name: 'Кампании', href: '/campaigns', icon: Zap },
    { name: 'Аналитика', href: '/analytics', icon: BarChart3 },
    { name: 'Настройки', href: '/settings', icon: Settings },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 glass border-r border-white/10 flex flex-col">
            {/* Логотип */}
            <div className="p-6 border-b border-white/10">
                <Link href="/campaigns" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:animate-glow transition-all">
                        <LayoutDashboard className="w-5 h-5" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            Loyalty Admin
                        </h1>
                        <p className="text-xs text-foreground/50">Панель управления</p>
                    </div>
                </Link>
            </div>

            {/* Навигация */}
            <nav className="flex-1 p-4 space-y-1">
                {navigation.map((item) => {
                    const isActive = pathname?.startsWith(item.href);
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                'flex items-center gap-3 px-4 py-3 rounded-xl transition-all group',
                                isActive
                                    ? 'bg-gradient-to-r from-primary/20 to-secondary/20 text-foreground border border-primary/30'
                                    : 'text-foreground/60 hover:text-foreground hover:bg-white/5'
                            )}
                        >
                            <Icon className={cn(
                                'w-5 h-5 transition-transform group-hover:scale-110',
                                isActive && 'text-primary'
                            )} />
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Футер */}
            <div className="p-4 border-t border-white/10">
                <div className="glass p-4 rounded-xl">
                    <p className="text-xs text-foreground/50 mb-2">Версия 2.0</p>
                    <p className="text-xs text-foreground/70">© 2025 Loyalty Program</p>
                </div>
            </div>
        </aside>
    );
}
