'use client';

import { Calendar, Users, Filter, Zap, Layout, RotateCcw, RotateCw } from 'lucide-react';
import { NodeType } from '@/types/campaign';

const nodeTypes = [
  { type: 'campaign' as NodeType, label: 'Кампания', hint: 'Стартовая точка сценария и статус', icon: Calendar, tone: 'emerald' },
  { type: 'audience' as NodeType, label: 'Аудитория', hint: 'Кого сегментируем и по каким меткам', icon: Users, tone: 'sky' },
  { type: 'filter' as NodeType, label: 'Фильтр', hint: 'Проверка условий и ветвления', icon: Filter, tone: 'amber' },
  { type: 'action' as NodeType, label: 'Действие', hint: 'Начисления, сообщения или статусы', icon: Zap, tone: 'violet' },
  { type: 'adblock' as NodeType, label: 'Рекламный блок', hint: 'Попап, баннер или колесо удачи', icon: Layout, tone: 'teal' },
];

const toneStyles: Record<string, { bg: string; text: string; badge: string }> = {
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', badge: 'bg-emerald-100 text-emerald-700' },
  sky: { bg: 'bg-sky-50', text: 'text-sky-600', badge: 'bg-sky-100 text-sky-700' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-600', badge: 'bg-amber-100 text-amber-700' },
  violet: { bg: 'bg-violet-50', text: 'text-violet-600', badge: 'bg-violet-100 text-violet-700' },
  teal: { bg: 'bg-teal-50', text: 'text-teal-600', badge: 'bg-teal-100 text-teal-700' },
};

interface NodeToolbarProps {
  onAddNode: (type: NodeType) => void;
  onLoadTemplate: (template: 'welcome' | 'retention' | 'bonus') => void;
  onUndo: () => void;
  onRedo: () => void;
}

export default function NodeToolbar({ onAddNode, onLoadTemplate, onUndo, onRedo }: NodeToolbarProps) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.08em] text-slate-500">Библиотека узлов</p>
            <h3 className="text-lg font-semibold text-slate-900">Добавить узел</h3>
          </div>
          <span className="px-2 py-1 rounded-full bg-slate-100 text-slate-600 text-[11px] font-semibold">Shift = выбор</span>
        </div>

        <div className="space-y-3">
          {nodeTypes.map((node) => {
            const Icon = node.icon;
            const tone = toneStyles[node.tone];
            return (
              <button
                key={node.type}
                onClick={() => onAddNode(node.type)}
                className="w-full flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 px-3.5 py-3 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className={`w-12 h-12 rounded-xl ${tone.bg} ${tone.text} flex items-center justify-center text-lg font-semibold`}> 
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-slate-900">{node.label}</p>
                  <p className="text-xs text-slate-500 leading-snug">{node.hint}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-slate-900">Шаблоны графа</h4>
          <span className="text-xs text-slate-500">1 клик = загрузить</span>
        </div>
        <div className="space-y-2">
          <button
            className="w-full text-left px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/60 hover:-translate-y-0.5 transition hover:shadow-sm"
            onClick={() => onLoadTemplate('welcome')}
          >
            <p className="font-semibold text-slate-900">Приветствие: бонус за регистрацию</p>
            <p className="text-xs text-slate-500">Кампания &gt; Аудитория &gt; Баллы &gt; Попап</p>
          </button>
          <button
            className="w-full text-left px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/60 hover:-translate-y-0.5 transition hover:shadow-sm"
            onClick={() => onLoadTemplate('retention')}
          >
            <p className="font-semibold text-slate-900">Удержание: напоминание + подарок</p>
            <p className="text-xs text-slate-500">Фильтр по дате &gt; Действие &gt; Баннер</p>
          </button>
          <button
            className="w-full text-left px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/60 hover:-translate-y-0.5 transition hover:shadow-sm"
            onClick={() => onLoadTemplate('bonus')}
          >
            <p className="font-semibold text-slate-900">Бонус: колесо удачи + баллы</p>
            <p className="text-xs text-slate-500">Колесо &gt; Баллы &gt; Рекламный блок</p>
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4 space-y-3">
        <p className="text-sm font-semibold text-slate-900">История</p>
        <div className="flex gap-2">
          <button
            onClick={onUndo}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition"
          >
            <RotateCcw className="w-4 h-4" />
            Отменить
          </button>
          <button
            onClick={onRedo}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition"
          >
            <RotateCw className="w-4 h-4" />
            Повторить
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-4">
        <p className="text-xs text-slate-500 mb-2">Подсказка</p>
        <p className="text-sm text-slate-600 leading-relaxed">
          Выделяйте несколько узлов через Shift и рамку. Отключите привязку к сетке, если нужна свободная схема, либо держите включённой — связи будут ровнее.
        </p>
      </div>
    </div>
  );
}

