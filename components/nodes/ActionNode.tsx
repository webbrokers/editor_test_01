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
        return 'Начислить спины';
      case 'level_up':
        return 'Повысить уровень';
      default:
        return 'Действие';
    }
  };

  return (
    <div
      className={`glass rounded-xl p-4 min-w-[280px] border-2 transition-all ${
        selected ? 'border-accent shadow-lg shadow-accent/30' : 'border-white/10'
      }`}
      onClick={() => setSelectedNode({ id, data, type: 'action' } as any)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs text-foreground/50 font-medium">Действие</p>
            <p className="font-bold text-sm">{getActionText(actionData.actionType)}</p>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteNode(id);
          }}
          className="p-1 hover:bg-red-500/20 rounded transition-colors"
        >
          <X className="w-4 h-4 text-red-400" />
        </button>
      </div>

      {actionData.value !== undefined && (
        <div className="mt-2">
          <span className="px-3 py-1 bg-accent/20 rounded-full text-accent font-bold text-sm">
            {actionData.value}
          </span>
        </div>
      )}

      <Handle type="target" position={Position.Left} className="w-3 h-3 !bg-accent" />
      <Handle type="source" position={Position.Right} className="w-3 h-3 !bg-accent" />
    </div>
  );
}
