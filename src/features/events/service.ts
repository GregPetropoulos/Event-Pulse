const EVENTBRITE_BASE = 'https://www.eventbriteapi.com/v3';

import { IEvent } from './types';
import { api } from '@/service/apiClient';

export type GetEventsParams = {
  lat: number;
  lng: number;
  radius?: number;
  size?: number;
  keyword?: string;
};

export type GetEventsResponse = {
  events: IEvent[];
  softWarning?: string;
  count?: number;
};

export async function getEvents(params: GetEventsParams) {
  const { data } = await api.get<GetEventsResponse>('/events', {
    params: {
      latlong: `${params.lat},${params.lng}`,
      radius: params.radius ?? 10,
      size: params.size ?? 20,
      keyword: params.keyword,
    },
  });

  return data;
}
