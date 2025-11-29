import { Handle, Position, NodeProps } from '@xyflow/react';
import { Filter, X } from 'lucide-react';
import { FilterNodeData } from '@/types/campaign';
import { useEditorStore } from '@/hooks/useEditorStore';

export default function FilterNode({ data, id, selected }: NodeProps) {
    const { setSelectedNode, deleteNode } = useEditorStore();

    return (
        <div
            className={`glass rounded-xl p-4 min-w-[280px] border-2 transition-all ${selected ? 'border-primary shadow-lg shadow-primary/30' : 'border-white/10'
                }`}
            onClick={() => setSelectedNode({ id, data, type: 'filter' } as any)}
        >
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <Filter className="w-4 h-4" />
                    </div>
                    <div>
                        <p className="text-xs text-foreground/50 font-medium">Фильтр</p>
                        <p className="font-bold text-sm">{(data as FilterNodeData).condition || 'Условие'}</p>
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

            {(data as FilterNodeData).operator && (
                <div className="mt-2">
                    <span className="px-2 py-1 bg-primary/20 rounded text-primary text-xs font-medium">
                        {(data as FilterNodeData).operator!.toUpperCase()}
                    </span>
                </div>
            )}

            <Handle type="target" position={Position.Left} className="w-3 h-3 !bg-primary" />
            <Handle type="source" position={Position.Right} className="w-3 h-3 !bg-primary" />
            <Handle type="source" position={Position.Bottom} className="w-3 h-3 !bg-primary" />
        </div>
    );
}
