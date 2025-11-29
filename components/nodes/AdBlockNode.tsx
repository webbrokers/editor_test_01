import { Handle, Position, NodeProps } from '@xyflow/react';
import { Layout, X } from 'lucide-react';
import { AdBlockNodeData } from '@/types/campaign';
import { useEditorStore } from '@/hooks/useEditorStore';

export default function AdBlockNode({ data, id, selected }: NodeProps) {
  const { setSelectedNode, deleteNode } = useEditorStore();
  const adBlockData = (data || {}) as Partial<AdBlockNodeData>;

  const getBlockTypeText = (type?: string) => {
    switch (type) {
      case 'popup':
        return 'Попап';
      case 'banner':
        return 'Баннер';
      case 'wheel':
        return 'Колесо удачи';
      case 'daily_reward':
        return 'Ежедневная награда';
      default:
        return 'Рекламный блок';
    }
  };

  return (
    <div
      className={`glass rounded-xl p-4 min-w-[280px] border-2 transition-all ${
        selected ? 'border-secondary shadow-lg shadow-secondary/30' : 'border-white/10'
      }`}
      onClick={() => setSelectedNode({ id, data, type: 'adblock' } as any)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-secondary to-primary flex items-center justify-center">
            <Layout className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs text-foreground/50 font-medium">Рекламный блок</p>
            <p className="font-bold text-sm">{getBlockTypeText(adBlockData.blockType)}</p>
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

      <Handle type="target" position={Position.Left} className="w-3 h-3 !bg-secondary" />
    </div>
  );
}
