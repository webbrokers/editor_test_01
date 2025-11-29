import { Handle, Position, NodeProps } from '@xyflow/react';
import { Users, X } from 'lucide-react';
import { AudienceNodeData } from '@/types/campaign';
import { useEditorStore } from '@/hooks/useEditorStore';

export default function AudienceNode({ data, id, selected }: NodeProps<AudienceNodeData>) {
    const { setSelectedNode, deleteNode } = useEditorStore();

    return (
        <div
            className={`glass rounded-xl p-4 min-w-[280px] border-2 transition-all ${selected ? 'border-secondary shadow-lg shadow-secondary/30' : 'border-white/10'
                }`}
            onClick={() => setSelectedNode({ id, data, type: 'audience' } as any)}
        >
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                        <Users className="w-4 h-4" />
                    </div>
                    <div>
                        <p className="text-xs text-foreground/50 font-medium">Аудитория</p>
                        <p className="font-bold text-sm">Целевая группа</p>
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

            <div className="space-y-2 text-xs">
                {data.utmSource && (
                    <div className="flex items-center gap-2">
                        <span className="text-foreground/50">UTM:</span>
                        <span className="px-2 py-0.5 bg-secondary/20 rounded text-secondary">{data.utmSource}</span>
                    </div>
                )}
                {data.gender && data.gender !== 'all' && (
                    <div className="flex items-center gap-2">
                        <span className="text-foreground/50">Пол:</span>
                        <span className="px-2 py-0.5 bg-secondary/20 rounded text-secondary">
                            {data.gender === 'male' ? 'Мужской' : 'Женский'}
                        </span>
                    </div>
                )}
                {data.age && (
                    <div className="flex items-center gap-2">
                        <span className="text-foreground/50">Возраст:</span>
                        <span className="px-2 py-0.5 bg-secondary/20 rounded text-secondary">
                            {data.age.min}-{data.age.max}
                        </span>
                    </div>
                )}
            </div>

            <Handle type="target" position={Position.Left} className="w-3 h-3 !bg-secondary" />
            <Handle type="source" position={Position.Right} className="w-3 h-3 !bg-secondary" />
        </div>
    );
}
