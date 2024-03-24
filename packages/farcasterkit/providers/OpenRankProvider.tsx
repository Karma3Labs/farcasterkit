import React from 'react';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

// Please refer to https://graph.cast.k3l.io/docs# for details

type OpenRankProviderProps = {
  baseURL?: string;
  children: ReactNode;
  APIKey: string;
}

type OpenRankContextType = {
  baseURL: string;
  APIKey: string;
}

export type GetGlobalRanksParams = {
  strategy?: 'following' | 'engagement';
  limit?: number;
  offset?: number;
}

export type GetUserGlobalRankParams = {
  strategy?: 'following' | 'engagement';
  queryBy?: QueryBy,
  ids?: string[] | number[],
}

export enum QueryBy {
  Fids = 0,
  Handles = 1,
  Addresses = 2,
}

export type PersonalizedNeighborsParams = {
  strategy?: 'following' | 'engagement',
  queryBy?: QueryBy,
  ids?: string[] | number[],
  withoutRankScore: boolean,
  k?: number,
  limit?: number,
}

export type Rank = {
  fid: number,
  fname: string,
  username: string,
  rank: number,
  score: number,
  percentile: number,
}

export type RankIndexResponse = {
  rank: string;
}

export type Neighbor = {
  address: string;
  fname: string;
  username: string;
  fid: number;
  score?: number,
}

export type PersonalizedNeighborResponse = {
  result: Neighbor[];
}

type Frame = {
  url: string,
  score: number,
  cast_hashes?: string[],
  warpcast_urls?: string[],
  interacted_by_fids?: number[],
  interacted_by_fnames?: string[],
  interacted_by_usernames?: string[],
}

export type FramesResponse = {
  result: Frame[];
}

const OpenRankContext = createContext<OpenRankContextType | undefined>(undefined);

export const OpenRankProvider: React.FC<OpenRankProviderProps> = ({ baseURL = 'https://api.farcasterkit.com', APIKey, children }) => {
  return <OpenRankContext.Provider value={{ baseURL, APIKey }}>{children}</OpenRankContext.Provider>;
};

export const useGlobalRank = (queryParams?: GetGlobalRanksParams) => {
  const context = useContext(OpenRankContext);

  if (context === undefined) {
    throw new Error('useGlobalRank must be used within a OpenRankProvider');
  }

  const { baseURL } = context;
  const [ranks, setRanks] = useState<Rank[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (isMounted) setIsLoading(true);

      let strategy = 'engagement'
      if (queryParams?.strategy && ['following', 'engagement'].includes(queryParams.strategy)) {
        strategy = queryParams?.strategy
      }
      let offset = 0
      if (queryParams?.offset) {
        offset = queryParams?.offset
      }
      let limit = 100
      if (queryParams?.limit) {
        limit = queryParams?.limit
      }

      let url = `${baseURL}/openrank/scores/global/${strategy === 'following' ? 'following' : 'engagement'}/rankings`
      // @ts-ignore
      const qs = new URLSearchParams({ limit, offset }).toString()
      try {
        const response = await axios.post(`${url}?${qs}`, { ...queryParams }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${context.APIKey || ''}`
          }
        });
        const responseData = response.data?.result as Rank[];
        if (isMounted) {
          setRanks(responseData || []);
          setIsLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching latest casts:', error);
          setIsLoading(false);
        }
      }
    };

    fetchData().catch((err) => {
      console.log('error', err);
    });

    return () => {
      isMounted = false;
    };
  }, [baseURL, JSON.stringify(queryParams)]);

  return { accounts: ranks, isLoading };
};

export const useUserGlobalRank = (queryParams?: GetUserGlobalRankParams) => {
  const context = useContext(OpenRankContext);

  if (context === undefined) {
    throw new Error('useUserGlobalRank must be used within a OpenRankProvider');
  }

  const { baseURL } = context;
  const [ranks, setRanks] = useState<Rank[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (isMounted) setIsLoading(true);

      let strategy = 'engagement'
      if (queryParams?.strategy && ['following', 'engagement'].includes(queryParams.strategy)) {
        strategy = queryParams?.strategy
      }

      if (queryParams?.ids && queryParams.ids.length == 0) {
        throw new Error('ids is expected but got none')
      }

      try {
        let url = `${baseURL}/openrank/scores/global/${strategy === 'following' ? 'following' : 'engagement'}`;
        switch (queryParams?.queryBy) {
          case QueryBy.Fids:
            url = `${url}/fids`
            break;
          case QueryBy.Handles:
            url = `${url}/handles`
            break;
          default:
            url = `${url}/fids`
            break;
        }

        const response = await axios.post(url, queryParams?.ids, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${context.APIKey || ''}`
          }
        });
        const responseData = response.data?.result as Rank[];
        if (isMounted) {
          setRanks(responseData || []);
          setIsLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching latest casts:', error);
          setIsLoading(false);
        }
      }
    };

    fetchData().catch((err) => {
      console.log('error', err);
    });

    return () => {
      isMounted = false;
    };
  }, [baseURL, JSON.stringify(queryParams)]);

  return { accounts: ranks, isLoading };
};

export const usePersonalizedNeighbors = (queryParams?: PersonalizedNeighborsParams) => {
  const context = useContext(OpenRankContext);

  if (context === undefined) {
    throw new Error('usePersonalizedNeighbors must be used within a OpenRankProvider');
  }

  if (!queryParams?.ids || queryParams.ids && queryParams.ids.length == 0) {
    throw new Error('ids must be set');
  }

  const { baseURL } = context;
  const [neighbors, setNeighbors] = useState<Neighbor[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (isMounted) setIsLoading(true);

      let url = `${baseURL}/openrank/scores/personalized`;
      if (queryParams.withoutRankScore) {
        url = `${baseURL}/openrank/graph/neighbors`;
      }
      if (queryParams.strategy) {
        url = `${url}/${queryParams.strategy}`;
      } else {
        url = `${url}/engagement`;
      }
      let newQS: any = { ...queryParams }
      switch (queryParams.queryBy) {
        case QueryBy.Fids:
          url = `${url}/fids`
          newQS = { ...newQS, fids: queryParams.ids }
          break;
        case QueryBy.Handles:
          url = `${url}/handles`
          newQS = { ...newQS, handles: queryParams.ids }
          break;
        case QueryBy.Addresses:
          url = `${url}/addresses`
          newQS = { ...newQS, addresses: queryParams.ids }
          break;
        default:
          url = `${url}/fids`
          newQS = { ...newQS, fids: queryParams.ids }
          break;
      }

      try {
        const response = await axios.post(url, { ...newQS }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${context.APIKey || ''}`
          }
        });
        const responseData = response.data as PersonalizedNeighborResponse;
        if (isMounted) {
          setNeighbors(responseData.result);
          setIsLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching latest casts:', error);
          setIsLoading(false);
        }
      }
    };

    fetchData().catch((err) => {
      console.log('error', err);
    });

    return () => {
      isMounted = false;
    };
  }, [baseURL, JSON.stringify(queryParams)]);

  return { neighbors, isLoading };
};

type HandlesByAddressesParams = {
  addresses: string[]
};

export const useHandlesByAddresses = (queryParams?: HandlesByAddressesParams) => {
  const context = useContext(OpenRankContext);

  if (context === undefined) {
    throw new Error('usePersonalizedNeighbors must be used within a OpenRankProvider');
  }

  if (!queryParams?.addresses || queryParams.addresses && queryParams.addresses.length == 0) {
    throw new Error('addresses must be set');
  }

  const { baseURL } = context;
  const [neighbors, setNeighbors] = useState<Neighbor[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (isMounted) setIsLoading(true);

      const url = `${baseURL}/openrank/metadata/handles`;

      try {
        const response = await axios.post(url, queryParams.addresses);
        const responseData = response.data as PersonalizedNeighborResponse;
        if (isMounted) {
          setNeighbors(responseData.result || []);
          setIsLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching latest casts:', error);
          setIsLoading(false);
        }
      }
    };

    fetchData().catch((err) => {
      console.log('error', err);
    });

    return () => {
      isMounted = false;
    };
  }, [baseURL, JSON.stringify(queryParams)]);

  return { accounts: neighbors, isLoading };
};

type AddressesByHandlesParams = {
  handles: string[]
};

export const useAddressesByHandles = (queryParams?: AddressesByHandlesParams) => {
  const context = useContext(OpenRankContext);

  if (context === undefined) {
    throw new Error('usePersonalizedNeighbors must be used within a OpenRankProvider');
  }

  if (!queryParams?.handles || queryParams.handles && queryParams.handles.length == 0) {
    throw new Error('handles must be set');
  }

  const { baseURL } = context;
  const [neighbors, setNeighbors] = useState<Neighbor[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (isMounted) setIsLoading(true);

      const url = `${baseURL}/openrank/metadata/addresses`;

      try {
        const response = await axios.post(url, queryParams.handles);
        const responseData = response.data as PersonalizedNeighborResponse;
        if (isMounted) {
          setNeighbors(responseData.result || []);
          setIsLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching latest casts:', error);
          setIsLoading(false);
        }
      }
    };

    fetchData().catch((err) => {
      console.log('error', err);
    });

    return () => {
      isMounted = false;
    };
  }, [baseURL, JSON.stringify(queryParams)]);

  return { accounts: neighbors, isLoading };
};


type UseDirectLinksParams = {
  strategy?: 'following' | 'engagement',
  handles?: string[];
  fids?: number[];
  limit?: number;
};

// return a list of accounts that only the input accounts have directly engaged with.
export const useDirectLinks = (queryParams?: UseDirectLinksParams) => {
  const context = useContext(OpenRankContext);

  if (context === undefined) {
    throw new Error('useDirectLinks must be used within a OpenRankProvider');
  }

  if (queryParams?.handles && queryParams?.handles.length > 0 && queryParams?.fids && queryParams?.fids.length > 0) {
    throw new Error('cannot query by both handles and fids. query by either handle or fid');
  }

  let ids;
  let isHandles = false;
  if (queryParams?.handles && queryParams?.handles.length > 0) {
    ids = queryParams?.handles
    isHandles = true;
  } else if (queryParams?.fids && queryParams?.fids.length > 0) {
    ids = queryParams?.fids
  } else {
    throw new Error('cannot find neither handles nor fids');
  }

  let strategy = 'engagement'
  if (queryParams?.strategy && ['following', 'engagement'].includes(queryParams.strategy)) {
    strategy = queryParams?.strategy
  }

  let limit = 100;
  if (queryParams?.limit && queryParams?.limit > 0 && queryParams?.limit <= 100) {
    limit = queryParams?.limit
  }

  const { baseURL } = context;
  const [neighbors, setNeighbors] = useState<Neighbor[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (isMounted) setIsLoading(true);

      const url = `${baseURL}/openrank/links/${strategy}/${isHandles ? 'handles' : 'fids'}?limit=${limit}`;

      try {
        const response = await axios.post(url, ids);
        const responseData = response.data as PersonalizedNeighborResponse;
        if (isMounted) {
          setNeighbors(responseData.result || []);
          setIsLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching latest casts:', error);
          setIsLoading(false);
        }
      }
    };

    fetchData().catch((err) => {
      console.log('error', err);
    });

    return () => {
      isMounted = false;
    };
  }, [baseURL, JSON.stringify(queryParams)]);

  return { accounts: neighbors, isLoading };
};

/*

This API takes five optional parameters - agg, weights, details, offset and limit.

Parameter 'agg' is used to define the aggregation function and can take any of the following values - rms, sumsquare, sum.

Parameter 'weights' is used to define the weights to be assigned to like, cast and recast actions by profiles.

Parameter 'details' is used to specify whether the original cast list should be returned for each frame in the ranking.

(Note: cast hashes and warpcast urls are returned in chronological order ie., oldest first) (NOTE: details=True will result in a few extra hundred milliseconds in response times).

(NOTE: the API returns upto a max of 100 cast hashes and 100 warpcast urls when details=True).

Parameter 'offset' is used to specify how many results to skip and can be useful for paginating through results.

Parameter 'limit' is used to specify the number of results to return.

By default, agg=rms, weights='L1C10R5', details=False, offset=0 and limit=100 i.e., returns top 100 frame urls.

*/
type UseFramesGlobalParams = {
  agg?: 'rms' | 'sumsquare' | 'sum',
  weights?: string;
  details?: boolean;
  offset?: number;
  limit?: number;
};

export const useFramesGlobal = (queryParams?: UseFramesGlobalParams) => {
  const context = useContext(OpenRankContext);

  if (context === undefined) {
    throw new Error('useDirectLinks must be used within a OpenRankProvider');
  }

  let agg = 'agg'
  if (queryParams?.agg && ['rms', 'sumsquare', 'sum'].includes(queryParams?.agg)) {
    agg = queryParams?.agg
  }

  let weights = 'L1C10R5'
  if (queryParams?.weights && /^L\d+C\d+R\d+$/.test(queryParams?.weights as string)) {
    weights = queryParams?.weights
  }

  let offset = 0;
  if (queryParams?.offset && queryParams?.offset > 0) {
    offset = queryParams?.offset
  }

  let limit = 100;
  if (queryParams?.limit && queryParams?.limit > 0 && queryParams?.limit <= 100) {
    limit = queryParams?.limit
  }

  const { baseURL } = context;
  const [frames, setFrames] = useState<Frame[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (isMounted) setIsLoading(true);

      const url = `${baseURL}/openrank/frames/global/rankings`;

      // @ts-ignore
      const qs = new URLSearchParams({ agg, weights, limit, offset, details: queryParams?.details || false }).toString()
      try {
        const response = await axios.post(`${url}?${qs}`);
        const responseData = response.data as FramesResponse;
        if (isMounted) {
          setFrames(responseData.result || []);
          setIsLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching top frames:', error);
          setIsLoading(false);
        }
      }
    };

    fetchData().catch((err) => {
      console.log('error', err);
    });

    return () => {
      isMounted = false;
    };
  }, [baseURL, JSON.stringify(queryParams)]);

  return { frames, isLoading };
};

type UseFramesPersonalizedParams = {
  agg?: 'rms' | 'sumsquare' | 'sum',
  weights?: string;
  offset?: number;
  limit?: number;
  queryBy: QueryBy;
  ids: string[] | number[];
  k?: number;
  voting?: 'single' | 'multiple',
};

/*
Given a list of input fids, return a list of frame urls used by the extended trust network of the input fids.

This API takes four optional parameters - agg, weights, k and limit.

Parameter 'agg' is used to define the aggregation function and can take any of the following values - rms, sumsquare, sum

Parameter 'weights' is used to define the weights to be assigned to like, cast and recast actions by profiles.

Parameter 'voting' is used to decide whether there is a single vote per neighbor or multiple votes per neigbor when deriving the frames score.

Parameter 'k' is used to constrain the social graph to k-degrees of separation.

By default, agg=rms, weights='L1C10R5', voting='single', k=2 and limit=100.
*/
export const useFramesPersonalized = (queryParams?: UseFramesPersonalizedParams) => {
  const context = useContext(OpenRankContext);

  if (context === undefined) {
    throw new Error('useDirectLinks must be used within a OpenRankProvider');
  }

  if (!queryParams?.ids || queryParams.ids.length == 0) {
    throw new Error('ids is empty');
  }

  let agg = 'agg'
  if (queryParams?.agg && ['rms', 'sumsquare', 'sum'].includes(queryParams?.agg)) {
    agg = queryParams?.agg
  }

  let weights = 'L1C10R5'
  if (queryParams?.weights && /^L\d+C\d+R\d+$/.test(queryParams?.weights as string)) {
    weights = queryParams?.weights
  }

  let limit = 100;
  if (queryParams?.limit && queryParams?.limit > 0 && queryParams?.limit <= 100) {
    limit = queryParams?.limit
  }

  let voting = 'single'
  if (queryParams?.voting && ['single', 'multiple'].includes(queryParams?.voting)) {
    voting = queryParams?.voting
  }

  let k = 2
  if (queryParams?.k && typeof k === 'number' && k > 0 && k <= 5) {
    k = queryParams?.k
  }

  const { baseURL } = context;
  const [frames, setFrames] = useState<Frame[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (isMounted) setIsLoading(true);

      let url = `${baseURL}/openrank/frames/personalized/rankings`;

      switch (queryParams?.queryBy) {
        case QueryBy.Fids:
          url = `${url}/fids`
          break;
        case QueryBy.Handles:
          url = `${url}/handles`
          break;
        default:
          url = `${url}/fids`
          break;
      }

      // @ts-ignore
      const qs = new URLSearchParams({ agg, weights, limit, voting, k }).toString()
      try {
        const response = await axios.post(`${url}?${qs}`, queryParams?.ids);
        const responseData = response.data as FramesResponse;
        if (isMounted) {
          setFrames(responseData.result || []);
          setIsLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching top frames:', error);
          setIsLoading(false);
        }
      }
    };

    fetchData().catch((err) => {
      console.log('error', err);
    });

    return () => {
      isMounted = false;
    };
  }, [baseURL, JSON.stringify(queryParams)]);

  return { frames, isLoading };
};
