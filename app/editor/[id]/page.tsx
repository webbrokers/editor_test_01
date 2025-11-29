'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ReactFlow, Background, Controls, MiniMap, Panel, type NodeTypes } from '@xyflow/react';
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
} satisfies NodeTypes;

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
    setSelectedNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    updateNodeData,
    resetGraph,
    undo,
    redo,
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
      resetGraph([], []);
    } else {
      const existingCampaign = storage.getCampaign(campaignId);
      if (existingCampaign) {
        setCampaign(existingCampaign);
        resetGraph(existingCampaign.nodes || [], existingCampaign.edges || []);
      } else {
        router.push('/campaigns');
      }
    }
  }, [campaignId, isNewCampaign, router, resetGraph]);

  // Автосохранение при изменениях
  useEffect(() => {
    if (!campaign) return;

    const timeoutId = setTimeout(() => {
      const updatedCampaign: Campaign = {
        ...campaign,
        nodes,
        edges,
        updatedAt: new Date().toISOString(),
      };
      storage.saveCampaign(updatedCampaign);
      setCampaign(updatedCampaign);
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, [nodes, edges, campaign]);

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

  const handleAddNode = useCallback(
    (type: NodeType) => {
      const newNode = {
        id: `${type}-${Date.now()}`,
        type,
        position: { x: Math.random() * 400 + 100, y: Math.random() * 300 + 100 },
        data: getDefaultNodeData(type),
      };
      addNode(newNode as any);
    },
    [addNode]
  );

  const templates = useMemo(() => createTemplates(getDefaultNodeData), []);

  const handleLoadTemplate = useCallback(
    (key: 'welcome' | 'retention' | 'bonus') => {
      const template = templates[key];
      resetGraph(template.nodes, template.edges);
      setSelectedNode(null);
    },
    [resetGraph, setSelectedNode, templates]
  );

  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          redo();
        } else {
          undo();
        }
      }
    },
    [undo, redo]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [handleKeydown]);

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
    <div className="h-screen flex flex-col bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] dark:from-[#0a0a0f] dark:to-[#1a1a2e]">
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
          {isSaving ? 'Сохраняю...' : 'Сохранить'}
        </button>
      </div>

      {/* Редактор */}
      <div className="flex-1 flex overflow-hidden">
        <NodeToolbar
          onAddNode={handleAddNode}
          onLoadTemplate={handleLoadTemplate}
          onUndo={undo}
          onRedo={redo}
        />

        <div className="flex-1 relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            snapToGrid
            snapGrid={[16, 16]}
            selectionOnDrag
            panOnScroll
            selectionKeyCode="Shift"
            multiSelectionKeyCode="Shift"
            className="bg-transparent"
          >
            <Background color="#ffffff20" gap={16} />
            <Controls className="!bg-white/10 !border-white/20" />
            <MiniMap
              className="!bg-white/10 !border-white/20"
              nodeColor={(node) => {
                switch (node.type) {
                  case 'campaign':
                    return '#6366f1';
                  case 'audience':
                    return '#8b5cf6';
                  case 'action':
                    return '#ec4899';
                  case 'filter':
                    return '#6366f1';
                  case 'adblock':
                    return '#8b5cf6';
                  default:
                    return '#6366f1';
                }
              }}
            />
            <Panel position="top-center" className="glass px-4 py-2 rounded-lg">
              <p className="text-sm text-foreground/70">
                <span className="font-semibold">{nodes.length}</span> узлов •{' '}
                <span className="font-semibold">{edges.length}</span> связей
              </p>
            </Panel>
          </ReactFlow>
        </div>

        <PropertiesPanel />
      </div>
    </div>
  );
}

type TemplateKey = 'welcome' | 'retention' | 'bonus';

function createTemplates(getDefaultNodeData: (type: NodeType) => any): Record<TemplateKey, { nodes: any[]; edges: any[] }> {
  const basePosition = { x: 150, y: 100 };

  const makeNode = (type: NodeType, id: string, x: number, y: number, data: Record<string, any> = {}) => ({
    id,
    type,
    position: { x, y },
    data: { ...getDefaultNodeData(type), ...data },
  });

  const edge = (id: string, source: string, target: string) => ({
    id,
    source,
    target,
    animated: true,
  });

  const welcomeNodes = [
    makeNode('campaign', 'c1', basePosition.x, basePosition.y, { name: 'Приветственная серия', status: 'active' }),
    makeNode('audience', 'a1', basePosition.x + 220, basePosition.y + 40, { utmSource: 'all' }),
    makeNode('action', 'act1', basePosition.x + 440, basePosition.y + 40, { actionType: 'add_points', value: 200 }),
    makeNode('adblock', 'ad1', basePosition.x + 660, basePosition.y + 20, { blockType: 'popup' }),
  ];

  const welcomeEdges = [
    edge('e1', 'c1', 'a1'),
    edge('e2', 'a1', 'act1'),
    edge('e3', 'act1', 'ad1'),
  ];

  const retentionNodes = [
    makeNode('campaign', 'c2', basePosition.x, basePosition.y, { name: 'Удержание', status: 'draft' }),
    makeNode('filter', 'f2', basePosition.x + 220, basePosition.y + 10, { condition: 'Дней без визита > 7', operator: 'and' }),
    makeNode('action', 'act2', basePosition.x + 440, basePosition.y, { actionType: 'add_points', value: 150 }),
    makeNode('adblock', 'ad2', basePosition.x + 660, basePosition.y - 10, { blockType: 'banner' }),
  ];

  const retentionEdges = [
    edge('e21', 'c2', 'f2'),
    edge('e22', 'f2', 'act2'),
    edge('e23', 'act2', 'ad2'),
  ];

  const bonusNodes = [
    makeNode('campaign', 'c3', basePosition.x, basePosition.y, { name: 'Бонус + колесо', status: 'active' }),
    makeNode('audience', 'a3', basePosition.x + 220, basePosition.y + 20, { gender: 'all' }),
    makeNode('action', 'act3', basePosition.x + 440, basePosition.y + 20, { actionType: 'add_points', value: 50 }),
    makeNode('adblock', 'ad3', basePosition.x + 660, basePosition.y, { blockType: 'wheel' }),
  ];

  const bonusEdges = [
    edge('e31', 'c3', 'a3'),
    edge('e32', 'a3', 'act3'),
    edge('e33', 'act3', 'ad3'),
  ];

  return {
    welcome: { nodes: welcomeNodes, edges: welcomeEdges },
    retention: { nodes: retentionNodes, edges: retentionEdges },
    bonus: { nodes: bonusNodes, edges: bonusEdges },
  };
}
