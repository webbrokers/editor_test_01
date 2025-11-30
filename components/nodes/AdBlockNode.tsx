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
      className={`rounded-2xl border px-4 py-3.5 min-w-[260px] bg-white transition-all shadow-sm ${
        selected
          ? 'border-teal-300 shadow-[0_14px_45px_rgba(20,184,166,0.18)] ring-2 ring-teal-100'
          : 'border-slate-200'
      }`}
      onClick={() => setSelectedNode({ id, data, type: 'adblock' } as any)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
            <Layout className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.08em] text-slate-500">Рекламный блок</p>
            <p className="font-semibold text-slate-900 text-sm leading-snug">{getBlockTypeText(adBlockData.blockType)}</p>
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

      <Handle type="target" position={Position.Left} className="!w-3.5 !h-3.5 !bg-teal-500 !border-2 !border-white" />
    </div>
  );
}

