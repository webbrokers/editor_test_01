import { Handle, Position, NodeProps } from '@xyflow/react';
import { Calendar, X } from 'lucide-react';
import { CampaignNodeData } from '@/types/campaign';
import { useEditorStore } from '@/hooks/useEditorStore';

export default function CampaignNode({ data, id, selected }: NodeProps<CampaignNodeData>) {
  const { setSelectedNode, deleteNode } = useEditorStore();

  return (
    <div
      className={`glass rounded-xl p-4 min-w-[280px] border-2 transition-all ${
        selected ? 'border-primary shadow-lg shadow-primary/30' : 'border-white/10'
      }`}
      onClick={() => setSelectedNode({ id, data, type: 'campaign' } as any)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs text-foreground/50 font-medium">Кампания</p>
            <p className="font-bold text-sm">{data.name || 'Новая кампания'}</p>
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

      {data.startDate && (
        <div className="text-xs text-foreground/60 mb-2">
          <span>Старт: {new Date(data.startDate).toLocaleDateString('ru-RU')}</span>
        </div>
      )}

      {data.status && (
        <div className="mt-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              data.status === 'active'
                ? 'bg-green-500/20 text-green-400'
                : data.status === 'paused'
                ? 'bg-yellow-500/20 text-yellow-400'
                : 'bg-gray-500/20 text-gray-400'
            }`}
          >
            {data.status === 'active'
              ? 'Активна'
              : data.status === 'paused'
              ? 'Пауза'
              : 'Черновик'}
          </span>
        </div>
      )}

      <Handle type="source" position={Position.Right} className="w-3 h-3 !bg-primary" />
    </div>
  );
}
