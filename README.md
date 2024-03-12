# farcaster kit

react hooks for the best farcaster apps -- [view docs](https://farcasterkit.com/docs)

### Example code
[Hooks Example](https://github.com/Karma3Labs/farcasterkit/blob/main/examples/openrank/src/app/component.tsx#L14-L20)

### Original API Docs
[OpenRank API - Farcaster Graph doc](https://graph.cast.k3l.io/docs#)
[Frames and Apps using Ranking APIs](https://www.notion.so/karma3labs/Farcaster-Frames-and-Apps-using-Ranking-APIs-e6078d16708b47ae9ac6e017e742fc97#e10595ce2801406b91dc77f416bd0e7c)


### Farcaster Kit OpenRank Graph API

#### POST openrank/rankings
a POST request that returns a global rank, score, follower/following count, likes, replies, recasts, and mentions

Input:
- strategy - 'follows' | 'engagement' | 'activity' | 'og_circles' | 'og_engagement' | 'og_activity'
- limit - number (optional)
- offset - number (optional)

#### POST openrank/ranking_index
a POST request that returns a cast given its hash

Input:
- strategy - 'follows' | 'engagement' | 'activity' | 'og_circles' | 'og_engagement' | 'og_activity'
- username - string

#### POST openrank/graph/neighbors/engagement/handles
a POST request that returns a list of handles that the input handles have engaged with given a list of input handles,

We do a BFS traversal of the social engagement graph upto k degrees and terminate traversal when limit is reached.

Example: ["v", "vitalik.eth"]

Input:
- handles - string[]
- k - number (optional)
- limit - number (optional)

#### POST openrank/graph/neighbors/following/handles
a POST request that returns a list of handles that the input handles are following given a list of input handles,

We do a BFS traversal of the social engagement graph upto k degrees and terminate traversal when limit is reached.

Example: ["v", "vitalik.eth"]

Input:
- handles - string[]
- k - number (optional)
- limit - number (optional)

#### POST openrank/graph/neighbors/engagement/addresses
a POST request that returns a list of addresses that the input addresses have engaged with given a list of input addresses,

We do a BFS traversal of the social engagement graph upto k degrees and terminate traversal when limit is reached.

Example: ["0x8fc5d6afe572fefc4ec153587b63ce543f6fa2ea", "0xb877f7bb52d28f06e60f557c00a56225124b357f"]

Input:
- addresses - string[]
- k - number (optional)
- limit - number (optional)

#### POST openrank/graph/neighbors/following/addresses
a POST request that returns a list of addresses that the input addresses are following given a list of input addresses,

We do a BFS traversal of the social engagement graph upto k degrees and terminate traversal when limit is reached.

Example: ["0x8fc5d6afe572fefc4ec153587b63ce543f6fa2ea", "0xb877f7bb52d28f06e60f557c00a56225124b357f"]

Input:
- addresses - string[]
- k - number (optional)
- limit - number (optional)

#### POST openrank/scores/personalized/engagement/addresses
a POST request that returns a list of addresses trusted by the extended network of the input addresses given a list of input addresses.

The addresses in the result are ranked by a relative scoring mechanism that is based on the EigenTrust algorithm.

The extended network is derived based on a BFS traversal of the social engagement graph upto k degrees and until limit is reached.

Example: ["0x4114e33eb831858649ea3702e1c9a2db3f626446", "0x8773442740c17c9d0f0b87022c722f9a136206ed"]
Input:
- addresses - string[]
- k - number (optional)
- limit - number (optional)


#### POST openrank/scores/personalized/following/addresses
a POST request that returns a list of addresses trusted by the extended network of the input addresses given a list of input addresses.

The addresses in the result are ranked by a relative scoring mechanism that is based on the EigenTrust algorithm.

The extended network is derived based on a BFS traversal of the social following graph upto k degrees and until limit is reached.

Example: ["0x4114e33eb831858649ea3702e1c9a2db3f626446", "0x8773442740c17c9d0f0b87022c722f9a136206ed"]
Input:
- addresses - string[]
- k - number (optional)
- limit - number (optional)

#### POST openrank/scores/personalized/engagement/handles
a POST request that returns a list of handles trusted by the extended network of the input handles given a list of input handles.

The handles in the result are ranked by a relative scoring mechanism that is based on the EigenTrust algorithm.

The extended network is derived based on a BFS traversal of the social following graph upto k degrees and until limit is reached.

Example: ["0x4114e33eb831858649ea3702e1c9a2db3f626446", "0x8773442740c17c9d0f0b87022c722f9a136206ed"]
Input:
- handles - string[]
- k - number (optional)
- limit - number (optional)

#### POST openrank/metadata/handles
a POST request that returns a list of handles given a list of addresses.

Input:
- handles - string[]


#### POST openrank/metadata/addresses
a POST request that returns a list of addresses given a list of handles.

Input:
- addresses - string[]



----
![farcaster kit og:image](https://i.imgur.com/qajaZLU.png)

farcaster kit is made up of two parts:
1. react hooks and modules to build the best farcaster apps
2. a rest api to fetch data with or without the hooks

### what's in the box?
- ✅ rest api
- ✅ read features
- ✅ channels module
- ✅ app-first feeds
- ✅ historic data
- ✅ user pages
- 🔜 auth hooks
- 🔜 write actions
- 🔜 multi package/provider support

### how this repo is structured
- `packages/farcasterkit` - react hooks and modules, which are available to install with `npm install farcasterkit`
- `packages/create-farcaster-app` - a CLI tool to scaffold an app using `npx create-farcaster-app`, which lives at `examples/starter`
- `apps/api` - the rest api for farcaster kit
- `apps/web` - the homepage and docs for farcaster kit, which you can [view here](https://farcasterkit.com)
- `apps/old-replicator` -- the postgres replicator powering farcaster kit, built by farcaster. a migration to the [new replicator](https://github.com/farcasterxyz/hub-monorepo/tree/main/apps/replicator) will happen soon!
- `examples/starter` - a starter app which you can scaffold by using `npx create-farcaster-app`
<br/>

built by [dylsteck](https://github.com/dylsteck) and powered by [nexus](https://withcortex.com)

----
