import { authorizedFetch } from './auth-fetch';
import { DEFAULT_MARKETING_METRICS } from '@/data/marketing-metrics';

export async function fetchCampaigns() {
  try {
    const response = await authorizedFetch('/api/ads/google/campaigns');
    if (!response.ok) {
      throw new Error('Failed to fetch campaigns');
    }
    const data = await response.json();
    return data.data || DEFAULT_MARKETING_METRICS.campaigns;
  } catch (error) {
    console.error('Failed to load campaigns', error);
    return DEFAULT_MARKETING_METRICS.campaigns;
  }
}
