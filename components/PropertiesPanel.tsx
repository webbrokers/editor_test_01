'use client';

import { useEditorStore } from '@/hooks/useEditorStore';
import { X } from 'lucide-react';

export default function PropertiesPanel() {
  const { selectedNode, updateNodeData, setSelectedNode } = useEditorStore();

  if (!selectedNode) {
    return (
      <div className="w-80 glass border-l border-white/10 p-6">
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
            <span className="text-2xl">ℹ️</span>
          </div>
          <h3 className="text-lg font-bold mb-2">Выберите узел</h3>
          <p className="text-sm text-foreground/60">
            Кликните на узел в редакторе, чтобы отредактировать его свойства.
          </p>
        </div>
      </div>
    );
  }

  const renderCampaignProperties = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Название кампании</label>
        <input
          type="text"
          value={(selectedNode.data as any).name || ''}
          onChange={(e) => updateNodeData(selectedNode.id, { name: e.target.value })}
          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-primary/50"
          placeholder="Приветственная серия"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Дата начала</label>
        <input
          type="date"
          value={(selectedNode.data as any).startDate || ''}
          onChange={(e) => updateNodeData(selectedNode.id, { startDate: e.target.value })}
          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-primary/50"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Дата окончания</label>
        <input
          type="date"
          value={(selectedNode.data as any).endDate || ''}
          onChange={(e) => updateNodeData(selectedNode.id, { endDate: e.target.value })}
          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-primary/50"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Статус</label>
        <select
          value={(selectedNode.data as any).status || 'draft'}
          onChange={(e) => updateNodeData(selectedNode.id, { status: e.target.value })}
          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-primary/50"
        >
          <option value="draft">Черновик</option>
          <option value="active">Активна</option>
          <option value="paused">Пауза</option>
          <option value="completed">Завершена</option>
        </select>
      </div>
    </div>
  );

  const renderAudienceProperties = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">UTM Source</label>
        <input
          type="text"
          value={(selectedNode.data as any).utmSource || ''}
          onChange={(e) => updateNodeData(selectedNode.id, { utmSource: e.target.value })}
          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-secondary/50"
          placeholder="google, facebook..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Пол</label>
        <select
          value={(selectedNode.data as any).gender || 'all'}
          onChange={(e) => updateNodeData(selectedNode.id, { gender: e.target.value })}
          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-secondary/50"
        >
          <option value="all">Любой</option>
          <option value="male">Мужской</option>
          <option value="female">Женский</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Возраст (мин.)</label>
        <input
          type="number"
          value={(selectedNode.data as any).age?.min ?? ''}
          onChange={(e) =>
            updateNodeData(selectedNode.id, {
              age: { ...((selectedNode.data as any)?.age || {}), min: parseInt(e.target.value) || 0 },
            })
          }
          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-secondary/50"
          placeholder="18"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Возраст (макс.)</label>
        <input
          type="number"
          value={(selectedNode.data as any).age?.max ?? ''}
          onChange={(e) =>
            updateNodeData(selectedNode.id, {
              age: { ...((selectedNode.data as any)?.age || {}), max: parseInt(e.target.value) || 100 },
            })
          }
          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-secondary/50"
          placeholder="65"
        />
      </div>
    </div>
  );

  const renderActionProperties = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Тип действия</label>
        <select
          value={(selectedNode.data as any).actionType || 'add_points'}
          onChange={(e) => updateNodeData(selectedNode.id, { actionType: e.target.value })}
          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-accent/50"
        >
          <option value="add_points">Начислить баллы</option>
          <option value="subtract_points">Списать баллы</option>
          <option value="add_spins">Начислить спины</option>
          <option value="level_up">Повысить уровень</option>
        </select>
      </div>

      {(selectedNode.data.actionType === 'add_points' ||
        selectedNode.data.actionType === 'subtract_points' ||
        selectedNode.data.actionType === 'add_spins') && (
        <div>
          <label className="block text-sm font-medium mb-2">Значение</label>
          <input
            type="number"
            value={(selectedNode.data as any).value ?? ''}
            onChange={(e) =>
              updateNodeData(selectedNode.id, { value: parseInt(e.target.value) || 0 })
            }
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-accent/50"
            placeholder="100"
          />
        </div>
      )}
    </div>
  );

  const renderFilterProperties = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Условие</label>
        <input
          type="text"
          value={(selectedNode.data as any).condition || ''}
          onChange={(e) => updateNodeData(selectedNode.id, { condition: e.target.value })}
          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-primary/50"
          placeholder="Например: возраст > 18"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Оператор</label>
        <select
          value={(selectedNode.data as any).operator || 'and'}
          onChange={(e) => updateNodeData(selectedNode.id, { operator: e.target.value })}
          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-primary/50"
        >
          <option value="and">И (AND)</option>
          <option value="or">ИЛИ (OR)</option>
        </select>
      </div>
    </div>
  );

  const renderAdBlockProperties = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Тип блока</label>
        <select
          value={(selectedNode.data as any).blockType || 'popup'}
          onChange={(e) => updateNodeData(selectedNode.id, { blockType: e.target.value })}
          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-secondary/50"
        >
          <option value="popup">Попап</option>
          <option value="banner">Баннер</option>
          <option value="wheel">Колесо удачи</option>
          <option value="daily_reward">Ежедневная награда</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Контент</label>
        <textarea
          value={(selectedNode.data as any).content || ''}
          onChange={(e) => updateNodeData(selectedNode.id, { content: e.target.value })}
          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-secondary/50 min-h-[100px]"
          placeholder="Текст или HTML блока"
        />
      </div>
    </div>
  );

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
        return <p className="text-sm text-foreground/50">Тип узла не поддержан.</p>;
    }
  };

  return (
    <div className="w-80 glass border-l border-white/10 p-6 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold">Свойства</h3>
        <button
          onClick={() => setSelectedNode(null)}
          className="p-1 hover:bg-white/10 rounded transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {renderProperties()}
    </div>
  );
}
