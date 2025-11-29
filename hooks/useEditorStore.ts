import { create } from 'zustand';
import { Node, Edge, Connection, addEdge, applyNodeChanges, applyEdgeChanges, NodeChange, EdgeChange } from '@xyflow/react';

interface EditorStore {
  nodes: Node[];
  edges: Edge[];
  selectedNode: Node | null;
  history: { nodes: Node[]; edges: Edge[] }[];
  future: { nodes: Node[]; edges: Edge[] }[];

  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  onNodesChange: (changes: NodeChange<Node>[]) => void;
  onEdgesChange: (changes: EdgeChange<Edge>[]) => void;
  onConnect: (connection: Connection) => void;
  addNode: (node: Node) => void;
  updateNodeData: (nodeId: string, data: any) => void;
  setSelectedNode: (node: Node | null) => void;
  deleteNode: (nodeId: string) => void;
  resetGraph: (nodes: Node[], edges: Edge[]) => void;
  undo: () => void;
  redo: () => void;
}

const HISTORY_LIMIT = 30;

export const useEditorStore = create<EditorStore>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNode: null,
  history: [],
  future: [],

  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),

  onNodesChange: (changes) => {
    const prev = { nodes: get().nodes, edges: get().edges };
    set({
      history: pushHistory(get().history, prev),
      future: [],
      nodes: applyNodeChanges(changes, prev.nodes),
    });
  },

  onEdgesChange: (changes) => {
    const prev = { nodes: get().nodes, edges: get().edges };
    set({
      history: pushHistory(get().history, prev),
      future: [],
      edges: applyEdgeChanges(changes, prev.edges),
    });
  },

  onConnect: (connection) => {
    const prev = { nodes: get().nodes, edges: get().edges };
    set({
      history: pushHistory(get().history, prev),
      future: [],
      edges: addEdge(connection, prev.edges),
    });
  },

  addNode: (node) => {
    const prev = { nodes: get().nodes, edges: get().edges };
    set({
      history: pushHistory(get().history, prev),
      future: [],
      nodes: [...prev.nodes, node],
    });
  },

  updateNodeData: (nodeId, data) => {
    const prev = { nodes: get().nodes, edges: get().edges };
    set({
      history: pushHistory(get().history, prev),
      future: [],
      nodes: prev.nodes.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, ...data } } : node
      ),
    });
  },

  setSelectedNode: (node) => set({ selectedNode: node }),

  deleteNode: (nodeId) => {
    const prev = { nodes: get().nodes, edges: get().edges };
    set({
      history: pushHistory(get().history, prev),
      future: [],
      nodes: prev.nodes.filter((node) => node.id !== nodeId),
      edges: prev.edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId),
      selectedNode: get().selectedNode?.id === nodeId ? null : get().selectedNode,
    });
  },

  resetGraph: (nodes, edges) => set({ nodes, edges, history: [], future: [], selectedNode: null }),

  undo: () => {
    const history = get().history;
    if (history.length === 0) return;

    const current = { nodes: get().nodes, edges: get().edges };
    const previous = history[history.length - 1];
    set({
      nodes: previous.nodes,
      edges: previous.edges,
      history: history.slice(0, -1),
      future: [current, ...get().future],
      selectedNode: null,
    });
  },

  redo: () => {
    const [next, ...restFuture] = get().future;
    if (!next) return;

    const current = { nodes: get().nodes, edges: get().edges };
    set({
      nodes: next.nodes,
      edges: next.edges,
      history: pushHistory(get().history, current),
      future: restFuture,
      selectedNode: null,
    });
  },
}));

function pushHistory(history: { nodes: Node[]; edges: Edge[] }[], state: { nodes: Node[]; edges: Edge[] }) {
  const nextHistory = [...history, cloneState(state)];
  if (nextHistory.length > HISTORY_LIMIT) {
    return nextHistory.slice(nextHistory.length - HISTORY_LIMIT);
  }
  return nextHistory;
}

function cloneState(state: { nodes: Node[]; edges: Edge[] }) {
  return {
    nodes: state.nodes.map((n) => ({ ...n, data: { ...n.data } })),
    edges: state.edges.map((e) => ({ ...e })),
  };
}
