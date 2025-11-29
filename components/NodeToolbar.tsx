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
  onLoadTemplate: (template: 'welcome' | 'retention' | 'bonus') => void;
  onUndo: () => void;
  onRedo: () => void;
}

export default function NodeToolbar({ onAddNode, onLoadTemplate, onUndo, onRedo }: NodeToolbarProps) {
  return (
    <div className="w-72 glass border-r border-white/10 p-4 space-y-6">
      <div>
        <h3 className="text-sm font-bold mb-4 text-foreground/70">Добавить узел</h3>
        <div className="space-y-2">
          {nodeTypes.map((node) => {
            const Icon = node.icon;
            return (
              <button
                key={node.type}
                onClick={() => onAddNode(node.type)}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all group border border-white/10 hover:border-white/20"
              >
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-br ${node.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium">{node.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-bold mb-3 text-foreground/70">Шаблоны графа</h4>
        <div className="space-y-2">
          <button
            className="w-full text-left px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition"
            onClick={() => onLoadTemplate('welcome')}
          >
            Приветствие: бонус за регистрацию
          </button>
          <button
            className="w-full text-left px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition"
            onClick={() => onLoadTemplate('retention')}
          >
            Удержание: напоминание + подарок
          </button>
          <button
            className="w-full text-left px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition"
            onClick={() => onLoadTemplate('bonus')}
          >
            Бонус: колёсo удачи + баллы
          </button>
        </div>
      </div>

      <div className="border-t border-white/10 pt-4">
        <p className="text-sm font-bold text-foreground/70 mb-2">История</p>
        <div className="flex gap-2">
          <button
            onClick={onUndo}
            className="flex-1 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition"
          >
            ⎌ Отменить
          </button>
          <button
            onClick={onRedo}
            className="flex-1 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition"
          >
            ↻ Повторить
          </button>
        </div>
      </div>

      <div className="p-4 glass rounded-xl border border-white/10">
        <p className="text-xs text-foreground/50 mb-2">Подсказка</p>
        <p className="text-xs text-foreground/70">
          Выделяйте несколько узлов с помощью Shift и рамки. Снап к сетке включён — схема будет ровной.
        </p>
      </div>
    </div>
  );
}
