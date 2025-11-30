'use client';

import { useEditorStore } from '@/hooks/useEditorStore';
import { X } from 'lucide-react';

const inputClass =
  'w-full px-3 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition';
const labelClass = 'block text-sm font-medium mb-2 text-slate-700';

export default function PropertiesPanel() {
  const { selectedNode, updateNodeData, setSelectedNode } = useEditorStore();

  if (!selectedNode) {
    return (
      <div className="w-full rounded-2xl border border-slate-100 bg-white/95 shadow-[0_18px_60px_rgba(15,23,42,0.08)] h-full p-6">
        <div className="flex flex-col items-center justify-center h-full text-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl border border-emerald-100 shadow-inner">ℹ️</div>
          <h3 className="text-lg font-semibold text-slate-900">Выберите узел</h3>
          <p className="text-sm text-slate-600 max-w-xs leading-relaxed">
            Кликните по блоку на канвасе или добавьте новый из панели слева, чтобы настроить контент и логику.
          </p>
        </div>
      </div>
    );
  }

  const renderCampaignProperties = () => {
    const nodeData = (selectedNode.data as any) || {};
    return (
      <div className="space-y-4">
        <div>
          <label className={labelClass}>Название кампании</label>
          <input
            type="text"
            value={nodeData.name || ''}
            onChange={(e) => updateNodeData(selectedNode.id, { name: e.target.value })}
            className={inputClass}
            placeholder="Приветствие: бонус за регистрацию"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Дата начала</label>
            <input
              type="date"
              value={nodeData.startDate || ''}
              onChange={(e) => updateNodeData(selectedNode.id, { startDate: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Дата окончания</label>
            <input
              type="date"
              value={nodeData.endDate || ''}
              onChange={(e) => updateNodeData(selectedNode.id, { endDate: e.target.value })}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Статус</label>
          <select
            value={nodeData.status || 'draft'}
            onChange={(e) => updateNodeData(selectedNode.id, { status: e.target.value })}
            className={inputClass}
          >
            <option value="draft">Черновик</option>
            <option value="active">Активна</option>
            <option value="paused">Пауза</option>
            <option value="completed">Завершена</option>
          </select>
        </div>
      </div>
    );
  };

  const renderAudienceProperties = () => {
    const nodeData = (selectedNode.data as any) || {};
    return (
      <div className="space-y-4">
        <div>
          <label className={labelClass}>UTM Source</label>
          <input
            type="text"
            value={nodeData.utmSource || ''}
            onChange={(e) => updateNodeData(selectedNode.id, { utmSource: e.target.value })}
            className={inputClass}
            placeholder="google, facebook, organic..."
          />
        </div>

        <div>
          <label className={labelClass}>Пол</label>
          <select
            value={nodeData.gender || 'all'}
            onChange={(e) => updateNodeData(selectedNode.id, { gender: e.target.value })}
            className={inputClass}
          >
            <option value="all">Любой</option>
            <option value="male">Мужской</option>
            <option value="female">Женский</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Возраст от</label>
            <input
              type="number"
              value={nodeData.age?.min ?? ''}
              onChange={(e) =>
                updateNodeData(selectedNode.id, {
                  age: { ...(nodeData.age || {}), min: parseInt(e.target.value) || 0 },
                })
              }
              className={inputClass}
              placeholder="18"
            />
          </div>
          <div>
            <label className={labelClass}>Возраст до</label>
            <input
              type="number"
              value={nodeData.age?.max ?? ''}
              onChange={(e) =>
                updateNodeData(selectedNode.id, {
                  age: { ...(nodeData.age || {}), max: parseInt(e.target.value) || 100 },
                })
              }
              className={inputClass}
              placeholder="65"
            />
          </div>
        </div>
      </div>
    );
  };

  const renderActionProperties = () => {
    const nodeData = (selectedNode.data as any) || {};
    const actionType = nodeData.actionType;
    return (
      <div className="space-y-4">
        <div>
          <label className={labelClass}>Тип действия</label>
          <select
            value={actionType || 'add_points'}
            onChange={(e) => updateNodeData(selectedNode.id, { actionType: e.target.value })}
            className={inputClass}
          >
            <option value="add_points">Начислить баллы</option>
            <option value="subtract_points">Списать баллы</option>
            <option value="add_spins">Выдать попытки</option>
            <option value="level_up">Повысить уровень</option>
          </select>
        </div>

        {(actionType === 'add_points' || actionType === 'subtract_points' || actionType === 'add_spins') && (
          <div>
            <label className={labelClass}>Значение</label>
            <input
              type="number"
              value={nodeData.value ?? ''}
              onChange={(e) => updateNodeData(selectedNode.id, { value: parseInt(e.target.value) || 0 })}
              className={inputClass}
              placeholder="100"
            />
          </div>
        )}
      </div>
    );
  };

  const renderFilterProperties = () => {
    const nodeData = (selectedNode.data as any) || {};
    return (
      <div className="space-y-4">
        <div>
          <label className={labelClass}>Условие</label>
          <input
            type="text"
            value={nodeData.condition || ''}
            onChange={(e) => updateNodeData(selectedNode.id, { condition: e.target.value })}
            className={inputClass}
            placeholder="Например: нет покупок 7 дней"
          />
        </div>

        <div>
          <label className={labelClass}>Оператор</label>
          <select
            value={nodeData.operator || 'and'}
            onChange={(e) => updateNodeData(selectedNode.id, { operator: e.target.value })}
            className={inputClass}
          >
            <option value="and">И (AND)</option>
            <option value="or">ИЛИ (OR)</option>
          </select>
        </div>
      </div>
    );
  };

  const renderAdBlockProperties = () => {
    const nodeData = (selectedNode.data as any) || {};
    return (
      <div className="space-y-4">
        <div>
          <label className={labelClass}>Формат блока</label>
          <select
            value={nodeData.blockType || 'popup'}
            onChange={(e) => updateNodeData(selectedNode.id, { blockType: e.target.value })}
            className={inputClass}
          >
            <option value="popup">Попап</option>
            <option value="banner">Баннер</option>
            <option value="wheel">Колесо удачи</option>
            <option value="daily_reward">Ежедневная награда</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Контент</label>
          <textarea
            value={nodeData.content || ''}
            onChange={(e) => updateNodeData(selectedNode.id, { content: e.target.value })}
            className={`${inputClass} min-h-[120px]`}
            placeholder="Текст или HTML блока"
          />
        </div>
      </div>
    );
  };

  const renderProperties = () => {
    switch (selectedNode.type) {
      case 'campaign':
        return renderCampaignProperties();
      case 'audience':
        return renderAudienceProperties();
      case 'action':
        return renderActionProperties();
      case 'filter':
        return renderFilterProperties();
      case 'adblock':
        return renderAdBlockProperties();
      default:
        return <p className="text-sm text-slate-500">Тип узла пока не поддерживается.</p>;
    }
  };

  return (
    <div className="w-full rounded-2xl border border-slate-100 bg-white/95 shadow-[0_18px_60px_rgba(15,23,42,0.08)] h-full p-6 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-[11px] uppercase tracking-[0.08em] text-slate-500">Свойства</p>
          <h3 className="text-lg font-semibold text-slate-900">Тонкая настройка</h3>
        </div>
        <button
          onClick={() => setSelectedNode(null)}
          className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-300"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {renderProperties()}
    </div>
  );
}
