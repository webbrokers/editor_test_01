import { useEditorStore } from '../hooks/useEditorStore';

describe('useEditorStore', () => {
  const reset = () =>
    useEditorStore.setState({
      nodes: [],
      edges: [],
      selectedNode: null,
      history: [],
      future: [],
    });

  beforeEach(() => {
    reset();
  });

  it('добавляет узел и поддерживает undo/redo', () => {
    const { addNode, nodes, undo, redo } = useEditorStore.getState();

    addNode({ id: 'n1', type: 'campaign', position: { x: 0, y: 0 }, data: {} } as any);
    expect(useEditorStore.getState().nodes).toHaveLength(1);

    undo();
    expect(useEditorStore.getState().nodes).toHaveLength(0);

    redo();
    expect(useEditorStore.getState().nodes).toHaveLength(1);
  });

  it('обновляет данные узла', () => {
    const { addNode, updateNodeData } = useEditorStore.getState();
    addNode({ id: 'n1', type: 'campaign', position: { x: 0, y: 0 }, data: {} } as any);

    updateNodeData('n1', { name: 'Тест' });
    const node = useEditorStore.getState().nodes[0];
    expect(node.data.name).toBe('Тест');
  });
});
