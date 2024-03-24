import {
  useGlobalRank,
  useUserGlobalRank,
  usePersonalizedNeighbors,
  useAccountsByAddresses,
  useAccountsByHandles,
  useDirectLinks,
  QueryBy,
  useFramesGlobal,
  useFramesPersonalized,
  useAccountsByFids,
} from '../../../../packages/farcasterkit/index';

const EXAMPLE_HANDLE = "dylsteck.eth";
const EXAMPLE_ADDRESSES = ["0x8fc5d6afe572fefc4ec153587b63ce543f6fa2ea", "0x4114e33eb831858649ea3702e1c9a2db3f626446"];

export default function DemoComponent() {
  const { accounts: globalAccounts, isLoading: isLoadingGlobal } = useGlobalRank({ strategy: "following", limit: 50 });
  const { accounts: ranks, isLoading: isLoadingUserRank } = useUserGlobalRank({
    strategy: 'following',
    queryBy: QueryBy.Fids,
    ids: [3, 4]
  });
  const { neighbors, isLoading: isLoadingNeighbors } = usePersonalizedNeighbors({
    queryBy: QueryBy.Handles,
    ids: [EXAMPLE_HANDLE, "v"],
    withoutRankScore: false
  });
  const { neighbors: neighborsFollowing, isLoading: isLoadingNeighborsFollowing } = usePersonalizedNeighbors({
    queryBy: QueryBy.Handles,
    ids: [EXAMPLE_HANDLE, "v"],
    withoutRankScore: false,
    strategy: 'following'
  });
  const { neighbors: neighborsFollowingByAddress, isLoading: isLoadingNeighborsFollowingByAddress } = usePersonalizedNeighbors({
    queryBy: QueryBy.Addresses,
    ids: EXAMPLE_ADDRESSES,
    withoutRankScore: false,
    strategy: 'following'
  });
  const { neighbors: neighborsFollowingByFids, isLoading: isLoadingNeighborsFollowingByFids } = usePersonalizedNeighbors({
    queryBy: QueryBy.Fids,
    ids: [3, 5],
    withoutRankScore: true,
    strategy: 'engagement'
  });
  const { accounts, isLoading: isLoadingGetHandles } = useAccountsByAddresses({ addresses: EXAMPLE_ADDRESSES });
  const { accounts: accountsByAddr, isLoading: isLoadingGetAddresses } = useAccountsByHandles({ handles: [EXAMPLE_HANDLE, "v"] });
  const { accounts: fidsByAddrs, isLoading: isLoadingfidsByAddrs } = useAccountsByFids({ fids: [3, 4] });


  const { accounts: directLinksByHandles, isLoading: isLoadingDirectLinksByHandles } = useDirectLinks({
    // fids: [3, 4],
    handles: [EXAMPLE_HANDLE],
    strategy: 'engagement'
  });
  const { frames: framesGlobal, isLoading: isLoadingFramesGlobal } = useFramesGlobal({ details: true });
  const { frames: framesPersonalized, isLoading: isLoadingFramePersonal } = useFramesPersonalized({
    queryBy: QueryBy.Handles,
    ids: ["sahil"],
    offset: 1000,
  });



  return (
    <main className="flex min-h-screen flex-col space-y-4 justify-between p-24">
      <div>
        <span className='text-xl font-bold'>useUserGlobalRank for fid (3,4)</span>
        {isLoadingUserRank && <div>loading...</div>}
        {ranks.map((a) => {
          return (
            <div key={a.fid} className='mb-4'>
              <span>fid: {a.fid}, fname: {a.fname}, rank: {a.rank} percentile: {a.percentile}, score: {a.score}, username: {a.username}</span>
            </div>
          )
        })}
      </div>

      <div>
        <span className='text-xl font-bold'>useGlobalRank</span>
        {isLoadingGlobal && <div>loading...</div>}
        {globalAccounts.map((a) => {
          return (
            <div key={a.fid} className='mb-4'>
              <span>fid: {a.fid}, fname: {a.fname}, rank: {a.rank} percentile: {a.percentile}, score: {a.score}, username: {a.username}</span>
            </div>
          )
        })}
      </div>

      <div>
        <span className='text-xl font-bold'>usePersonalizedNeighbors - for handles (dylsteck.eth, v) - based on engagement</span>
        {isLoadingNeighbors && <div>loading...</div>}
        {neighbors.map((a) => {
          return (
            <div key={a.address} className='mb-4'>
              <span>address: {a.address}, fname: {a.fname}, username: {a.username} {a.score && `score: ${a.score}`}</span>
            </div>
          )
        })}
      </div>
      <div>
        <span className='text-xl font-bold'>usePersonalizedNeighbors - for handles (dylsteck.eth, v) - based on following</span>
        {isLoadingNeighborsFollowing && <div>loading...</div>}
        {neighborsFollowing.map((a) => {
          return (
            <div key={a.address} className='mb-4'>
              <span>address: {a.address}, fname: {a.fname}, username: {a.username} {a.score && `score: ${a.score}`}</span>
            </div>
          )
        })}
      </div>
      <div>
        <span className='text-xl font-bold'>usePersonalizedNeighborsByAddresses - for addresses (0x8fc5d6afe572fefc4ec153587b63ce543f6fa2ea, 0x4114e33eb831858649ea3702e1c9a2db3f626446) - based on following</span>
        {isLoadingNeighborsFollowingByAddress && <div>loading...</div>}
        {neighborsFollowingByAddress.map((a) => {
          return (
            <div key={a.address} className='mb-4'>
              <span>address: {a.address}, username: {a.username} {a.score && `score: ${a.score}`}</span>
            </div>
          )
        })}
      </div>
      <div>
        <span className='text-xl font-bold'>usePersonalizedNeighbors - by fid (3, 4) - based on following</span>
        {isLoadingNeighborsFollowingByFids && <div>loading...</div>}
        {neighborsFollowingByFids.map((a) => {
          return (
            <div key={a.address} className='mb-4'>
              <span>address: {a.address}, username: {a.username} fid: {a.fid} {a.score && `score: ${a.score}`}</span>
            </div>
          )
        })}
      </div>
      <div>
        <span className='text-xl font-bold'>useAccountsByAddresses - for addresses (0x8fc5d6afe572fefc4ec153587b63ce543f6fa2ea, 0x4114e33eb831858649ea3702e1c9a2db3f626446)</span>
        {isLoadingGetHandles && <div>loading...</div>}
        {accounts.map((a) => {
          return (
            <div key={a.address} className='mb-4'>
              <span>fid: {a.fid}, address: {a.address}, fname: {a.fname}, username: {a.username}</span>
            </div>
          )
        })}
      </div>
      <div>
        <span className='text-xl font-bold'>useAccountsByHandles - for addresses (dylsteck.eth, v)</span>
        {isLoadingGetAddresses && <div>loading...</div>}
        {accountsByAddr.map((a) => {
          return (
            <div key={a.address} className='mb-4'>
              <span>fid: {a.fid}, address: {a.address}, fname: {a.fname}, username: {a.username}</span>
            </div>
          )
        })}
      </div>
      <div>
        <span className='text-xl font-bold'>useAccountsByFids - for addresses (3, 4)</span>
        {isLoadingfidsByAddrs && <div>loading...</div>}
        {fidsByAddrs.map((a) => {
          return (
            <div key={a.address} className='mb-4'>
              <span>fid: {a.fid}, address: {a.address}, fname: {a.fname}, username: {a.username}</span>
            </div>
          )
        })}
      </div>
      <div>
        <span className='text-xl font-bold'>useDirectLinks - for handles (dylsteck.eth, v)</span>
        {isLoadingDirectLinksByHandles && <div>loading...</div>}
        {directLinksByHandles.map((a) => {
          return (
            <div key={a.address} className='mb-4'>
              <span>address: {a.address}, fname: {a.fname}, username: {a.username}, fid: {a.fid}, score: {a.score}</span>
            </div>
          )
        })}
      </div>
      <div>
        <span className='text-xl font-bold'>useFramesGlobal</span>
        {isLoadingFramesGlobal && <div>loading...</div>}
        {framesGlobal.map((a) => {
          return (
            <div key={a.url} className='mb-4'>
              <span>url: {a.url}, score: {a.score}, cast_hashes: {a.cast_hashes}, warpcast_urls: {a.warpcast_urls} </span>
            </div>
          )
        })}
      </div>
      <div>
        <span className='text-xl font-bold'>useFramesPersonalized - fid (3,4)</span>
        {isLoadingFramePersonal && <div>loading...</div>}
        {framesPersonalized.map((a) => {
          return (
            <div key={a.url} className='mb-4'>
              <span>url: {a.url}, score: {a.score}, interacted_by_fids: {a.interacted_by_fids}, interacted_by_fnames: {a.interacted_by_fnames}, interacted_by_usernames: {a.interacted_by_usernames} </span>
            </div>
          )
        })}
      </div>
    </main>
  );
}