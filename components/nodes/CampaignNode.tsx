import { Handle, Position, NodeProps } from '@xyflow/react';
import { Calendar, X } from 'lucide-react';
import { CampaignNodeData } from '@/types/campaign';
import { useEditorStore } from '@/hooks/useEditorStore';

export default function CampaignNode({ data, id, selected }: NodeProps) {
  const { setSelectedNode, deleteNode } = useEditorStore();
  const campaignData = (data || {}) as Partial<CampaignNodeData>;

  const statusBadge = () => {
    const status = campaignData.status || 'draft';
    const map: Record<string, { text: string; className: string }> = {
      active: { text: 'Активна', className: 'bg-emerald-50 text-emerald-700' },
      paused: { text: 'Пауза', className: 'bg-amber-50 text-amber-700' },
      completed: { text: 'Завершена', className: 'bg-slate-100 text-slate-600' },
      draft: { text: 'Черновик', className: 'bg-slate-50 text-slate-600' },
    };
    return map[status];
  };

  const badge = statusBadge();

  return (
    <div
      className={`rounded-2xl border px-4 py-3.5 min-w-[260px] bg-white transition-all shadow-sm ${
        selected
          ? 'border-emerald-300 shadow-[0_14px_45px_rgba(16,185,129,0.18)] ring-2 ring-emerald-100'
          : 'border-slate-200'
      }`}
      onClick={() => setSelectedNode({ id, data, type: 'campaign' } as any)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.08em] text-slate-500">Кампания</p>
            <p className="font-semibold text-slate-900 text-sm leading-snug">{campaignData.name || 'Новая кампания'}</p>
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

      <div className="mt-3 flex items-center gap-2 text-xs text-slate-600">
        {campaignData.startDate && <span>Старт: {new Date(campaignData.startDate).toLocaleDateString('ru-RU')}</span>}
        {campaignData.endDate && <span>· Финиш: {new Date(campaignData.endDate).toLocaleDateString('ru-RU')}</span>}
      </div>

      {badge && <span className={`inline-flex mt-3 px-3 py-1 rounded-full text-xs font-semibold ${badge.className}`}>{badge.text}</span>}

      <Handle type="source" position={Position.Right} className="!w-3.5 !h-3.5 !bg-emerald-500 !border-2 !border-white" />
    </div>
  );
}

