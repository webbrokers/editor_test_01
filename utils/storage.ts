import { Campaign } from '@/types/campaign';

const STORAGE_KEY = 'loyalty_campaigns';

export const storage = {
    getCampaigns(): Campaign[] {
        if (typeof window === 'undefined') return [];
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    },

    saveCampaign(campaign: Campaign): void {
        const campaigns = this.getCampaigns();
        const index = campaigns.findIndex(c => c.id === campaign.id);

        if (index >= 0) {
            campaigns[index] = campaign;
        } else {
            campaigns.push(campaign);
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(campaigns));
    },

    deleteCampaign(id: string): void {
        const campaigns = this.getCampaigns().filter(c => c.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(campaigns));
    },

    getCampaign(id: string): Campaign | undefined {
        return this.getCampaigns().find(c => c.id === id);
    }
};
