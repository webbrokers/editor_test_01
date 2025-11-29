'use client';

import { useCallback, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ReactFlow, Background, Controls, MiniMap, Panel } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Save, ArrowLeft } from 'lucide-react';

import { useEditorStore } from '@/hooks/useEditorStore';
import { storage } from '@/utils/storage';
import { Campaign, NodeType } from '@/types/campaign';

import CampaignNode from '@/components/nodes/CampaignNode';
import AudienceNode from '@/components/nodes/AudienceNode';
import ActionNode from '@/components/nodes/ActionNode';
import FilterNode from '@/components/nodes/FilterNode';
import AdBlockNode from '@/components/nodes/AdBlockNode';
import NodeToolbar from '@/components/NodeToolbar';
import PropertiesPanel from '@/components/PropertiesPanel';

const nodeTypes = {
    campaign: CampaignNode,
    audience: AudienceNode,
    action: ActionNode,
    filter: FilterNode,
    adblock: AdBlockNode,
};

export default function EditorPage() {
    const params = useParams();
    const router = useRouter();
    const campaignId = params.id as string;
    const isNewCampaign = campaignId === 'new';

    const [campaign, setCampaign] = useState<Campaign | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const {
        nodes,
        edges,
        setNodes,
        setEdges,
        onNodesChange,
        onEdgesChange,
        onConnect,
        addNode,
    } = useEditorStore();

    // Загрузка кампании
    useEffect(() => {
        if (isNewCampaign) {
            const newCampaign: Campaign = {
                id: `campaign-${Date.now()}`,
                name: 'Новая кампания',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                status: 'draft',
                nodes: [],
                edges: [],
            };
            setCampaign(newCampaign);
            setNodes([]);
            setEdges([]);
        } else {
            const existingCampaign = storage.getCampaign(campaignId);
            if (existingCampaign) {
                setCampaign(existingCampaign);
                setNodes(existingCampaign.nodes || []);
                setEdges(existingCampaign.edges || []);
            } else {
                router.push('/campaigns');
            }
        }
    }, [campaignId, isNewCampaign, router, setNodes, setEdges]);

    // Auto-save при изменении нод и связей
    useEffect(() => {
        if (!campaign || nodes.length === 0) return;

        const timeoutId = setTimeout(() => {
            const updatedCampaign: Campaign = {
                ...campaign,
                nodes,
                edges,
                updatedAt: new Date().toISOString(),
            };
            storage.saveCampaign(updatedCampaign);
            setCampaign(updatedCampaign);
        }, 2000); // Auto-save через 2 секунды после последнего изменения

        return () => clearTimeout(timeoutId);
    }, [nodes, edges, campaign]);

    // Сохранение кампании
    const handleSave = useCallback(() => {
        if (!campaign) return;

        setIsSaving(true);
        const updatedCampaign: Campaign = {
            ...campaign,
            nodes,
            edges,
            updatedAt: new Date().toISOString(),
        };

        storage.saveCampaign(updatedCampaign);
        setCampaign(updatedCampaign);

        setTimeout(() => {
            setIsSaving(false);
            if (isNewCampaign) {
                router.push(`/editor/${updatedCampaign.id}`);
            }
        }, 500);
    }, [campaign, nodes, edges, isNewCampaign, router]);

    // Добавление ноды
    const handleAddNode = useCallback((type: NodeType) => {
        const newNode = {
            id: `${type}-${Date.now()}`,
            type,
            position: { x: Math.random() * 400 + 100, y: Math.random() * 300 + 100 },
            data: getDefaultNodeData(type),
        };
        addNode(newNode);
    }, [addNode]);

    const getDefaultNodeData = (type: NodeType) => {
        switch (type) {
            case 'campaign':
                return { name: 'Новая кампания', status: 'draft' };
            case 'audience':
                return { gender: 'all' };
            case 'action':
                return { actionType: 'add_points', value: 100 };
            case 'filter':
                return { condition: '', operator: 'and' };
            case 'adblock':
                return { blockType: 'popup' };
            default:
                return {};
        }
    };

    if (!campaign) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-foreground/60">Загрузка...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen flex flex-col bg-gradient-to-br from-[#0a0a0f] to-[#1a1a2e]">
            {/* Топ-бар */}
            <div className="h-16 glass border-b border-white/10 flex items-center justify-between px-6">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.push('/campaigns')}
                        className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-lg font-bold">{campaign.name}</h1>
                        <p className="text-xs text-foreground/50">
                            {isNewCampaign ? 'Новая кампания' : `ID: ${campaign.id}`}
                        </p>
                    </div>
                </div>

                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-primary to-secondary rounded-lg font-semibold hover:scale-105 transform transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Save className="w-4 h-4" />
                    {isSaving ? 'Сохранение...' : 'Сохранить'}
                </button>
            </div>

            {/* Редактор */}
            <div className="flex-1 flex overflow-hidden">
                <NodeToolbar onAddNode={handleAddNode} />

                <div className="flex-1 relative">
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        nodeTypes={nodeTypes}
                        fitView
                        className="bg-transparent"
                    >
                        <Background color="#ffffff20" gap={16} />
                        <Controls className="!bg-white/10 !border-white/20" />
                        <MiniMap
                            className="!bg-white/10 !border-white/20"
                            nodeColor={(node) => {
                                switch (node.type) {
                                    case 'campaign': return '#6366f1';
                                    case 'audience': return '#8b5cf6';
                                    case 'action': return '#ec4899';
                                    case 'filter': return '#6366f1';
                                    case 'adblock': return '#8b5cf6';
                                    default: return '#6366f1';
                                }
                            }}
                        />
                        <Panel position="top-center" className="glass px-4 py-2 rounded-lg">
                            <p className="text-sm text-foreground/70">
                                <span className="font-semibold">{nodes.length}</span> элементов •
                                <span className="font-semibold ml-2">{edges.length}</span> связей
                            </p>
                        </Panel>
                    </ReactFlow>
                </div>

                <PropertiesPanel />
            </div>
        </div>
    );
}
