import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getEvents, GetEventsParams } from './service';

export const eventsQueryKey = (p: GetEventsParams) => ['events', p.lat, p.lng, p.radius ?? 10, p.size ?? 20, p.keyword ?? ''];

export function useEvents(params: GetEventsParams, isEnabled = true) {
  return useQuery({
    queryKey: eventsQueryKey(params),
    queryFn: () => getEvents(params),
    enabled: () => isEnabled,
    staleTime: 60_000,
    gcTime: 5 * 60_000,
    placeholderData: keepPreviousData,
  });
}
