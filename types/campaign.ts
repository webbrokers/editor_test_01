export type NodeType =
    | 'campaign'
    | 'audience'
    | 'filter'
    | 'action'
    | 'adblock';

export interface CampaignNodeData {
    name: string;
    startDate?: string;
    endDate?: string;
    status?: 'draft' | 'active' | 'paused' | 'completed';
}

export interface AudienceNodeData {
    segments?: string[];
    triggers?: string[];
    utmSource?: string;
    age?: { min: number; max: number };
    gender?: 'male' | 'female' | 'all';
}

export interface FilterNodeData {
    condition: string;
    operator?: 'and' | 'or';
    value?: string;
}

export interface ActionNodeData {
    actionType: 'add_points' | 'subtract_points' | 'add_spins' | 'level_up';
    value?: number;
}

export interface AdBlockNodeData {
    blockType: 'popup' | 'banner' | 'wheel' | 'daily_reward';
    content?: string;
}

export type NodeData =
    | CampaignNodeData
    | AudienceNodeData
    | FilterNodeData
    | ActionNodeData
    | AdBlockNodeData;

export interface Campaign {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    status: 'draft' | 'active' | 'paused' | 'completed';
    nodes: any[];
    edges: any[];
}
