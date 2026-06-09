import { useMemo } from 'react';
import { useCommunities as useCommunitiesQuery } from '@sudobility/svgr_client';
import type {
  Community,
  CommunityPlatform,
  SvgrClient,
} from '@sudobility/svgr_client';

export interface UseCommunitiesReturn {
  communities: Community[];
  communitiesByPlatform: Map<CommunityPlatform, Community[]>;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useCommunities(
  client: SvgrClient,
  language: string,
  enabled = true
): UseCommunitiesReturn {
  const { data, isLoading, error, refetch } = useCommunitiesQuery(
    client,
    language,
    enabled
  );

  const communities = data?.data ?? [];

  const communitiesByPlatform = useMemo(() => {
    const map = new Map<CommunityPlatform, Community[]>();
    for (const community of communities) {
      const existing = map.get(community.platform) ?? [];
      existing.push(community);
      map.set(community.platform, existing);
    }
    return map;
  }, [communities]);

  return {
    communities,
    communitiesByPlatform,
    isLoading,
    error: error as Error | null,
    refetch,
  };
}
