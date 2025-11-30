'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ReactFlow, Background, BackgroundVariant, Controls, MiniMap, Panel, type NodeTypes } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import {
  Save,
  ArrowLeft,
  Play,
  Clock3,
  ShieldCheck,
  MoreHorizontal,
  Layers,
  LayoutGrid,
  Bell,
  LineChart,
  Globe2,
  Sparkles,
} from 'lucide-react';

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

const edgeStyle = { stroke: '#c0c8d6', strokeWidth: 1.5 };

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
        return { gender: 'all', utmSource: 'Все каналы' };
      case 'action':
        return { actionType: 'add_points', value: 100 };
      case 'filter':
        return { condition: 'Заполнено поле', operator: 'and' };
      case 'adblock':
        return { blockType: 'popup', content: '' };
      default:
        return {};
    }
  };

  const handleAddNode = useCallback(
    (type: NodeType) => {
      const newNode = {
        id: `${type}-${Date.now()}`,
        type,
        position: { x: Math.random() * 400 + 100, y: Math.random() * 300 + 120 },
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
      <div className="min-h-screen flex items-center justify-center bg-[#f4f6fb]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-foreground/60">Загружаем кампанию...</p>
        </div>
      </div>
    );
  }

  const railItems = [
    { icon: Layers, label: 'Сценарии' },
    { icon: LayoutGrid, label: 'Библиотека' },
    { icon: Bell, label: 'Кампании' },
    { icon: LineChart, label: 'Аналитика' },
    { icon: Globe2, label: 'Каналы' },
  ];

  return (
    <div className="h-screen flex bg-[#f4f6fb] text-slate-900">
      <aside className="w-16 bg-[#0f172a] text-white flex flex-col justify-between items-center py-6 border-r border-white/5 shadow-[0_12px_40px_rgba(15,23,42,0.35)]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center font-semibold">
            LP
          </div>
          <div className="flex flex-col gap-3">
            {railItems.map(({ icon: Icon, label }, idx) => (
              <button
                key={label}
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition hover:bg-white/10 ${
                  idx === 0 ? 'bg-white/10 text-emerald-200' : 'text-white/80'
                }`}
                title={label}
              >
                <Icon className="w-5 h-5" />
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center gap-3">
          <button className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/5 text-white/80 hover:bg-white/10" title="Настройки">
            <ShieldCheck className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-lg flex items-center justify-center bg-emerald-500 text-white hover:bg-emerald-400">
            <Sparkles className="w-5 h-5" />
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="h-16 px-6 border-b border-slate-200 bg-white/80 backdrop-blur flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/campaigns')}
              className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900 bg-white"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-lg font-bold">{campaign.name}</h1>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">В разработке</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                <span className="flex items-center gap-1"><Clock3 className="w-4 h-4" />Автосохранение раз в 1.5 сек</span>
                <span className="flex items-center gap-1"><MoreHorizontal className="w-4 h-4" />ID: {campaign.id}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:border-slate-300 transition disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Сохраняем...' : 'Сохранить черновик'}
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 text-white font-semibold shadow-[0_10px_30px_rgba(16,185,129,0.35)] hover:bg-emerald-400">
              <Play className="w-4 h-4" />Запустить
            </button>
          </div>
        </div>

        <div className="flex-1 flex gap-4 px-5 py-4 overflow-hidden">
          <div className="w-[320px] shrink-0">
            <NodeToolbar onAddNode={handleAddNode} onLoadTemplate={handleLoadTemplate} onUndo={undo} onRedo={redo} />
          </div>

          <div className="flex-1 relative rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(16,24,40,0.08)] overflow-hidden">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
              defaultEdgeOptions={{ type: 'smoothstep', style: edgeStyle }}
              connectionLineStyle={edgeStyle}
              fitView
              snapToGrid
              snapGrid={[16, 16]}
              selectionOnDrag
              panOnScroll
              selectionKeyCode="Shift"
              multiSelectionKeyCode="Shift"
              className="!bg-transparent"
            >
            <Background color="#d5dce6" gap={28} size={1.6} variant={BackgroundVariant.Dots} />
              <Controls className="!bg-white !border-slate-200 !rounded-xl !shadow-md" position="bottom-left" />
              <MiniMap
                className="!bg-white !border-slate-200 !rounded-xl !shadow-md"
                nodeColor={(node) => {
                  switch (node.type) {
                    case 'campaign':
                      return '#22c55e';
                    case 'audience':
                      return '#0ea5e9';
                    case 'action':
                      return '#8b5cf6';
                    case 'filter':
                      return '#f59e0b';
                    case 'adblock':
                      return '#10b981';
                    default:
                      return '#22c55e';
                  }
                }}
              />
              <Panel position="top-center" className="px-4 py-2 rounded-full bg-white/90 border border-slate-200 shadow-sm text-sm text-slate-600">
                <span className="font-semibold text-slate-900">{nodes.length}</span> узлов ·{' '}
                <span className="font-semibold text-slate-900">{edges.length}</span> связей
              </Panel>
            </ReactFlow>
          </div>

          <div className="w-[360px] shrink-0">
            <PropertiesPanel />
          </div>
        </div>
      </div>
    </div>
  );
}

type TemplateKey = 'welcome' | 'retention' | 'bonus';

function createTemplates(getDefaultNodeData: (type: NodeType) => any): Record<TemplateKey, { nodes: any[]; edges: any[] }> {
  const basePosition = { x: 150, y: 120 };

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
    animated: false,
    style: edgeStyle,
    type: 'smoothstep',
  });

  const welcomeNodes = [
    makeNode('campaign', 'c1', basePosition.x, basePosition.y, { name: 'Приветствие: бонус за регистрацию', status: 'active' }),
    makeNode('audience', 'a1', basePosition.x + 220, basePosition.y + 10, { utmSource: 'Все каналы' }),
    makeNode('action', 'act1', basePosition.x + 440, basePosition.y + 20, { actionType: 'add_points', value: 200 }),
    makeNode('adblock', 'ad1', basePosition.x + 660, basePosition.y, { blockType: 'popup' }),
  ];

  const welcomeEdges = [edge('e1', 'c1', 'a1'), edge('e2', 'a1', 'act1'), edge('e3', 'act1', 'ad1')];

  const retentionNodes = [
    makeNode('campaign', 'c2', basePosition.x, basePosition.y, { name: 'Удержание: триггер по дате', status: 'draft' }),
    makeNode('filter', 'f2', basePosition.x + 220, basePosition.y, { condition: 'Не было покупок 7 дней', operator: 'and' }),
    makeNode('action', 'act2', basePosition.x + 440, basePosition.y + 10, { actionType: 'add_spins', value: 3 }),
    makeNode('adblock', 'ad2', basePosition.x + 660, basePosition.y - 10, { blockType: 'banner' }),
  ];

  const retentionEdges = [edge('e21', 'c2', 'f2'), edge('e22', 'f2', 'act2'), edge('e23', 'act2', 'ad2')];

  const bonusNodes = [
    makeNode('campaign', 'c3', basePosition.x, basePosition.y, { name: 'Бонус: колесо удачи + баллы', status: 'active' }),
    makeNode('audience', 'a3', basePosition.x + 220, basePosition.y + 10, { gender: 'all' }),
    makeNode('action', 'act3', basePosition.x + 440, basePosition.y + 30, { actionType: 'add_points', value: 50 }),
    makeNode('adblock', 'ad3', basePosition.x + 660, basePosition.y + 10, { blockType: 'wheel' }),
  ];

  const bonusEdges = [edge('e31', 'c3', 'a3'), edge('e32', 'a3', 'act3'), edge('e33', 'act3', 'ad3')];

  return {
    welcome: { nodes: welcomeNodes, edges: welcomeEdges },
    retention: { nodes: retentionNodes, edges: retentionEdges },
    bonus: { nodes: bonusNodes, edges: bonusEdges },
  };
}

