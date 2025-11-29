'use client';

import { Calendar, Users, Filter, Zap, Layout } from 'lucide-react';
import { NodeType } from '@/types/campaign';

const nodeTypes = [
    { type: 'campaign' as NodeType, label: 'Кампания', icon: Calendar, color: 'from-primary to-secondary' },
    { type: 'audience' as NodeType, label: 'Аудитория', icon: Users, color: 'from-secondary to-accent' },
    { type: 'filter' as NodeType, label: 'Фильтр', icon: Filter, color: 'from-primary to-accent' },
    { type: 'action' as NodeType, label: 'Действие', icon: Zap, color: 'from-accent to-primary' },
    { type: 'adblock' as NodeType, label: 'Рекламный блок', icon: Layout, color: 'from-secondary to-primary' },
];

interface NodeToolbarProps {
    onAddNode: (type: NodeType) => void;
}

export default function NodeToolbar({ onAddNode }: NodeToolbarProps) {
    return (
        <div className="w-64 glass border-r border-white/10 p-4">
            <h3 className="text-sm font-bold mb-4 text-foreground/70">Элементы</h3>
            <div className="space-y-2">
                {nodeTypes.map((node) => {
                    const Icon = node.icon;
                    return (
                        <button
                            key={node.type}
                            onClick={() => onAddNode(node.type)}
                            className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all group border border-white/10 hover:border-white/20"
                        >
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${node.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                <Icon className="w-5 h-5" />
                            </div>
                            <span className="text-sm font-medium">{node.label}</span>
                        </button>
                    );
                })}
            </div>

            <div className="mt-6 p-4 glass rounded-xl border border-white/10">
                <p className="text-xs text-foreground/50 mb-2">💡 Подсказка</p>
                <p className="text-xs text-foreground/70">
                    Нажмите на элемент, чтобы добавить его на холст. Соединяйте элементы для создания сценария.
                </p>
            </div>
        </div>
    );
}
