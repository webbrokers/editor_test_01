import { Handle, Position, NodeProps } from '@xyflow/react';
import { Filter, X } from 'lucide-react';
import { FilterNodeData } from '@/types/campaign';
import { useEditorStore } from '@/hooks/useEditorStore';

export default function FilterNode({ data, id, selected }: NodeProps) {
  const { setSelectedNode, deleteNode } = useEditorStore();
  const filterData = (data || {}) as Partial<FilterNodeData>;

  return (
    <div
      className={`rounded-2xl border px-4 py-3.5 min-w-[260px] bg-white transition-all shadow-sm ${
        selected
          ? 'border-amber-300 shadow-[0_14px_45px_rgba(245,158,11,0.18)] ring-2 ring-amber-100'
          : 'border-slate-200'
      }`}
      onClick={() => setSelectedNode({ id, data, type: 'filter' } as any)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Filter className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.08em] text-slate-500">Фильтр</p>
            <p className="font-semibold text-slate-900 text-sm leading-snug">{filterData.condition || 'Условие'}</p>
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

      {filterData.operator && (
        <div className="mt-3">
          <span className="px-2.5 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-semibold border border-amber-100">
            {filterData.operator!.toUpperCase()}
          </span>
        </div>
      )}

      <Handle type="target" position={Position.Left} className="!w-3.5 !h-3.5 !bg-amber-500 !border-2 !border-white" />
      <Handle type="source" position={Position.Right} className="!w-3.5 !h-3.5 !bg-amber-500 !border-2 !border-white" />
      <Handle type="source" position={Position.Bottom} className="!w-3.5 !h-3.5 !bg-amber-500 !border-2 !border-white" />
    </div>
  );
}

