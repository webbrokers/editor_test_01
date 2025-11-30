import { Handle, Position, NodeProps } from '@xyflow/react';
import { Users, X } from 'lucide-react';
import { AudienceNodeData } from '@/types/campaign';
import { useEditorStore } from '@/hooks/useEditorStore';

export default function AudienceNode({ data, id, selected }: NodeProps) {
  const { setSelectedNode, deleteNode } = useEditorStore();
  const audienceData = (data || {}) as Partial<AudienceNodeData>;

  return (
    <div
      className={`rounded-2xl border px-4 py-3.5 min-w-[260px] bg-white transition-all shadow-sm ${
        selected
          ? 'border-sky-300 shadow-[0_14px_45px_rgba(14,165,233,0.18)] ring-2 ring-sky-100'
          : 'border-slate-200'
      }`}
      onClick={() => setSelectedNode({ id, data, type: 'audience' } as any)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.08em] text-slate-500">Аудитория</p>
            <p className="font-semibold text-slate-900 text-sm leading-snug">Сегмент пользователей</p>
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

      <div className="space-y-2 text-xs text-slate-600 mt-3">
        {audienceData.utmSource && (
          <div className="flex items-center gap-2">
            <span className="text-slate-500">UTM:</span>
            <span className="px-2 py-0.5 bg-sky-50 text-sky-700 rounded-full border border-sky-100">{audienceData.utmSource}</span>
          </div>
        )}
        {audienceData.gender && audienceData.gender !== 'all' && (
          <div className="flex items-center gap-2">
            <span className="text-slate-500">Пол:</span>
            <span className="px-2 py-0.5 bg-sky-50 text-sky-700 rounded-full border border-sky-100">
              {audienceData.gender === 'male' ? 'Мужской' : 'Женский'}
            </span>
          </div>
        )}
        {audienceData.age && (
          <div className="flex items-center gap-2">
            <span className="text-slate-500">Возраст:</span>
            <span className="px-2 py-0.5 bg-sky-50 text-sky-700 rounded-full border border-sky-100">
              {audienceData.age.min}-{audienceData.age.max}
            </span>
          </div>
        )}
      </div>

      <Handle type="target" position={Position.Left} className="!w-3.5 !h-3.5 !bg-sky-500 !border-2 !border-white" />
      <Handle type="source" position={Position.Right} className="!w-3.5 !h-3.5 !bg-sky-500 !border-2 !border-white" />
    </div>
  );
}

