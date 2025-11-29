import { create } from 'zustand';
import { Node, Edge, Connection, addEdge, applyNodeChanges, applyEdgeChanges, NodeChange, EdgeChange } from '@xyflow/react';

interface EditorStore {
    nodes: Node[];
    edges: Edge[];
    selectedNode: Node | null;

    setNodes: (nodes: Node[]) => void;
    setEdges: (edges: Edge[]) => void;
    onNodesChange: (changes: NodeChange<Node>[]) => void;
    onEdgesChange: (changes: EdgeChange<Edge>[]) => void;
    onConnect: (connection: Connection) => void;
    addNode: (node: Node) => void;
    updateNodeData: (nodeId: string, data: any) => void;
    setSelectedNode: (node: Node | null) => void;
    deleteNode: (nodeId: string) => void;
}

export const useEditorStore = create<EditorStore>((set, get) => ({
    nodes: [],
    edges: [],
    selectedNode: null,

    setNodes: (nodes) => set({ nodes }),
    setEdges: (edges) => set({ edges }),

    onNodesChange: (changes) => {
        set({
            nodes: applyNodeChanges(changes, get().nodes),
        });
    },

    onEdgesChange: (changes) => {
        set({
            edges: applyEdgeChanges(changes, get().edges),
        });
    },

    onConnect: (connection) => {
        set({
            edges: addEdge(connection, get().edges),
        });
    },

    addNode: (node) => {
        set({
            nodes: [...get().nodes, node],
        });
    },

    updateNodeData: (nodeId, data) => {
        set({
            nodes: get().nodes.map((node) =>
                node.id === nodeId ? { ...node, data: { ...node.data, ...data } } : node
            ),
        });
    },

    setSelectedNode: (node) => set({ selectedNode: node }),

    deleteNode: (nodeId) => {
        set({
            nodes: get().nodes.filter((node) => node.id !== nodeId),
            edges: get().edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId),
        });
    },
}));
