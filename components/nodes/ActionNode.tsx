import { Handle, Position, NodeProps } from '@xyflow/react';
import { Zap, X } from 'lucide-react';
import { ActionNodeData } from '@/types/campaign';
import { useEditorStore } from '@/hooks/useEditorStore';

export default function ActionNode({ data, id, selected }: NodeProps) {
  const { setSelectedNode, deleteNode } = useEditorStore();
  const actionData = (data || {}) as Partial<ActionNodeData>;

  const getActionText = (type?: string) => {
    switch (type) {
      case 'add_points':
        return 'Начислить баллы';
      case 'subtract_points':
        return 'Списать баллы';
      case 'add_spins':
        return 'Выдать попытки';
      case 'level_up':
        return 'Повысить уровень';
      default:
        return 'Действие';
    }
  };

  return (
    <div
      className={`rounded-2xl border px-4 py-3.5 min-w-[260px] bg-white transition-all shadow-sm ${
        selected
          ? 'border-violet-300 shadow-[0_14px_45px_rgba(139,92,246,0.18)] ring-2 ring-violet-100'
          : 'border-slate-200'
      }`}
      onClick={() => setSelectedNode({ id, data, type: 'action' } as any)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.08em] text-slate-500">Действие</p>
            <p className="font-semibold text-slate-900 text-sm leading-snug">{getActionText(actionData.actionType)}</p>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteNode(id);
          }}
          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {actionData.value !== undefined && (
        <div className="mt-3">
          <span className="px-3 py-1 bg-violet-50 text-violet-700 rounded-full text-sm font-semibold border border-violet-100">
            {actionData.value}
          </span>
        </div>
      )}

      <Handle type="target" position={Position.Left} className="!w-3.5 !h-3.5 !bg-violet-500 !border-2 !border-white" />
      <Handle type="source" position={Position.Right} className="!w-3.5 !h-3.5 !bg-violet-500 !border-2 !border-white" />
    </div>
  );
}

